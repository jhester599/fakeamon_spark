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
//  M4S6 (2026-08-10): there are now TWO maps — The Meadows and The Lagoon —
//  and you sail between them by bumping the boat listed in each map's `exits`.
//  Every map carries its own tile legend, its own `solidTiles` list, and its
//  own creatures/buildings/berries, so adding a third area is "copy an entry,
//  change the numbers."
//
//  TILE LEGEND for assets/tilesets/meadow.png (index = row*6 + column):
//     0 grass         1 light grass    2 white flowers
//     3 blue flowers  4 boulder        5 stump
//     6 path NW edge  7 path N edge    8 path NE edge
//     9 tree top-L   10 tree top-R    11 small rock
//    12 path W edge  13 path          14 path E edge
//    15 tree bot-L   16 tree bot-R    17 fallen log
//    18 path SW edge 19 path S edge   20 path SE edge
//    21 water NW     22 water N       23 water NE
//    24 water W      25 open water    26 water E
//    27 water SW     28 water S       29 water SE
//  Trees are 2×2: put 9,10 on one row and 15,16 right below them.
//  The nine WATER tiles (21–29) were added at M4S6 by
//  tools/add-meadow-water-tiles.mjs, which grew meadow.png from 6×4 tiles to
//  6×5 without moving any existing tile number. They make the little inlet at
//  the east end of the path, so the boat you sail to The Lagoon from is
//  actually sitting on water. They tile together into a pond of any size:
//  corners at the corners, edges along the sides, 25 repeated in the middle.
//
//  Each map's `solidTiles` lists which tile numbers you CAN'T walk on (trees,
//  boulders, stumps, rocks, logs — and, in The Lagoon, water). The game reads
//  this straight from the map, so anything you can see as an obstacle blocks
//  you — there's no separate "blocked" grid to keep in sync (that used to drift
//  and let you walk through a couple of rocks). Add a new solid tile number to
//  a map's list and it just works.
//  encounters: wild Fakeamon standing on the map — walking into one starts
//  the battle (M3 plan §6.3). species is a lowercase key that will match
//  the state-bag's species keys (M5 plan §1). Levels are Lewis-tweakable —
//  The Meadows is the starting area, so they're low (B4: wild level
//  depends on the area).
//
//  ⚠️ Every map must be 30×20 tiles of 16px, because that's the size of the
//  Phaser canvas (WORLD_TILES_WIDE/TALL in src/world/config.js). A bigger map
//  would need a scrolling camera, which we haven't built.
// ===========================================================================

// Tile numbers you can't walk onto in THE MEADOWS (the meadow tileset above):
//   4 boulder · 5 stump · 9,10,15,16 tree · 11 small rock · 17 fallen log
//   21–29 water (M4S6) — you can't swim in either area, only sail
// Kept as a named constant because it's also the fallback for any map that
// forgets to list its own.
const SOLID_TILE_INDICES = [4, 5, 9, 10, 11, 15, 16, 17, 21, 22, 23, 24, 25, 26, 27, 28, 29];

// Tile numbers you can't walk onto in THE LAGOON (assets/tilesets/lagoon.png —
// a different tileset, so a different list). That's everything except grass,
// pale grass, reeds and mud: the trees/rocks/stumps/logs, AND all nine water
// tiles. You can't swim in Fakeamon — the lagoon is scenery you walk around.
const LAGOON_SOLID_TILE_INDICES = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const MAPS = {
  theMeadows: {
    name: "The Meadows",             // first of Venta's six areas (B7/B8)
    tileSize: 16,
    tileset: "assets/tilesets/meadow.png",
    solidTiles: SOLID_TILE_INDICES,  // what blocks you here (see the legend above)
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
    [ 9,10, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8,21,22],
    [15,16,12,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,14,24,25],
    [ 9,10,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,24,25],
    [15,16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,27,28],
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
      // M4S4: the Gym — Enforcer Boss and the Gear Badge. Third along the same
      // town row. `gymId` points at an entry in src/data/gyms.js, which is what
      // makes adding Gym 2 later just "another building + another gym entry".
      { id: "meadows-gym1", kind: "gym", gymId: "gym1", tileX: 15, tileY: 7 },
      // M4S5: the Cooking Cabin — turn two berries into a healing dish. Last
      // along the town row. It sits at 24 rather than the "obvious" 20 because
      // the cabin sprite is 3 tiles wide and would have covered the wild
      // Fakeamon standing at (21,6).
      { id: "meadows-cabin", kind: "cabin", tileX: 24, tileY: 7 },
    ],
    // M4S5: berry patches. These are the SPOTS where a berry can grow — which
    // berry actually appears is rolled from src/data/berries.js's weights each
    // time one grows back, so a spot isn't tied to one kind of berry. Walk over
    // a berry to pick it up (no bumping — berries don't block you).
    // Move a spot by editing its numbers; add one by copying a line.
    // All six are on open grass, clear of the path, the buildings, and every
    // wild Fakeamon.
    berrySpots: [
      { id: "meadows-berry-1", tileX: 3,  tileY: 4  },
      { id: "meadows-berry-2", tileX: 12, tileY: 4  },
      { id: "meadows-berry-3", tileX: 22, tileY: 3  },
      { id: "meadows-berry-4", tileX: 4,  tileY: 12 },
      { id: "meadows-berry-5", tileX: 13, tileY: 13 },
      { id: "meadows-berry-6", tileX: 22, tileY: 15 },
    ],
    // M4S6: doorways to other areas. You BUMP an exit (like a building) rather
    // than walk onto it, so arriving somewhere can never bounce you straight
    // back. `toTile` is where you land on the other map, and `facing` is which
    // way you're looking when you get there.
    //
    // An exit is LOCKED until its destination is in gameState.flags.unlockedAreas
    // — which is what a gym badge pushes there (src/main.js's awardGymPrize).
    // Nothing else marks it locked: the one list IS the gate.
    exits: [
      // M5 Step 2: a path west into The Forest. No badge needed — it's the
      // wood next door to the starting field, and it's where Banvengeance
      // lives. (Bumped like the boat, so the landing tile can't bounce you
      // straight back.)
      { id: "meadows-forest-path", kind: "path", tileX: 2, tileY: 4,
        toMap: "theForest", toTile: { x: 3, y: 9, facing: "right" } },
      { id: "meadows-boat", kind: "boat", tileX: 27, tileY: 9,
        toMap: "theLagoon", toTile: { x: 3, y: 9, facing: "right" } },
    ],
  },

  // =========================================================================
  //  THE LAGOON (M4S6) — the swamp that the Gear Badge opens up. Sail here
  //  from the boat at the east end of The Meadows' path.
  //
  //  TILE LEGEND for assets/tilesets/lagoon.png (index = row*6 + column).
  //  ⚠️ DIFFERENT numbers from The Meadows! Same 6-wide layout, different
  //  pictures — that tileset is built by tools/make-lagoon-tileset.mjs, and
  //  that script's RECIPE list is the other half of this legend.
  //     0 swamp grass   1 pale grass     2 reeds
  //     3 muddy shore   4 rocks          5 stump
  //     6 water NW     7 water N         8 water NE
  //     9 tree top-L  10 tree top-R     11 boulder
  //    12 water W     13 open water     14 water E
  //    15 tree bot-L  16 tree bot-R     17 fallen log
  //    18 water SW    19 water S        20 water SE
  //    (21–23 are spare — room to grow)
  //  The nine water tiles fit together into a pond of any size: corners at the
  //  four corners, edges along the sides, and 13 repeated in the middle. They
  //  make TWO bodies of water here: the lagoon itself in the middle of the map,
  //  and a narrow inlet running off the map's WEST edge where the boat home is
  //  moored — the mirror of The Meadows' dock on its east edge.
  //
  //  ⚠️ The Lagoon's tileset is DARK — dark blue and black (Jeff & Lewis's
  //  call). That's not a different set of tiles, it's the same George tiles put
  //  through a "mood" pass at the end of tools/make-lagoon-tileset.mjs. If the
  //  swamp ever wants to be brighter or gloomier, that script's MOOD block is
  //  the dial, not this file.
  // =========================================================================
  theLagoon: {
    name: "The Lagoon",              // opened by the Gear Badge (B14 / DECISIONS.md #27)
    tileSize: 16,
    tileset: "assets/tilesets/lagoon.png",
    solidTiles: LAGOON_SOLID_TILE_INDICES, // water is solid here — see the note above
    // Only used if something ever drops you here with no saved position; the
    // normal way in is the boat, which lands you at its own toTile.
    startTile: { x: 3, y: 9 },
    ground: [
    [ 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10],
    [15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16],
    [ 9,10, 0, 0, 0, 9,10, 0, 0, 0, 0, 0, 0, 1, 0, 0,17, 0, 0, 1, 0, 0, 0, 0, 9,10, 0, 0, 9,10],
    [15,16, 0, 0, 0,15,16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,15,16, 0, 0,15,16],
    [ 9,10, 1, 0, 0, 0, 0, 4, 0, 0, 2, 0, 3, 3, 0, 0, 2, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 0, 9,10],
    [15,16, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 0, 0, 0, 0, 1,15,16],
    [ 9,10, 0, 0, 0, 0, 0, 0, 3, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 3, 0, 0, 0, 0, 9,10],
    [15,16, 3, 0, 0, 0, 0, 0, 0,12,13,13,13,13,13,13,13,13,13,13,13,13,14, 3, 3, 0, 5, 0,15,16],
    [ 7, 8, 3, 0, 0, 0, 0, 3, 3,12,13,13,13,13,13,13,13,13,13,13,13,13,14, 0, 0, 0, 0, 0, 9,10],
    [13,14, 3, 0, 0, 0, 0, 0, 3,12,13,13,13,13,13,13,13,13,13,13,13,13,14, 3, 2, 0, 0, 0,15,16],
    [13,14, 3, 0, 0, 0, 0, 2, 3,12,13,13,13,13,13,13,13,13,13,13,13,13,14, 3, 0, 0, 0, 0, 9,10],
    [19,20, 3, 0, 0, 0, 0, 3, 3,12,13,13,13,13,13,13,13,13,13,13,13,13,14, 3, 3, 0, 0, 0,15,16],
    [ 9,10, 3, 1, 0, 0, 0, 0, 0,12,13,13,13,13,13,13,13,13,13,13,13,13,14, 3, 3, 0, 0, 0, 9,10],
    [15,16, 0, 0, 0, 0, 0, 0, 3,18,19,19,19,19,19,19,19,19,19,19,19,19,20, 3, 4, 0, 0, 0,15,16],
    [ 9,10, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 0, 3, 0, 0, 0, 0, 0, 9,10],
    [15,16, 0, 9,10, 0, 0, 0, 0, 0, 0, 3, 2, 0, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 0, 9,10, 0,15,16],
    [ 9,10, 0,15,16, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,15,16, 0, 9,10],
    [15,16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,15,16],
    [ 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10],
    [15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16],
    ],
    // [TUNE] ⚠️ These levels were 10–15 while `level` changed no stats. M5 Step 1
    // (2026-08-13) turned levels into real stats and re-levelled them to 8–12
    // (Jeff & Lewis's call). Why: you sail in here around level 8–10 straight
    // after Gym 1, and a 400-fight simulation said a two-level deficit is very
    // nearly an automatic loss — so at 10–15 most of this area was a locked
    // door, not a challenge. At 8–12 you arrive able to fight most of it, with
    // the far side still a stretch. They still climb as you go deeper round
    // the water (the order below follows the path anticlockwise).
    encounters: [
      { id: "lagoon-axolightl",       species: "axolightl",       level: 8,  tileX: 10, tileY: 3  },
      { id: "lagoon-claymorior",      species: "claymorior",      level: 8,  tileX: 14, tileY: 3  },
      { id: "lagoon-fluoresfin",      species: "fluoresfin",      level: 9,  tileX: 18, tileY: 3  },
      { id: "lagoon-gupphish",        species: "gupphish",        level: 9,  tileX: 22, tileY: 3  },
      { id: "lagoon-jelillow",        species: "jelillow",        level: 10, tileX: 25, tileY: 6  },
      { id: "lagoon-kroki",           species: "kroki",           level: 11, tileX: 25, tileY: 10 },
      { id: "lagoon-lesmagu",         species: "lesmagu",         level: 10, tileX: 22, tileY: 15 },
      { id: "lagoon-nebufin",         species: "nebufin",         level: 11, tileX: 18, tileY: 16 },
      { id: "lagoon-nostray",         species: "nostray",         level: 12, tileX: 14, tileY: 16 },
      { id: "lagoon-nudiflot_female", species: "nudiflot_female", level: 12, tileX: 10, tileY: 15 },
      { id: "lagoon-nudiflot_male",   species: "nudiflot_male",   level: 12, tileX: 6,  tileY: 12 },
      { id: "lagoon-skwib",           species: "skwib",           level: 12, tileX: 5,  tileY: 8  },

      // ---- MINI-BOSSES (M5 Step 2) ----
      // Three of the five live here — Lewis put all the Water-type ones in the
      // swamp (DESIGN.md §8, homework B9). They stand on the map like any other
      // wild Fakeamon and you bump into them the same way; `bossId` is what
      // makes the fight different (src/main.js reads src/data/bosses.js for the
      // level, the entrance line and the reward). Beat one and it is gone for
      // good — mini-bosses never respawn.
      { id: "lagoon-boss-saurchin",  bossId: "saurchin",  species: "saurchin",  level: 20, tileX: 5,  tileY: 12 },
      { id: "lagoon-boss-sharpfin",  bossId: "sharpfin",  species: "sharpfin",  level: 16, tileX: 14, tileY: 17 },
      { id: "lagoon-boss-tobishimi", bossId: "tobishimi", species: "tobishimi", level: 19, tileX: 20, tileY: 2  },
    ],
    // Just a Fakeatent for now, so fainting out here heals you HERE instead of
    // shipping you all the way back to The Meadows (src/main.js's homeBaseTile).
    // A shop/gym/cabin would be one more line each — the same seam, a fifth time.
    buildings: [
      { id: "lagoon-fakeatent", kind: "fakeatent", tileX: 4, tileY: 5,
        spawnTile: { x: 4, y: 6, facing: "up" } },
    ],
    // Berries grow here too. Which ones is rolled from the same weights as
    // everywhere else (src/data/berries.js) — DECISIONS.md #75: every area
    // grows every berry, only the odds differ.
    berrySpots: [
      { id: "lagoon-berry-1", tileX: 3,  tileY: 7  },
      { id: "lagoon-berry-2", tileX: 6,  tileY: 4  },
      { id: "lagoon-berry-3", tileX: 12, tileY: 4  },
      { id: "lagoon-berry-4", tileX: 20, tileY: 4  },
      { id: "lagoon-berry-5", tileX: 26, tileY: 12 },
      { id: "lagoon-berry-6", tileX: 16, tileY: 15 },
    ],
    // The boat home, tied up at the water on the FAR WEST edge — the mirror
    // image of The Meadows' dock on its far east, so the two ends of the
    // crossing line up (Jeff & Lewis's call, DECISIONS.md #80). No lock on this
    // one: you can always get back to The Meadows.
    exits: [
      { id: "lagoon-boat", kind: "boat", tileX: 2, tileY: 9,
        toMap: "theMeadows", toTile: { x: 26, y: 9, facing: "left" } },
      // M5 Step 2: a second boat, moored on the far side of the swamp, carries
      // you on to The Factory — where the fifth mini-boss lives. You needed the
      // Gear Badge to reach The Lagoon at all, so that badge still gates this.
      { id: "lagoon-boat-factory", kind: "boat", tileX: 26, tileY: 14,
        toMap: "theFactory", toTile: { x: 25, y: 8, facing: "left" } },
    ],
  },
  // =========================================================================
  //  THE FOREST (M5 Step 2) — Banvengeance's turf (DESIGN.md §8, Lewis's B9).
  //  Reached on foot from the west side of The Meadows, so it's open from the
  //  very start: a dark wood right next door to the friendly starting field.
  //  Its tileset is the SAME George tiles as everywhere else, run through the
  //  "forest" mood dial in tools/make-area-tilesets.mjs — deep greens and black
  //  shadows. Same tile legend as The Lagoon, so it shares its solidTiles list
  //  (the water tiles read as a woodland pool here; you still walk around it).
  // =========================================================================
  theForest: {
    name: "The Forest",
    tileSize: 16,
    tileset: "assets/tilesets/forest.png",
    solidTiles: LAGOON_SOLID_TILE_INDICES,
    startTile: { x: 3, y: 9 },
    ground: [
    [ 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10],
    [15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16],
    [ 9,10, 2, 0, 0, 0, 0, 0, 4, 0, 2, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 9,10],
    [15,16, 0, 3, 0, 0, 0, 0, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 1, 0, 0, 2,15,16],
    [ 9,10, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 2, 9,10],
    [15,16, 0, 0, 0, 0, 1, 3, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,15,16],
    [ 9,10, 2, 0, 0, 0, 0, 0, 0, 1, 0, 4, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 9,10],
    [15,16, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,15,16],
    [ 9,10, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 0,17, 0, 0, 4, 0, 1, 4, 0, 0, 1, 0, 4, 0, 0, 0, 9,10],
    [15,16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 4, 0, 2, 0, 3, 0, 0,15,16],
    [ 9,10, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,10],
    [15,16, 0, 0,17, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 0, 0, 4, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,15,16],
    [ 9,10,17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 0, 6, 7, 7, 7, 7, 8, 0, 0, 9,10],
    [15,16, 0, 0, 1, 2, 0, 4, 0, 1, 4, 0, 0, 5, 0, 0, 4, 0, 0, 0,12,13,13,13,13,14, 0, 0,15,16],
    [ 9,10, 0, 0, 0, 0, 0, 0, 4, 0, 1, 0, 0,17, 0, 0, 0, 2, 1, 0,12,13,13,13,13,14, 0, 1, 9,10],
    [15,16, 0, 0, 0, 4, 0, 1, 0, 0, 3, 0, 0,17, 0, 0, 0, 0, 0, 0,18,19,19,19,19,20, 0, 3,15,16],
    [ 9,10, 2, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 4, 0, 0, 0, 0, 0, 5, 9,10],
    [15,16, 0, 0, 1, 3, 4, 0, 0, 3, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,15,16],
    [ 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10],
    [15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16],
    ],
    encounters: [
      { id: "forest-anoleaf", species: "anoleaf", level: 10, tileX: 5, tileY: 5 },
      { id: "forest-babysnitch", species: "babysnitch", level: 11, tileX: 10, tileY: 5 },
      { id: "forest-burrlock", species: "burrlock", level: 11, tileX: 15, tileY: 5 },
      { id: "forest-chloragon", species: "chloragon", level: 12, tileX: 20, tileY: 5 },
      { id: "forest-duggot", species: "duggot", level: 12, tileX: 25, tileY: 5 },
      { id: "forest-flounce", species: "flounce", level: 13, tileX: 5, tileY: 10 },
      { id: "forest-foxfire", species: "foxfire", level: 13, tileX: 10, tileY: 10 },
      { id: "forest-scarlant", species: "scarlant", level: 14, tileX: 15, tileY: 9 },
      { id: "forest-boss-banvengeance", bossId: "banvengeance", species: "banvengeance", level: 18, tileX: 20, tileY: 10 },
    ],
    buildings: [
      { id: "forest-fakeatent", kind: "fakeatent", tileX: 25, tileY: 10,
        spawnTile: { x: 25, y: 11, facing: "up" } },
    ],
    berrySpots: [
      { id: "forest-berry-1", tileX: 5, tileY: 14 },
      { id: "forest-berry-2", tileX: 10, tileY: 15 },
      { id: "forest-berry-3", tileX: 15, tileY: 15 },
      { id: "forest-berry-4", tileX: 19, tileY: 15 },
      { id: "forest-berry-5", tileX: 26, tileY: 15 },
    ],
    exits: [
      { id: "forest-path", kind: "path", tileX: 2, tileY: 9,
        toMap: "theMeadows", toTile: { x: 3, y: 4, facing: "right" } },
    ],
  },

  // =========================================================================
  //  THE FACTORY (M5 Step 2) — Gastronium's turf (DESIGN.md §8, Lewis's B9).
  //  Reached by boat from the east side of The Lagoon, which means the Gear
  //  Badge still gates it in practice: you can't get here without going
  //  through The Lagoon first. Rust and dead ground — the same George tiles
  //  put through the "factory" mood dial, where nothing is alive so nothing
  //  keeps its colour. The water tiles read as a chemical spill.
  // =========================================================================
  theFactory: {
    name: "The Factory",
    tileSize: 16,
    tileset: "assets/tilesets/factory.png",
    solidTiles: LAGOON_SOLID_TILE_INDICES,
    startTile: { x: 26, y: 9 },
    ground: [
    [ 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10],
    [15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16],
    [ 9,10, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 0, 2, 0, 0, 9,10],
    [15,16, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 5, 0, 4, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0,15,16],
    [ 9,10, 0, 0, 0, 0, 6, 7, 7, 7, 7, 8, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 9,10],
    [15,16, 0, 0, 2, 0,12,13,13,13,13,14, 0, 0, 0, 3, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,15,16],
    [ 9,10, 0, 4, 5, 0,12,13,13,13,13,14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,10],
    [15,16, 1, 4, 0, 0,18,19,19,19,19,20, 1, 5, 1, 2, 0,17, 1, 5, 0, 0, 0, 3, 0, 0,17, 0,15,16],
    [ 9,10, 0, 0, 0, 0, 1,17, 0, 0, 1, 1, 1, 0, 0, 0, 3, 2, 0, 0, 2, 0, 0, 0, 0, 0, 4, 0, 9,10],
    [15,16, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,17, 0, 0, 0, 0, 2, 0, 4,15,16],
    [ 9,10, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 9,10],
    [15,16, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 4, 3, 0, 0,15,16],
    [ 9,10, 0, 0, 2, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,10],
    [15,16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 4, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0,15,16],
    [ 9,10, 0, 1, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0,17, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,10],
    [15,16, 0, 0, 0, 0, 0, 0, 0,17, 0, 1, 0, 0, 0, 5, 0, 0, 0, 2, 1, 0, 0, 2, 0, 0, 5, 0,15,16],
    [ 9,10, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 9,10],
    [15,16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 5, 0, 1, 0, 2, 0, 0, 5, 0,15,16],
    [ 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10],
    [15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16],
    ],
    encounters: [
      { id: "factory-boltnu", species: "boltnu", level: 14, tileX: 5, tileY: 5 },
      { id: "factory-cataspike", species: "cataspike", level: 15, tileX: 12, tileY: 5 },
      { id: "factory-pythwire", species: "pythwire", level: 15, tileX: 15, tileY: 5 },
      { id: "factory-embra", species: "embra", level: 16, tileX: 20, tileY: 5 },
      { id: "factory-grimachin", species: "grimachin", level: 16, tileX: 25, tileY: 5 },
      { id: "factory-virware", species: "virware", level: 17, tileX: 5, tileY: 10 },
      { id: "factory-ignibus", species: "ignibus", level: 17, tileX: 10, tileY: 10 },
      { id: "factory-nut", species: "nut", level: 18, tileX: 15, tileY: 10 },
      { id: "factory-boss-gastronium", bossId: "gastronium", species: "gastronium", level: 19, tileX: 20, tileY: 10 },
    ],
    buildings: [
      { id: "factory-fakeatent", kind: "fakeatent", tileX: 25, tileY: 10,
        spawnTile: { x: 25, y: 11, facing: "up" } },
    ],
    berrySpots: [
      { id: "factory-berry-1", tileX: 5, tileY: 15 },
      { id: "factory-berry-2", tileX: 10, tileY: 15 },
      { id: "factory-berry-3", tileX: 15, tileY: 14 },
      { id: "factory-berry-4", tileX: 20, tileY: 15 },
      { id: "factory-berry-5", tileX: 25, tileY: 15 },
    ],
    exits: [
      // M5 Step 3: the door to Artemis. Locked (🔒) until all five mini-bosses
      // are beaten — see flags.unlockedAreas.
      { id: "factory-lair-door", kind: "lair", tileX: 15, tileY: 4,
        toMap: "artemisLair", toTile: { x: 15, y: 16, facing: "up" } },
      { id: "factory-boat", kind: "boat", tileX: 27, tileY: 8,
        toMap: "theLagoon", toTile: { x: 25, y: 14, facing: "left" } },
    ],
  },

  // =========================================================================
  //  ARTEMIS'S LAIR (M5 Steps 3–4) — the end of the game.
  //
  //  You can only get here once all FIVE mini-bosses are down; until then the
  //  door in The Factory wears a 🔒. The gate is the same one every other
  //  locked area uses — `flags.unlockedAreas` (DECISIONS.md #79) — and the
  //  fifth mini-boss win is what pushes "artemisLair" onto it.
  //
  //  Lewis designed the room (B22): "purple fire and Artemis's throne of
  //  stars". The purple is the `lair` mood dial in tools/make-area-tilesets.mjs;
  //  the throne is the pool of fire in the middle, with Artemis standing in
  //  front of it and black pillars lining the walk up.
  //
  //  There are no wild Fakeamon here, no berries and no Fakeatent. Heal
  //  BEFORE you come — that's the point of a final boss.
  // =========================================================================
  artemisLair: {
    name: "Artemis's Lair",
    tileSize: 16,
    tileset: "assets/tilesets/lair.png",
    solidTiles: LAGOON_SOLID_TILE_INDICES,
    startTile: { x: 15, y: 16 },   // you walk in at the bottom, facing the throne
    ground: [
    [ 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10],
    [15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16],
    [ 9,10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,10],
    [15,16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,15,16],
    [ 9,10, 0, 0, 0, 0,11, 0, 0, 0,11, 0, 0, 0,11, 0, 0, 0,11, 0, 0, 0,11, 0, 0, 0, 0, 0, 9,10],
    [15,16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,15,16],
    [ 9,10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,10],
    [15,16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 7, 7, 7, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,15,16],
    [ 9,10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,12,13,13,13,13,14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,10],
    [15,16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,12,13,13,13,13,14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,15,16],
    [ 9,10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,18,19,19,19,19,20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,10],
    [15,16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,15,16],
    [ 9,10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,10],
    [15,16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,15,16],
    [ 9,10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,10],
    [15,16, 0, 0, 0, 0,11, 0, 0, 0,11, 0, 0, 0,11, 0, 0, 0,11, 0, 0, 0,11, 0, 0, 0, 0, 0,15,16],
    [ 9,10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9,10],
    [15,16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,15,16],
    [ 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10, 9,10],
    [15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16,15,16],
    ],
    encounters: [
      // The legend itself. Same "bump into it" seam as every other creature in
      // the game — it's just standing in front of its throne.
      { id: "lair-artemis", bossId: "artemis", species: "artemis", level: 25, tileX: 15, tileY: 12 },
    ],
    exits: [
      // The way home. You can always leave — even mid-quest, even after
      // winning, because the world stays open (Lewis's B25).
      { id: "lair-exit", kind: "door", tileX: 15, tileY: 17,
        toMap: "theFactory", toTile: { x: 15, y: 5, facing: "down" } },
    ],
  },

};
