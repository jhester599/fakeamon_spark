# M4 World Systems Plan — Tokens, Buildings, the First Gym, Cooking & a New Area 🏛️

> **What this is:** the architecture and build plan for **Milestone 4 (World
> Systems)**, written at the M3→M4 boundary from a high-end planning session +
> the M4 Peer-Review Checkpoint (golden rule #7), so execution sessions
> (Sonnet 5) can build it step-by-step without re-deriving the design.
>
> **How to use it:** this document is authoritative for M4 *architecture*.
> `DESIGN.md` stays authoritative for *game rules*; `ROADMAP.md`'s M4 table is
> the *order*. Read **§A first** — it reconciles this plan against the code as
> it actually stands (M2 + M3 shipped a lot), and triages the two reviews that
> fed this plan. The Model Huddle from `MODELS.md` still runs before every step.
>
> **Provenance:** produced from (1) an external Fable design/roadmap review of
> M4 — the *Peer-Review Checkpoint #2* — and (2) a paired code-correctness pass
> on the real `src/` files, both triaged against the actual code on
> `2026-07-22`. What the reviews said vs. what the code actually does is the
> whole of §A.
>
> **Status:** plan complete; **M4 execution not started.** Next up: **M4 Step 1
> (Tokens)** — but read §2 (state & save) and §8 (small pre-M4 fixes) before the
> first line of M4 code, because the cheapest M4 mistakes are all in the save
> schema.

---

## §A. Reconciliation — the code M4 actually builds on

Same pattern as `M5_STATE_AND_SAVE_PLAN.md` §A and `M3_OVERWORLD_PLAN.md` §A:
where a review's *description* of the code and the *actual* code disagree, the
code wins and this section records it. Fable could not read `src/` live, so
several of its findings are about a codebase slightly different from ours.

### §A.1 What already exists that M4 leans on (cite, don't re-derive)

| Thing M4 needs | Already there? | Where |
|---|---|---|
| `startBattle(config) → Promise<outcome>` seam | ✅ | `src/battle.js:594` |
| **Catch can be turned off** for trainer battles | ✅ `canCatch` flag | `src/battle.js:601`, read at `:534` |
| **Flee can be turned off** for trainer battles | ✅ `canFlee` flag | `src/battle.js:601`, read at `:544` |
| One save bag, plain-data, JSON-safe | ✅ | `src/state.js:92` |
| Version + migration + merge-onto-defaults loader, read **and** write in try/catch | ✅ | `src/save.js:22-39,67-77,96-153` |
| Autosave after every mutation | ✅ (starter/battle/catch/switch/step) | calls dotted through `src/main.js`, `src/world/config.js` |
| Type chart already has **metal** (Gym 1's type) | ✅ rows+cols | `src/data/typechart.js` |
| Per-type archetype stat table for wild mons | ✅ `[TUNE]` block | `src/data/fakeamon.js:48-57` |
| Map-as-plain-data + solid-tile derivation | ✅ | `src/data/maps.js`, `SOLID_TILE_INDICES` |
| Screen manager seam (hide/freeze map ↔ battle) | ✅ | `src/screens.js` |

**What is NOT there yet (so M4 is the first to build it):**

- **No `tokens`, no `flags`, no `berries`.** `gameState` today is exactly
  `{ version, party, box, world, inventory }` and `inventory` is only
  `{ balls: { fakeaball: 5 } }` (`src/state.js:92-100`, `:69-71`). Every M4
  economy/badge/berry field is brand new — see §2.
- **The battle enemy is a *single* individual** (`opponent`, `config.enemy` —
  `src/battle.js:19,599`). There is **no enemy party/queue**, so a 2-Fakeamon
  gym team cannot be run yet — see §4.
- **The WorldScene is single-map** (`MAPS.theMeadows` is hard-wired at
  `src/world/config.js:154`) with `exits: []` in the map data
  (`src/data/maps.js:89`). There is no walk-between-areas mechanism — see §5.
- **No economy anywhere** — no prices, no token award. See §3.

### §A.2 Fable review — triaged against the real code

| # | Fable finding | Verdict vs. our code | What M4 does with it |
|---|---|---|---|
| 1 | M4 Step 6 (roster growth) is an unbounded content treadmill inside a packed milestone | **NEW, valid — and sharper than stated:** the code has *no* multi-map seam at all (`exits:[]`, single-map scene), so "open a new area" isn't just content, it's a missing system | **ACCEPT** → re-scope Step 6 to *one* bounded new area behind the Gym 1 badge; push the rest to M5 (roadmap updated, §7) |
| 2 | Tracker drift: docs still say "M2 in progress" | **STALE AS STATED** — `CLAUDE.md`/`roadmap.html` already say M3 done, M4 now. A *smaller* real drift exists: `ROADMAP.md`'s M3 **section heading** still reads "in progress — M3S9 next" while its own table + `roadmap.html` show 11/11 done | **PARTIAL** → fix the stale M3 heading in this same pass; Fable's specific example didn't reproduce |
| 3 | Subtractive damage can collapse to the min-1 floor as Defense scales | **PARTLY COVERED:** the double `Math.max(1,…)` floor (F11) is already in `calculateDamage` (`src/battle.js:113,116`). The *data invariant* (Attack+Power ≥ Defense) is not enforced anywhere | **ACCEPT as a stat-authoring guardrail** (§4.4) — a comment + a one-off sanity check when authoring gym/boss stats. Do **not** switch to a multiplicative formula (teaching constraint) |
| 4 | Save schema must name the new M4 world-state fields; defaults/migrations must cover them | **NEW + most important.** Confirmed: no M4 fields exist, and the loader's `Object.assign(defaultState(), migrated)` is a **shallow** merge (`src/save.js:119`), so *nested* new fields (e.g. `inventory.tokens`) would **not** get defaults for an old save | **ACCEPT** — the biggest technical section (§2) |
| 5 | Gym battle reuses the wild seam — needs a 2-mon enemy team + no catching | **MIXED:** "no catching / no fleeing" is **already covered** (`canCatch`/`canFlee` flags exist). An **enemy party is NOT** — that's genuinely new | **ACCEPT the new half** — enemy-party support lands **before** Gym 1 (§4) |
| 6 | Economy numbers must be tunable constants in an obvious spot | **NEW** — no economy code exists | **ACCEPT** → `src/data/economy.js` (§3) |
| 7 | Off-type gym aces (Windeye/Spectera) — decide before Gym 1 templates | **LOW/DEFERRED:** Gym 1 (Metal) is clean, so nothing blocks. The *data-shape* half (put explicit `type` on every gym + mon) is cheap and worth doing now | **ACCEPT the data-shape**; the re-theme decision is a **creative call → homework B43** (Gym 2/3 are M5) |
| 8 | Catch formula diverges from genre (flat base rate, no per-species rarity) | **VALIDATED — leave it.** Confirmed flat `BASE_CATCH_RATE` with `ballBonus = 1` (`src/battle.js:219,227`). Fable itself says add per-species rates only if Lewis asks | **DEFER** — note only; adding tuning data pre-emptively fights "keep it simple" |
| 9 | Pedagogy ("one small runnable step, numbers in obvious spots, no build") is well-aligned | **POSITIVE** | Acknowledge; keep the readable number-comments — they're pedagogy |

**Explicitly rejected on teaching grounds (per golden rule #7):** nothing in
the Fable review asks us to break a hard constraint — it *declined* to
recommend TypeScript, a bundler, an ECS, or a test framework, and it argued to
keep the subtractive damage formula precisely because switching to Pokémon's
multiplicative one would break "numbers a kid can find and tweak." We keep all
of that. The only constraint-adjacent item (per-species catch rates, #8) is
consciously left out unless rarity becomes a design goal.

### §A.3 Paired code-review — the real bugs in the code M4 builds on

These come from reading the actual files (Fable couldn't). They are small; none
block M3 shipping, but M4 either fixes them or is built to not trip on them.
Fold the fixes into §8.

| ID | Bug | Where | Severity | Status |
|---|---|---|---|---|
| CR-A | **Encounter sprites never re-sync to `defeatedEncounters` after Continue.** The WorldScene is created once at page load, when `defeatedEncounters` is still the empty default, so all 14 spawn. `continueGame` → `enterOverworld` → `showWorld` → `syncHeroToState` repositions the hero but never re-spawns/removes encounter sprites, so already-defeated wild Fakeamon stand on the map again and are re-fightable. **Two compounding effects:** (a) an **infinite XP-farm-on-reload** — reload, Continue, re-beat the "defeated" creature, repeat (`grantXP` fires each win; `removeEncounter` is a no-op on an already-listed id); (b) a later `respawnEncounter` `spawnOneEncounter`s an id that *already* has a page-load sprite → **two stacked sprites**, and `removeEncounter` then `destroy()`s only one (`.find`) while `filter`ing both out → an **orphaned, undestroyable sprite**. On the **PWA the images are cache-served**, so `create()` runs near-instantly and this is the *dominant* path, not a rare race | `src/main.js:96-105`, `src/screens.js:41`, `src/world/config.js:182,247,293-330` (`spawnEncounters` only called in `create()`) | **High** | CONFIRMED (independent code-read). *New-Game-after-play is not reachable today* (title/`startNewGame` are boot-only — no in-session return-to-title), so that mirror case is latent, same root cause. **M4 must solve this anyway** — multi-map (§5) needs a "rebuild the scene from state" seam, which also fixes this |
| CR-B | **Shallow merge won't fill *nested* new defaults — and the code's own comments claim it will.** `Object.assign(defaultState(), migrated)` copies `migrated.inventory` wholesale; a v1 save with `{balls:{…}}` and no `tokens`/`berries` keeps that object, so `gameState.inventory.berries` reads `undefined` → `-= 1` gives `NaN`. Comments at `save.js:55-58` / `state.js:62-71` assert "added fields get defaults for free," true only at the *top level*; the two existing hand-written nested guards (`world.defeatedEncounters`, `inventory.balls`) exist precisely because of this | `src/save.js:119` | **Med** | CONFIRMED. Directly shapes §2's field-placement rule |
| CR-C | **Missing `.type-normal` / `.type-metal` CSS.** `index.html` defines only `.type-fire/.type-water/.type-grass`. The shipped M3S11 roster has **8 normal-type** wild creatures, so their type badge is white text on the card's white background (invisible word "normal") and their sprite "stage" has no color | `index.html:68-70,71-78`; used in `src/battle.js:74`, `src/main.js:372` | **Low (cosmetic, but live now)** | CONFIRMED. M4 adds more `normal`/`metal` creatures + a metal gym → fix in §8 |
| CR-D | **No `metal`-type *moves* exist.** `MOVES` is fire/water/grass/normal only, so Gym 1's metal creatures have no on-type move to use (the type *chart* handles `metal` fine — the gap is move data) | `src/data/moves.js` | **Low** | CONFIRMED. M4 needs ≥1 metal move before Gym 1 (§4.3) |
| CR-E | **Type chart has no `cosmic` row/column — a guaranteed future crash.** A `cosmic` *move* makes `TYPE_CHART["cosmic"]` `undefined`, then `[defenderType]` **throws `TypeError`** mid-`performAttack` → the battle **soft-locks** (controls disabled, never re-enabled). A `cosmic` *defender* → `raw × undefined` → `NaN` HP → `checkForFaint`'s `NaN > 0` is false → **un-faintable**. `metal` is fully covered; `cosmic` is the sole gap | `src/data/typechart.js`, breaks at `src/battle.js:114,116,156` | **Med** | CONFIRMED. Not M4 (no cosmic yet), but **Artemis is Cosmic** — flag loudly for the M5 plan |

*(Independent paired review complete; the async/timing layer was checked and is
clean — every action disables the whole `.move-btn` set synchronously, and
double-Continue is idempotent by Promise-resolve. The list above is believed
complete for M2/M3.)*

---

## §1. The shape of M4 — five systems, one seam, one economy

M4 turns the empty overworld into a place with **reasons to explore**. Five
player-facing systems, plus the plumbing under them:

```
          ┌─────────── tokens (the currency everything spends) ───────────┐
          │                        │                      │               │
     Fakeatent (heal)       Tall Tower (buy balls)     Gym 1 (earn a badge + tokens)
          │                                                    │
     Cooking Cabin (berries → dishes, an alt heal)        the badge opens ONE new area
                                                              (the area-travel seam)
```

**Dependency order is real, not cosmetic** (this is why the roadmap order is
Tokens → Fakeatent → Tall Tower → Gym → Cook → Area):

1. **Tokens** are the substrate — you can't price a shop or a heal before the
   number exists.
2. **Fakeatent** and **Tall Tower** are the two things tokens *buy*; build the
   heal first (simplest), then the shop.
3. **Gym 1** is the first real token *source* beyond wild wins, and it needs
   the **enemy-party** engine change (§4) — so it's gated behind that.
4. **Cooking** is a second, token-free heal path; it needs a **berry
   inventory + a way to get berries** (§6).
5. **The new area** is what the Gym 1 badge *unlocks*, and it needs the
   **multi-map seam** (§5) — the single biggest new system in M4, and the one
   most at risk of overrunning (§9).

Everything persistent that these add is one law away from breaking the save
(§2): **add the field to `gameState`'s defaults first, or it silently won't
survive a reload.**

---

## §2. State & save — the M4 fields (do this before Step 1)

This is the cheapest place to get M4 wrong and the cheapest to get right. The
M5 plan's §1 already *sketched* most of these fields; M4 makes them real. Two
rules from the code (§A.1, CR-B) drive the whole section.

### §2.1 The fields M4 adds — declare them all up front

Add these to `gameState` (`src/state.js`) **and** to `defaultState()`
(`src/save.js:59`) in the very first M4 session, even before the features that
use them, so old saves gain sane zeros for free:

```js
// src/state.js — gameState grows these (all plain data, JSON-safe):
tokens: 0,                       // *M4 Step 1 — the currency
flags: {
  badges: [],                    // gym ids beaten, e.g. ["gym1"] — opens areas (DECISIONS #6/#27)
  gymsCleared: [],               // same as badges for now; kept separate so a rematch (B17) can tell
                                 //   "first clear" (full reward) from "rematch" (smaller reward) without a badge dupe
  unlockedAreas: ["theMeadows"], // which maps you may walk into — badges push here
},
// inventory grows a sibling to `balls`:
inventory: {
  balls: { fakeaball: 5 },
  berries: {},                   // *M4 Step 5 — berryKey → count (cooking input)
},
```

**Placement rule (from CR-B — this is not optional):** the loader merges
**shallow**. So:

- **Top-level fields** (`tokens`, `flags`) get defaults for free from the
  merge — put new *independent* facts at the top level.
- **New fields nested under an existing object** (`inventory.berries`) do
  **not** — the old `inventory` object is copied whole. Follow the pattern
  `parseSave` already uses for `inventory.balls` (`src/save.js:147-150`): a
  small explicit "if this sub-field is missing/garbage, fill it" check per new
  nested field. Keep `berries` under `inventory` (it belongs there) but
  back-fill it defensively; do **not** deepen the generic merge (too clever,
  and it would fight the "readable" rule).

### §2.2 Version bump + migration stub

The moment any of these fields lands, do the discipline the code already sets
up (`src/save.js:22-39`):

```js
const SAVE_VERSION = 2;          // was 1
const MIGRATIONS = {
  1: function (old) {            // v1 → v2: M4 fields
    old.tokens = old.tokens || 0;
    old.flags  = old.flags  || { badges: [], gymsCleared: [], unlockedAreas: ["theMeadows"] };
    if (old.inventory && !old.inventory.berries) old.inventory.berries = {};
    return old;
  },
};
```

Because the loader *also* merges onto defaults, most of this is belt-and-
suspenders — but the version bump is what lets a *future* reshape (M5's
evolution/box fields) tell "old but fine" from "genuinely broken." During
active dev it's fine for a bad save to become a New Game; the version bump is
the part that must not be skipped. *(Note: bumping `SAVE_VERSION` means bumping
`CACHE_VERSION` in `service-worker.js` too when you deploy — see its header.)*

### §2.3 Extend the autosave triggers

The rule is already "any function that mutates `gameState` ends by saving"
(`src/main.js`, `src/world/config.js`). M4 adds new mutators — each must end in
`saveGame()`: **awarding tokens, healing at a Fakeatent, buying at a Tall
Tower, cooking a dish, winning/rematching a gym, picking up a berry, and
entering a new area.** Miss one and a kid loses a purchase on reload. Add a
line to the M4 sessions' checklists: *"new mutator → does it end in
`saveGame()`?"*

---

## §3. Economy — one visible constants file

Per Fable #6 and the hard constraint "numbers live in obvious spots," all
economy numbers land as labeled constants in **one** place, matching the
`src/data/*.js` convention:

```js
// src/data/economy.js — [TUNE] every number here; feel is decided (B16),
// exact values are Jeff's playtesting. B16: after ~3 wild wins you can
// afford a Fakeaball AND a heal.
const ECONOMY = {
  TOKENS_PER_WILD_WIN: 5,     // [TUNE]
  HEAL_COST:           10,    // [TUNE] Fakeatent full heal
  BALL_COST:           8,     // [TUNE] one Fakeaball at the Tall Tower (basic ball only — B18/#31)
  GYM_REWARD:          40,    // [TUNE] first clear of a gym
  GYM_REMATCH_REWARD:  10,    // [TUNE] smaller, per B17/#30
  TEAM_WIPE_TOKEN_LOSS: 5,    // [TUNE] "drop a few tokens" on a whole-team faint (§6 DESIGN, replaces the M3 loss placeholder)
};
```

Wire `TOKENS_PER_WILD_WIN` into the existing win path (`endBattle`/
`handleBattleOutcome`), the way XP was wired at M3S8 — tokens are just a second
number banked on the same event. Load `economy.js` early in `index.html` (with
the other `data/*` files). **Only the basic Fakeaball is sold** (B18/#31), so
`BALL_COST` is a single number, and the catch formula's `ballBonus` stays `1`
in M4 (Great/Ultra/Cosmic balls are a later feature — do not add them here).

---

## §4. The battle contract, extended for the first gym

Gym 1 (Step 4) is the *only* thing in M4 that changes `battle.js`. Everything
else calls the existing seam unchanged. Keep this change **minimal and
readable** — it's the one place M4 touches battle internals.

### §4.1 An enemy *party*, not a single mon (the real new work)

Today `opponent` is one individual. A gym leader has **standard + ace**
(DESIGN §8). The smallest faithful change:

- `config.enemy` may stay a single individual (wild battles unchanged) **or**
  `config.enemyParty` may be an array of individuals (trainer battles). Inside
  `battle.js`, normalize to an array and track an `enemyIndex` (starts 0);
  `opponent` becomes `enemyParty[enemyIndex]`.
- When the current `opponent` faints, instead of ending the battle: if there's
  a next enemy, advance `enemyIndex`, log "Enforcer Boss sent out AV8R!", redraw
  the arena, and continue the turn loop. Only when the **last** enemy faints
  does `endBattle("player")` fire.
- This mirrors the *player* side's `party[0]` convention exactly, so it reads
  the same and a 10-year-old can follow "the enemy has a bench too."
- Turn/faint bookkeeping: `checkForFaint("opponent")` is the one call-site that
  branches "advance vs. end" — keep the change to that single spot.

### §4.2 Trainer battles turn off catching *and* fleeing (already supported)

No engine change needed — pass the existing flags:

```js
// gym battle config:
{ playerParty: gameState.party, enemyParty: [standard, ace],
  canCatch: false,   // can't Fakeaball a leader's mon (flag exists, battle.js:534)
  canFlee: false,    // no running from a gym (flag exists, battle.js:544) — new default, confirm with Jeff/Lewis
  inventory: gameState.inventory, onStateChange: renderTeamList }
```

`canFlee: false` for gyms is a small **rules default** (reversible) — flag it
in the Step 4 huddle. It doesn't contradict B1 ("Run always works"), which was
explicitly about *wild* battles.

### §4.3 Gym data shape — carry explicit `type` (Fable #7, the cheap half)

Put gyms in plain data (a new `src/data/gyms.js`, same convention), with an
obvious `type` on the gym **and** each mon, so the later Gym 2/3 re-theme is a
one-line edit:

```js
const GYMS = {
  gym1: {
    leader: "Enforcer Boss", type: "metal", badge: "gearBadge",
    opens: "theLagoon",                 // the area this badge unlocks (B14/#27)
    team: [
      { species: "allagon", level: 8, type: "metal" },   // standard  [TUNE] level
      { species: "av8r",    level: 10, type: "metal" },  // ace       [TUNE] level
    ],
  },
};
```

**Content prerequisite (CR-D):** Gym 1 is Metal, and there is **no metal move**
in `MOVES` yet. Add at least one (e.g. `ironTackle`/`gearbite`, `type:"metal"`)
so Allagon/AV8R can hit with their type; the type chart already handles `metal`.
Slicing Allagon/AV8R sprites is a `tools/slice-sheets.mjs` re-run (they're in
the staged pool). Gym-leader NPC art (`Enforcer Boss`) is a trainer sprite — a
`CREDITS.md` row, per §12/`CONTENT_REFERENCE.md`.

### §4.4 The damage-floor guardrail (Fable #3)

The formula stays subtractive (readable: "my power + my attack − their
defense"), and the min-1 floor is already double-guarded (`src/battle.js:113,
116`). The *new* discipline, for when M4 gym aces and M5 bosses raise Defense:
when you author a gym/boss stat block, keep `min(attacker Attack) + (its move
power) − (defender Defense) ≥ ~3`, so fights don't degrade into strings of
min-1 chip hits. Add a one-line `[TUNE]` invariant comment above the gym/boss
stat tables. This is a stat-authoring check, not a code change.

---

## §5. Buildings & the map — Fakeatent, Tall Tower, Cooking Cabin, and the area seam

### §5.1 How a building sits on the map

Buildings are **special tiles you bump**, reusing the exact mechanism S6/S7
already proved for encounters (`src/world/config.js`): a building occupies a
tile (or a 2×2 like the trees), the tile is solid, and walking into it fires a
handler — the mirror of `handleEncounter`. So a `Fakeatent` bump opens a small
DOM panel in `#battle`'s HUD area (heal / swap-box / cancel), a `Tall Tower`
bump opens the shop panel, a `Cooking Cabin` bump opens the cooking panel. No
new screen-manager work — these are HUD overlays on the map, not the full
battle takeover (the battle seam stays exclusively for fights).

- Add building tiles to the meadow tileset (or a new interior later) + a
  `buildings` list in `maps.js` parallel to `encounters` (`id`, `kind`,
  `tileX`, `tileY`). Keep it plain-data so Lewis can move a building by editing
  a number.
- **The Fakeatent does two jobs** (B33/#51): heal to full *and* be where you
  swap a boxed Fakeamon onto your active four. The box-swap **UI** is scheduled
  as M5-plan S8, but the Fakeatent building itself lands here — wire "heal" now,
  and expose "manage team" as the hook M5's box UI fills in.

### §5.2 The scene-resync seam (fixes CR-A, and multi-map needs it anyway)

The WorldScene currently builds its encounter/building sprites once, at
`create()` (§A.3 CR-A). M4 needs the scene to **rebuild itself from
`gameState.world`** on demand — after Continue, after New Game, and after an
area change. Add one method, `WorldScene.loadMap(mapId)` (or
`rebuildFromState()`), that: clears current sprites, sets `this.mapData` from
`MAPS[mapId]`, redraws the ground layer, re-runs `spawnEncounters` (which
already skips `defeatedEncounters`), spawns buildings, and re-places the hero.
`showWorld()` / `enterOverworld()` call it instead of only `syncHeroToState()`.
This single seam kills the Continue/New-Game desync **and** is the foundation
for §5.3 — build it once, use it three ways.

### §5.3 Multi-map travel — the one big new system (Step 6)

This is the largest piece of M4 and the biggest schedule risk (§9). Keep it as
small as the grid-movement work was:

- **Exits are plain data.** Fill each map's `exits: []` with
  `{ tileX, tileY, toMap, toTile, requiresBadge? }`. Walking onto an exit tile
  (or bumping a door) calls `WorldScene.loadMap(toMap)` (§5.2) and drops the
  hero at `toTile`. `gameState.world.mapId` already exists and is saved — this
  just lets it change.
- **Per-map encounter state.** `defeatedEncounters` is currently a flat list;
  the moment there are two maps, it must be scoped per map (encounter ids are
  already namespaced like `meadows-aardorn`, so a flat list *works*, but making
  it `defeatedEncounters: { theMeadows: [...], theLagoon: [...] }` is clearer
  and future-proofs respawn). Decide at build time; either is JSON-safe. Bump
  `SAVE_VERSION` + migration if you reshape it.
- **Badge-gating.** An exit with `requiresBadge: "gearBadge"` is walkable only
  if `gameState.flags.badges` includes it; otherwise a log line ("The path to
  The Lagoon is blocked — you need the Gear Badge."). Beating Gym 1 pushes the
  badge and the unlocked area (§2.1) → the gate opens. This is where "beating a
  gym opens a new area" finally *does* something on screen.
- **One bounded new area.** M4 opens exactly **The Lagoon** (the Gear Badge's
  area, B14/#27; roster slice: `VENTA_ROSTER_DRAFT.md` — 12 lines, 29 mons,
  levels 10–15 `[TUNE]`). Stock it the same way M3S11 stocked The Meadows
  (archetype stats, `slice-sheets.mjs` re-run, placeholder slug names pending
  Lewis's rename pass). The **other four areas stay in M5** (§7, roadmap).
- **Camera:** still no scrolling unless a map is bigger than the screen (M3's
  rule holds); The Lagoon can be one screen like The Meadows.

*(World-graph caveat for humans — §10: only 3 of the 5 lockable areas have a
badge gate. How The Forest / Foggy City connect is unspecified. M4 doesn't need
the answer — it opens The Lagoon and stops.)*

---

## §6. Cooking (Step 5)

Recipes are fully decided (DESIGN §9 / #10) — this is a self-contained panel,
not new rules. What it needs under it:

- **A berry inventory** (`inventory.berries`, §2.1) — `berryKey → count`.
- **A way to get berries.** Berries are "found on the ground while exploring"
  (#46) and **area-themed** (B35/#53). Minimum viable: berry pickups are tiles
  you walk over (mirror the building/encounter bump, but consume-on-touch and
  increment the count). For a first cooking demo you may seed a couple of
  Meadows berries so the Cabin isn't empty — call that out as a stand-in.
- **The Cabin panel** (self-serve, B26/#39): pick two berries → look up the
  recipe table (straight from DESIGN §9, put it in `src/data/recipes.js`) →
  heal the active (or chosen) Fakeamon by the dish's amount → decrement the two
  berries → `saveGame()`. "Any other combination → Basic Dish +30" is the
  default branch.
- **A small starter Cabin exists in the early area** (B36/#54), so cooking
  isn't gated behind Snow Mountain. Snow Mountain's cabin-hub is M5 flavor.

**Open creative input (homework B44):** *which* berries grow in *which* area is
Lewis's call (the B35 principle is decided; the mapping isn't). Needed to make
area-themed berries real; a neutral default is fine to prototype the Cabin.

---

## §7. Build order — M4 in six session-sized steps

Each step keeps the game runnable and ends in a commit. Model/effort per
`MODELS.md` (Huddle can override). `ROADMAP.md` + `roadmap.html` list these
one-to-one as M4 Steps 1–6. **The only roadmap change this plan makes is
re-scoping Step 6** (see below); the step *count* is unchanged (6), so the
counters don't move and `node tools/check-roadmap.mjs` stays green.

| # | Step | What gets built | ▶ You'll see | Model / effort |
|---|---|---|---|---|
| **S0** *(fold into S1)* | **Save fields + small fixes** | §2.1 fields + version bump; the §8 pre-M4 fixes (CSS `.type-normal/.type-metal`, the scene-resync seam CR-A) | Nothing new on screen — groundwork | Sonnet 5 / medium |
| **S1** | **Tokens** | `src/data/economy.js`; a win banks `TOKENS_PER_WILD_WIN`; a token counter in the HUD; `gameState.tokens` persists | A number that goes up when you win | Sonnet 5 / medium |
| **S2** | **Fakeatent** | A building tile you bump → heal panel (costs `HEAL_COST`); replaces the M3 loss placeholder as home base; hook for M5's box-swap (B33) | A tent; HP refills; tokens spent | Sonnet 5 / medium |
| **S3** | **Tall Tower** | A shop panel → buy Fakeaballs (`BALL_COST`) into `inventory.balls.fakeaball` (the count the catch button already reads) | A shop; your ball count goes up | Sonnet 5 / medium |
| **S4** | **Gym 1** | Enemy-party support in `battle.js` (§4.1); `src/data/gyms.js`; ≥1 metal move; Gym 1 = a 2-mon trainer battle (`canCatch:false`, `canFlee:false`); win → badge + `GYM_REWARD`; rematch → smaller (B17) | Walk to the leader → a two-creature trainer battle → a badge | **Opus 4.8 / high** (the one engine change) then Sonnet 5 |
| **S5** | **Cooking Cabin** | `inventory.berries`; berry pickups on the map (area-themed, B44); `src/data/recipes.js`; a self-serve Cabin panel that heals per recipe (DESIGN §9) | A cooking screen; recipes that heal different amounts | Sonnet 5 / medium |
| **S6** | **Open a new area** *(re-scoped)* | The scene-resync seam (§5.2) + multi-map travel (§5.3): `exits` become doorways; the Gear Badge gate opens **one** new area (**The Lagoon**), stocked with its wild-roster slice. *The remaining four areas grow area-by-area in **M5**.* | Beat Gym 1 → walk through the newly-opened gate into The Lagoon, stocked with its own wild Fakeamon | **Opus 4.8 / high** (biggest new system) |

**Why Step 6 is re-scoped (Fable #1 + §A.3 CR-A):** the old Step 6 fused a
*bounded system* ("open ONE new area") with an *unbounded content treadmill*
("keep doing it for all five areas, into M5"). The bounded half stays as M4S6
and gains the multi-map substance it always silently assumed; the unbounded
half is now explicitly M5-and-on content work (it was already half-acknowledged
as "continues into M5"). This caps M4's definition-of-done at Gym 1's area, the
exact scope-guard the review recommended.

**Definition of done for M4** (measurable, on the live URL): win tokens from
wild battles, heal at a Fakeatent, buy balls at a Tall Tower, beat Gym 1's
two-mon team for a badge, cook a healing dish at a Cabin, and walk through the
badge-opened gate into **one** new stocked area — with all of it surviving a
reload (save v2).

**Do NOT build in M4:** evolutions, mini-bosses, Artemis, the box UI (M5-plan
S8), Great/Ultra/Cosmic balls, day/night, gym leaders 2–3, or the remaining
four areas' rosters. Flag and stop, per the golden rules.

---

## §8. Small fixes to land in the current code (before/with M4)

Cheap, and they stop M4 from building on a wobble. All are in the M2/M3 code:

1. **Build the scene-resync seam** (CR-A — **the one High-severity live bug**,
   §5.2) — needed by S6 regardless; doing it at S0/S1 also kills the
   Continue-time encounter desync, the reload XP-farm, and the double-spawn
   sprite leak. The highest-value fix in the list.
2. **Add `.type-normal` and `.type-metal` (and `.type-cosmic` for M5) CSS**
   (CR-C) — a color per type, so the shipped normal-type Meadows roster's type
   badge and sprite stage aren't invisible. ~3 lines in `index.html`; live-
   visible today.
3. **Follow the nested-default pattern for every new `inventory.*` field**
   (CR-B, §2.1) — not a fix to existing code, a rule for M4's code (and fix the
   misleading "defaults for free" comments while you're there).
4. **Add ≥1 metal move** before Gym 1 (CR-D, §4.3).
5. **Fix the stale M3 heading** in `ROADMAP.md` (Fable #2) — it still says "in
   progress / M3S9 next" while everything else says M3 is complete. Pure doc
   hygiene at the milestone boundary.

*(Not an M4 fix, but flagged here so it isn't forgotten: **CR-E**, the missing
`cosmic` type-chart entry, will crash/soft-lock the game the moment Artemis
appears — it belongs at the top of the M5 plan's fix list.)*

---

## §9. Risk register

| Risk | Likelihood | Mitigation |
|---|---|---|
| **Step 6 (multi-map) overruns** — it's the biggest new system and sits last in a full milestone | **High** | §5.2/§5.3 keep it plain-data + one `loadMap` seam; §7 bounds it to *one* area; fallback: ship M4 with the 5 systems + the badge *recorded*, and let the area-travel seam lead M5 if it can't land cleanly |
| **Save fields added feature-first, not up front** → a purchase/badge vanishes on reload | **High** (the natural sloppy path) | §2.1 declares all fields in S0/S1 before the features; §2.3 autosave-trigger checklist; the shallow-merge trap (CR-B) documented |
| **Building M4 on the live CR-A desync bug** — defeated encounters reappear on Continue, reload XP-farm, orphaned sprites | **High** (it's already live) | §8 fix #1 / §5.2 scene-resync seam lands at S0/S1, before multi-map depends on it |
| **Enemy-party change destabilizes the wild-battle path** | Medium | §4.1 keeps `config.enemy` (single) working unchanged; the array path is additive; the faint branch is one call-site |
| **Damage collapses to min-1 chip as gym/boss Defense climbs** | Medium | §4.4 stat-authoring invariant; the double-floor already prevents 0-damage |
| **Economy numbers scattered inline in shop/heal logic** | Medium | §3 one `economy.js` file; feel decided (B16), values `[TUNE]` |
| **Metal gym mon has no metal move / cosmic breaks the chart later** | Medium (metal) / Low now (cosmic) | §4.3 add a metal move for M4; flag `cosmic` for the M5 plan |
| **Content treadmill creeps the other four areas into M4** | Medium | §7 do-not-build list; Step 6 bounded to The Lagoon; roster growth explicitly M5 |
| **Building/berry bumps double-fire or clash with encounter bumps** | Low | Reuse the proven `tryWalk` bump path; one handler per tile kind; guard with `battleInProgress`/a panel-open flag as `handleEncounter` already does |
| **World-graph gap (only 3 badges for 5 lockable areas) blocks Step 6** | Low for M4 | M4 only needs Meadows + The Lagoon; the full graph is an M5 open thread (§10) |

---

## §10. Open threads for humans (Jeff & Lewis)

**Filed as new homework for Lewis (creative — don't guess on his behalf):**

- **B43 — Windeye & Spectera, the off-type gym aces.** Gym 2 is all-Fire and
  Gym 3 all-Water (B13), but their aces are the wrong type. Swap them for
  on-type creatures, or re-flavor the same creatures? *(Needed by M5's Gyms
  2/3; the answer sets the pattern, so it's raised now. Fable #7.)*
- **B44 — Which berries grow in which area?** B35 decided berries are
  area-themed; this is the actual mapping (which of the 6 berries appear in
  The Meadows, The Lagoon, …). *(Needed to make area-themed berries real at
  M4 Step 5; a neutral default prototypes the Cabin.)*

**Jeff's number-tuning (`[TUNE]`, playtesting, not model strength):** every
value in `economy.js` (§3) to hit B16's "3 wins = a ball + a heal"; Gym 1 mon
levels; `TEAM_WIPE_TOKEN_LOSS`; the metal move's power/accuracy; The Lagoon's
wild levels. All live in obvious labeled spots.

**Pure build-time calls (small, reversible — flag in the huddle, no homework):**

- `canFlee: false` for gym battles (§4.2).
- Where the first Fakeatent / Tall Tower / Cooking Cabin sit in The Meadows,
  and what they look like — a fun placement pass Lewis may enjoy; a simple
  default tile is fine to start.
- Per-map `defeatedEncounters` shape (flat vs. per-map object, §5.3).

**Deferred (not M4):** the full **world graph** — how The Forest and Foggy City
connect, since only 3 of 5 lockable areas have a badge gate (§5.3 caveat); this
is an M5-era content/world-layout question. Per-species catch rates (Fable #8)
— only if Lewis ever wants rarity. Great/Ultra/Cosmic ball acquisition. `cosmic`
type-chart entry (M5, Artemis).

---

*Five systems, one currency, one new area — and every persistent number in a
spot a 10-year-old can find. Add the field to the bag first; build the feature
second.* 🏛️💾
