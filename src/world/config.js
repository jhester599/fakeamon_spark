// ===========================================================================
//  THE OVERWORLD — M3 Step S1: "Phaser hello-world".
//
//  This is the very first piece of the *map* half of the game. Fakeamon is
//  now two rooms with a doorway between them (see PLANS/M3_OVERWORLD_PLAN.md
//  §1): the OVERWORLD is a little Phaser game (this file), and the BATTLE
//  stays the plain HTML screen we already built. They never call each other
//  directly — later steps connect them through a tiny doorway.
//
//  For Step S1 the overworld is deliberately almost empty: it just fills the
//  screen with grass-green so we can SEE that Phaser is installed and drawing.
//  The real meadow map arrives at Step S2, the walking hero at Step S3.
//
//  Phaser is loaded as a plain global from assets/vendor/phaser.min.js (a
//  <script> tag in index.html, same no-build style as the rest of the game),
//  so there's no import here — `Phaser` is just available, like FAKEAMON or
//  MOVES. ⚠️ Read the matching file in PLANS/phaser-skills/ BEFORE changing
//  any Phaser code — the model's memory leans toward the older Phaser 3.
// ===========================================================================

// --- Easy-to-tweak world numbers (Lewis's dials) -------------------------
// The map is 30×20 tiles, each 16 pixels, so the world is 480×320 pixels.
// Then we ZOOM it up so it looks big and chunky on screen. Change WORLD_ZOOM
// to 3 for a closer-in view — Jeff's pick for now is 2× (M3 plan §A.2).
const WORLD_TILES_WIDE = 30;   // matches src/data/maps.js theMeadows width
const WORLD_TILES_TALL  = 20;  // matches src/data/maps.js theMeadows height
const WORLD_TILE_SIZE   = 16;  // pixels per tile (the tileset's tile size)
const WORLD_ZOOM        = 2;   // 2× (try 3 for a closer view) — Jeff's call
const WORLD_GRASS_COLOR = "#6cc24a"; // meadow green, a stand-in for S2's tiles

// The whole world in pixels, worked out from the dials above.
const WORLD_WIDTH  = WORLD_TILES_WIDE * WORLD_TILE_SIZE;  // 480
const WORLD_HEIGHT = WORLD_TILES_TALL * WORLD_TILE_SIZE;  // 320

// ---------------------------------------------------------------------------
//  BootScene — the first scene Phaser runs. Its job is to get everything
//  ready and then hand over to the WorldScene. For S1 there's nothing to
//  load yet, so it hands over right away. At S2/S3 this is where the tileset
//  and hero art get preloaded (that's why it exists now — the shape is ready).
// ---------------------------------------------------------------------------
class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  // S2: load the art the overworld needs before we draw anything. Right now
  // that's just the meadow tileset (the little 16×16 tiles the map is built
  // from). The hero walk sheet joins this at S3.
  preload() {
    const meadow = MAPS.theMeadows;
    this.load.image("meadow-tiles", meadow.tileset); // assets/tilesets/meadow.png
  }

  create() {
    this.scene.start("WorldScene");
  }
}

// ---------------------------------------------------------------------------
//  WorldScene — the overworld itself.
//
//  S2: draws The Meadows from the plain-number arrays in src/data/maps.js.
//  Each number in `ground` is a tile index into meadow.png (see that file's
//  TILE LEGEND) — change a number there, refresh, and the world changes. The
//  hero (S3) and the wild Fakeamon standing in the grass (S6) get added here
//  later.
// ---------------------------------------------------------------------------
class WorldScene extends Phaser.Scene {
  constructor() {
    super("WorldScene");
  }

  create() {
    // Grass-green shows through any gap (there shouldn't be any — the map
    // fills the whole screen — but it's a friendly fallback).
    this.cameras.main.setBackgroundColor(WORLD_GRASS_COLOR);

    const mapData = MAPS.theMeadows;

    // Build a Phaser tilemap straight from our 2D array of tile numbers.
    const map = this.make.tilemap({
      data: mapData.ground,
      tileWidth: mapData.tileSize,
      tileHeight: mapData.tileSize,
    });

    // Link the tileset image to the map, then draw the ground layer. The
    // tile numbers in mapData.ground index into this image (6 tiles wide).
    const tileset = map.addTilesetImage("meadow", "meadow-tiles", mapData.tileSize, mapData.tileSize);
    map.createLayer(0, tileset, 0, 0);
  }
}

// ---------------------------------------------------------------------------
//  startWorld() — builds the Phaser game and drops its canvas into the
//  <div id="world"> at the top of the page. Called once from src/main.js
//  when the page loads. Kept as its own function (not run on load here) so
//  the load ORDER stays simple: main.js is the one place that kicks things
//  off. See PLANS/phaser-skills/game-setup-and-config/SKILL.md for the config
//  options; pixelArt keeps the art crisp (no blurry scaling).
// ---------------------------------------------------------------------------
let worldGame = null;

function startWorld() {
  if (worldGame) return worldGame; // never boot Phaser twice

  const config = {
    type: Phaser.AUTO,          // WebGL if the browser has it, else Canvas
    parent: "world",            // put the canvas inside <div id="world">
    width: WORLD_WIDTH,
    height: WORLD_HEIGHT,
    pixelArt: true,             // crisp pixel art — no blurry scaling
    backgroundColor: WORLD_GRASS_COLOR,
    scale: { zoom: WORLD_ZOOM },
    scene: [BootScene, WorldScene], // BootScene runs first, then WorldScene
  };

  worldGame = new Phaser.Game(config);
  return worldGame;
}
