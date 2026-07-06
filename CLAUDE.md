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

> **Milestone: M1 — Battle Slice. Complete! 🎉** *(Update this line as we progress.)*
> Growler vs Whaley is a full playable battle: move buttons, damage, type advantage, misses, HP bars, fainting, and a win/lose screen with Play Again. M2 (Catching & Team) is next — see `ROADMAP.md`. Live at [jhester599.github.io/fakeamon_spark](https://jhester599.github.io/fakeamon_spark/), auto-deployed via GitHub Pages.

## Scope guardrails

**Build now (M1 only):** a single turn-based battle between two Fakeamon — choose a move, resolve damage, update HP, someone faints, win/lose screen.

**Do NOT build yet:** overworld/map, catching, inventory, gyms, mini-bosses, shops, cooking, evolutions, saving. Those are later milestones (M2–M5 in `DESIGN.md`). If a change starts pulling in out-of-scope systems, pause and flag it.

## Tech stack

**CONFIRMED (2026-07-06) by Jeff:**

- **M1–M2 (battle, catching, team): plain HTML + CSS + JavaScript, no build step.** A single page: buttons for moves, `<div>` HP bars, a text log. Open the file in a browser and it just works. This keeps things maximally understandable for Lewis — no game-engine concepts needed yet.
- **M3 (overworld) onward:** adopt **Phaser** when we need tile maps and sprite movement.
- **Art:** M1 used placeholder colored boxes + names to start; real Tuxemon sprites are already dropping in for the starters (see Assets below), full roster art lands at M3.

## Current project structure

```
index.html         → loads the game scripts (plain <script> tags, no build step, no modules)
src/data/moves.js       → MOVES data (tweak power/accuracy here)
src/data/fakeamon.js    → GROWLER, WHALEY data (stats, sprite paths)
src/data/typechart.js   → TYPE_CHART matchup table
src/battle.js       → all battle logic (turns, damage, HP, win/lose)
roadmap.html        → visual quest map (mirrors ROADMAP.md), also served live
homework.html        → interactive worksheet for Lewis & Jeff (mirrors HOMEWORK.md)
/assets/sprites      → real Tuxemon-based art in use (growler.png, whaley.png)
/assets/sprites/battle → vendored original source sheets, for future slicing (M3)
.github/workflows    → deploy-pages.yml (auto-publishes to GitHub Pages on push to main)

DESIGN.md    → full design spec (source of truth)
CLAUDE.md    → this file — working brief + current milestone
ROADMAP.md   → stepwise M1–M5 build plan, what's done/next
DECISIONS.md → decision log + the loop for folding Lewis's picks into DESIGN.md
MODELS.md    → which Claude model to use per step + the pre-step Model Huddle
HOMEWORK.md  → open questions waiting on Lewis and Jeff
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

## Milestone 1 — build this

Two Fakeamon fight. Player controls Growler; a simple opponent controls Whaley (random move is fine for now).

**Combatants (level 5):**

| | HP | Attack | Defense | Speed | Moves |
|---|---|---|---|---|---|
| **Growler** (Fire) | 40 | 13 | 10 | 12 | Tackle, Bite, Burn, Flare |
| **Whaley** (Water) | 44 | 12 | 12 | 9 | Tackle, Splash, Spout, Breech |

**Moves** `{ name, type, power, accuracy }`:
- Growler: Tackle (Normal, 8, 100%), Bite (Normal, 10, 95%), Burn (Fire, 12, 95%), Flare (Fire, 18, 85%)
- Whaley: Tackle (Normal, 8, 100%), Splash (Water, 8, 100%), Spout (Water, 12, 95%), Breech (Water, 16, 90%)

**Rules:**
- **Turn order** by Speed (ties → player).
- **Accuracy:** roll per move; a miss does nothing that turn (misses should be rare).
- **Damage:** `raw = power + attackerAttack − defenderDefense` (min 1); `damage = round(raw × typeMultiplier × random(0.85–1.15))`.
- **Type chart** (attacker vs defender):

| ↓ vs → | Fire | Water | Grass | Metal |
|---|---|---|---|---|
| Fire | 1 | 0.5 | 2 | 2 |
| Water | 2 | 1 | 0.5 | 1 |
| Grass | 0.5 | 2 | 1 | 0.5 |
| Metal | 0.5 | 1 | 2 | 1 |
| Normal | 1 | 1 | 1 | 1 |

- Reduce HP; at 0 the Fakeamon faints and the battle ends with a win/lose message.

**Definition of done for M1:** you can play a full Growler-vs-Whaley battle in the browser, moves sometimes miss, type advantage visibly matters, and a typical fight lasts about **3–5 hits** per side.

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
- These are **2×2 sprite sheets (128×88px)**, not flat single sprites — front pose / back pose × a 2-frame idle animation, each cell ~64×44px. Slice frames from the sheet, then scale 3–4× with nearest-neighbor.
- Gym-leader (trainer NPC) art lives in a *different* folder: `mods/tuxemon/sprites/<name>.png`.
- When we add any asset, record it in **`CREDITS.md`**: file, our name for it, source path, artist(s), license, and the commit the file was pulled from (the branch moves).
- **M1's gameplay never needed art** — but as a bonus, ahead of schedule, Growler and Whaley now show real Tuxemon-based art (see `CREDITS.md`). The rest of the roster is still planned for **M3 Step 3** (see `ROADMAP.md`) — this section documents what we already confirmed so that step is fast when we get there.
- **✅ Resolved:** Growler's (Hissiorite) and Leafick's (Frondly) sprites have no entry in Tuxemon's own `ATTRIBUTIONS.md`, but both artists are now confirmed via the wiki — see `CONTENT_REFERENCE.md` §13 and `CREDITS.md`. No longer a blocker for public distribution.

## Git

- Commit **often**, after each small working step, with plain messages ("add damage formula", "growler can now use Flare").
- Keep `main` runnable. Nothing fancy needed — small frequent commits beat big ones.

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
