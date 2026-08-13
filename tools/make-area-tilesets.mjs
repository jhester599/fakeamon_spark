// ===========================================================================
//  make-area-tilesets.mjs — builds the tilesets for THE FOREST, THE FACTORY
//  and ARTEMIS'S LAIR (M5 Steps 2–3).
//
//  Run it from the tools/ folder (never in the browser):
//      cd tools && npm install && node make-area-tilesets.mjs
//
//  This is the same idea as make-lagoon-tileset.mjs — build the file from a
//  written-down recipe so it can always be reproduced — but generalised. The
//  Lagoon proved the trick: an AREA'S WHOLE MOOD IS A HANDFUL OF NUMBERS.
//  Same George tiles, same recipe, different dial settings:
//
//      The Lagoon   dark blue and black   (a swamp at night)
//      The Forest   deep, shadowy green   (a wood so thick it's dim)
//      The Factory  grey, rusty, sickly   (nothing grows here any more)
//      The Lair     near-black and violet (purple fire — Lewis's B22)
//
//  So there's no new art to draw or licence — just three sets of numbers.
//  Change a number, re-run, and the area's whole feeling changes.
//
//  INPUT:  ../assets/tilesets/terrain_george.png     (by George_, CC BY 3.0)
//          ../assets/tilesets/vegetation_george.png  (by George_, CC BY 3.0)
//  OUTPUT: ../assets/tilesets/forest.png    (6×4 tiles = 96×64)
//          ../assets/tilesets/factory.png   (6×4 tiles = 96×64)
//          ../assets/tilesets/lair.png      (6×4 tiles = 96×64)
//
//  All are 6 tiles wide like every other area, so tile numbers still read as
//  `index = row*6 + column` in src/data/maps.js, and both share The Lagoon's
//  LEGEND exactly — which means they can share its `solidTiles` list too.
// ===========================================================================

import sharp from "sharp";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const TOOLS = dirname(fileURLToPath(import.meta.url));
const TILESETS = join(TOOLS, "..", "assets", "tilesets");
const TERRAIN = join(TILESETS, "terrain_george.png");
const VEGETATION = join(TILESETS, "vegetation_george.png");

const TILE = 16;
const OUT_COLS = 6;
const OUT_ROWS = 4;

// ---------------------------------------------------------------------------
//  THE MOOD DIALS  [TUNE] — one row per area. Every number is explained in
//  make-lagoon-tileset.mjs's long comment; the short version:
//
//    DIM      how much of the original colour survives (lower = darker)
//    TINT     how strongly the area's colour takes over (higher = moodier)
//    RAMP     the colour everything gets pushed towards
//    LIFT     a little glow added back so nothing turns pure black
//    DRAIN    how hard the "wrong" colours sink towards black
//    KEY      which colour channel counts as "belongs here" and keeps its
//             light — blue for water, green for leaves, none for the factory
//             (where nothing is alive, so everything drains equally)
// ---------------------------------------------------------------------------
const MOODS = {
  forest: {
    // A wood thick enough to block the sun: deep greens, black shadows, and
    // anything green keeps its light so the leaves still glow a little.
    DIM: 0.55, TINT: 0.62, RAMP: { r: 0.26, g: 0.80, b: 0.34 },
    LIFT: 10, DRAIN: 0.50, KEY: "g",
  },
  factory: {
    // Rust and dead ground. Nothing is alive, so nothing keeps its colour —
    // everything sinks towards the same sickly grey-brown.
    DIM: 0.45, TINT: 0.72, RAMP: { r: 0.72, g: 0.62, b: 0.52 },
    LIFT: 14, DRAIN: 0.62, KEY: "none",
  },
  lair: {
    // ARTEMIS'S LAIR (M5 Step 3) — Lewis asked for "purple fire and a throne
    // of stars" (B22), so this is the moodiest dial of the lot: almost black,
    // lit only by violet. Nothing here is alive either, so everything drains
    // together the way it does in the factory.
    DIM: 0.30, TINT: 0.86, RAMP: { r: 0.62, g: 0.24, b: 0.98 },
    LIFT: 6, DRAIN: 0.80, KEY: "none",
  },
};

// Push one image towards an area's mood. Works on raw pixels — four numbers
// per pixel (red, green, blue, and how see-through it is).
async function applyMood(pngBuffer, mood) {
  const { data, info } = await sharp(pngBuffer).ensureAlpha().raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) continue; // fully see-through — leave it alone

    const r = data[i], g = data[i + 1], b = data[i + 2];
    // Our eyes are far more sensitive to green than blue — the standard weights.
    let brightness = 0.299 * r + 0.587 * g + 0.114 * b;

    // How much does this pixel "belong" to the area? Leaves belong in a forest
    // and keep their light; grey stone doesn't and sinks. In the factory
    // nothing belongs, so everything sinks together.
    let belonging = 0;
    if (mood.KEY === "g") belonging = Math.max(0, Math.min(1, (g - Math.max(r, b)) / 255 * 3));
    else if (mood.KEY === "b") belonging = Math.max(0, Math.min(1, (b - Math.max(r, g)) / 255 * 3));
    brightness *= 1 - mood.DRAIN * (1 - belonging);

    const rampR = brightness * mood.RAMP.r + mood.LIFT * 0.6;
    const rampG = brightness * mood.RAMP.g + mood.LIFT * 0.6;
    const rampB = brightness * mood.RAMP.b + mood.LIFT * 0.6;

    const keep = mood.DIM * (1 - mood.TINT) * (1 - mood.DRAIN * (1 - belonging));
    const mix = (original, ramp) =>
      Math.max(0, Math.min(255, Math.round(original * keep + ramp * mood.TINT)));

    data[i]     = mix(r, rampR);
    data[i + 1] = mix(g, rampG);
    data[i + 2] = mix(b, rampB);
  }

  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png().toBuffer();
}

// Where things live on George's sheets, as (column, row) in tiles — measured,
// not guessed. Same coordinates make-lagoon-tileset.mjs uses.
const GRASS = [1, 1];
const PALE_GRASS = [1, 10];
const MUD = [6, 10];
const WATER = {
  nw: [0, 6], n: [1, 6], ne: [2, 6],
  w:  [0, 7], c: [1, 7], e:  [2, 7],
  sw: [0, 8], s: [1, 8], se: [2, 8],
};
const VEG = {
  treeTopLeft:  [0, 0], treeTopRight:  [1, 0],
  treeBotLeft:  [0, 1], treeBotRight:  [1, 1],
  stump:        [8, 1],
  bigRock:      [9, 1],
  smallRocks:   [2, 3],
  log:         [12, 1],
  reeds:       [12, 0],
};

// THE RECIPE — deliberately IDENTICAL to The Lagoon's, so all three areas
// share one tile legend and one `solidTiles` list in src/data/maps.js. Only
// the mood differs. (In The Forest and The Factory the "water" tiles read as
// a stream and as a chemical spill respectively — same shapes, same rule:
// you walk around them, never through.)
//
//   ⚠️ Keep in step with the TILE LEGEND comment in src/data/maps.js.
const RECIPE = [
  /*  0 */ { ground: GRASS },
  /*  1 */ { ground: PALE_GRASS },
  /*  2 */ { ground: GRASS, object: VEG.reeds },
  /*  3 */ { ground: MUD },
  /*  4 */ { ground: GRASS, object: VEG.smallRocks },
  /*  5 */ { ground: GRASS, object: VEG.stump },
  /*  6 */ { ground: WATER.nw },
  /*  7 */ { ground: WATER.n },
  /*  8 */ { ground: WATER.ne },
  /*  9 */ { ground: GRASS, object: VEG.treeTopLeft },
  /* 10 */ { ground: GRASS, object: VEG.treeTopRight },
  /* 11 */ { ground: GRASS, object: VEG.bigRock },
  /* 12 */ { ground: WATER.w },
  /* 13 */ { ground: WATER.c },
  /* 14 */ { ground: WATER.e },
  /* 15 */ { ground: GRASS, object: VEG.treeBotLeft },
  /* 16 */ { ground: GRASS, object: VEG.treeBotRight },
  /* 17 */ { ground: GRASS, object: VEG.log },
  /* 18 */ { ground: WATER.sw },
  /* 19 */ { ground: WATER.s },
  /* 20 */ { ground: WATER.se },
  /* 21 */ { ground: GRASS },
  /* 22 */ { ground: GRASS },
  /* 23 */ { ground: GRASS },
];

function cut(sheet, [col, row]) {
  return sharp(sheet)
    .extract({ left: col * TILE, top: row * TILE, width: TILE, height: TILE })
    .png()
    .toBuffer();
}

for (const [area, mood] of Object.entries(MOODS)) {
  const layers = [];
  for (let i = 0; i < RECIPE.length; i++) {
    const step = RECIPE[i];
    const x = (i % OUT_COLS) * TILE;
    const y = Math.floor(i / OUT_COLS) * TILE;
    layers.push({ input: await cut(TERRAIN, GRASS), left: x, top: y }); // backing
    layers.push({ input: await cut(TERRAIN, step.ground), left: x, top: y });
    if (step.object) {
      layers.push({ input: await cut(VEGETATION, step.object), left: x, top: y });
    }
  }

  const assembled = await sharp({
    create: {
      width: OUT_COLS * TILE, height: OUT_ROWS * TILE,
      channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  }).composite(layers).png().toBuffer();

  const out = join(TILESETS, `${area}.png`);
  await sharp(await applyMood(assembled, mood)).toFile(out);
  console.log(`✅ wrote ${out} (${OUT_COLS}×${OUT_ROWS} tiles of ${TILE}px)`);
}

console.log("   Tiles by George_ (CC BY 3.0) — every derived file is recorded in CREDITS.md.");
