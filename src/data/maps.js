// ===========================================================================
//  MAPS — the world as plain data (PLANS/M3_OVERWORLD_PLAN.md §6.1).
//  Each map is 2D arrays of numbers you can edit right here in the file —
//  change a number, refresh the browser, and the world changes. No tools
//  needed.
//
//  ✅ Loaded by index.html and drawn by the Phaser WorldScene as of M3 Step
//  S2 (2026-07-10). The `encounters` list below isn't wired to battles yet —
//  that lands at S6/S7.
//
//  TILE LEGEND for assets/tilesets/meadow.png (index = row*6 + column):
//     0 grass         1 light grass    2 white flowers
//     3 blue flowers  4 boulder        5 stump
//     6 path NW edge  7 path N edge    8 path NE edge
//     9 tree top-L   10 tree top-R    11 small rock
//    12 path W edge  13 path          14 path E edge
//    15 tree bot-L   16 tree bot-R    17 fallen log
//    18 path SW edge 19 path S edge   20 path SE edge
//    (21–23 are empty — room to grow)
//  Trees are 2×2: put 9,10 on one row and 15,16 right below them.
//
//  SOLID_TILE_INDICES below lists which tile numbers you CAN'T walk on (trees,
//  boulders, stumps, rocks, logs). The game reads this straight from the map,
//  so anything you can see as an obstacle blocks you — there's no separate
//  "blocked" grid to keep in sync (that used to drift and let you walk through
//  a couple of rocks). Add a new solid tile number here and it just works.
//  encounters: wild Fakeamon standing on the map — walking into one starts
//  the battle (M3 plan §6.3). species is a lowercase key that will match
//  the state-bag's species keys (M5 plan §1). Levels are Lewis-tweakable —
//  The Meadows is the starting area, so they're low (B4: wild level
//  depends on the area).
// ===========================================================================

// Tile numbers you can't walk onto (for the meadow tileset above):
//   4 boulder · 5 stump · 9,10,15,16 tree · 11 small rock · 17 fallen log
const SOLID_TILE_INDICES = [4, 5, 9, 10, 11, 15, 16, 17];

const MAPS = {
  theMeadows: {
    name: "The Meadows",             // first of Venta's six areas (B7/B8)
    tileSize: 16,
    tileset: "assets/tilesets/meadow.png",
    startTile: { x: 5, y: 9 },    // where the hero appears (on the path)
    ground: [
    [ 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10],
    [15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16],
    [ 9,10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,10],
    [15,16, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,15,16],
    [ 9,10, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,10],
    [15,16, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0,15,16],
    [ 9,10, 0, 0, 0, 0, 0, 1, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0,11, 0, 9,10],
    [15,16, 0,11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,15,16],
    [ 9,10, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9,10],
    [15,16,12,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,14,15,16],
    [ 9,10,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20, 9,10],
    [15,16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,15,16],
    [ 9,10, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 9,10],
    [15,16, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0,15,16],
    [ 9,10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 9,10],
    [15,16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,15,16],
    [ 9,10, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 9,10],
    [15,16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,15,16],
    [ 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10],
    [15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16],
    ],
    // M3 Step S11: the starter-species placeholders (leafick/growler/whaley —
    // an M2 stand-in, since nothing else existed yet) are swapped for The
    // Meadows' real 14-line slice of the approved 200-monster pool
    // (CONTENT_REFERENCE.md §16, VENTA_ROSTER_DRAFT.md). Levels 2-5 per the
    // draft's "wild levels 2-5 [TUNE]" — cosmetic for now (no stat growth
    // until M5), a head start for when leveling exists. Tile spots are
    // spread across the open grass, clear of trees/rocks/the path.
    encounters: [
      { id: "meadows-aardorn",      species: "aardorn",      level: 2, tileX: 4,  tileY: 2  },
      { id: "meadows-capiti",       species: "capiti",       level: 2, tileX: 9,  tileY: 3  },
      { id: "meadows-chickadee",    species: "chickadee",    level: 2, tileX: 14, tileY: 2  },
      { id: "meadows-hatchling",    species: "hatchling",    level: 2, tileX: 19, tileY: 3  },
      { id: "meadows-pairagrin",    species: "pairagrin",    level: 3, tileX: 24, tileY: 2  },
      { id: "meadows-chenipode",    species: "chenipode",    level: 3, tileX: 6,  tileY: 6  },
      { id: "meadows-snaki",        species: "snaki",        level: 3, tileX: 21, tileY: 6  },
      { id: "meadows-marvillar",    species: "marvillar",    level: 3, tileX: 9,  tileY: 14 },
      { id: "meadows-baoby",        species: "baoby",        level: 4, tileX: 24, tileY: 13 },
      { id: "meadows-dandicub",     species: "dandicub",     level: 4, tileX: 5,  tileY: 16 },
      { id: "meadows-lambert",      species: "lambert",      level: 4, tileX: 14, tileY: 17 },
      { id: "meadows-shybulb",      species: "shybulb",      level: 4, tileX: 19, tileY: 11 },
      { id: "meadows-tumbleworm",   species: "tumbleworm",   level: 5, tileX: 9,  tileY: 17 },
      { id: "meadows-pantherafira", species: "pantherafira", level: 5, tileX: 24, tileY: 16 }, // "the Meadows' one scary line" — VENTA_ROSTER_DRAFT.md
    ],
    // M4S2: special tiles you bump to open a panel (heal/shop/cook), the same
    // "walk into it" trick as encounters (src/world/config.js's spawnBuildings).
    // spawnTile is where the hero wakes up after a whole-team faint — one tile
    // in front of the building, facing it (src/main.js's homeBaseTile()).
    // Art: assets/sprites/buildings/fakeatent.png (Jeff's own AI-generated
    // sprite — CREDITS.md) via BUILDING_ART in src/world/config.js.
    buildings: [
      { id: "meadows-fakeatent", kind: "fakeatent", tileX: 5, tileY: 7,
        spawnTile: { x: 5, y: 8, facing: "up" } },
      // M4S3: the Tall Tower — a shop, no spawnTile (only the Fakeatent is a
      // home base). Sits a few tiles right of the tent, same row, so both
      // buildings read as one little "town row" north of the path.
      { id: "meadows-talltower", kind: "talltower", tileX: 10, tileY: 7 },
    ],
    exits: [],                       // M4: doorways to the other five areas
  },
};
