# CLAUDE.md — Fakeamon

Context for Claude Code. Read this first every session. The full design lives in **`DESIGN.md`** — that's the source of truth; this file is the working brief.

---

## The project

**Fakeamon** is a turn-based, monster-collecting RPG (Pokémon-style) built as a father-and-son project. You explore an overworld, catch creatures called **Fakeamon**, battle them turn-by-turn, and eventually stop a legendary Fakeamon named **Artemis** from dropping a meteor on the world. Full spec: `DESIGN.md`.

## Who's building this — and how to work with us

- **Jeff** (experienced, drives the repo) and **Lewis** (age 10, co-designer and co-coder).
- This is a **teaching project as much as a coding project.** Please:
  - Explain changes in plain language a 10-year-old can follow. Say *what* changed and *why*, briefly.
  - Prefer **small, readable steps** over clever or dense code. Clear names, short functions, helpful comments.
  - After each change, make sure it **actually runs** so Lewis can see the result right away.
  - Move **one small step at a time.** Suggest the next step; don't sprint ahead five features.
  - Make **numbers easy to tweak** (move power, HP, catch rate). Lewis will want to experiment — keep game values in obvious, well-labeled spots.
  - Keep it **fun and encouraging.** This should feel like play.

## 🤝 Start every session with the Model Huddle

**Before writing any code**, run the Model Huddle from **`MODELS.md`**:

1. Ask **which roadmap step** we're doing.
2. State the **recommended model + effort** from the table in `MODELS.md` and
   ask Jeff & Lewis to **discuss and confirm or override**. If the session's
   current model/effort doesn't match their pick, remind them to run
   `/model` and `/effort` first, then wait.
3. Ask **Lewis for his prediction**: which files will change, and what's the
   riskiest part? (Compare against the actual diff at the end of the step.)

Don't skip this even if the step seems obvious — the huddle *is* part of the
project. After the step works, briefly reflect: was the model pick right?

## Current status

> **Milestone: M3 — Overworld. FULLY COMPLETE ✅ (S1–S4 2026-07-09/10; S5–S7 2026-07-11; S8–S11 2026-07-12) → 25/36 steps total. Now on M4.** Phaser's in, The Meadows renders, you walk it with an animated hero (keyboard or the S10 on-screen D-pad, "Pocket Venta"), wild Fakeamon idle in the grass, walking into one opens a real battle (win/catch clears it — but cleared ones **respawn over time**, S8, so The Meadows never empties out — fleeing leaves it), catching or beating one earns real XP (S8), and the temporary "Battle test" button is gone (S9). **S11 (2026-07-12)** swapped The Meadows' 3-starter placeholder encounters for its real **14-line wild-roster slice** (`VENTA_ROSTER_DRAFT.md`) — `aardorn`/`baoby`/`capiti`/`chenipode`/`chickadee`/`dandicub`/`hatchling`/`lambert`/`marvillar`/`pairagrin`/`pantherafira`/`shybulb`/`snaki`/`tumbleworm`, sprites sliced (`tools/slice-sheets.mjs`, now with an optional slug-filter arg), stats from a `[TUNE]` per-type archetype table in `src/data/fakeamon.js` (not hand-authored — Jeff/Lewis weren't here to tune 14 monsters live). ⚠️ **Names are placeholder Title-Cased slugs — Lewis's rename pass is still pending**, nothing here guesses on his behalf. The roadmap uses the **MxSy** convention (`roadmap.html`/`ROADMAP.md` share one numbering with the plans, `tools/check-roadmap.mjs` keeps counts in sync). M2 is FULLY complete ✅ too (save v1 + export/import). The overworld is the hub — walking into a wild Fakeamon reaches a battle via the `src/screens.js` handoff, then returns to the map. **Offline play added (2026-07-12, Jeff's request):** the game is now a PWA — `manifest.webmanifest` + `service-worker.js` cache everything on first visit, so it plays with no network after that, and "Add to Home Screen" on Android installs a real app icon (placeholder art — Growler — via `tools/make-icon.mjs`). Verified: a fully offline reload still loads the title screen, Continue, walks the map, and fights a real battle. Next: M4 Step 1 (Tokens).** *(Update this line as we progress.)*
> M1 (the battle slice) is complete and live. M2's steps: code split into `src/` files (Step 1), Leafick + a Choose Your Starter screen (Step 2), a random wild opponent every battle via the `startBattle(config)` contract with a Run button that always works (Step 3), a **Throw Fakeaball** catch action using the 50%-base capture formula (Step 4), the M5-plan **S1** state foundation (species keyed in `FAKEAMON`, `src/state.js`'s `newIndividual()`/`statsFor()`, every fighter an individual with its own `currentHP`), **Step 5**'s **team list** (`gameState.party`/`gameState.box`, up to 4 active + Boxes overflow, no nicknames — Lewis's B3), and now **Step 6** (2026-07-08): **Switch** works two ways — mid-battle, it's a real turn-costing action next to Attack/Catch/Run (same speed-order risk as Catch: faster switches in safely, slower risks your current fighter fainting before the swap completes — Jeff & Lewis's live call, decision #48), and between encounters it's free from the team screen. Mid-battle switching required upgrading `battle.js` to the M3 plan's full contract shape (`config.playerParty` — a live reference to `gameState.party` — instead of a single `config.player`), so `party[0]` is always "who's fighting" and a switch is instantly visible everywhere via a new `onStateChange` hook that keeps the team row in sync live. **S3 (save v1) and S4 (export/import) are now done (2026-07-10, `src/save.js`), so M2 is fully closed out; M3 is fully done too (see the milestone line above). Next up:** **M4** Step 1 (Tokens). Lewis cleared the homework backlog on 2026-07-06 (B1–B32) and answered the last ten (B33–B42) on 2026-07-11 — every creative-director question B1–B42 is now decided (`DECISIONS.md` rows 14–45 and 51–60); only Jeff's number-tuning list remains. Live at [jhester599.github.io/fakeamon_spark](https://jhester599.github.io/fakeamon_spark/), auto-deployed via GitHub Pages.
>
> **Two small M2 follow-ups (decided 2026-07-10, built 2026-07-22):** Fakeaballs are now limited — `gameState.inventory.balls.fakeaball` starts at **5** (`STARTING_FAKEABALLS`, `src/state.js`), each throw decrements it (caught or not), and the "Throw Fakeaball" button shows the live count and disables at zero. And a successful catch now pauses on a **Continue** button (`showContinueButton`, `src/battle.js`) the same way a win/loss does, instead of resolving straight into the next screen. Both wired through the `config.inventory` live reference (same pattern as `config.playerParty`) and persisted in save v1 (`src/save.js`, no version bump needed — same trick as `world`). See `DECISIONS.md` #49–50, `DESIGN.md` §6/§9.
>
> **M3 prep is staged ("M3S0", 2026-07-06):** meadow tilesets + hero walk sheet + Frondly vendored (Leafick has real art now — all three starters do), the sprite-slicer tool built and run, `src/data/maps.js` drafted with The Meadows, and Phaser 4 skills vendored. Full inventory: `PLANS/M3_OVERWORLD_PLAN.md` **§A.4** — read §A before any M3 session. **M3 *code* steps S1–S4 are done ✅ (2026-07-09/10): Phaser 4.2.1 vendored to `assets/vendor/`; `src/world/config.js` draws The Meadows from `src/data/maps.js` and walks an animated hero on the grid (tween movement, tree/edge collision, position saved); the overworld is the hub and the temporary "Battle test" button bridges to a battle until the S7 handoff. See `PLANS/M3_OVERWORLD_PLAN.md` §A.5 (S1) + §A.6 (S2–S4). **S5–S7 done 2026-07-11** — wild Fakeamon idle on the map (`spawnEncounters`), and walking into one opens the real battle via the new `src/screens.js` screen manager + the `handleEncounter`→`startMapEncounter`→`enterBattle` handoff (win/catch `removeEncounter`s it, tracked in `defeatedEncounters`). **S8 done 2026-07-12** — real XP + wild-Fakeamon respawn (see the milestone line above). **S9 done 2026-07-12** — the temporary "Battle test" button and its dead code are gone. **S10 done 2026-07-12** — touch/mobile play, see the milestone line above. Next: S11.** **Wild-roster art is FULLY staged (2026-07-06, Jeff's Cowork wiki run):** the entire §16 pool — now **198** after `bearloch`/`foxko` were dropped for having no credit anywhere — is vendored with verified attribution (**198 staged, 0 pending** in `CREDITS_ROSTER.md`), reference data in `tools/roster-200.json`. Two ⚠️ remain before those specific sprites reach the live game: the OPMon-derived trio (coaldiak/ninjasmine/toxiris — confirm OPMon's terms) and the hero sheet's Catch Challenger share-alike confirmation (`CREDITS.md`). **Every wild Fakeamon also has a home area** (`VENTA_ROSTER_DRAFT.md` + `areaProposed` in `tools/roster-200.json`) — Lewis's homework **B37**, now **approved as-is (2026-07-11, `DECISIONS.md` #55)**: `areaProposed` becomes the real `area` as each area's roster is wired in (M3S11 → M4S6).

## Scope guardrails

**Build now (M3 — the overworld):** M1 and M2 are complete; **M3S1–M3S7 are done** (Phaser's in, The Meadows renders, you walk it with an animated hero, wild Fakeamon stand in the grass, and walking into one opens the real battle and returns you to the map). **Next is M3S8** (catch-on-map depth + XP), then M3S9 (cleanup + docs), M3S10 (touch / "Pocket Venta"), M3S11 (the wild-roster expansion). Build against the settled map↔battle seam: `src/screens.js` + the `startMapEncounter` → `enterBattle` → `handleBattleOutcome` handoff (M3 plan §3/§5).

**Do NOT build yet:** gyms, mini-bosses, shops, tokens, cooking, evolution machinery (M4–M5). Touch/mobile controls are sanctioned **only** at M3S10 (after S9) and scoped to `PLANS/M3_TOUCH_AND_MOBILE_PLAN.md`. If a change starts pulling in an M4–M5 system, pause and flag it. *(M1/M2 are the historical record — the battle slice, then catching + a team of 4 with Boxes + switching + save v1/export-import; full detail in `ROADMAP.md`.)*

**Scheduled but paced area-by-area — check the step before touching:** expanding the wild-encounter roster beyond the starters. `CONTENT_REFERENCE.md` §16 has ~200 Tuxemon (198 staged) pre-selected and typed for this. It's on the roadmap, split by area: **M3S11** wires in The Meadows' slice (the one map M3 builds), and **M4S6** grows the roster area-by-area as gym badges open each new area (The Forest, Foggy City, Snow Mountain, The Factory, The Lagoon — `DESIGN.md` §7, `DECISIONS.md` B8), carrying on into M5's late-game areas. Don't front-run it: only wire in the slice for the area actually being built. *(The art/licensing legwork for the whole pool IS pre-staged — §16's staging note — the per-area work is the creative wiring: Lewis's renames, encounter tables, stats.)*

## Tech stack

**CONFIRMED (2026-07-06) by Jeff:**

- **M1–M2 (battle, catching, team): plain HTML + CSS + JavaScript, no build step.** A single page: buttons for moves, `<div>` HP bars, a text log. Open the file in a browser and it just works. This keeps things maximally understandable for Lewis — no game-engine concepts needed yet.
- **M3 (overworld) onward:** adopt **Phaser** when we need tile maps and sprite movement. **As of M3 S1 (2026-07-09):** Phaser **4.2.1** is **vendored** at `assets/vendor/phaser.min.js` (MIT) and loaded as a plain `<script>` global — *not* a CDN — so double-click-to-play still works offline (`DECISIONS.md`; `PLANS/M3_OVERWORLD_PLAN.md` §2). ⚠️ Read the matching file in `PLANS/phaser-skills/` before writing any Phaser code.
- **Art:** M1 used placeholder colored boxes + names to start; real Tuxemon sprites are already dropping in for the starters (see Assets below), full roster art lands at M3.

## Current project structure

```
index.html         → loads the game scripts (plain <script> tags, no build step, no modules); hosts #world (Phaser canvas) above #battle (the plain-HTML fight)
assets/vendor/phaser.min.js → the Phaser game engine, vendored & pinned to 4.2.1 (MIT) — see CREDITS.md; loaded before src/world/config.js
src/data/moves.js       → MOVES data (tweak power/accuracy here)
src/data/fakeamon.js    → GROWLER, WHALEY, LEAFICK data (stats, sprite paths)
src/data/typechart.js   → TYPE_CHART matchup table
src/data/maps.js        → The Meadows as plain tile arrays + encounters; loaded by index.html and drawn by src/world/config.js (S2). Edit a number, refresh, the world changes. (Encounters became wired to battles at S6/S7 — walking into one starts the fight.)
src/battle.js       → the startBattle(config) contract + all battle logic (turns, damage, HP, win/lose/flee)
src/save.js         → save v1 (M5-plan S3/S4): saveGame/loadGame/clearSave + version/migration, and exportSave/importSaveFromFile. localStorage single slot "fakeamon-save"
src/world/config.js → the Phaser overworld — BootScene, WorldScene (draws The Meadows, walks the hero via heldDirection() — keyboard or the S10 D-pad, stands wild Fakeamon in the grass via spawnEncounters, and handleEncounter → the S7 battle handoff / removeEncounter / respawnEncounter), and startWorld() (Scale Manager FIT mode as of S10). World numbers (size, zoom cap, color) are labeled constants here
src/world/dpad.js  → the on-screen D-pad, "Pocket Venta" (M3 S10): plain DOM buttons + Pointer Events feed WorldScene's virtualPad seam; PLANS/M3_TOUCH_AND_MOBILE_PLAN.md §3–§6
src/screens.js      → the tiny screen manager (M3 S7): showWorld()/showBattle() swap between the map and the battle — hiding+freezing the map (and the D-pad, S10) during a fight, refocusing it after. The ONLY place #world's visibility + the world scene's paused/input state are touched (M3 plan §3)
src/main.js         → the conductor: title screen (Continue/New Game + Export/Import), boots the overworld (startWorld), runs starter-select, and owns the battle handoff — enterBattle / startMapEncounter / handleBattleOutcome (bump → battle → back to the map), autosaving after every change
roadmap.html        → visual quest map — mirrors ROADMAP.md (one row per MxSy step); update BOTH in the same commit whenever a step's done-status changes, then run `node tools/check-roadmap.mjs` to prove they still agree (see ROADMAP.md golden rule #6), also served live
homework.html        → interactive worksheet for Lewis & Jeff (mirrors HOMEWORK.md)
/assets/sprites      → real Tuxemon-based art in use (growler.png, whaley.png, leafick.png)
/assets/sprites/battle → vendored original source sheets (slicer input)
/assets/sprites/front|back|idle → sliced battle + overworld sprites, made by tools/slice-sheets.mjs (for M3)
/assets/sprites/player → hero.png walk sheet for M3 (⚠️ license check pending — see CREDITS.md)
/assets/tilesets     → meadow.png (the composed tileset The Meadows draws with) + the George originals it came from
/assets/icons        → PWA app icons (icon-192.png, icon-512.png), made by tools/make-icon.mjs — placeholder art (Growler's front sprite), swap freely
manifest.webmanifest → PWA manifest (name, icons, standalone display) — what makes "Add to Home Screen" on Android install a real app icon
service-worker.js    → offline play (added 2026-07-12): caches every file the game needs on first (online) visit, so it keeps working with no network after. ⚠️ Read its header comment — CACHE_VERSION must be bumped on every asset-changing deploy, or updates never reach offline players. Registered from src/main.js
sw-precache-list.js  → GENERATED by tools/generate-sw-manifest.mjs — the exact file list service-worker.js caches. Re-run that script (and commit the result) after adding new assets
tools/               → dev-only Node scripts (slice-sheets.mjs + its manifest — now takes an optional slug-filter arg; generate-sw-manifest.mjs — regenerates sw-precache-list.js; make-icon.mjs — composes a PWA icon from any sprite; check-roadmap.mjs — the roadmap consistency guard, run it after any step change) — never loaded by the game
PLANS/phaser-skills/ → vendored Phaser 4 skill docs — read the matching one BEFORE writing any Phaser code (M3 plan §2)
.github/workflows    → deploy-pages.yml (auto-publishes to GitHub Pages on push to main)

DESIGN.md    → full design spec (source of truth)
CLAUDE.md    → this file — working brief + current milestone
ROADMAP.md   → stepwise M1–M5 build plan, what's done/next
DECISIONS.md → decision log + the loop for folding Lewis's picks into DESIGN.md
MODELS.md    → which Claude model to use per step + the pre-step Model Huddle
PLANS/       → architecture plans from high-end planning sessions:
               M3_OVERWORLD_PLAN.md governs all M3 work AND constrains the
               remaining M2 steps (its §5 battle contract — see the M5
               plan's §A for how); M5_STATE_AND_SAVE_PLAN.md owns game
               state, XP, evolution, and saving — read its §A first, it
               reconciles the plans against the code as it actually exists
HOMEWORK.md  → open questions waiting on Lewis and Jeff
HOMEWORK_BACKLOG.md → the big question bank (B1–B42, all decided) for the whole game;
               HOMEWORK.md gets served 2–4 questions at a time from here
CREDITS.md   → art attribution: file, source, artist, license, commit pulled from
CONTENT_REFERENCE.md → where Tuxemon-sourced art/data/roster ideas come from + licensing rules
README.md    → repo front page, links to the live site
```

**Why plain `<script src="...">` and not ES modules (`import`/`export`)?**
Modules require a server — they fail with a CORS error when you just
double-click `index.html`. Plain scripts sharing the global scope keep
"open the file and it just works" true. Revisit this if the project ever
needs real modules (e.g. bundling for Phaser at M3).

## How to run

**Play it live:** [jhester599.github.io/fakeamon_spark](https://jhester599.github.io/fakeamon_spark/)
— auto-deployed from `main` on every push, always current.

**Or run it locally:** no tooling needed — open `index.html` in a browser,
or use a simple local server like `python3 -m http.server`.

---

## Milestone 2 — build this

Turn the one-off battle into "catch creatures and build a team." **All of
this is now done ✅ (M2 complete, 2026-07-10)** — kept here as the record
(full tables: `ROADMAP.md` M2 + `PLANS/M5_STATE_AND_SAVE_PLAN.md` §6):

| Step | What we build | Where it's specced |
|---|---|---|
| **3** ✅ | A **random wild opponent** — the global `startBattle(config) → Promise<outcome>` contract lives in `src/battle.js`; starter-select moved to `src/main.js`. Flee (Run button) always works (B1); wild level uses the team-average as an M2 stand-in until M3's areas exist (B4, `DESIGN.md` §5). *(Note: this M2-sized contract uses plain `player`/`enemy` species objects, not yet `playerParty`/species-key+level — those arrive with individuals at M5-plan S1 and leveling at M5-plan S5.)* | contract shape: M3 plan §5 · globals version: M5 plan §A.2 |
| **4** ✅ | **Catch action + Fakeaball** — "Throw Fakeaball" button, capture formula (50% base rate × missing-HP fraction, floor/cap; Lewis's call), only the basic ball for now (Great/Ultra/Cosmic bonuses are Jeff's number-tuning). Throwing a ball takes your turn, same speed-order rule as attacking — a failed throw lets the wild Fakeamon counter-attack. Caught Fakeamon are logged as fully healed (B2) with `"Gotcha! <name> was caught!"` / `"Oh no! <name> broke free!"` (B5); the encounter just ends for now — actually joining a team lands with the state bag at Step 5 | formula: `DESIGN.md` §6 |
| *M5-plan **S1** — before Step 5* | **Individuals & the state bag** — `src/state.js`, `newIndividual()`, `statsFor()`; retires the `hp[name]` map so two Growlers don't share HP | M5 plan §1 + §A.3 |
| **5** ✅ | **Team list** — up to 4 active, overflow to Boxes. No nicknames — species names only (B3, decided) | decision #11 |
| **6** ✅ | **Switch** which Fakeamon fights, including from Boxes | — |
| *M5-plan **S3–S4** — end of M2* ✅ | **Save v1** (autosave to localStorage, Continue/New Game title screen) + **export/import** — `src/save.js` | M5 plan §4 |

Battle rules (damage, accuracy, type chart, stats) are unchanged from M1 —
they live in `src/battle.js` and `src/data/*.js` now; those files are the
truth, tweak numbers there. The M1 spec remains in `DESIGN.md` §6 and
`ROADMAP.md`.

**Definition of done for M2:** you can fight a wild Fakeamon, weaken it,
catch it, see it join a team of up to 4 (overflow to Boxes), and swap
fighters — and the battle module is the clean `startBattle` contract that
M3 will call without changes.

---

## Core mechanics reference

Don't re-invent these — they're specified in `DESIGN.md`:
- Battle system, damage & capture formulas → §6
- Types, the Tuxemon→our-type mapping, and the **Metal**/**Cosmic** type decision → §4
- Stats, mini-boss tier, and **Artemis** (HP = 2× strongest mini-boss; self-hitting Meteor Shower) → §5–6
- Full roster: 5 mini-bosses, 3 gyms → §8
- Roadmap M1–M5 → §11

## Data conventions

Keep game content as **plain data**, separate from logic, so it's easy to read and tweak:

```js
// src/data/moves.js
const MOVES = {
  flare: { name: "Flare", type: "fire", power: 18, accuracy: 85 },
  // …
};

// src/data/fakeamon.js
const GROWLER = {
  name: "Growler", type: "fire",
  maxHP: 40, attack: 13, defense: 10, speed: 12,
  moves: ["tackle", "bite", "burn", "flare"],
};
```

No `export`/`import` — see "Why plain `<script src="...">`" above for why.

Type names lowercase and consistent (`"fire"`, `"water"`, `"grass"`, `"metal"`, `"normal"`, `"cosmic"`).

## Assets & attribution

- **Read `CONTENT_REFERENCE.md` before pulling any new Tuxemon art, sound, or creature data** — it's the full guide: why Tuxemon (not Pokémon Void), the complete repo map, per-milestone pull lists, licensing rules, and a 200-monster wild-encounter roster for M3+. This section is the short version.
- Starting art is **Tuxemon** sprites. License is **mixed per asset** (mostly CC BY-SA 4.0, some CC BY 3.0/4.0, a couple Public Domain) — **check each file's actual license before using it**, don't assume one blanket license. Usable with credit; keep art edits under the same (share-alike) license where that applies.
- **Verified source path:** `mods/tuxemon/gfx/sprites/battle/<slug>-sheet.png` on the `development` branch of `github.com/Tuxemon/Tuxemon` — not the wiki, not a guess. Full details and per-creature file list are in `DESIGN.md` §12.
- These are **composite sprite sheets (128×88px)**, not flat single sprites — a 64×64 front pose at (0,0), a 64×64 back pose at (64,0), and a small 2-frame idle animation (two 24×24 frames) at (0,64)/(24,64). *(Corrected 2026-07-06 by measurement — an older "2×2 grid of ~64×44 cells" description was wrong.)* `tools/slice-sheets.mjs` cuts them; scale with nearest-neighbor only.
- Gym-leader (trainer NPC) art lives in a *different* folder: `mods/tuxemon/sprites/<name>.png`.
- When we add any asset, record it in **`CREDITS.md`**: file, our name for it, source path, artist(s), license, and the commit the file was pulled from (the branch moves).
- **M1's gameplay never needed art** — but as a bonus, ahead of schedule, all 3 starters (Growler, Whaley, Leafick) now show real Tuxemon-based art (see `CREDITS.md`). The rest of the roster's art comes later (the slicer is **M3S5**, done; the wild-roster expansion is **M3S11** → **M4S6**, see `ROADMAP.md`) — this section documents what we already confirmed so those steps are fast when we get there.
- **✅ Resolved:** Growler's (Hissiorite) and Leafick's (Frondly) sprites have no entry in Tuxemon's own `ATTRIBUTIONS.md`, but both artists are now confirmed via the wiki — see `CONTENT_REFERENCE.md` §13 and `CREDITS.md`. No longer a blocker for public distribution.

## Git

- Commit **often**, after each small working step, with plain messages ("add damage formula", "growler can now use Flare").
- Keep `main` runnable. Nothing fancy needed — small frequent commits beat big ones.
- **Ticking a step done (or adding/moving/removing one)? Update `ROADMAP.md` and `roadmap.html` together, same commit, then run `node tools/check-roadmap.mjs` — it must print `✅ PASS` before you commit.** The checker recomputes every count from the actual done-marks (`class="done"` / `✅`), checks the meters, and fails if the two files disagree or a counter is wrong — so the roadmap you and Lewis steer by stays accurate. (The header counter drifted and shipped as a real bug **three times** before this guard existed.) Steps are named **`MxSy`** (M‹milestone›S‹step›) — one roadmap row per step. See ROADMAP.md golden rule #6.

## Design decision loop (Lewis is creative director)

Open creative questions live as homework for **Lewis** in `HOMEWORK.md` (writable) and `homework.html` (interactive worksheet). When Jeff relays Lewis's picks, **run the loop** — full details and the question→section index are in **`DECISIONS.md`**:

1. **Log** each pick in the *Decisions Made* table in `DECISIONS.md` (number, decision, Lewis's reason, date), and flip that row's Status to ✅.
2. **Update `DESIGN.md`** — use the Question Index in `DECISIONS.md` to find the matching **[TO DECIDE]** and replace it with the decision, tagged **`DECIDED (date):`** so the open question is gone.
3. **Tick** the question in `HOMEWORK.md` (mark it done).
4. **Update the milestone status** in this file if the decision affects the current build.
5. **Commit** with a plain message, e.g. `"decide: gym badges open a new area"`.

If a pick is unclear or clashes with an existing decision, **ask before writing it in** — don't guess on Lewis's behalf.

## When in doubt

If a design detail isn't decided (e.g., capture tuning, encounter style, whether gyms are single-type), it's marked **[TO DECIDE]** in `DESIGN.md` — **ask Jeff and Lewis rather than guessing.** Small, reversible defaults are fine for prototyping; call them out when you use one. Once decided, it stops being a guess — run the **Design decision loop** above to make it official.
