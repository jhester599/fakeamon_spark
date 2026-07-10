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

// --- Hero (S3) ------------------------------------------------------------
// The walk sheet is 48×128: 3 frames across × 4 rows down, each cell 16×32.
// Row order (confirmed by in-game testing 2026-07-10): down, LEFT, right, UP —
// the standard RPG-Maker order. (An earlier S3 attempt mis-read the sheet and
// swapped up/left; the sheet's left-profile and back-view look alike at 16px.)
const HERO_SHEET   = "assets/sprites/player/hero.png";
const HERO_FRAME_W = 16;
const HERO_FRAME_H = 32;
// The middle frame of each row is the "standing still" pose for that facing.
// Frames number left→right, top→bottom: row0 = 0,1,2 (down); row1 = 3,4,5 (left);
// row2 = 6,7,8 (right); row3 = 9,10,11 (up).
const HERO_STAND_FRAME = { down: 1, left: 4, right: 7, up: 10 };
// How long one tile-step takes, in milliseconds. Lower = zippier, higher =
// more deliberate. The classics feel right around 150–220 (plan §6.2).
const MOVE_DURATION_MS = 180;

// How each arrow shifts the hero, in tiles.
const STEP = {
  left:  { dx: -1, dy: 0 },
  right: { dx: 1, dy: 0 },
  up:    { dx: 0, dy: -1 },
  down:  { dx: 0, dy: 1 },
};

// The live WorldScene, so main.js can nudge it (e.g. re-place the hero after
// loading a save). Set in create(). worldActive gates walking: it's false on
// the title/starter/battle screens so arrow keys don't walk a hero you can't
// see — a lightweight stand-in for the S7 screen manager (plan §3).
let worldScene = null;
let worldActive = false;

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
    // S3: the hero walk sheet, sliced into 16×32 frames.
    this.load.spritesheet("hero", HERO_SHEET, { frameWidth: HERO_FRAME_W, frameHeight: HERO_FRAME_H });
  }

  create() {
    this.scene.start("WorldScene");
  }
}

// ---------------------------------------------------------------------------
//  WorldScene — the overworld itself.
//
//  S2: draws The Meadows from the plain-number arrays in src/data/maps.js.
//  S3: puts the hero on the grid and walks them tile-by-tile with the arrow
//  keys, blocked by solid tiles (trees/rocks/boulders/stumps/logs — see
//  SOLID_TILE_INDICES in maps.js). Movement is a TWEEN between tiles (no
//  physics — plan §6.2), so the hero is always ON a tile or sliding cleanly
//  between two, never drifting. The wild Fakeamon standing in the grass (S6)
//  get added here later.
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
    this.tileSize = mapData.tileSize;
    this.ground = mapData.ground;            // the tile-number grid
    this.solid = new Set(SOLID_TILE_INDICES); // which tile numbers you can't walk on
    this.mapCols = mapData.ground[0].length; // 30
    this.mapRows = mapData.ground.length;    // 20

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

    // The hero. Origin bottom-centre so they "stand on" their tile (the 16×32
    // sprite is two tiles tall — the head pokes up into the tile above).
    this.hero = this.add.sprite(0, 0, "hero", HERO_STAND_FRAME.down);
    this.hero.setOrigin(0.5, 1);
    this.isMoving = false;
    this.createWalkAnims(); // S4: the four walk cycles
    this.syncHeroToState(); // place them wherever gameState says (start tile, or a loaded save)

    // Arrow keys. addCapture stops the browser from scrolling the page when
    // you press them (plan §6.2 / §3).
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.addCapture("UP,DOWN,LEFT,RIGHT");

    worldScene = this; // let main.js reach us (e.g. to re-place the hero on Continue)
  }

  // S4: build the four walk cycles, one per facing. Each row is 3 frames
  // (step, stand, step); [a, mid, b, mid] makes a smooth left–right–left gait.
  // frameRate is a Lewis-tweakable dial: higher = faster legs.
  createWalkAnims() {
    if (this.anims.exists("walk-down")) return; // only make them once
    const make = (key, frames) => this.anims.create({
      key: key,
      frames: this.anims.generateFrameNumbers("hero", { frames: frames }),
      frameRate: 8,
      repeat: -1,
    });
    make("walk-down",  [0, 1, 2, 1]);
    make("walk-left",  [3, 4, 5, 4]);
    make("walk-right", [6, 7, 8, 7]);
    make("walk-up",    [9, 10, 11, 10]);
  }

  // Stop walking and settle on the standing pose for the current facing.
  stopWalk() {
    if (this.hero.anims.isPlaying) {
      this.hero.anims.stop();
      this.hero.setFrame(HERO_STAND_FRAME[gameState.world.player.facing]);
    }
  }

  // Pixel centre-bottom of a tile — where the hero's feet go.
  tilePixel(tileX, tileY) {
    return { x: tileX * this.tileSize + this.tileSize / 2, y: (tileY + 1) * this.tileSize };
  }

  // Put the hero on a tile facing a way, without any animation. Used to spawn
  // and to snap to a loaded save position.
  placeHeroAtTile(tileX, tileY, facing) {
    const p = this.tilePixel(tileX, tileY);
    this.hero.x = p.x;
    this.hero.y = p.y;
    this.hero.setFrame(HERO_STAND_FRAME[facing] !== undefined ? HERO_STAND_FRAME[facing] : HERO_STAND_FRAME.down);
  }

  // Read the hero's spot straight from the shared save state and match it.
  // main.js calls this after loading/continuing a game. Killing any in-flight
  // step tween first makes the reposition authoritative — belt-and-suspenders
  // today, and it matters at S7 when a battle can fire mid-step.
  syncHeroToState() {
    if (!this.hero) return;
    this.tweens.killTweensOf(this.hero);
    const p = gameState.world.player;
    this.placeHeroAtTile(p.tileX, p.tileY, p.facing);
    this.isMoving = false;
  }

  // Can the hero stand on this tile? No if it's off the map, or if the tile
  // there is a "solid" one (tree, rock, boulder, stump, log). We read
  // solidity straight from the tile the map already shows — so anything you
  // can SEE is an obstacle blocks you automatically, and there's no separate
  // collision list to keep in sync (that parallel list is exactly what drifted
  // and let you walk through a couple of rocks).
  canWalk(tileX, tileY) {
    if (tileX < 0 || tileY < 0 || tileX >= this.mapCols || tileY >= this.mapRows) return false;
    return !this.solid.has(this.ground[tileY][tileX]);
  }

  // Try to walk one tile in a direction. Turning to face a new way is free
  // (costs no step — how the classics do it); only a step into a walkable
  // tile actually moves you.
  tryWalk(dir) {
    const player = gameState.world.player;

    // Facing a new way? Just turn this press (no step, no walk cycle).
    if (dir !== player.facing) {
      player.facing = dir;
      this.hero.anims.stop();
      this.hero.setFrame(HERO_STAND_FRAME[dir]);
      return;
    }

    const targetX = player.tileX + STEP[dir].dx;
    const targetY = player.tileY + STEP[dir].dy;
    if (!this.canWalk(targetX, targetY)) {
      // Bumped a tree/rock/edge — settle on the standing pose so the legs
      // don't keep cycling in place while you hold the key against the wall.
      this.hero.anims.stop();
      this.hero.setFrame(HERO_STAND_FRAME[dir]);
      return;
    }

    // Start the legs moving (ignoreIfPlaying: true keeps a continuous walk
    // smooth across tiles instead of restarting the cycle each step).
    this.hero.play("walk-" + dir, true);
    this.isMoving = true;
    const dest = this.tilePixel(targetX, targetY);
    this.tweens.add({
      targets: this.hero,
      x: dest.x,
      y: dest.y,
      duration: MOVE_DURATION_MS,
      ease: "Linear",
      onComplete: () => {
        player.tileX = targetX;
        player.tileY = targetY;
        this.isMoving = false;
        saveGame(); // remember where you're standing (tiny — per-step is fine, plan §4.1)
      },
    });
  }

  // Called every frame by Phaser. Poll the arrow keys and walk the grid.
  update() {
    if (!worldActive) return;
    if (this.isMoving) return; // mid-tween — let the step finish

    const c = this.cursors;
    let dir = null;
    if (c.left.isDown) dir = "left";
    else if (c.right.isDown) dir = "right";
    else if (c.up.isDown) dir = "up";
    else if (c.down.isDown) dir = "down";

    if (dir) {
      this.tryWalk(dir);
    } else {
      this.stopWalk(); // no key held → settle on the standing pose
    }
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
