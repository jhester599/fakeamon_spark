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

  create() {
    this.scene.start("WorldScene");
  }
}

// ---------------------------------------------------------------------------
//  WorldScene — the overworld itself. Empty for S1: it paints the screen
//  grass-green and shows a friendly "coming soon" label, just so the blank
//  canvas isn't confusing. The meadow map (S2), the hero (S3), and the wild
//  Fakeamon standing in the grass (S6) all get added here later.
// ---------------------------------------------------------------------------
class WorldScene extends Phaser.Scene {
  constructor() {
    super("WorldScene");
  }

  create() {
    this.cameras.main.setBackgroundColor(WORLD_GRASS_COLOR);

    // A small centered label. Confirms create() actually ran (so we know
    // Phaser is really drawing, not just showing a background color).
    this.add.text(
      WORLD_WIDTH / 2,
      WORLD_HEIGHT / 2,
      "The Meadows\ncoming at Step 2!",
      { fontFamily: "monospace", fontSize: "16px", color: "#ffffff", align: "center" }
    ).setOrigin(0.5);
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
