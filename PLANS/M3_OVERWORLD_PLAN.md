# M3 Overworld Plan — Phaser ↔ Battle Architecture 📐

> **What this is:** the detailed architecture and build plan for **Milestone 3
> (Overworld)**, written during a high-end planning session so that execution
> sessions (Sonnet 5) can build it step-by-step without re-deriving the design.
>
> **How to use it:** this document is authoritative for M3 *architecture*.
> `DESIGN.md` remains authoritative for *game rules*. `ROADMAP.md`'s M3 table
> is superseded by the finer-grained step list in §9 below. The Model Huddle
> from `MODELS.md` still runs before every step.
>
> **Status:** plan complete; **execution underway — S1–S4 done ✅ (S1
> 2026-07-09; S2–S4 2026-07-10). Next: S5/S6 → S7 (the handoff).** See **§A.5**
> for S1 and **§A.6** for S2–S4. M2 is now fully finished (incl. save
> v1/export-import). You can walk The Meadows with an animated hero; trees
> block you; a battle is reachable via the temporary "Battle test" button and
> returns you to the map. **Read §A below first** — it reconciles this plan
> against the code and decisions as they actually stand, and lists the prep
> work already staged in the repo. **Touch/mobile play is now adopted as a
> tenth step, S10, landing after S9 — see §A.7 and
> `PLANS/M3_TOUCH_AND_MOBILE_PLAN.md`.**

---

## §A. Amendments — M3S0 prep session (2026-07-06)

Written while staging M3 prep work (Jeff-directed, Lewis away), following the
reconciliation pattern from `PLANS/M5_STATE_AND_SAVE_PLAN.md` §A: when code
or facts and this plan disagree, the plan gets updated rather than rotting.

### §A.1 Where the code actually is

M2 Steps 1–4 are done. Checking §8's four constraints against `main`:

1. **§8.1 (the `startBattle` contract) — ✅ done**, in its M2-sized form:
   a global promise-returning function in `src/battle.js`, with plain
   `player`/`enemy` species objects. `playerParty` + species-key/level enemies
   arrive with individuals (M5 plan §6, S1) — the shape upgrade, not a rewrite.
2. **§8.2 (`src/state.js`) — not yet.** Scheduled as the very next M2 session
   (M5 plan S1, before M2 Step 5). M3 must not start before it lands.
3. **§8.3 (ES-module/`file://` breakage) — void.** The project confirmed
   plain global scripts, not ES modules (M5 plan §A.1; `DECISIONS.md`, Jeff's
   technical calls). Double-click-to-play survives through M3; script load
   order in `index.html` is the dependency graph. Read every `export`/`import`
   in this plan as "define a global."
4. **§8.4 (relative paths only) — stands, unchanged.**

### §A.2 Homework answers that landed after this plan was written

§11's "open threads for humans" is now almost all answered (Lewis cleared
B1–B32 on 2026-07-06 — `DECISIONS.md` rows 14–45):

- **B1** flee → Run always works (already built, M2 Step 3). `canFlee` wiring ✅.
- **B2** caught HP → fully healed (already built, M2 Step 4).
- **B6/B7/B8** → connected areas; the world is **Venta**; the starting area is
  **The Meadows**. So this plan's placeholder id `starterMeadow` is renamed:
  the staged map data uses **`theMeadows`**. Read `starterMeadow` anywhere in
  these plans (including the M5 plan's `gameState.world` sketch) as `theMeadows`.
- **B10** hero → original cap-and-backpack design, placeholder name "Hero";
  don't copy an existing character. Placeholder art is vendored (§A.4) and a
  recolor/original pass can come later without blocking anything.
- Still genuinely open: **Jeff's zoom pick** (2× vs 3×, eyeballed at S1).

### §A.3 ⚠️ Corrected battle-sheet geometry (supersedes §6.3 + §7.3 wording)

The "2×2 grid of 64×44 cells, front/back × 2-frame idle" description in §7.3
(and `DESIGN.md` §12) was **wrong**. Measured against 10 real sheets
(2026-07-06, alpha-bounding-box check, uniform across all 10):

```
128×88 sheet:  front pose  64×64 at (0,0)
               back pose   64×64 at (64,0)
               idle pair   two 24×24 frames at (0,64) and (24,64)
```

Consequences (both make M3 *easier*):

- **§6.3 encounters:** the map sprite is the dedicated little **idle pair**
  (24×24 ×2 frames) — already tile-scale, no downscaling of the big front
  pose needed. The "free idle animation" claim stays true, at the right size.
- **§7.3 slicer:** outputs are `front/<slug>.png` (64×64),
  `back/<slug>.png` (64×64), and `idle/<slug>.png` (48×24 two-frame strip;
  Phaser loads it with `frameWidth: 24, frameHeight: 24`).

### §A.4 Already staged in the repo (don't redo these in S1–S9)

| Staged | Where | Notes |
|---|---|---|
| Meadow tileset, composed | `assets/tilesets/meadow.png` | 24-tile 16×16 set (6×4); index legend lives in `src/data/maps.js`. Built from the two George originals below (CC BY 3.0) |
| Tileset source originals | `assets/tilesets/terrain_george.png`, `vegetation_george.png` | unmodified Tuxemon pulls, kept for re-composition |
| Hero walk sheet | `assets/sprites/player/hero.png` | Tuxemon "adventurer" (cap + backpack — matches B10); 48×128, 3 frames × 4 rows, 16×32 cells. **Row order (confirmed in-game 2026-07-10): down / left / right / up** — the standard RPG-Maker order (the original guess was right; an S3 attempt to "correct" it to down/up/right/left mis-read the sheet and was reverted after testing showed left/up swapped). ⚠️ license check pending, see `CREDITS.md` |
| Frondly battle sheet + Leafick portrait | `assets/sprites/battle/frondly-sheet.png`, `assets/sprites/leafick.png` | Leafick's portrait is wired into `src/data/fakeamon.js` — all three starters now have art |
| Sliced starter sprites | `assets/sprites/front|back|idle/<slug>.png` | hissiorite, bigfin, frondly |
| The slicer tool (S5, built early) | `tools/slice-sheets.mjs` + `sheet-manifest.json` | corrected geometry per §A.3; refuses to slice unattributed sheets; regenerates `tools/credits-fragment.md`. S5 shrinks to "add manifest entries + re-run" |
| Map data draft (S2's data half) | `src/data/maps.js` | `theMeadows`, 30×20, ground/blocked/encounters/startTile — **not** yet loaded by `index.html`; S2 wires it |
| Phaser 4 skills | `PLANS/phaser-skills/` | 10 skills + README, from `phaserjs/phaser` @ `539e718` (§2's mandate) |
| Phaser version check | — | ✅ **Re-checked & pinned at S1 (2026-07-09): 4.2.1** ("Giedi"), now the newest stable 4.x on npm (was 4.2.0 at M3S0). Vendored to `assets/vendor/`, logged in `DECISIONS.md` + `CREDITS.md` |
| Wild-roster art (M3-late→M5 pool) | `assets/sprites/battle/` + `CREDITS_ROSTER.md` + `tools/roster-200.json` | **Complete (2026-07-06):** the whole §16 pool — 198 monsters after two credit-less drops — vendored with verified attribution (198 staged, 0 pending); reference data (types/lines/catch rates/blurbs) in the JSON. ⚠️ 3 OPMon-derived monsters need their terms confirmed before appearing in-game. Not used by S1–S9; first wired in at **ROADMAP M3 row 6** (The Meadows' slice), then grown area-by-area through M4–M5 |

~~What S1 still owns:~~ **✅ S1 is done (2026-07-09) — see §A.5.** It owned:
the pinned Phaser script tag (vendored, not CDN), `src/world/config.js`,
BootScene + empty WorldScene, the "Battle test" button, Jeff's zoom pick (2×).
The map *renders* at S2, the hero *walks* at S3 — the staged files just mean
those sessions start from data and art that already exist.

### §A.5 What S1 actually built (execution session, 2026-07-09)

Built with **Opus 4.8 / high** (Jeff's Model-Huddle override of the table's
Sonnet-5 pick — "big, important step"). Faithful to §9 S1; nothing from S2+
was pulled forward (no tileset load, no map draw, no movement, no
`gameState.world`, no `src/screens.js` — those stay for their steps).

- **Phaser 4.2.1 vendored** → `assets/vendor/phaser.min.js` (+ `phaser-LICENSE.md`).
  Delivery decision (F6) resolved to *vendor*; version re-checked & pinned. See §2, §A.4.
- **`src/world/config.js`** — a `BootScene` (hands straight to WorldScene; it'll
  preload the tileset/hero at S2/S3) and an empty **`WorldScene`** that paints the
  camera grass-green and shows a "The Meadows — coming at Step 2!" label. Plus
  `startWorld()`, which builds the Phaser config (`Phaser.AUTO`, `pixelArt: true`,
  `parent: "world"`, 480×320, `scale: { zoom: 2 }`) and boots the game once.
  Every world number is a labeled constant at the top of the file.
- **`index.html`** — added `#world` (the canvas mount) above the battle UI, which
  is now wrapped in `#battle`; loads `assets/vendor/phaser.min.js` before
  `src/world/config.js`; added the temporary "Battle test" bar. New load order:
  `phaser → data/* → state → battle → world/config → main`.
- **`src/main.js`** — calls `startWorld()` on load, wires the "Battle test" button
  (`runBattleTest()`; lends a random starter if the party's empty, gated so it
  can't stack a second battle), and greys the button out mid-fight.
- **Verified in a real browser** (headless Chromium): Phaser 4.2.1 boots, canvas
  renders at 2× (480×320 → 960×640 on screen), the starter-select + full battle
  still work through the "Battle test" button, and **double-click (`file://`)
  still runs with zero page errors** — confirming the vendor decision's payoff.
- **Not touched on purpose:** `ROADMAP.md` / `roadmap.html` counters (S1 is only
  half of ROADMAP M3 row 1 — S2 is the other half — so no *row* flipped to done
  and no count changed; granular S1 status lives here + in `CLAUDE.md`).

### §A.6 What S2–S4 built (execution session, 2026-07-10)

Built with **Opus 4.8**. Completes ROADMAP M3 **rows 1 & 2** (R1≈S1–S2,
R2≈S3–S4), so the step counter moved **14 → 16** and both trackers were updated.

- **S2 — the meadow renders.** `index.html` now loads the dormant
  `src/data/maps.js`; `WorldScene` builds a Phaser tilemap from `theMeadows.ground`
  via `make.tilemap({ data })` + `addTilesetImage` + `createLayer`, drawn with the
  already-vendored `meadow.png`. Tree border, path, flowers, rocks, log — all live.
- **S3 — the hero walks.** Loads the hero sheet; spawns from `gameState.world.player`
  (new `world` state, defaulting to the start tile); arrow-key **tween** movement
  (no physics, §6.2); turn-to-face is free, a step needs a walkable tile; blocked by
  solid tiles (`SOLID_TILE_INDICES`, §6.1) + map edges; each step autosaves.
  **Sheet row order: down/left/right/up**
  (an S3 attempt to "correct" the guess to down/up/right/left mis-read the sheet;
  in-game testing on 2026-07-10 showed left/up swapped, and it was reverted to the
  original — see §A.4). `addCapture` stops page-scroll; `worldActive` gates walking
  off during battles/menus (a light stand-in for the S7 screen manager).
- **S4 — walking animates.** Four looping walk cycles; `ignoreIfPlaying` keeps a
  held-key walk smooth; settles on the standing pose when idle.
- **Flow change (deliberate, in-scope for M3):** the M2 "endless auto-battle loop"
  is **retired**. The overworld (`enterOverworld`) is the hub; choosing a starter /
  Continue / Import drops you on the map; a battle (via the temporary Battle test
  button until S7) is a discrete detour that returns you to the map. Loss uses the
  §6.4 placeholder (heal + back to start). `gameState.world` is additive, so old
  saves still load (no version bump).
- **Verified in a browser:** walk all four ways; trees & edges block; hold-to-walk
  is continuous and animated; reload → Continue restores the exact tile; walking is
  frozen during a battle; return-to-map after win/flee/catch/loss. Zero page errors.
- **Not yet built (on purpose):** the real map encounters + handoff (S6–S7), the
  slicer re-run for encounter art (S5), catch-on-map depth (S8). The Battle test
  bar is still the bridge and is hidden until you have a team.

### §A.7 Touch & mobile — adopted as S10 (2026-07-10)

Touch controls are on this plan's §9 do-not-build list for S1–S9 (they
stay there — see below), but a peer-reviewed proposal for tablet/phone
play was drafted, reconciled against the code as it actually stands, and
**adopted** by Jeff: `PLANS/M3_TOUCH_AND_MOBILE_PLAN.md`. Read its §A
before touching any of it. Short version: an on-screen DOM D-pad feeds a
`heldDirection()` seam that wraps the existing keyboard poll in
`WorldScene.update()`, plus a viewport tag + Scale Manager FIT mode so
the canvas fits a phone/tablet screen. All of it lands as the new **S10**,
added to §9 below — after S9, never folded into S1–S9. The do-not-build
list right below stays true for S1–S9; S10 is the one sanctioned
exception, scoped to exactly the touch plan's §3–§6.

---

## 1. The core decision: two rooms, one hallway

**The overworld is a Phaser game. The battle stays plain DOM. A tiny state
machine and a shared state module connect them.**

Concretely: `index.html` contains two top-level containers —

```html
<div id="world"></div>   <!-- Phaser mounts its canvas in here -->
<div id="battle" hidden></div>  <!-- the existing M1/M2 battle UI lives here -->
```

Walking into a wild Fakeamon **pauses** the Phaser scene, **hides** `#world`,
**shows** `#battle`, and calls the battle module. When the battle resolves,
the battle module reports the outcome, `#battle` hides, `#world` shows, and
the Phaser scene **resumes** with the outcome applied (creature caught →
joins party and its map sprite despawns; win → XP; lose → §6.4).

### Why this and not the alternatives

| Option | Verdict | Why |
|---|---|---|
| **A. Rewrite the battle in Phaser** | ❌ Rejected | Throws away working, Lewis-readable M1/M2 code; battles are menu-driven UIs, which DOM does better than a canvas; doubles M3 risk for zero player-visible gain. |
| **B. Phaser overworld + DOM battle overlay** | ✅ **Chosen** | Preserves everything built so far; each half uses the technology it's best at; the seam between them is one small, testable contract (§5). Teaching win: Lewis sees that big programs are *rooms with doorways*, not one giant machine. |
| **C. Two separate HTML pages** | ❌ Rejected | Page reloads lose in-memory state, forcing premature save-system work; feels janky. |
| **D. iframe embedding** | ❌ Rejected | Cross-frame state passing is the hardest version of the problem. |

**Rule for all M3 sessions:** battle code and Phaser code never import each
other directly. Both talk only to `src/state.js` (§4) and the screen manager
(§3). If a session finds itself importing Phaser inside `battle.js` or DOM
battle elements inside a scene, stop — the architecture is being violated.

---

## 2. Engine choice: Phaser 4, pinned, vendored as a global

- **Version:** Phaser **4.x**. **✅ RESOLVED at S1 (2026-07-09): pinned to
  4.2.1** (release "Giedi"), verified as the newest stable 4.x against the npm
  registry — so the plan's original "4.2.1" guess *does* now exist, and it
  superseded M3S0's interim "4.2.0". Phaser 4 is a ground-up renderer rebuild
  but keeps a mostly-familiar v3 API, and it is actively developed; starting a
  new project on 3.90 in mid-2026 would be building on the legacy line.
- **Load method:** classic `<script>` tag before our own scripts, so `Phaser`
  is a global — no bundler, preserving our no-build-step rule. **As shipped at
  S1 (vendored — see the resolved decision below):**

  ```html
  <script src="assets/vendor/phaser.min.js"></script>
  ```

  Pin the exact version (we pin **4.2.1**). Never use `@latest`. Record it in
  `DECISIONS.md` (done). (The Phaser 4 `import` breaking change — wildcard
  imports from npm — does **not** apply to plain-global loading.) *(This plan
  originally sketched a `cdn.jsdelivr.net` URL here; the vendoring decision
  below replaced it.)*
- **✅ RESOLVED at S1 (2026-07-09): VENDORED (option 2 below).** Phaser lives
  at `assets/vendor/phaser.min.js` (loaded by a plain `<script>` tag), with its
  MIT license beside it and a `CREDITS.md` row. This removes CDN trust
  entirely and keeps double-click-`index.html` working offline (verified in a
  browser at S1) — the deciding factor for a father-son project whose whole
  ethos is "open the file and it just works." (`DECISIONS.md`; F6 closed.) The
  original decision text follows, kept for the record.
- ~~**Add Subresource Integrity (SRI), or vendor the file — decide at S1**~~
  *(pre-M3 peer-review checkpoint, F6; open decision, see `DECISIONS.md`).*
  A pinned CDN URL still trusts the CDN not to swap the file (the polyfill.io
  supply-chain attack in 2024 is the cautionary tale). Two safe options:
  1. **CDN + SRI:** add `integrity="sha384-…" crossorigin="anonymous"` to the
     `<script>`. Put a one-line comment above it — *"this long code makes sure
     nobody swapped out Phaser on us"* — which turns the noise into a teachable
     security lesson rather than a plainness violation. Regenerate the hash if
     the pinned version ever bumps.
  2. **Vendor `phaser.min.js` into `/assets`** (we already vendor Tuxemon art
     and the Phaser skill docs). Removes CDN trust entirely and keeps
     double-click-`index.html` working offline, at the cost of a ~1 MB file in
     the repo. Pick this if offline/double-click reliability matters more than
     repo size; record the version + source in `CREDITS.md`.
- **⚠️ Training-data skew:** LLMs have far more Phaser 3 than Phaser 4 in
  training. Two mitigations, both mandatory:
  1. **Vendor the official AI skills.** The Phaser 4 repo ships a `skills/`
     folder of agent skill files covering every subsystem, including a v3→v4
     migration skill. Copy the relevant ones (scenes, input, tilemaps,
     sprites, animation, camera) into our repo under `PLANS/phaser-skills/`
     and add a line to `CLAUDE.md` telling sessions to read them before
     writing Phaser code.
  2. **Verify against docs, not memory.** If a Phaser API call errors,
     check current Phaser 4 docs rather than trying v3 variants.
- **Renderer config:** pixel-art mode is non-negotiable for 16px tiles:

  ```js
  const config = {
    type: Phaser.AUTO,
    parent: "world",
    width: 480, height: 320,      // 30×20 tiles at 16px, scaled up below
    pixelArt: true,               // nearest-neighbor everywhere
    scale: { zoom: 2 },           // crisp 2× (tune 2–3 on desktop)
    scene: [BootScene, WorldScene],
  };
  ```

---

## 3. Screen manager — the doorway

A deliberately tiny module, `src/screens.js` (~30 lines), owning which room
is visible. Nothing else touches `hidden`/`display` on the two containers.

```js
// src/screens.js
export function showWorld()  { /* hide #battle, show #world, focus canvas */ }
export function showBattle() { /* hide #world, show #battle */ }
```

Implementation notes (each is a real bug avoided):

- **Keyboard focus:** when returning to the world, call
  `game.canvas.focus()` (and give the canvas `tabindex="0"`), or arrow keys
  will keep going to the document and the player won't move. When the battle
  shows, call `worldScene.input.keyboard.enabled = false` and re-enable on
  return — otherwise arrow-key presses during battle silently walk the
  hidden player around the map.
- **Also disable pointer input on battle show** *(pre-M3 peer-review
  checkpoint, F3).* A documented Phaser behavior lets a click on an HTML
  element overlaying the canvas *also* fire `pointerdown` on the sprite
  underneath — so a click on "Throw Fakeaball" could double as a click on a
  map tile. Pausing the WorldScene mostly neutralizes this (a paused scene
  stops updating), but set `worldScene.input.enabled = false` on battle show
  and re-enable on return as belt-and-suspenders. Cheap now, annoying to
  debug later.
- **Pause, don't destroy:** use `scene.pause()` / `scene.resume()` on the
  WorldScene. Never destroy/recreate the Phaser game per battle — it leaks
  and resets the camera.
- **Prevent page scroll:** arrow keys scroll the browser window by default;
  the WorldScene must `addCapture` on the arrow keys (Phaser input capture)
  so the page doesn't drift while walking.
- **CSS:** both containers are siblings; no z-index stacking games needed
  because only one is ever visible. Keep it that simple.

---

## 4. Game state — one bag, save-ready from day one

`src/state.js` exports a single plain-JS object plus small helper functions.
**Plain data only** — no class instances, no DOM nodes, no Phaser objects —
so that `JSON.stringify(gameState)` works from the first commit. That single
constraint is what makes the M5 save system a ~20-line feature instead of a
rewrite. (This is the payload of the "pre-M5 save design" session in
`MODELS.md`; M3 just has to not break it.)

```js
// src/state.js — shape sketch (fields marked *M4/M5 are added later,
// but nothing in M3 may be designed in a way that blocks them)
export const gameState = {
  version: 1,                      // save-format version, for M5 migrations
  party: [                         // built by M2
    { species: "growler", nickname: null, level: 5,
      currentHP: 40, xp: 0 },      // stats derived from species+level, not stored
  ],
  inventory: { fakeaball: 5 },     // ball tiers per DECISIONS.md #3
  tokens: 0,                       // *M4
  flags: {},                       // badges, unlocked areas, bosses beaten *M4/M5
  world: {
    mapId: "starterMeadow",
    player: { tileX: 5, tileY: 7, facing: "down" },
    defeatedEncounters: [],        // encounter ids removed from the map
  },
};
```

Rules for every M3 session:

1. Species definitions (base stats, moves, sprite paths) live in
   `src/data/fakeamon.js` and are **referenced by string key** from state —
   never copied into it.
2. Party members store only what varies per individual (level, HP, xp,
   nickname). Derived stats are computed by a function, not stored.
3. Any new persistent fact goes **in this object**, nowhere else. A Phaser
   scene may keep transient things (tween handles, sprite refs) but must be
   able to fully rebuild itself from `gameState.world`.

---

## 5. The battle contract — the one seam that matters

The M2 Step 1 refactor must produce a battle module with **exactly this
shape** (see §8 for the M2 instructions):

```js
// src/battle.js
// Runs a battle in #battle and resolves when it's over.
// `config` is plain data in; `outcome` is plain data out.
export async function startBattle(config) → outcome

// config = {
//   playerParty: gameState.party,          // live reference; battle mutates HP/xp
//   enemy: { species: "sharpfin", level: 6 },
//   canCatch: true,        // false for trainer/gym battles (M4)
//   canFlee: true,         // per Lewis homework B1
// }
//
// outcome = {
//   result: "win" | "lose" | "caught" | "fled",
//   caught: { species, level, currentHP } | null,   // B2 decides HP policy
//   xpGained: number,
// }
```

Contract rules:

- The battle module **never** touches `gameState.world`, the screen manager,
  or Phaser. It receives data, runs the fight, resolves a promise. (In M1–M2
  it can be invoked standalone on page load — perfect for testing without
  the map.)
- The **WorldScene** owns the sequence: detect collision → build config →
  `showBattle()` → `await startBattle(config)` → apply outcome to state →
  `showWorld()` → resume. One function, `handleEncounter(encounterId)`,
  ~25 lines, is the entire hallway. Keep it small and readable — it's the
  best teaching artifact in M3.
- Outcome application on catch: push `outcome.caught` to party (or storage
  when party is full, per Lewis's pending team-size homework), add the
  encounter id to `defeatedEncounters`, despawn the map sprite.

---

## 6. Overworld spec

### 6.1 Map data — hand-authored arrays first, Tiled later (maybe never)

Maps are 2D arrays of tile indices in `src/data/maps.js`, plus a parallel
collision array. Rationale: zero new tools, diff-able in git, and Lewis can
*edit the world in a text file* — which beats a level editor for the
teaching goal. Tuxemon's 332 Tiled `.tmx` maps stay what
`CONTENT_REFERENCE.md` calls them: worked examples for structure, not a
dependency. If maps outgrow arrays (M4's towns), graduating to Tiled JSON +
`this.make.tilemap` is a contained refactor of `maps.js` only.

**Collision — DERIVED from the tiles, not a parallel array (revised at S3).**
This plan originally drafted a parallel `blocked` grid alongside `ground`. In
practice that grid *drifted* from `ground` (a couple of rocks were placed in
`ground` but never marked blocked, so you could walk through them — bug fixed
2026-07-10). It's now derived from the tile type: a top-level
`SOLID_TILE_INDICES` in `maps.js` lists which tile numbers are obstacles
(trees, boulder, stump, rock, log) and `WorldScene.canWalk` blocks any tile in
that set (plus map edges). Single source of truth, no drift; place an obstacle
tile and it's automatically solid. (Verified safe first: the old `blocked`
array contained *only* obstacle tiles — zero "invisible walls" — so nothing was
lost by dropping it.)

```js
const SOLID_TILE_INDICES = [4, 5, 9, 10, 11, 15, 16, 17]; // obstacle tile numbers

const MAPS = {
  theMeadows: {
    tileSize: 16,
    ground: [ [0,0,1,1,…], … ],       // indices into the tileset image
    encounters: [                      // visible encounters — DECIDED
      { id: "meadows-01", species: "leafick", level: 3, tileX: 12, tileY: 4 },
    ],
    exits: [],                         // M4: doorways to other maps
  },
};
```

First map: **one screen, ~30×20 tiles**, grass + a dirt path + tree border.
No scrolling camera until the map is bigger than the screen (M3 step 6 —
camera-follow is one line in Phaser, but keep it out of the first playable).

> **Homework dependency — resolved, see §A.2:** B6/B7/B8 are decided
> (connected areas; the world is **Venta**; the first area is **The
> Meadows**), so the placeholder id `starterMeadow` is now **`theMeadows`** —
> which is what the staged `src/data/maps.js` already uses.

### 6.2 Grid movement — the classic lock-step

Pokémon-style movement is **discrete**: the player is always *on* a tile or
*tweening between* two tiles, never free-floating. Implementation:

- Player state: `tileX, tileY, facing, isMoving`.
- On arrow key (held or pressed) when `isMoving === false`:
  1. Set `facing`. If the key direction ≠ current facing, just turn
     (costs no step — feels right and is how the classics did it).
  2. Compute target tile; check `blocked` and map bounds; check encounter
     occupancy.
  3. If walkable: `isMoving = true`, tween the sprite to the target tile's
     pixel position over **~180 ms**, and on tween-complete update
     `tileX/tileY`, set `isMoving = false`, and re-check held keys (so
     holding an arrow walks continuously).
- **Do not use Arcade physics** for this. Physics gives sliding and
  diagonal drift — exactly what grid movement exists to prevent. Tweens
  only.
- Pixel position = `tileX * tileSize + tileSize/2` (origin-centered sprite).
  Never store pixels in `gameState` — tiles are truth, pixels are derived.

### 6.3 Encounters — visible creatures (decided 2026-07-05)

- Each map encounter is a Phaser sprite standing on its tile, using the
  creature's little **2-frame idle pair** from its sheet *(corrected — see
  §A.3; the sheets carry a dedicated 24×24 idle sprite, already tile-scale,
  sliced to `assets/sprites/idle/<slug>.png`)* — an idle 2-frame animation
  makes the world feel alive for free, since the sheets already contain it.
- Encounter tiles count as blocked for pathing; the *bump* is what triggers
  the battle: when the player's target tile contains an encounter, don't
  move — fire `handleEncounter(id)` instead.
- Defeated/caught/fled-from encounters: **win or catch removes** the sprite
  (id → `defeatedEncounters`); **fleeing leaves it** (you ran, it didn't).
  Respawn policy is an M4 question — for M3, gone is gone.

### 6.4 Losing in M3 (placeholder rule)

Fakeatents don't exist until M4. Interim rule, to be replaced by Lewis's
decided whole-team-faint behavior (Fakeatent + token loss): on loss, heal
the party to full and return the player to the map's start tile with a log
line ("You hurry back to safety…"). Mark it `// M3 PLACEHOLDER` in code.

---

## 7. Asset pipeline (M3 Step 3 in ROADMAP terms)

All sourcing rules in `CONTENT_REFERENCE.md` remain law; this section only
adds M3 mechanics. Every pulled file gets a `CREDITS.md` row (file, our
name, source path, artist, license, commit hash) — **same commit** as the
asset, not later.

1. **Tileset:** pull ONE exterior tileset from Tuxemon `gfx/tilesets/`
   (96 available, 16×16, artist in filename; start with the
   Buch/George/ArMM1998 exterior sets per `CONTENT_REFERENCE.md` §M3 row).
   One image, loaded as a Phaser spritesheet with 16×16 frames.
2. **Player sprite:** Tuxemon `gfx/sprites/player/` walk sheet (4-direction
   walk cycles). Wire to a 4-direction walk animation keyed to the tween.
   (Lewis's **B10** invents the hero's *identity*; a custom look can be a
   later recolor — don't block on it.)
3. **Battle-sheet slicing (the ~200-monster pass):** a Node script,
   `tools/slice-sheets.mjs`, run manually (never in the browser).
   ✅ *Built and run for the three starters during M3S0 — and the sheet
   geometry described below was corrected in the process; see §A.3 for the
   measured layout.*
   - Input: vendored 128×88 sheets (`assets/sprites/battle/`) — front pose
     64×64 at (0,0), back pose 64×64 at (64,0), and a two-frame 24×24 idle
     pair at (0,64)/(24,64) *(not the "2×2 grid of 64×44 cells" this plan
     originally guessed)*.
   - Output: `front/<slug>.png` and `back/<slug>.png` (64×64 poses) plus
     `idle/<slug>.png` (48×24 strip; Phaser loads it as a 2-frame
     spritesheet with `frameWidth: 24, frameHeight: 24`).
   - Use `sharp` (`npm i sharp` — a `package.json` for *tools only* doesn't
     violate the no-build-step rule; the game itself still ships raw).
   - The script also **emits a CREDITS.md table fragment** from a manifest
     JSON (slug → artist/license), so 200 attribution rows are generated,
     not hand-typed. Licensing rule from `CONTENT_REFERENCE.md` stands:
     check each file's actual license; share-alike stays share-alike.
   - Scope note: only slice roster creatures actually placed on maps in
     M3 (a handful). The full 200-run is a single re-run of the same script
     when M4/M5 maps need them — build the tool once, pay per use.

---

## 8. ⚠️ Instructions that reach BACK into M2

The M2 Step 1 refactor ("split code into small files") must be done with
this plan in hand. Add these constraints to that session's prompt:

1. Produce **exactly** the `startBattle(config) → Promise<outcome>` contract
   of §5, even though M2 has no map — M2's "new battle" button simply calls
   it with a random wild config. This means M3 needs **zero battle-code
   changes**.
2. Create `src/state.js` with the §4 shape (minus `world`, which M3 adds) —
   party and inventory land there during M2 Steps 4–5, not in module-local
   variables.
3. Because ES modules don't load over `file://`, **double-clicking
   `index.html` stops working after this refactor.** Update the "How to
   run" sections in `README.md`, `CLAUDE.md`, and `ROADMAP.md`: local play
   is `python3 -m http.server` (GitHub Pages is unaffected). Tell Lewis
   why — it's a good lesson (browsers treat local files as strangers).
4. All asset and module paths **relative** (`assets/…`, `./src/…`), never
   root-absolute (`/assets/…`) — the site lives under
   `/fakeamon_spark/` on GitHub Pages, so absolute paths 404 in production
   while working locally. This is the #1 "works on my machine" trap here.

---

## 9. Build order — M3 in nine session-sized steps

Each step keeps the game runnable and ends in a commit. Model/effort per
`MODELS.md` (Huddle can override). ROADMAP.md's M3 rows 1–5 map onto these
as: R1≈S1–S2, R2≈S3–S4, R3≈S5, R4≈S6–S7, R5≈S8. ROADMAP's row 6 (expand the
wild roster — The Meadows' slice) is new work beyond this plan.

| # | Step | What gets built | ▶ You'll see | Model / effort |
|---|---|---|---|---|
| **S1** ✅ | Phaser hello-world *(done 2026-07-09 — §A.5)* | **Vendored** (not CDN) Phaser **4.2.1** pinned; `src/world/config.js` + BootScene; empty grass WorldScene renders into `#world`; battle still reachable via a temporary "Battle test" button calling `startBattle` directly | A colored game canvas above the old battle UI | ~~Sonnet 5 / high~~ built with **Opus 4.8 / high** (Jeff's call) |
| **S2** ✅ | Tile map renders *(done 2026-07-10 — §A.6)* | Meadow tileset (already vendored + credited at M3S0); `src/data/maps.js` (`theMeadows`) now loaded; WorldScene draws the ground layer via `make.tilemap({data})` | A little meadow with a path and tree border | ~~Sonnet 5 / high~~ Opus 4.8 |
| **S3** ✅ | Player on the grid *(done 2026-07-10 — §A.6)* | Hero sheet loaded; sprite placed from `gameState.world.player`; turn-to-face + tween-step movement per §6.2; collision vs solid tiles + edges; per-step autosave; **retired the M2 auto-battle-loop — the map is the hub now** | Walk the meadow; trees stop you | ~~Sonnet 5 / high~~ Opus 4.8 |
| **S4** ✅ | Walk animation + input polish *(done 2026-07-10 — §A.6)* | 4-direction walk cycles (down/left/right/up); held-key continuous walking + arrow-key page-scroll capture (both landed with S3) | Walking looks like walking | ~~Sonnet 5 / medium~~ Opus 4.8 |
| **S5** ✅ | Slicer tool *(done — satisfied at M3S0 for M3's pool)* | `tools/slice-sheets.mjs` exists (§7.3) and was run for the creatures M3 actually uses — the 3 starters — producing `assets/sprites/{front,back,idle}/<slug>.png` with generated CREDITS rows. Growing this to the full 198-roster slice is M3 row 6 / M4 work, not S5 | Sliced front/back/idle files already in the repo (no gameplay change) | Sonnet 5 / medium (Haiku can run/re-run it) |
| **S6** ✅ | Encounters stand in the world *(done 2026-07-11)* | `theMeadows.encounters` (already in map data) now render as **idle-animated sprites** (`spawnEncounters` in `src/world/config.js`, using each species' new `overworld` idle sheet — `FAKEAMON[key].overworld`); the encounter tile blocks movement and walking into it fires the `handleEncounter` seam, which **logs + gives the creature a little pop** (the real battle is S7). Verified headless: 3 sprites render, bump fires, hero can't walk onto the tile, 0 errors | A wild Fakeamon idling in the grass; bumping it logs a message | Sonnet 5 / medium |
| **S7** | **The handoff** 🌉 | `src/screens.js` per §3; `handleEncounter` per §5: pause → hide → `await startBattle` → apply outcome → show → resume; keyboard enable/disable + canvas refocus | Bump a creature → the real battle opens → win/catch/flee → back on the map, creature gone (or not, if fled) | Sonnet 5 / **high** — the whole plan converges here; if it fights back twice, escalate to Opus 4.8 |
| **S8** | Outcome depth | Catch → party (team UI from M2 reflects it); XP applied; loss placeholder per §6.4; `defeatedEncounters` respawn-proofing on scene rebuild | Catch a wild Leafick on the map and see it join the team | Sonnet 5 / medium |
| **S9** | Cleanup + docs | Remove "Battle test" button; update `CLAUDE.md` status + `ROADMAP.md` M3 ticks; kill any `M3 PLACEHOLDER` that's now real; verify GitHub Pages build plays start-to-finish | The live site is a tiny but complete monster-catching game | Sonnet 5 / low |
| **S10** — "Pocket Venta" *(adopted 2026-07-10 — §A.7)* | Touch & mobile play, per `PLANS/M3_TOUCH_AND_MOBILE_PLAN.md` §3–§6. Three commits: **(1)** `heldDirection()` seam retrofit — pure refactor, keyboard-only, verified identical by playing; **(2)** viewport `<meta>` tag + Scale Manager FIT scaling, 960×640 max (desktop unchanged); **(3)** DOM D-pad + `src/screens.js` wiring + a phone-width CSS pass | Walk the meadow with your thumbs on the live site — no keyboard needed | Sonnet 5 / medium–high |

**Definition of done for M3** (unchanged from ROADMAP, now measurable): on
the *live GitHub Pages URL*, you can walk the meadow, bump a visible wild
Fakeamon, fight the real battle, catch it or beat it or flee, land back on
the map with the world state correct — and refreshing the page cleanly
restarts (no save yet; that's M5).

**Do NOT build in M3:** multi-map travel, towns/buildings, NPCs, tokens,
shops, camera-follow scrolling (unless a map outgrows the screen), touch
controls, save/load, sound. Flag and stop, per the golden rules. *(Touch
controls: this holds for **S1–S9**. **S10 is the one sanctioned
exception** — adopted 2026-07-10, §A.7 — scoped to exactly
`PLANS/M3_TOUCH_AND_MOBILE_PLAN.md` §3–§6, landing after S9. Every other
item on this list — multi-map travel, towns, NPCs, tokens, shops,
camera-follow, save/load, sound — still stays out of M3 entirely.)*

---

## 10. Risk register

| Risk | Likelihood | Mitigation |
|---|---|---|
| Phaser 4 API confusion (v3 training-data skew) | **High** | §2: vendored `skills/` files read before Phaser code; verify against Phaser 4 docs on any API error; pin 4.x exactly |
| `file://` breakage surprising Lewis after M2 refactor | High | §8.3: docs updated in the same commit; explain the *why* |
| Absolute paths break only on GitHub Pages | Medium | §8.4 relative-paths rule; S9 includes a live-site playthrough |
| Arrow keys scroll the page / dead keyboard after battle | Medium | §3 focus + capture rules are implemented in S3 and S7, not left to chance |
| Movement feels mushy or slippery | Medium | §6.2 lock-step + no-physics rule; S3 explicitly budgets tuning time (tween duration 150–220 ms band) |
| Sprite bleed / blurry pixels | Medium | `pixelArt: true` from S1; integer zoom only; sheet cells sliced on exact 64×44 boundaries |
| Attribution debt at 200 sprites | Medium | §7.3 script *generates* CREDITS rows; no asset commits without them |
| Scope creep into M4 (doors, shops, second map) | Medium | §9 do-not-build list; huddle question 3 flags risky steps |
| Save system painted into a corner | Low if rules followed | §4 plain-data constraint enforced every step; `version` field exists from day one |

---

## 11. Open threads this plan leaves for humans

*(Mostly resolved since — see §A.2. Kept for the record.)*

- **Lewis (homework):** B1 flee rule (needed by S7's `canFlee`), B2
  caught-HP policy (S8), B6–B8 world naming/shape (rename `starterMeadow`
  whenever answered; nothing blocks), B10 hero identity (cosmetic) —
  **all answered 2026-07-06**, `DECISIONS.md` rows 14–45.
- **Jeff:** confirm tech stack `[TO CONFIRM]` in `DESIGN.md` — this plan
  assumes the recommended default and effectively *is* the confirmation,
  so flip it when committing this file; decide zoom level (2× vs 3×) at S1
  by eyeball on the family screen.
- **Pre-M5 planning session (separate):** save/load design, evolution
  state, and storage-box design — §4 keeps the door open; that session
  decides what walks through it.

---

*Plan with the Architect, build with the Builder. The hallway is 25 lines —
keep it that way.* 📐🔨
