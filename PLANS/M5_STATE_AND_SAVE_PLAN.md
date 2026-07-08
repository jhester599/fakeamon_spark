# M5 State & Save Plan — Progression, Evolution, Persistence 💾

> **What this is:** the architecture for everything that *persists*: the game
> state model, XP/leveling, evolution, the storage box, and save/load. Written
> in the same high-end planning session as `M3_OVERWORLD_PLAN.md`, against the
> repo as of the M2 Step 2 commit ("add Leafick + Choose Your Starter").
>
> **How to use it:** §A reconciles the two plans with the code as it actually
> exists (the M2 refactor made choices this document respects). §1–§5 are the
> design. §6 is the build order. Most of §1 lands at the **end of M2**, not in
> M5 — persistent state is a foundation, and foundations go in early.
>
> **Relationship to other docs:** `DESIGN.md` owns game rules; this plan owns
> *how progress is represented and survives*. Where a rule is still open
> (evolution levels, XP curve — Jeff's tuning list), this plan builds the
> socket and leaves the number as a clearly-marked constant.

---

## §A. Reconciliation — what changed while planning was underway

The M2 refactor (Steps 1–2, merged as PRs #10–#11) diverged from
`M3_OVERWORLD_PLAN.md` §8 in ways that are **fine but must be acknowledged**:

1. **Plain script tags, not ES modules — deliberately.** `index.html` loads
   `src/data/*.js` then `src/battle.js` as classic scripts sharing globals,
   keeping double-click-to-play alive. **Verdict: keep it.** It's simpler,
   Lewis-friendlier, and Phaser-via-CDN-global is the same style. Amendments
   to the M3 plan:
   - §8.3 (the `file://` breakage warning + dev-server doc changes) is
     **void** — double-click keeps working through M3.
   - All `export`/`import` syntax in both plans should be read as "define a
     global / use the global." One new rule replaces module wiring:
     **script load order is the dependency graph.** Required order:
     `data/*` → `state.js` → `progression.js` → `battle.js` → world scripts.
     A comment block in `index.html` must document this.
   - §8.4 (relative paths only — GitHub Pages) **stands**, unchanged.
2. **The `startBattle(config) → outcome` contract does not exist yet.**
   Current `battle.js` still owns the starter-select screen, auto-runs on
   page load, and resolves fights through module-level variables. That's
   fine for where M2 is — but the contract from the M3 plan §5 must
   materialize during **M2 Steps 3–4** (wild opponents + catching), which is
   its natural moment: "a random wild appears" is precisely a
   `startBattle({enemy: …})` call. Since we're on globals, the promise-based
   contract becomes a global function; the shape is otherwise identical.
   Starter-select then moves out of `battle.js` (it's a *game flow* screen,
   not a battle) — into `src/main.js`, the small conductor script that will
   also own the M5 title screen (§4.3).
   **✅ `config.playerParty` landed at M2 Step 6 (2026-07-08),** later than
   this note originally implied — Steps 3–5 shipped with a simpler
   `config.player` (one individual) since nothing needed the whole party
   yet. It became necessary the moment Switch became a real mid-battle
   action: switching means changing *which* individual is `party[0]`
   mid-fight, which only works if `battle.js` holds the live array, not a
   snapshot of one fighter. `config.onStateChange` (not in the M3 plan's
   original sketch) was added alongside it — an optional callback
   `battle.js` fires after every `renderArena()`, so `main.js`'s team row
   stays in sync during a fight instead of only refreshing once it ends.
3. **✅ Fixed by S1 (2026-07-07):** HP used to live in a name-keyed map —
   `hp[player.name]` — with fighters as the shared species objects
   themselves, so the moment the party contained two Growlers, or a wild
   Growler fought your Growler, both would've read the same HP slot. (Step
   3 papered over the exact-mirror-match case with role-keying, but the
   deeper species-vs-individual gap remained.) S1's individual/species
   split (below) retired the map entirely — HP now lives on each
   individual object, so it's structurally impossible for two creatures to
   share a slot.

### Added 2026-07-06 — docs-integration session, checked against `main` @ `e237770`

4. **The code is exactly where §A assumed.** When these plans were committed,
   `main`'s newest commit was still the M2 Step 2 merge (PR #11) — no M2
   Steps 3+ landed in parallel. §A.1–.3 were verified true against the real
   files: plain script tags in `index.html`, no `startBattle` contract,
   starter-select living inside `battle.js`, and the `hp[name]` map at the
   top of `src/battle.js`. Nothing extra to reconcile in the code itself.
5. **Lewis answered HOMEWORK Round 2 (decisions #11–12), so §1 and §5 are
   less blocked than written.** Team size is **4** and a catch beyond that
   goes to **Boxes** (with switching) — so §1's "max size per Lewis HOMEWORK
   Q1" is now just *4*, and §5's "dump to box + log line" placeholder is the
   *decided* overflow behavior, not a guess. Also decided: **base catch rate
   50%** (#12), which M2 Step 4 builds with. Still genuinely open from §5:
   *where* you swap boxed ⇄ active — filed as **B33** in
   `HOMEWORK_BACKLOG.md`.
6. **The tech-stack confirmation already happened.** `DESIGN.md` §13 was
   flipped to "CONFIRMED (2026-07-06) by Jeff" *before* these plans were
   committed, so the M3 plan §11 item "flip it when committing this file"
   was already done. This session refined the §13 wording (global scripts
   through M2; Phaser 4 pinned via CDN global at M3, per the M3 plan §2 and
   §A.1 above) and logged it in `DECISIONS.md` as a Jeff call.
7. **Where the two plans' `gameState` sketches disagree** (the M3 plan §4
   has a flatter `inventory`, no `box`), **this plan's §1 wins** — it's the
   later, fuller drawing of the same object. M3 sessions should take state
   shapes from here.

---

## §1. The state model — species vs. individuals

**The single most important idea in this document:** a *species* is a
definition (shared, read-only, lives in `src/data/fakeamon.js`); an
*individual* is a creature you own or fight (mutable, lives in `gameState`
or a battle). Individuals point to species by **string key** and store only
what varies. All of Pokémon's data model is downstream of this split.

```js
// src/data/fakeamon.js — species definitions grow these fields over time.
// (Add string keys now: FAKEAMON.growler, not the bare GROWLER global.)
const FAKEAMON = {
  growler: {
    name: "Growler", type: "fire", sprite: "assets/sprites/growler.png",
    baseHP: 40, baseAttack: 13, baseDefense: 10, baseSpeed: 12,
    moves: ["tackle", "bite", "burn", "flare"],
    evolvesTo: "growlerion", evolvesAt: EVOLVE_LEVEL_GROWLER,  // §3
  },
  // …
};

// src/state.js — ALL persistent facts live in this one object. Plain data
// only (JSON-safe): no DOM nodes, no Phaser objects, no functions, no
// species objects copied in — string keys only.
const gameState = {
  version: 1,
  party: [ /* individuals, max size per Lewis HOMEWORK Q1 */ ],
  box: [],                        // storage overflow — §5
  inventory: {
    balls: { fakeaball: 5, great: 0, ultra: 0, cosmic: 0 },  // DECISIONS #3
    berries: {},                  // M5 cooking — berry key → count
    tokens: 0,                    // M4
  },
  flags: {
    badges: [],                   // gym ids beaten (badges open areas — DECISIONS #6)
    bossesBeaten: [],             // mini-boss ids; length 5 unlocks Artemis
    artemisDefeated: false,
  },
  world: {                        // added by M3 per its plan §4
    mapId: "starterMeadow",
    player: { tileX: 5, tileY: 7, facing: "down" },
    defeatedEncounters: [],
  },
};

// An individual — created by newIndividual(speciesKey, level):
// { speciesKey: "growler", nickname: null, level: 5, xp: 0, currentHP: 40 }
```

**Derived, never stored:** stats come from a function so that leveling and
evolution are automatic consequences rather than bookkeeping:

```js
// src/progression.js
function statsFor(individual) {
  const s = FAKEAMON[individual.speciesKey];
  const grow = STAT_GROWTH_PER_LEVEL;        // Jeff-tunable constant, top of file
  return {
    maxHP:    s.baseHP      + Math.floor(grow.hp      * (individual.level - 1)),
    attack:   s.baseAttack  + Math.floor(grow.attack  * (individual.level - 1)),
    defense:  s.baseDefense + Math.floor(grow.defense * (individual.level - 1)),
    speed:    s.baseSpeed   + Math.floor(grow.speed   * (individual.level - 1)),
  };
}
```

This retires the `hp[name]` map (§A.3): battles read/write
`individual.currentHP`, and two Growlers are just two objects. The M1 stat
table stays exactly true at level 5 by choosing base values accordingly —
verify Growler-vs-Whaley still feels identical after the migration (§6, S1).

**The one law, enforced every session from now on:** any new persistent fact
goes into `gameState` at creation, JSON-safe, or it will silently not survive
the save system. Adding a feature = adding its field here *first*.

---

## §2. XP & leveling

- Winning grants XP to the individual(s) that fought (simple v1: the active
  fighter gets all of it; shared-XP is a possible Lewis question later).
- `xp` accumulates within a level; `xpToNext(level)` is the Jeff-tunable
  curve, a named function at the top of `progression.js`:
  `xpToNext(level) = XP_BASE * level` is a fine linear v1 (constant to tune).
- Level-up loop (XP can chain multiple levels off a big mini-boss win):
  gain XP → while `xp >= xpToNext(level)`: subtract, `level++`, heal by the
  stat-gain amount (small kindness, classic feel), **then** evolution check
  (§3). Emit log lines for each ("Growler grew to level 7!").
- XP amounts: `xpReward(enemy) = XP_REWARD_BASE * enemy.level *
  (isMiniBoss ? MINIBOSS_XP_MULT : 1)` — three constants, DESIGN.md §5 rule
  ("mini-bosses award more XP") satisfied, numbers open per Jeff's list.
- Where: all of it in `src/progression.js`. `battle.js` reports the win;
  progression applies consequences. Battles never touch levels directly.

---

## §3. Evolution

Decided (2026-07-05): **auto-evolve, no prompt** — evolution is a surprise.
Lewis's **B23** picks how theatrical the surprise is; this section is the
machinery under whichever show he chooses.

- **Data:** species entries carry `evolvesTo` (species key) and `evolvesAt`
  (level). Both optional — most of the 200-roster never evolves in our game.
  The three starter evolution levels are Jeff's open tuning: define
  `EVOLVE_LEVEL_GROWLER/WHALEY/LEAFICK` constants and mark `[TUNE]`.
  Evolved forms are full species entries of their own (art already exists —
  the Tuxemon lines were chosen mid-chain for exactly this reason).
- **Mechanic — one line of truth:** evolution is
  `individual.speciesKey = species.evolvesTo`. Because stats derive from
  species+level (§1) and sprites/moves live on the species, everything else
  updates itself. Nickname persists (it belongs to the individual).
- **HP policy on evolve:** keep the same *fraction* of max HP
  (`currentHP = round(maxHP_new * currentHP_old / maxHP_old)`) — evolving
  mid-adventure doesn't grant a free full heal, matching classic feel. (If
  Lewis ever objects, it's a one-line change; note it to him during B23.)
- **Moves:** v1 rule — an individual's moves are its *current species'*
  four moves. Evolving upgrades the whole kit at once: dramatic, simple,
  zero move-learning UI. (Per-level learnsets are a possible post-M5
  enhancement; DESIGN.md §6 movesets are compatible with either.)
- **When to check:** after the level-up loop **outside of battle
  resolution** — i.e., in the outcome-application step, after `#battle` has
  closed. Evolving mid-battle creates rules questions (does the new form's
  speed re-order this turn?) that a v1 shouldn't answer. The ceremony (B23)
  therefore plays on the map/team screen, which is also where the new
  sprite reveal reads best.
- **Hook for the show:** `onEvolve(individual, oldKey, newKey)` — a single
  callback the ceremony code implements. Machinery and theater stay
  separate files, so Lewis can redirect the show without touching the rules.

---

## §4. Save / load

### 4.1 Mechanism

- **localStorage**, single autosave slot, key `"fakeamon-save"`. The
  payload is literally `JSON.stringify(gameState)` — which is why §1's
  plain-data law exists. `src/save.js`, ~60 lines total:
  `saveGame()`, `loadGame()` (returns state or `null`), `clearSave()`.
- **Autosave triggers** (call `saveGame()`; at this scale no debouncing):
  after a battle outcome is applied; after any catch; after any purchase,
  heal, or cook (M4/M5); on map transition (M4); after the evolution
  ceremony. Rule of thumb: *any function that mutates `gameState` ends by
  saving.* No manual save button needed — kids never lose progress and
  never think about it.
- **Load path:** on boot, `loadGame()`; if a save exists show
  **Continue / New Game** on the title flow (starter-select becomes the
  New Game path); New Game over an existing save asks
  "Really erase your adventure?" once. This is `src/main.js`'s job (§A.2).

### 4.2 Versioning & migration — cheap insurance, day one

```js
// src/save.js
const SAVE_VERSION = 1;             // bump when the shape changes
const MIGRATIONS = {
  // 1: (old) => { …transform v1 save into v2 shape…; return old; },
};
function migrate(save) {
  while (save.version < SAVE_VERSION) {
    const step = MIGRATIONS[save.version];
    if (!step) return null;         // unknown gap → treat as no save
    save = step(save); save.version++;
  }
  return save;
}
```

- `loadGame()` = parse (inside try/catch — corrupt JSON → `null`, never a
  crash) → `migrate` → merge onto a fresh default state (so *added* fields
  get defaults for free; only *reshaped* fields need a migration entry).
- **During active development** it's fine for a schema change to just wipe
  dev saves — but the version bump + a stub migration comment is still
  required, so the discipline exists before the first real save Lewis
  cares about.

### 4.3 Export / import — the safety net and the lesson

A small, high-value extra (one step in §6): **Export Save** downloads
`fakeamon-save.json`; **Import Save** loads one via a file picker (validated
through the same parse→migrate path). Two reasons: browsers *do* clear
localStorage (storage pressure, "clear browsing data," a different browser
on the same machine), and a 10-year-old holding his game's entire world as
a JSON file he can open, read, and — inevitably — *edit* is the best
save-system lesson available. When he gives himself 999 Cosmic balls by
hand, that's not cheating, that's understanding the architecture.

### 4.4 Sharp edges to document in code comments

- localStorage is **per-origin**: `localhost:8000`, `file://`, and
  `jhester599.github.io` each have separate saves. Feature, not bug
  (dev saves don't pollute the live game) — but it *will* confuse someone
  once, so a comment in `save.js` and a line in `README.md` pre-empt it.
- Incognito windows discard localStorage on close.
- Never store derived stats, log lines, sprites, or Phaser state.
  If `JSON.parse(JSON.stringify(gameState))` isn't a working game, §1's
  law was broken upstream — fix that, not the save code.

---

## §5. The storage box

- `gameState.box = []` — same individual objects as `party`, unbounded.
- Overflow flow on catch when the party is full: **blocked on Lewis's
  HOMEWORK Q1** (party size + "what happens when full"). Build the field
  and the `party ⇄ box` move functions now; wire the choice he makes later.
- Where you access the box: proposed **at the Fakeatent** (fits its
  "home base" role, gives M4's building a second function). That's a
  creative call → add as **B33** in `HOMEWORK_BACKLOG.md`:
  *"Where do you swap team members with stored ones? A) At a Fakeatent
  B) Anywhere from the team screen C) A new building (invent it!)"*
- Box UI itself is an M5 step; M2 only needs overflow-on-catch to not
  crash (dump to box + log line is the safe placeholder).

---

## §6. Build order

Unlike M3's plan, this work is **split across milestones on purpose** —
state foundation early, persistence when it pays, depth features in M5:

| # | When | Step | What gets built | Model / effort |
|---|---|---|---|---|
| **S1** ✅ | **M2, before Step 5** | Individuals & state bag | `src/state.js` + `newIndividual()` + `statsFor()`; battle reads/writes `individual.currentHP`; retire `hp[name]` map (§A.3); load-order comment in `index.html`; verify M1 fight feels unchanged | Sonnet 5 / **high** — touches battle internals; this is the step where two-Growlers stops being a bug — *done 2026-07-07: `FAKEAMON` is now keyed by species (`growler`/`whaley`/`leafick`, `base*` stat fields), `src/state.js` adds `newIndividual()`/`statsFor()` (level always 1, `STAT_GROWTH_PER_LEVEL` all zero until M5's progression.js), and `battle.js`/`main.js` pass individuals everywhere — a caught wild Fakeamon's outcome is now the healed individual itself, ready for Step 5 to actually add to a team* |
| **S2** | M2 Steps 3–4 (as planned there) | Battle contract | Global `startBattle(config) → Promise<outcome>` per M3 plan §5; starter-select moves to `src/main.js` | Sonnet 5 / high |
| **S3** | End of M2 | Save v1 | `src/save.js` (§4.1–4.2); autosave after battles/catches; Continue/New Game title flow | Sonnet 5 / medium |
| **S4** | Anytime after S3 | Export/import | §4.3; a settings corner on the title screen | Sonnet 5 / low — great short session for Lewis to drive |
| **S5** | M5 Step 1 (ROADMAP) | XP & leveling | `src/progression.js` per §2; constants marked `[TUNE]`; log lines | Sonnet 5 / medium |
| **S6** | M5 Step 1 | Evolution machinery | §3: data fields, evolve-on-levelup, HP-fraction rule, `onEvolve` hook; evolved-form species entries + sprites (slicer re-run) | Sonnet 5 / medium |
| **S7** | M5 Step 1 | The ceremony | Implement Lewis's B23 pick behind `onEvolve` | Sonnet 5 / medium — pure theater, Lewis directs |
| **S8** | M5, with Fakeatent/box UI | Box UI | §5 per B33 + HOMEWORK Q1 answers | Sonnet 5 / medium |

**Definition of done (persistence):** catch something, close the browser,
reopen the live site → Continue restores the exact map position, party,
HP, and inventory; New Game asks before erasing; an exported save imports
cleanly on another browser. **Definition of done (progression):** a starter
that grinds wild battles levels up, gets visibly stronger, and one day —
unannounced, mid-adventure — evolves, exactly as theatrically as Lewis
specified.

---

## §7. Risk register

| Risk | Likelihood | Mitigation |
|---|---|---|
| Schema drift — features stashing state outside `gameState` | **High** (it's the natural sloppy path) | §1's one law; huddle reflection question; S3's definition of done catches escapees (anything that doesn't survive reload was stashed wrong) |
| `hp[name]` collision ships into M2 Step 5 | High if S1 is skipped | S1 is sequenced *before* the team list lands; this plan exists so the session knows why |
| Save-format churn during dev | Certain | §4.2 version discipline from day one; dev-save wipes are acceptable, silent corruption is not |
| Evolution double-fires or fires mid-battle | Medium | §3: single check-site in the level-up loop, post-battle only; `while` loop bounded by `evolvesTo` becoming undefined at chain end |
| Two plans + moving code drift apart | Medium | §A is the reconciliation pattern — repeat it: whenever code and plan disagree, the *next planning session* updates the plan rather than letting it rot |
| localStorage per-origin confusion ("my save vanished!") | Medium | §4.4 comments + README line; export/import (§4.3) is the recovery path |
| Lewis edits his save JSON into an impossible state | Certain, eventually 😄 | parse→migrate→merge-onto-defaults path already tolerates garbage; worst case is New Game — and honestly, let him; it's the best lesson in the whole plan |

---

*Everything the player earns lives in one bag; everything the bag holds is
plain data; everything that changes the bag saves the bag. Three sentences —
the rest is decoration.* 💾
