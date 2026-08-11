// ===========================================================================
//  check-maps.mjs — the map safety net (added at M4S6, 2026-08-10).
//
//  Run it from the tools/ folder after editing src/data/maps.js:
//      cd tools && node check-maps.mjs
//
//  WHY: a map is a wall of numbers. Move a wild Fakeamon one tile and it can
//  end up standing inside a tree, where you can never reach it — and nothing
//  in the game complains, it just quietly doesn't work. Adding a second area
//  doubled the number of places that can happen, so this script reads the REAL
//  src/data/maps.js and checks every map for the mistakes that are easy to
//  make and hard to see:
//
//    1. every map is 30×20 (the size of the Phaser canvas)
//    2. nothing stands on a tile you can't walk on
//    3. no two things share a tile
//    4. everything on the map can actually be REACHED on foot from where you
//       arrive — walk-to-it for berries, bump-into-it for creatures, buildings
//       and boats
//    5. every 2×2 tree is complete (a half-drawn tree is a visual bug the
//       walkability check can't see)
//    6. every exit points at a map that exists, and lands you on a walkable
//       tile there
//
//  It reads the game's own data file, so it can never disagree with the game.
//  Same spirit as tools/check-roadmap.mjs: prove it, don't hope.
// ===========================================================================

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const TOOLS = dirname(fileURLToPath(import.meta.url));

// src/data/maps.js is a plain script that just declares MAPS (no exports —
// that's the whole point of this project's no-build-step setup), so we run it
// and ask for the value back.
const source = readFileSync(join(TOOLS, "..", "src", "data", "maps.js"), "utf8");
const MAPS = new Function(source + "\nreturn MAPS;")();

const EXPECTED_COLS = 30;
const EXPECTED_ROWS = 20;
// The 2×2 tree, as tile numbers — the same four in both tilesets so far.
const TREE = { topLeft: 9, topRight: 10, botLeft: 15, botRight: 16 };

let problems = 0;
const problem = (mapId, text) => { problems++; console.log(`❌ ${mapId}: ${text}`); };

for (const [mapId, map] of Object.entries(MAPS)) {
  const g = map.ground;
  const rows = g.length;
  const cols = g[0].length;
  const solid = new Set(map.solidTiles || []);

  // 1. size
  if (cols !== EXPECTED_COLS || rows !== EXPECTED_ROWS) {
    problem(mapId, `is ${cols}×${rows}, but every map must be ${EXPECTED_COLS}×${EXPECTED_ROWS}`);
  }
  if (g.some((row) => row.length !== cols)) {
    problem(mapId, "has rows of different lengths — every row needs the same number of tiles");
  }
  if (!map.solidTiles) problem(mapId, "has no solidTiles list");

  // Everything that occupies a tile. Encounters, buildings and exits BLOCK you
  // (you bump them); berries do not (you walk over them).
  const blockers = [
    ...(map.encounters || []).map((e) => ({ ...e, what: `wild ${e.species}` })),
    ...(map.buildings || []).map((b) => ({ ...b, what: `building ${b.id}` })),
    ...(map.exits || []).map((e) => ({ ...e, what: `exit ${e.id}` })),
  ];
  const walkOns = (map.berrySpots || []).map((s) => ({ ...s, what: `berry spot ${s.id}` }));
  const everything = [...blockers, ...walkOns];

  // 2 + 3. on a solid tile, off the map, or sharing a tile
  const taken = new Map();
  for (const thing of everything) {
    const key = `${thing.tileX},${thing.tileY}`;
    if (thing.tileX < 0 || thing.tileY < 0 || thing.tileX >= cols || thing.tileY >= rows) {
      problem(mapId, `${thing.what} sits off the edge of the map at ${key}`);
      continue;
    }
    if (solid.has(g[thing.tileY][thing.tileX])) {
      problem(mapId, `${thing.what} stands on solid tile ${g[thing.tileY][thing.tileX]} at ${key}`);
    }
    if (taken.has(key)) problem(mapId, `${thing.what} shares tile ${key} with ${taken.get(key)}`);
    taken.set(key, thing.what);
  }

  // 4. reachability, walking out from where you arrive
  const blocked = new Set(blockers.map((b) => `${b.tileX},${b.tileY}`));
  const starts = [map.startTile, ...Object.values(MAPS)
    .flatMap((m) => (m.exits || []).filter((e) => e.toMap === mapId).map((e) => e.toTile))]
    .filter(Boolean);

  const reached = new Set();
  const queue = [];
  for (const s of starts) {
    const key = `${s.x},${s.y}`;
    if (solid.has(g[s.y][s.x])) problem(mapId, `you'd arrive on solid tile ${key}`);
    if (reached.has(key)) continue;
    reached.add(key);
    queue.push([s.x, s.y]);
  }
  while (queue.length) {
    const [x, y] = queue.pop();
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx, ny = y + dy, key = `${nx},${ny}`;
      if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
      if (reached.has(key) || blocked.has(key) || solid.has(g[ny][nx])) continue;
      reached.add(key);
      queue.push([nx, ny]);
    }
  }
  for (const thing of blockers) {
    const nextTo = [[1, 0], [-1, 0], [0, 1], [0, -1]]
      .some(([dx, dy]) => reached.has(`${thing.tileX + dx},${thing.tileY + dy}`));
    if (!nextTo) problem(mapId, `${thing.what} at ${thing.tileX},${thing.tileY} can't be reached — nowhere to stand beside it`);
  }
  for (const thing of walkOns) {
    if (!reached.has(`${thing.tileX},${thing.tileY}`)) {
      problem(mapId, `${thing.what} at ${thing.tileX},${thing.tileY} can't be walked to`);
    }
  }

  // 5. complete trees
  for (let y = 0; y < rows - 1; y++) {
    for (let x = 0; x < cols - 1; x++) {
      if (g[y][x] !== TREE.topLeft) continue;
      const whole = g[y][x + 1] === TREE.topRight &&
        g[y + 1][x] === TREE.botLeft && g[y + 1][x + 1] === TREE.botRight;
      if (!whole) problem(mapId, `half-drawn tree at ${x},${y} (needs ${TREE.topRight} beside it and ${TREE.botLeft},${TREE.botRight} below)`);
    }
  }

  // 6. exits go somewhere real
  for (const exit of map.exits || []) {
    const destination = MAPS[exit.toMap];
    if (!destination) { problem(mapId, `exit ${exit.id} points at unknown map "${exit.toMap}"`); continue; }
    const t = exit.toTile;
    const destSolid = new Set(destination.solidTiles || []);
    if (!t || destination.ground[t.y] === undefined || destination.ground[t.y][t.x] === undefined) {
      problem(mapId, `exit ${exit.id} lands off the edge of ${exit.toMap}`);
    } else if (destSolid.has(destination.ground[t.y][t.x])) {
      problem(mapId, `exit ${exit.id} lands you inside a solid tile on ${exit.toMap}`);
    }
  }

  const wilds = (map.encounters || []).length;
  console.log(`   ${map.name}: ${cols}×${rows}, ${wilds} wild Fakeamon, ` +
    `${(map.buildings || []).length} building(s), ${(map.berrySpots || []).length} berry spot(s), ` +
    `${(map.exits || []).length} exit(s), ${reached.size} walkable tiles`);
}

console.log(problems === 0
  ? "\n✅ PASS — every map checks out."
  : `\n❌ FAIL — ${problems} problem(s) above.`);
process.exit(problems === 0 ? 0 : 1);
