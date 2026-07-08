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

> **Milestone: M2 — Catching & Team. All 6 roadmap steps done ✅, plus M5-plan S1 ✅. Left before M2 fully wraps: save v1 (S3) + export/import (S4).** *(Update this line as we progress.)*
> M1 (the battle slice) is complete and live. M2's steps: code split into `src/` files (Step 1), Leafick + a Choose Your Starter screen (Step 2), a random wild opponent every battle via the `startBattle(config)` contract with a Run button that always works (Step 3), a **Throw Fakeaball** catch action using the 50%-base capture formula (Step 4), the M5-plan **S1** state foundation (species keyed in `FAKEAMON`, `src/state.js`'s `newIndividual()`/`statsFor()`, every fighter an individual with its own `currentHP`), **Step 5**'s **team list** (`gameState.party`/`gameState.box`, up to 4 active + Boxes overflow, no nicknames — Lewis's B3), and now **Step 6** (2026-07-08): **Switch** works two ways — mid-battle, it's a real turn-costing action next to Attack/Catch/Run (same speed-order risk as Catch: faster switches in safely, slower risks your current fighter fainting before the swap completes — Jeff & Lewis's live call, decision #48), and between encounters it's free from the team screen. Mid-battle switching required upgrading `battle.js` to the M3 plan's full contract shape (`config.playerParty` — a live reference to `gameState.party` — instead of a single `config.player`), so `party[0]` is always "who's fighting" and a switch is instantly visible everywhere via a new `onStateChange` hook that keeps the team row in sync live. **Next up:** the M5-plan's **S3** (save v1 — autosave, Continue/New Game) before M2 is fully closed out. Lewis cleared the whole homework backlog (B1–B32) on 2026-07-06 — see `DECISIONS.md` rows 14–45. Only B33 (where to swap boxed Fakeamon) is still open, not needed until M5. Live at [jhester599.github.io/fakeamon_spark](https://jhester599.github.io/fakeamon_spark/), auto-deployed via GitHub Pages.
>
> **M3 prep is staged ("M3S0", 2026-07-06):** meadow tilesets + hero walk sheet + Frondly vendored (Leafick has real art now — all three starters do), the sprite-slicer tool built and run, `src/data/maps.js` drafted with The Meadows, and Phaser 4 skills vendored. Full inventory: `PLANS/M3_OVERWORLD_PLAN.md` **§A.4** — read §A before any M3 session. M3 *code* steps (S1–S9) have NOT started; M2 still finishes first. **Wild-roster art is FULLY staged (2026-07-06, Jeff's Cowork wiki run):** the entire §16 pool — now **198** after `bearloch`/`foxko` were dropped for having no credit anywhere — is vendored with verified attribution (**198 staged, 0 pending** in `CREDITS_ROSTER.md`), reference data in `tools/roster-200.json`. Two ⚠️ remain before those specific sprites reach the live game: the OPMon-derived trio (coaldiak/ninjasmine/toxiris — confirm OPMon's terms) and the hero sheet's Catch Challenger share-alike confirmation (`CREDITS.md`). **Every wild Fakeamon also has a PROPOSED home area** (`VENTA_ROSTER_DRAFT.md` + `areaProposed` in `tools/roster-200.json`) — that's Lewis's homework **B37**, a draft to react to, not a decision.

## Scope guardrails

**Build now (M2 only):** wild opponents, catching with Fakeaballs, a team of 4 with Boxes overflow, switching fighters — **plus** the state/save foundation steps the M5 plan schedules *into* M2 (individuals & the state bag, the `startBattle` contract, save v1 — see `PLANS/M5_STATE_AND_SAVE_PLAN.md` §6, steps S1–S4).

**Do NOT build yet:** overworld/map and anything Phaser (M3 — but M2's battle module must end up matching the M3 plan's §5 contract), gyms, mini-bosses, shops, tokens, cooking, evolution machinery (M4–M5). If a change starts pulling in out-of-scope systems, pause and flag it.

**Scheduled but paced area-by-area — check the step before touching:** expanding the wild-encounter roster beyond the starters. `CONTENT_REFERENCE.md` §16 has ~200 Tuxemon (198 staged) pre-selected and typed for this. As of the 2026-07-08 roadmap reorg it's now on the roadmap, split by area: **M3 Step 6** wires in The Meadows' slice (the one map M3 builds), and **M4 Step 6** grows the roster area-by-area as gym badges open each new area (The Forest, Foggy City, Snow Mountain, The Factory, The Lagoon — `DESIGN.md` §7, `DECISIONS.md` B8), carrying on into M5's late-game areas. Don't front-run it: only wire in the slice for the area actually being built. *(The art/licensing legwork for the whole pool IS pre-staged — §16's staging note — the per-area work is the creative wiring: Lewis's renames, encounter tables, stats.)*

## Tech stack

**CONFIRMED (2026-07-06) by Jeff:**

- **M1–M2 (battle, catching, team): plain HTML + CSS + JavaScript, no build step.** A single page: buttons for moves, `<div>` HP bars, a text log. Open the file in a browser and it just works. This keeps things maximally understandable for Lewis — no game-engine concepts needed yet.
- **M3 (overworld) onward:** adopt **Phaser** when we need tile maps and sprite movement.
- **Art:** M1 used placeholder colored boxes + names to start; real Tuxemon sprites are already dropping in for the starters (see Assets below), full roster art lands at M3.

## Current project structure

```
index.html         → loads the game scripts (plain <script> tags, no build step, no modules)
src/data/moves.js       → MOVES data (tweak power/accuracy here)
src/data/fakeamon.js    → GROWLER, WHALEY, LEAFICK data (stats, sprite paths)
src/data/typechart.js   → TYPE_CHART matchup table
src/data/maps.js        → The Meadows map draft (tile arrays + encounters) — staged for M3, NOT loaded by index.html yet
src/battle.js       → the startBattle(config) contract + all battle logic (turns, damage, HP, win/lose/flee)
src/main.js         → the conductor: starter-select screen, picks each random wild opponent
roadmap.html        → visual quest map — mirrors ROADMAP.md; update BOTH in the same commit whenever a step's done-status changes (they drifted once, 2026-07-06 — see ROADMAP.md golden rule #6), also served live
homework.html        → interactive worksheet for Lewis & Jeff (mirrors HOMEWORK.md)
/assets/sprites      → real Tuxemon-based art in use (growler.png, whaley.png, leafick.png)
/assets/sprites/battle → vendored original source sheets (slicer input)
/assets/sprites/front|back|idle → sliced battle + overworld sprites, made by tools/slice-sheets.mjs (for M3)
/assets/sprites/player → hero.png walk sheet for M3 (⚠️ license check pending — see CREDITS.md)
/assets/tilesets     → meadow.png (the composed tileset The Meadows draws with) + the George originals it came from
tools/               → dev-only Node scripts (slice-sheets.mjs + its manifest) — never loaded by the game
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
HOMEWORK_BACKLOG.md → the big question bank (B1–B36) for the whole game;
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

Turn the one-off battle into "catch creatures and build a team." Steps 1–4
are done. What's left, in order (full tables: `ROADMAP.md` M2 +
`PLANS/M5_STATE_AND_SAVE_PLAN.md` §6):

| Step | What we build | Where it's specced |
|---|---|---|
| **3** ✅ | A **random wild opponent** — the global `startBattle(config) → Promise<outcome>` contract lives in `src/battle.js`; starter-select moved to `src/main.js`. Flee (Run button) always works (B1); wild level uses the team-average as an M2 stand-in until M3's areas exist (B4, `DESIGN.md` §5). *(Note: this M2-sized contract uses plain `player`/`enemy` species objects, not yet `playerParty`/species-key+level — those arrive with individuals at M5-plan S1 and leveling at M5-plan S5.)* | contract shape: M3 plan §5 · globals version: M5 plan §A.2 |
| **4** ✅ | **Catch action + Fakeaball** — "Throw Fakeaball" button, capture formula (50% base rate × missing-HP fraction, floor/cap; Lewis's call), only the basic ball for now (Great/Ultra/Cosmic bonuses are Jeff's number-tuning). Throwing a ball takes your turn, same speed-order rule as attacking — a failed throw lets the wild Fakeamon counter-attack. Caught Fakeamon are logged as fully healed (B2) with `"Gotcha! <name> was caught!"` / `"Oh no! <name> broke free!"` (B5); the encounter just ends for now — actually joining a team lands with the state bag at Step 5 | formula: `DESIGN.md` §6 |
| *M5-plan **S1** — before Step 5* | **Individuals & the state bag** — `src/state.js`, `newIndividual()`, `statsFor()`; retires the `hp[name]` map so two Growlers don't share HP | M5 plan §1 + §A.3 |
| **5** | **Team list** — up to 4 active, overflow to Boxes. No nicknames — species names only (B3, decided) | decision #11 |
| **6** | **Switch** which Fakeamon fights, including from Boxes | — |
| *M5-plan **S3–S4** — end of M2* | **Save v1** (autosave to localStorage, Continue/New Game), then **export/import** | M5 plan §4 |

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
- **M1's gameplay never needed art** — but as a bonus, ahead of schedule, all 3 starters (Growler, Whaley, Leafick) now show real Tuxemon-based art (see `CREDITS.md`). The rest of the roster is still planned for **M3 Step 3** (see `ROADMAP.md`) — this section documents what we already confirmed so that step is fast when we get there.
- **✅ Resolved:** Growler's (Hissiorite) and Leafick's (Frondly) sprites have no entry in Tuxemon's own `ATTRIBUTIONS.md`, but both artists are now confirmed via the wiki — see `CONTENT_REFERENCE.md` §13 and `CREDITS.md`. No longer a blocker for public distribution.

## Git

- Commit **often**, after each small working step, with plain messages ("add damage formula", "growler can now use Flare").
- Keep `main` runnable. Nothing fancy needed — small frequent commits beat big ones.
- **Ticking a step done? Update `ROADMAP.md` and `roadmap.html` together, same commit.** See ROADMAP.md golden rule #6 — they drifted once and it shipped as a real bug.

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
