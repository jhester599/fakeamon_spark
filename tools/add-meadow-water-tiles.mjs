// ===========================================================================
//  add-meadow-water-tiles.mjs — gives The Meadows' tileset some WATER, so the
//  boat at the end of the path has somewhere to float (M4S6 follow-up,
//  2026-08-10, Jeff & Lewis's note: "the meadows should have a small amount of
//  water near the lock symbol showing that it is the dock").
//
//  Run it from the tools/ folder (never in the browser):
//      cd tools && npm install && node add-meadow-water-tiles.mjs
//
//  THE PROBLEM: assets/tilesets/meadow.png was composed by hand at M3 prep and
//  nobody wrote down which George tiles went into it — so it can't simply be
//  rebuilt from a recipe the way lagoon.png can. It's 6×4 tiles (24 of them),
//  and only 3 were spare. A pond needs 9: four corners, four edges, and a
//  middle.
//
//  THE FIX: grow the image by ONE ROW, from 6×4 to 6×5. Tile numbers are
//  worked out as `row*6 + column`, so every existing tile 0–20 keeps exactly
//  the number it already had — nothing in src/data/maps.js shifts — and the
//  three spare slots (21, 22, 23) plus the six new ones (24–29) make the nine
//  we need, in a row:
//
//      21 water NW    22 water N     23 water NE
//      24 water W     25 open water  26 water E
//      27 water SW    28 water S     29 water SE
//
//  SAFE TO RE-RUN: it always rebuilds from the ORIGINAL top 6×4 of the file,
//  so running it twice doesn't stack extra rows.
//
//  INPUT:  ../assets/tilesets/meadow.png            (6×4 — or 6×5 if already run)
//          ../assets/tilesets/terrain_george.png    (the water blob)
//  OUTPUT: ../assets/tilesets/meadow.png            (6×5 = 96×80)
// ===========================================================================

import sharp from "sharp";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const TOOLS = dirname(fileURLToPath(import.meta.url));
const TILESETS = join(TOOLS, "..", "assets", "tilesets");
const MEADOW = join(TILESETS, "meadow.png");
const TERRAIN = join(TILESETS, "terrain_george.png");

const TILE = 16;
const COLS = 6;
const ORIGINAL_ROWS = 4; // what M3 prep hand-composed — tiles 0–23
const NEW_ROWS = 5;      // one more row, giving us tiles 24–29

// The same water blob The Lagoon uses (terrain_george.png, columns 0-2,
// rows 6-8) — a pond with a sandy shore. Reusing it means the two areas'
// water reads as the same water, which is the point: you sail from one to
// the other. The Meadows keeps George's bright original colours, though;
// only The Lagoon gets the dark "mood" pass (make-lagoon-tileset.mjs).
const WATER = [
  [0, 6], [1, 6], [2, 6],   // → tiles 21, 22, 23
  [0, 7], [1, 7], [2, 7],   // → tiles 24, 25, 26
  [0, 8], [1, 8], [2, 8],   // → tiles 27, 28, 29
];
// Where the nine water tiles go, as tile numbers.
const FIRST_WATER_TILE = 21;
// The pond's rounded outside corners are see-through, so each water tile is
// pasted on top of the tileset's own grass (tile 0) — otherwise there'd be a
// hole in the world at the water's edge.
const GRASS_TILE = 0;

const cut = (sheet, left, top) =>
  sharp(sheet).extract({ left, top, width: TILE, height: TILE }).png().toBuffer();

// Always start from the ORIGINAL 6×4 block, so re-running is harmless.
const original = await sharp(MEADOW)
  .extract({ left: 0, top: 0, width: COLS * TILE, height: ORIGINAL_ROWS * TILE })
  .png()
  .toBuffer();

const grass = await cut(original, (GRASS_TILE % COLS) * TILE, Math.floor(GRASS_TILE / COLS) * TILE);

const layers = [{ input: original, left: 0, top: 0 }];
for (let i = 0; i < WATER.length; i++) {
  const tileNumber = FIRST_WATER_TILE + i;
  const x = (tileNumber % COLS) * TILE;
  const y = Math.floor(tileNumber / COLS) * TILE;
  const [col, row] = WATER[i];
  layers.push({ input: grass, left: x, top: y });
  layers.push({ input: await cut(TERRAIN, col * TILE, row * TILE), left: x, top: y });
}

await sharp({
  create: {
    width: COLS * TILE,
    height: NEW_ROWS * TILE,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite(layers)
  .toFile(MEADOW);

console.log(`✅ ${MEADOW} is now ${COLS}×${NEW_ROWS} tiles — water is tiles ` +
  `${FIRST_WATER_TILE}–${FIRST_WATER_TILE + WATER.length - 1}.`);
console.log("   Water tiles by George_ (CC BY 3.0) — same blob The Lagoon uses.");
