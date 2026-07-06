# Fakeamon — Game Design Document

> A turn-based monster-collecting RPG, built together by Jeff & Lewis.
> **Status:** Living document — v0.3. **[TO DECIDE]** = open question. **(proposed)** = a starting point to tune after playtesting.

---

## 1. Vision

Fakeamon is a top-down, turn-based RPG in the spirit of classic monster-catching games. You explore an open world, catch creatures called **Fakeamon**, battle them turn-by-turn, and build a team strong enough to stop a cosmic threat: an evil legendary Fakeamon named **Artemis** is sending a **meteor** to strike the Fakeamon world.

**Design pillars:**
1. **Easy to pick up, fun in five minutes.**
2. **Collecting is the heart.**
3. **Small and finishable.**

---

## 2. Core Gameplay Loop

Two modes flow into each other:

**Overworld** — walk a tile map, explore, find items/berries, reach locations. Encountering a wild Fakeamon starts a battle.
**Battle** — turn-based fight vs. a wild Fakeamon, mini-boss, or trainer. Choose attacks, try to capture, earn XP and tokens.

```
Explore overworld ──encounter──▶ Battle
      ▲                            │
      └──── earn XP, tokens ───────┘ → get stronger → explore further
```

---

## 3. Fakeamon (the creatures)

Fields: Name, Type, Stats (HP/Attack/Defense/Speed), Moves (up to 4), Level & XP, Evolution, Sprite.

### The three starters

| Starter | Type | Art based on (Tuxemon) | Evolution chain (from Tuxemon lines) |
|---|---|---|---|
| **Growler** | Fire | Hissiorite | Growler → Cobarett art → Pythonova art |
| **Whaley** | Water | Bigfin | Dollfin art → Whaley (Bigfin) |
| **Leafick** | Grass | Frondly | Budaye art → Leafick (Frondly) |

**Whaley/Dollfin note:** In Tuxemon, both Bigfin (Whaley) and the mini-boss Sharpfin evolve from **Dollfin**. To avoid the same base sprite appearing twice, either give Whaley no pre-evolution (start it as Bigfin) or pick a different base. **DECIDED (2026-07-05):** Whaley has **no pre-evolution** — it starts as Bigfin. Simplest, and it avoids the shared Dollfin sprite. *(Lewis's call.)*

**Evolutions** change the sprite and unlock higher stats at a set level. Because these Tuxemon are mid-chain, before/after art already exists for free. **DECIDED (2026-07-05):** **auto-evolve** — a Fakeamon evolves right away when it's strong enough (no "do you want to evolve?" prompt). *(Lewis's call.)* **[TO DECIDE: evolution level per starter — number tuning, Jeff.]**

---

## 4. Types & Type Chart

**Big decision this version:** the mini-bosses and gym teams use Tuxemon types beyond our original trio — especially **Metal** (4 of them). Two ways to handle it: relabel everything into Fire/Water/Grass, or **add Metal as a real type**. Since Metal is so well represented, adding it is recommended.

**Proposed type list:** Fire, Water, Grass, **Metal**, plus **Normal** (neutral basics) and **Cosmic** (Artemis's unique type).

### Tuxemon → our type mapping (proposed)

| Tuxemon type | Our type |
|---|---|
| Fire | Fire |
| Water | Water |
| Wood | Grass |
| Metal | Metal |
| Shadow / Frost / Sky / Lightning / Venom (elements) | flavor only — map to the creature's main type |
| Djinnbo's Fire/Shadow | Cosmic (Artemis only) |

### Type chart (proposed — 4 core types + Normal)

Attacker → how much damage vs each defender:

| Attacker ↓ / Defender → | Fire | Water | Grass | Metal |
|---|---|---|---|---|
| **Fire** | 1× | 0.5× | 2× | 2× |
| **Water** | 2× | 1× | 0.5× | 1× |
| **Grass** | 0.5× | 2× | 1× | 0.5× |
| **Metal** | 0.5× | 1× | 2× | 1× |
| **Normal** | 1× | 1× | 1× | 1× |

Reads cleanly: Fire melts Metal and burns Grass; Water douses Fire; Grass drinks Water; Metal chops Grass. **Cosmic** (Artemis) matchups — **DECIDED (2026-07-05):** Cosmic hits **2× against every type**. *(Lewis's call — "if it wasn't hard, the training and journey would feel like they were for nothing.")* The finale still stays winnable because Artemis's Meteor Shower also damages itself.

---

## 5. Stats & Progression

**Stats:** HP, Attack, Defense, Speed. (No separate "Special" — kept simple.)

**Starter stat blocks (level 5, proposed):**

| Fakeamon | HP | Attack | Defense | Speed |
|---|---|---|---|---|
| Growler (Fire) | 40 | 13 | 10 | 12 |
| Whaley (Water) | 44 | 12 | 12 | 9 |
| Leafick (Grass) | 42 | 11 | 13 | 10 |

**Mini-boss tier (proposed HP — single strong encounters, stronger than starters):**

| Mini-boss | Our type | Proposed HP |
|---|---|---|
| Saurchin | Water | **130 (strongest)** |
| Banvengeance | Grass | 120 |
| Tobishimi | Water | 115 |
| Gastronium | Metal | 110 |
| Sharpfin | Water | 100 |

**Artemis (final boss):** Rule — **Artemis's HP = at least 2× the strongest mini-boss.** With Saurchin at 130, that sets **Artemis HP = 260 (proposed)**. If mini-boss HP changes later, Artemis's HP updates to keep the 2× ratio.

Proposed Artemis block: **HP 260, Attack 22, Defense 16, Speed 14.**

**Leveling:** winning awards XP → level up → stats rise. Mini-bosses award more XP than wild Fakeamon. **[TO DECIDE: XP curve; per-Fakeamon XP; mini-boss levels.]**

---

## 6. Battle System

**Turn order:** by Speed (ties → player). **Actions:** Attack, Catch, Item, Flee.
**Accuracy:** moves can miss, but rarely (most 90–100%; only the biggest hitters dip lower). **No PP** — unlimited uses.

**Damage formula (tuned for 3–5 hits per battle):**
```
raw = move.power + attacker.Attack − defender.Defense   (minimum 1)
damage = round( raw × typeMultiplier × random(0.85 … 1.15) )
```

### Movesets

| Fakeamon | Move | Type | Power | Acc | Notes |
|---|---|---|---|---|---|
| **Growler** | Tackle | Normal | 8 | 100% | basic |
| | Bite | Normal | 10 | 95% | |
| | Burn | Fire | 12 | 95% | |
| | Flare | Fire | 18 | 85% | big hit, rare miss |
| **Whaley** | Tackle | Normal | 8 | 100% | basic |
| | Splash | Water | 8 | 100% | weak, never misses |
| | Spout | Water | 12 | 95% | |
| | Breech | Water | 16 | 90% | heavy hit |
| **Leafick** | Tackle | Normal | 8 | 100% | basic |
| | Leafage | Grass | 12 | 95% | |
| | Pounce | Normal | 10 | 95% | leaping hit |
| | Confusion | Normal* | 10 | 95% | *could later add a "confuse" status effect |

### Artemis's moveset (final boss)

| Move | Type | Power | Acc | Notes |
|---|---|---|---|---|
| Hyper Beam | Cosmic | 28 | 90% | biggest single hit |
| Cosmic Shift | Cosmic | 18 | 95% | reliable |
| Meteor Shower | Cosmic | 24 | 90% | **hits BOTH** — full damage to the player's Fakeamon *and* Artemis damages itself (proposed self-damage = half the damage dealt) |

Meteor Shower is Lewis's idea and it's a good one: because Artemis hurts itself, a patient player can win even against its huge HP pool. It makes the finale dramatic but beatable.

**Capturing:** throw a **Fakeaball** at a **wild** Fakeamon. Probability-based; higher chance at low HP.
```
chance = baseCatchRate × (1 − currentHP / maxHP) × ballBonus   (with a small floor and a cap)
```
Caught Fakeamon join your team.

**DECIDED (2026-07-05) — Fakeaball tiers (Lewis's design):**

| Ball | Effect |
|---|---|
| **Fakeaball** | the basic ball |
| **Great Fakeaball** | slightly higher catch chance than a normal Fakeaball |
| **Ultra Fakeaball** | **100% catch** if the target is below **50% HP** |
| **Cosmic Fakeaball** | the best ball — and the **only** one that can catch a **mini-boss** |

**DECIDED (2026-07-05):** you **can catch a mini-boss**, but **only with a Cosmic Fakeaball**. *(Lewis's call.)* Artemis stays uncatchable (see §10).

**Losing:** **DECIDED (2026-07-05):** when your whole team faints, you wake up at the last **Fakeatent**, fully healed, and **drop a few tokens** — a small sting, not harsh. *(Lewis's call.)*

---

## 7. The Overworld

Top-down, tile-based. Grid movement, four directions. **[TO DECIDE: one big map vs. connected areas; random (tall-grass) vs. visible encounters — visible is simpler and less frustrating for v1.]**

---

## 8. World Locations & Roster

| Location | What it does | Cost/Reward |
|---|---|---|
| **Gym** | Trainer with a 2-Fakeamon team (a standard + a stronger ace). Optional challenge. | Tokens (+ maybe a badge perk) |
| **Mini-boss** | Single strong Fakeamon. **5 total**; beating all 5 unlocks Artemis. | Big XP; unlock finale |
| **Fakeatent** | Heal to full HP. | Tokens |
| **Tall Tower** | Buy Fakeaballs. | Tokens |
| **Cooking Cabin** | Combine berries into healing dishes (recipes heal different amounts). | Berries |

### The 5 mini-bosses (defeat all → unlock Artemis)

| Mini-boss | Our type | Tuxemon basis (stage) | Flavor |
|---|---|---|---|
| **Banvengeance** | Grass (Shadow) | Wood/Shadow, Stage 2 (Banling→Bansaken→Banvengeance) | strangler-fig "Sepulchre" brute |
| **Saurchin** | Water | Water, evolves from Poinchin | dinosaur + sea-urchin megafauna |
| **Sharpfin** | Water | Water/Wood, Stage 1 (from Dollfin) | shark, "the Rip" |
| **Gastronium** | Metal | Metal, Stage 1 (from Stomic) | radioactive metal gastropod — fits the cosmic/meteor theme |
| **Tobishimi** | Water | Water/Wood, Stage 2 (Drashimi→Tsushimi→Tobishimi) | dragon-roll dragon; "Celestial" tag, learns Starfall |

### The 3 gyms (leader + standard + ace)

| Gym | Leader (trainer NPC) | Standard | Ace (stronger) | Gym typing |
|---|---|---|---|---|
| **1** | Enforcer Boss | **Allagon** — Metal dragon (alloy+dragon) | **AV8R** — Metal/Sky robot bird ("aviator") | Metal (coherent) |
| **2** | Goth | **Agnite** — Fire "false dragon" iguana | **Windeye** — Metal/Lightning "tower" bot | Fire + Metal (mixed) |
| **3** | Child Actor | **Spectera** — Grass/Sky leaf-winged fruit bat | **Eaglace** — Water/Frost ice eagle | Grass + Water (mixed) |

**Gym typing note:** Gym 1 is cleanly Metal; Gyms 2 and 3 currently mix two types. **DECIDED (2026-07-05):** **each gym is a single type** — cleaner type-advantage strategy. *(Lewis's call.)* Gyms 2 and 3 will be re-themed to one type each when we build M4 (keep the leader's ace type, swap the off-type creature).

---

## 9. Economy & Items

**Tokens** — earned in gym battles and found in the world; spent on healing (Fakeatents) and Fakeaballs (Tall Towers). **[TO DECIDE: prices.]**
**Berries & Recipes** — found while exploring; cooked into healing dishes.

**DECIDED (2026-07-05) — Lewis's berries & recipes:**

Berries: **Fakeaberry, Greenberry, Raspberry, Cosmicberry, Greatberry, Bossberry** *(Bossberry only drops from mini-bosses).*

| Recipe | Dish | Heals |
|---|---|---|
| Fakeaberry + Fakeaberry | Fakea Snack | +10 HP |
| Greenberry + Greenberry | Green Snack | +20 HP |
| Raspberry + Raspberry | Rasp Snack | +20 HP |
| Cosmicberry + Cosmicberry | Cosmic Snack | +40 HP |
| Greatberry + Greatberry | Great Snack | +30 HP |
| Bossberry + Bossberry | Boss Snack | +30 HP |
| Fakeaberry + Greenberry | Healthy Snack | +30 HP |
| Fakeaberry + Raspberry | Healthier Snack | +40 HP |
| Fakeaberry + Cosmicberry | Cosmic Dish | +50 HP |
| Fakeaberry + Greatberry | Healthiest Snack | +50 HP |
| Greenberry + Raspberry | Rasp Dish | +30 HP |
| Greenberry + Cosmicberry | Green Meal | +40 HP |
| Greenberry + Greatberry | Great Meal | +40 HP |
| *any other combination* | Basic Dish | +30 HP |

---

## 10. Story & Win Condition

**Premise:** legendary **Artemis** (art based on Tuxemon's **Djinnbo**) sends a meteor at the world. The meteor is **story only — no countdown timer.**

**Spine:**
1. Choose a starter, explore.
2. Catch/train a team; earn tokens; challenge gyms for extra rewards.
3. Find and defeat the **5 mini-bosses**.
4. That unlocks the **final battle with Artemis** (see stats/moveset in §5–6).
5. Beat Artemis → stop the meteor → win.

**DECIDED (2026-07-05):** you **cannot catch Artemis** after beating it — it's so powerful it would one-shot every other Fakeamon; defeating it is the ending. And **gym badges open a new area** to explore. *(Both Lewis's calls.)*

---

## 11. Development Roadmap (slice-first)

**M1 — Battle Slice (start here):** Growler vs Whaley, movesets + stats + type chart + damage formula. Turn loop, rare misses, HP bars, faint, win/lose. No overworld/catching/menus yet.
**M2 — Catching & Team:** Fakeaballs, capture formula, party/inventory.
**M3 — Overworld:** tile map, movement, encounter → battle.
**M4 — World Systems:** Fakeatents, Tall Towers, tokens, first gym.
**M5 — Depth & Story:** evolutions, the 5 mini-bosses, cooking, and the Artemis finale.

---

## 12. Assets & Attribution (Tuxemon references)

**Verified 2026-07-06 directly against the `Tuxemon/Tuxemon` GitHub repo** (not just the wiki — see §13 for the exact source path). Two corrections from earlier versions of this doc:

**License:** the repo's own `ATTRIBUTIONS.md` lists most relevant assets as **CC BY-SA 4.0** (not 3.0 as previously written here), with a genuine mix per asset — some entries are CC BY 3.0, CC BY 4.0, or even Public Domain in the same file. **Allagon is CC BY-SA 4.0** (share-alike) per that file — the earlier note calling it a non-share-alike "CC BY 4.0" exception appears to have been wrong. **Bottom line: check the license per asset before using it; don't assume a blanket license for the whole project.** Our own *code* can be any license; the CC obligation rides with the images.

**⚠️ Attribution gap:** the repo's `ATTRIBUTIONS.md` has **no entry at all** for **Hissiorite** or **Frondly** — two of our three starters' base sprites. The wiki pages linked below might still have artist credit, but automated tools couldn't load them (blocked). **Someone needs to check `wiki.tuxemon.org/Hissiorite` and `wiki.tuxemon.org/Frondly` by hand** before we credit/use those two sprites publicly.

### Starters

| Ours | Tuxemon | Battle sprite file | Wiki | Artists to credit |
|---|---|---|---|---|
| Growler | Hissiorite | `battle/hissiorite-sheet.png` | https://wiki.tuxemon.org/Hissiorite | princess-phoenix — **⚠️ not in repo's ATTRIBUTIONS.md, verify on wiki** |
| Whaley | Bigfin | `battle/bigfin-sheet.png` | https://wiki.tuxemon.org/Bigfin | Cavalcadeur, rsg167 (per repo `ATTRIBUTIONS.md`) |
| Leafick | Frondly | `battle/frondly-sheet.png` | https://wiki.tuxemon.org/Frondly | Leo, ReallyDarkandWindie, Levaine, Sanglorian — **⚠️ not in repo's ATTRIBUTIONS.md, verify on wiki** |

### Legendary

| Ours | Tuxemon | Battle sprite file | Wiki | Artists |
|---|---|---|---|---|
| Artemis | Djinnbo | `battle/djinnbo-sheet.png` | https://wiki.tuxemon.org/Djinnbo | Cavalcadeur, rsg167 (per repo `ATTRIBUTIONS.md`; wiki also lists Sanglorian, slickedbackArtisan) |

### Mini-bosses

All 5 confirmed present at `battle/<slug>-sheet.png`.

| Ours | Battle sprite file | Wiki | Artists |
|---|---|---|---|
| Banvengeance | `battle/banvengeance-sheet.png` | https://wiki.tuxemon.org/Banvengeance | HippasusTwo, Jaskrendix, WDFA-Final |
| Saurchin | `battle/saurchin-sheet.png` | https://wiki.tuxemon.org/Saurchin | Serpexnessie, Sanglorian, PandiRocks-17 |
| Sharpfin | `battle/sharpfin-sheet.png` | https://wiki.tuxemon.org/Sharpfin | Leo, extyrannomon, Sanglorian |
| Gastronium | `battle/gastronium-sheet.png` | https://wiki.tuxemon.org/Gastronium | WDFA-Final, JaskRendix |
| Tobishimi | `battle/tobishimi-sheet.png` | https://wiki.tuxemon.org/Tobishimi | princess-phoenix, Lejun |

### Gyms

Standard/ace battle sprites all confirmed present at `battle/<slug>-sheet.png`. Leader sprites are **NPC trainer art**, a different folder: `mods/tuxemon/sprites/<name>.png` (often color-variant palette swaps of a reusable archetype, not one-off art).

| Role | Ours | Sprite file | Wiki | Artists / notes |
|---|---|---|---|---|
| Gym 1 leader | Enforcer Boss | `sprites/boss.png` (archetype — confirm exact variant) | https://wiki.tuxemon.org/Enforcer_Boss | trainer/NPC sprite — confirm credits on page |
| Gym 1 standard | Allagon | `battle/allagon-sheet.png` | https://wiki.tuxemon.org/Allagon | Spalding004, Chickenshowman — **CC BY-SA 4.0** (corrected, was mislabeled) |
| Gym 1 ace | AV8R | `battle/av8r-sheet.png` | https://wiki.tuxemon.org/AV8R | Leo, josepharaoh99, Sanglorian |
| Gym 2 leader | Goth | `sprites/goth.png` | https://wiki.tuxemon.org/Goth | trainer/NPC sprite — confirm credits |
| Gym 2 standard | Agnite | `battle/agnite-sheet.png` | https://wiki.tuxemon.org/Agnite | Leo, aviculor, Sanglorian, Levaine |
| Gym 2 ace | Windeye | `battle/windeye-sheet.png` | https://wiki.tuxemon.org/Windeye | DevilDman, Levaine, Sanglorian |
| Gym 3 leader | Child Actor | `sprites/childactor.png` | https://wiki.tuxemon.org/Child_Actor | trainer/NPC sprite — confirm credits |
| Gym 3 standard | Spectera | `battle/spectera-sheet.png` | https://wiki.tuxemon.org/Spectera | Leo, HippasusTwo |
| Gym 3 ace | Eaglace | `battle/eaglace-sheet.png` | https://wiki.tuxemon.org/Eaglace | Leo, DevilDman, Levaine, Sanglorian |

**Getting files — verified path:** battle sprites live at

```
mods/tuxemon/gfx/sprites/battle/<slug>-sheet.png
```

on the `development` branch of `github.com/Tuxemon/Tuxemon` (e.g. `.../battle/hissiorite-sheet.png`). Confirmed present for all 3 starters, Djinnbo, all 5 mini-bosses, and all 6 gym standard/ace Fakeamon named in this doc. Evolution/base sprites (Cobarett, Pythonova, Dollfin, Budaye, Poinchin, Stomic, etc.) are there too, same pattern. Trainer/NPC sprites (gym leaders) live in a **different** folder, `mods/tuxemon/sprites/` — e.g. our "Goth" and "Child Actor" leaders match `goth.png` / `childactor.png` directly, and "Enforcer Boss" likely maps to the generic `boss.png` archetype (Tuxemon reuses named NPC templates with palette-swapped color variants rather than one-off art per trainer — confirm the closest match before use).

**Not flat 64×64 images — they're 2×2 sprite sheets, 128×88px.** Each `-sheet.png` is a grid: one column is the "front" (enemy-facing) pose, the other is a "back" (player's-own-Fakeamon) pose, and each is duplicated across the two rows as a simple 2-frame idle-breathing animation. Each individual cell is roughly 64×44px. Plan to slice frames out of the sheet (not just scale the whole file) when this gets wired into the game at M3. Scale the sliced frame 3–4× with nearest-neighbor, same as before.

**Curiosity, not a blocker:** both `dollfin-sheet.png` and `d0llf1n-sheet.png` (stylized zero/one spelling) exist in the repo as two different files. Doesn't affect us — Whaley has no pre-evolution (§3, Lewis's decision), so we don't need either.

Maintain a **`CREDITS.md`** in the repo once we actually pull files in (M3 step 3, per `ROADMAP.md`): file, our name, source path, artist(s), license, and the commit/date it was pulled from (the `development` branch moves — note the commit SHA at pull time so we can find the exact source again later).

---

## 13. Technical Notes

- **Stack: [TO CONFIRM]** — recommended: browser (HTML5 Canvas → Phaser), built from scratch with Claude Code, Tuxemon as art source/reference (not a forked codebase).
- **Repo:** add `CLAUDE.md` (design + current milestone) and `CREDITS.md` (attribution).
- **Type system decision (new):** confirm adding Metal + Cosmic and lock the mapping in §4.
- **IP:** inspired by Pokémon only — no Nintendo names/sprites/music. Borrowed base art is Tuxemon's, credited. *(Not legal advice; none of this bites until public distribution.)*

---

## 14. Open Questions — Quick Index

**Resolved in v0.3:** Leafick's moves; Artemis stats (2× rule) + moveset (incl. self-hitting Meteor Shower); all 5 mini-bosses; all 3 gyms (leader/standard/ace); Tuxemon type mapping proposed; Metal type proposed; expanded type chart drafted.

**Resolved by Lewis (2026-07-05):** Cosmic = 2× vs all types (§4); single-type gyms (§8); Whaley has no pre-evolution (§3); auto-evolve, no confirm (§3); Fakeaball tiers — Great / Ultra / Cosmic — and mini-bosses catchable only with a Cosmic Fakeaball (§6); whole-team-faint = wake at Fakeatent, lose a few tokens (§6); gym badges open a new area (§10); can't catch Artemis (§10); full berry + recipe list (§9).

**Still open — grown-up / number-tuning (Jeff):**
1. Officially confirm adding **Metal** and **Cosmic** types + lock the type chart.
2. Pull actual gym-leader (Enforcer Boss / Goth / Child Actor) sprites + credits.
3. Evolution **level** per starter; XP curve + per-Fakeamon XP; mini-boss levels/stats.
4. Capture-formula numbers (base rate, per-ball bonuses, floor/cap); token prices + gym rewards.
5. Party size + storage; encounter style; map structure.
