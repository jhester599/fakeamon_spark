// ===========================================================================
//  make-lagoon-tileset.mjs — builds assets/tilesets/lagoon.png (M4S6).
//
//  Run it from the tools/ folder (never in the browser):
//      cd tools && npm install && node make-lagoon-tileset.mjs
//
//  WHY THIS EXISTS: The Meadows' tileset (assets/tilesets/meadow.png) was
//  composed by hand back at M3 prep, and nobody wrote down *which* tiles it
//  took from George's sheets. That was fine for one map — it stops being fine
//  the moment there's a second area. So The Lagoon's tileset is built by this
//  script instead: the recipe below IS the documentation, and re-running it
//  reproduces the file exactly.
//
//  INPUT:  ../assets/tilesets/terrain_george.png     (15×24 tiles of 16px)
//          ../assets/tilesets/vegetation_george.png  (15×4  tiles of 16px)
//          Both by George_, CC BY 3.0 — see CREDITS.md.
//  OUTPUT: ../assets/tilesets/lagoon.png             (6×4 tiles = 96×64)
//
//  The output is 6 tiles wide, exactly like meadow.png, so the tile numbers in
//  src/data/maps.js still read as `index = row*6 + column`. The LEGEND is
//  different though — The Lagoon has water where The Meadows has a path — so
//  each map now carries its own `solidTiles` list (src/data/maps.js).
//
//  Vegetation tiles (trees, rocks, logs) are drawn on TRANSPARENT backgrounds,
//  so every one of them gets pasted on top of a grass tile first. The water
//  tiles are a 3×3 "autotile" blob: nine tiles that fit together into a pond of
//  any size — corners, edges, and a middle that repeats.
// ===========================================================================

import sharp from "sharp";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const TOOLS = dirname(fileURLToPath(import.meta.url));
const TILESETS = join(TOOLS, "..", "assets", "tilesets");
const TERRAIN = join(TILESETS, "terrain_george.png");
const VEGETATION = join(TILESETS, "vegetation_george.png");
const OUT = join(TILESETS, "lagoon.png");

const TILE = 16;          // every tile in every sheet is 16×16
const OUT_COLS = 6;       // same width as meadow.png, so index = row*6 + column
const OUT_ROWS = 4;

// ---------------------------------------------------------------------------
//  THE MOOD DIAL  [TUNE] — what makes The Lagoon feel different from The
//  Meadows. George's tiles are bright and cheerful, which is exactly right for
//  a starting meadow and exactly wrong for a swamp. So after the tiles are
//  assembled, every pixel is pushed towards DARK BLUE AND BLACK (Jeff &
//  Lewis's call, 2026-08-10).
//
//  How it works, in one sentence: we work out how bright each pixel is, look
//  that brightness up on a dark-blue ramp, and then mix that ramp colour with
//  a dimmed version of the original — so shapes and edges stay readable, but
//  the greens go night-time blue instead of grass green.
//
//  There's one extra trick. If we just darkened everything evenly, the grass
//  (which starts off BRIGHTER than the water) would stay brighter than the
//  water — and a lagoon where the water is the darkest thing on screen doesn't
//  read as water at all. So the rule is: THE BLUER A PIXEL ALREADY IS, THE
//  MORE LIGHT IT KEEPS. Water stays lit; grass, mud, sand and stone all sink
//  towards black. Result: near-black banks with the water glowing in the
//  middle, which is what a swamp at night actually looks like.
//
//  Play with these numbers and re-run the script:
//    DIM          how much of the original colour survives (lower = darker)
//    BLUENESS     how strongly it's dragged onto the blue ramp (0 = no
//                 recolour, 1 = everything goes blue/black whatever it was)
//    RAMP         the colour of "fully lit" — the blue everything heads for
//    LIFT         a little glow in the darkest pixels so black isn't flat
//    LAND_TO_BLACK  how far the NON-blue things (grass, mud, stone) sink
//                 towards black (0 = none, 1 = completely black)
// ---------------------------------------------------------------------------
const MOOD = {
  DIM: 0.50,
  BLUENESS: 0.70,
  RAMP: { r: 0.30, g: 0.42, b: 0.88 },
  LIFT: 8,
  LAND_TO_BLACK: 0.66,
};

// Push one image towards the MOOD palette above. Works on raw pixels — four
// numbers per pixel (red, green, blue, and how see-through it is) — because
// that's the most honest way to explain "make it darker and bluer".
async function applyMood(pngBuffer) {
  const { data, info } = await sharp(pngBuffer).ensureAlpha().raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) continue; // fully see-through — leave it alone

    const r = data[i], g = data[i + 1], b = data[i + 2];
    // How bright is this pixel? (The weights are the standard ones — our eyes
    // are much more sensitive to green than to blue.)
    let brightness = 0.299 * r + 0.587 * g + 0.114 * b;

    // How BLUE is it, from 0 (not at all) to 1 (very)? Water scores high;
    // grass, mud, sand and grey stone all score zero. Everything that isn't
    // blue sinks towards black, so the water ends up the brightest thing left.
    const blueness = Math.max(0, Math.min(1, (b - Math.max(r, g)) / 255 * 3));
    brightness *= 1 - MOOD.LAND_TO_BLACK * (1 - blueness);

    // Where that brightness lands on the dark-blue ramp.
    const rampR = brightness * MOOD.RAMP.r + MOOD.LIFT * 0.4;
    const rampG = brightness * MOOD.RAMP.g + MOOD.LIFT * 0.6;
    const rampB = brightness * MOOD.RAMP.b + MOOD.LIFT;

    // Mix the ramp with a dimmed version of the original colour. The non-blue
    // pixels get their original colour dimmed too, or the grass would keep a
    // green tinge no matter how dark we made it.
    const keep = MOOD.DIM * (1 - MOOD.BLUENESS) * (1 - MOOD.LAND_TO_BLACK * (1 - blueness));
    const mix = (original, ramp) =>
      Math.max(0, Math.min(255, Math.round(original * keep + ramp * MOOD.BLUENESS)));

    data[i]     = mix(r, rampR);
    data[i + 1] = mix(g, rampG);
    data[i + 2] = mix(b, rampB);
  }

  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png().toBuffer();
}

// Where things live on George's sheets, as (column, row) in tiles.
// terrain_george.png is a grid of 3×3 "blobs", one material per blob:
//   grass    at columns 0-2, rows 0-2      (middle tile = plain grass)
//   water    at columns 0-2, rows 6-8      (a pond with a sandy shore)
//   pale grass at columns 0-2, rows 9-11
//   sand/mud at columns 6-8, rows 9-11
//
// ⚠️ Each blob is drawn as a ROUNDED shape inside its 3×3 cell, so the "middle"
// tile is the only one guaranteed to be fully opaque — picking a neighbour by
// mistake gets you a tile that's half see-through. Measured, not guessed.
const GRASS = [1, 1];        // plain swamp grass — also the backing for EVERY tile
const PALE_GRASS = [1, 10];
const MUD = [6, 10];
// The water blob, read left-to-right, top-to-bottom.
const WATER = {
  nw: [0, 6], n: [1, 6], ne: [2, 6],
  w:  [0, 7], c: [1, 7], e:  [2, 7],
  sw: [0, 8], s: [1, 8], se: [2, 8],
};
// vegetation_george.png — objects to paste ON TOP of a ground tile.
const VEG = {
  treeTopLeft:  [0, 0], treeTopRight:  [1, 0],
  treeBotLeft:  [0, 1], treeBotRight:  [1, 1],
  stump:        [8, 1],
  bigRock:      [9, 1],
  smallRocks:   [2, 3],
  log:         [12, 1],
  reeds:       [12, 0],
};

// THE RECIPE — one entry per output tile, in order (index 0 … 23). `ground` is
// the tile taken from terrain_george.png; `object` (optional) is pasted on top
// of it from vegetation_george.png. Change a line here, re-run, and The
// Lagoon looks different.
//
// EVERY tile is pasted onto plain grass first. The water tiles need it (a
// pond's rounded corners are see-through at the outside, and we want grass
// showing there, not a hole in the world), and so do the tree/rock/log
// objects. For the ground tiles that are already opaque it changes nothing.
//
//   ⚠️ Keep this list in step with the TILE LEGEND comment in src/data/maps.js
//   and with theLagoon's `solidTiles` — they describe the same 24 tiles.
const RECIPE = [
  /*  0 */ { ground: GRASS },                              // swamp grass — walkable
  /*  1 */ { ground: PALE_GRASS },                          // pale grass — walkable
  /*  2 */ { ground: GRASS, object: VEG.reeds },            // reeds — walkable decoration
  /*  3 */ { ground: MUD },                                 // muddy shore — walkable
  /*  4 */ { ground: GRASS, object: VEG.smallRocks },       // rocks — SOLID
  /*  5 */ { ground: GRASS, object: VEG.stump },            // stump — SOLID
  /*  6 */ { ground: WATER.nw },                            // water, top-left corner — SOLID
  /*  7 */ { ground: WATER.n },                             // water, top edge — SOLID
  /*  8 */ { ground: WATER.ne },                            // water, top-right corner — SOLID
  /*  9 */ { ground: GRASS, object: VEG.treeTopLeft },      // tree top-left — SOLID
  /* 10 */ { ground: GRASS, object: VEG.treeTopRight },     // tree top-right — SOLID
  /* 11 */ { ground: GRASS, object: VEG.bigRock },          // boulder — SOLID
  /* 12 */ { ground: WATER.w },                             // water, left edge — SOLID
  /* 13 */ { ground: WATER.c },                             // open water — SOLID
  /* 14 */ { ground: WATER.e },                             // water, right edge — SOLID
  /* 15 */ { ground: GRASS, object: VEG.treeBotLeft },      // tree bottom-left — SOLID
  /* 16 */ { ground: GRASS, object: VEG.treeBotRight },     // tree bottom-right — SOLID
  /* 17 */ { ground: GRASS, object: VEG.log },              // fallen log — SOLID
  /* 18 */ { ground: WATER.sw },                            // water, bottom-left corner — SOLID
  /* 19 */ { ground: WATER.s },                             // water, bottom edge — SOLID
  /* 20 */ { ground: WATER.se },                            // water, bottom-right corner — SOLID
  /* 21 */ { ground: GRASS },                               // spare — room to grow
  /* 22 */ { ground: GRASS },                               // spare
  /* 23 */ { ground: GRASS },                               // spare
];

// Cut one 16×16 tile out of a sheet, given its (column, row).
function cut(sheet, [col, row]) {
  return sharp(sheet)
    .extract({ left: col * TILE, top: row * TILE, width: TILE, height: TILE })
    .png()
    .toBuffer();
}

const layers = [];
for (let i = 0; i < RECIPE.length; i++) {
  const step = RECIPE[i];
  const x = (i % OUT_COLS) * TILE;
  const y = Math.floor(i / OUT_COLS) * TILE;

  layers.push({ input: await cut(TERRAIN, GRASS), left: x, top: y });
  layers.push({ input: await cut(TERRAIN, step.ground), left: x, top: y });
  if (step.object) {
    layers.push({ input: await cut(VEGETATION, step.object), left: x, top: y });
  }
}

const assembled = await sharp({
  create: {
    width: OUT_COLS * TILE,
    height: OUT_ROWS * TILE,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite(layers)
  .png()
  .toBuffer();

// The last step: drag the whole thing into night-time blues (see MOOD above).
await sharp(await applyMood(assembled)).toFile(OUT);

console.log(`✅ wrote ${OUT} (${OUT_COLS}×${OUT_ROWS} tiles of ${TILE}px)`);
console.log("   Tiles by George_ (CC BY 3.0) — record the derived file in CREDITS.md.");
