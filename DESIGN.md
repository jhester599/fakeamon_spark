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

**DECIDED (2026-07-06) — the world's name:** the Fakeamon world is called **Venta**. *(Lewis's invention, B7 — details in §7.)*

**DECIDED (2026-07-06) — title screen:** shows the game name **"Fakeamon"** with the word **"Spark"** and a meteor icon beside it. *(Lewis's invention, B27.)*

**DECIDED (2026-07-06) — the hero:** placeholder name **"Hero"**; the look is original art in the spirit of a classic monster-trainer protagonist (cap, backpack, sturdy shoes) — Lewis's reference point was Ash from the Pokémon anime, but per the no-Nintendo-IP rule (§13) the actual design must be our own, not a copy. *(B10 — name/fun-detail still open for Lewis to add later if he wants.)*

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

**DECIDED (2026-07-06) — the evolution show:** a full ceremony — the screen flashes, *"What?! `<name>` is evolving!"*, then a big sprite reveal. *(Lewis's call, B23.)*

**DECIDED (2026-07-06) — shiny variants:** just **one** secret shiny Fakeamon exists in the whole game — a rare legend for players to hunt down. *(Lewis's call, B31 — "it's cool.")* Which species and what it looks like are still open; treat as a fun M3+ art-pass extra, not a blocker.

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

**DECIDED (2026-07-06) — wild Fakeamon level:** depends on where you are — early areas are easy, far areas are dangerous. *(Lewis's call, B4.)* This is a full location-based feature once M3's map (§7) exists. For M2, before the map exists, use the player's average team level as a stand-in (`wildLevel ≈ playerAverageLevel`, with a small random wiggle) — Jeff turns the *real* per-area scaling into numbers once the areas in §7 are built.

---

## 6. Battle System

**Turn order:** by Speed (ties → player). **Actions:** Attack, Catch, Item, Flee, Switch.
**Accuracy:** moves can miss, but rarely (most 90–100%; only the biggest hitters dip lower). **No PP** — unlimited uses.

**DECIDED (2026-07-06) — fleeing:** Run **always works** — a "Run" button that never fails. *(Lewis's call, B1.)*

**DECIDED (2026-07-08) — Switch mid-battle costs a turn:** bringing in a different teammate follows the same speed-order rule as every other action. If you're faster, the switch happens safely and your new Fakeamon just takes the opponent's attack that turn. If you're slower, the opponent gets a free hit on your *current* Fakeamon first — and if that faint ends the battle, the switch never completes. Picking from the switch menu is the only thing that costs the turn; backing out (Cancel) is free. *(Jeff & Lewis's call.)*

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

**DECIDED (2026-07-06) — move names & battle-log flavor:** Lewis reviewed the current move names and log lines (e.g. "It's not very effective…") and kept them exactly as-is — no renaming. *(B28, B29.)*

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

**DECIDED (2026-07-06) — base catch rate = 50%** *(Lewis's call: "about 1 in 4, because catching is pretty hard").* Worked backwards from his answer: a regular Fakeaball has `ballBonus = 1`, and at half HP `(1 − 0.5) = 0.5`, so `chance = baseCatchRate × 0.5`. For that to land at ~25% (his "1 in 4"), `baseCatchRate = 0.5`. **Great/Ultra/Cosmic Fakeaball exact `ballBonus` numbers are still [TO DECIDE] — Jeff, number-tuning** (Ultra's 100%-under-50%-HP rule already overrides the formula per the ball tiers below).

Caught Fakeamon join your team.

**DECIDED (2026-07-06) — caught HP:** a caught Fakeamon joins your team **fully healed** — a fresh start. *(Lewis's call, B2.)*

**DECIDED (2026-07-06) — nicknames:** **no nicknames** — species names only, keeps the roster clear. *(Lewis's call, B3.)*

**DECIDED (2026-07-06) — the "Gotcha!" moment:** caught → `"Gotcha! <name> was caught!"`; breaks free → `"Oh no! <name> broke free!"` *(Lewis's call, B5 — he kept the example wording as-is: "the same … are fine.")*

**DECIDED (2026-07-06) — team size = 4** *(Lewis's call: "a little room to experiment").* A caught Fakeamon beyond your 4 active slots goes to **Boxes** — storage you can open to **switch** a boxed Fakeamon in for one on your active team. Nothing is ever lost; it just waits in the Boxes until you want it.

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

Top-down, tile-based. Grid movement, four directions. **DECIDED (2026-07-05):** **visible encounters** — wild Fakeamon stand on the map and you bump into them, no random tall-grass surprises (simpler and less frustrating; details in `PLANS/M3_OVERWORLD_PLAN.md` §6.3).

**DECIDED (2026-07-06) — map structure:** **connected areas** — separate zones with paths between them, not one big open map. *(Lewis's call, B6 — fits nicely with "gym badges open a new area.")*

**DECIDED (2026-07-06) — the six areas of Venta** *(Lewis's invention, B8):*

| Area | Vibe |
|---|---|
| The Meadows | grassland |
| The Forest | trees |
| Foggy City | packed urban city |
| Snow Mountain | icy, Everest-like peaks |
| The Factory | poisonous war zone |
| The Lagoon | swamp |

**DECIDED (2026-07-06) — day/night:** it matters — **mini-bosses only appear at night**. *(Lewis's call, B11.)*

**DECIDED (2026-07-06) — NPCs:** a few villagers scattered around, each with one line of advice. *(Lewis's call, B12.)*

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

| Mini-boss | Our type | Tuxemon basis (stage) | Flavor | Home (Venta) | Entrance line |
|---|---|---|---|---|---|
| **Banvengeance** | Grass (Shadow) | Wood/Shadow, Stage 2 (Banling→Bansaken→Banvengeance) | strangler-fig "Sepulchre" brute | The Forest | "Prepare to die, puny monkey thing!" |
| **Saurchin** | Water | Water, evolves from Poinchin | dinosaur + sea-urchin megafauna | The Lagoon | "Get ready to be crushed." |
| **Sharpfin** | Water | Water/Wood, Stage 1 (from Dollfin) | shark, "the Rip" | The Lagoon | "You look easy." |
| **Gastronium** | Metal | Metal, Stage 1 (from Stomic) | radioactive metal gastropod — fits the cosmic/meteor theme | The Factory | "It's time to blow things up." |
| **Tobishimi** | Water | Water/Wood, Stage 2 (Drashimi→Tsushimi→Tobishimi) | dragon-roll dragon; "Celestial" tag, learns Starfall | The Lagoon | "Prepare to meet your doom." |

**DECIDED (2026-07-06) — mini-boss homes & entrance lines:** *(Lewis's invention, B9 + B21)* — the three Water-type mini-bosses (Saurchin, Sharpfin, Tobishimi) all live in the swampy Lagoon; Banvengeance takes The Forest and Gastronium takes The Factory.

**DECIDED (2026-07-06) — mini-boss difficulty order:** any order, same difficulty — explore freely and fight them in whatever order you find them. *(Lewis's call, B20.)*

### The 3 gyms (leader + standard + ace)

| Gym | Leader (trainer NPC) | Standard | Ace (stronger) | Gym typing |
|---|---|---|---|---|
| **1** | Enforcer Boss | **Allagon** — Metal dragon (alloy+dragon) | **AV8R** — Metal/Sky robot bird ("aviator") | **Metal** |
| **2** | Goth | **Agnite** — Fire "false dragon" iguana | **Windeye** — Metal/Lightning "tower" bot *(needs a Fire re-theme or swap at M4 build time)* | **Fire** |
| **3** | Child Actor | **Spectera** — Grass/Sky leaf-winged fruit bat | **Eaglace** — Water/Frost ice eagle *(Spectera needs a Water re-theme or swap at M4 build time)* | **Water** |

**Gym typing note:** Gym 1 is cleanly Metal; Gyms 2 and 3 currently mix two types. **DECIDED (2026-07-05):** **each gym is a single type** — cleaner type-advantage strategy. *(Lewis's call.)* **DECIDED (2026-07-06) — which type:** Gym 2 → all **Fire** (Agnite already fits); Gym 3 → all **Water** (Eaglace already fits). *(Lewis's call, B13.)* Build note for M4: Windeye and Spectera are off-type for their gym and need re-theming or swapping for an on-type ace.

**DECIDED (2026-07-06) — badge names & what they unlock** *(Lewis's invention, B14):*

| Gym | Badge | Opens |
|---|---|---|
| 1 | Gear Badge | The Lagoon |
| 2 | Flame Badge | The Factory |
| 3 | Wet Badge | Snow Mountain |

**DECIDED (2026-07-06) — inside a gym:** straight to the leader — walk in, battle, done. No warm-up trainer or puzzle. *(Lewis's call, B15.)*

**DECIDED (2026-07-06) — gym rematches:** yes, same team, for a smaller token reward. *(Lewis's call, B17.)*

**DECIDED (2026-07-06) — the Cooking Cabin:** self-serve — nobody runs it, walk in and cook. *(Lewis's call, B26.)*

**DECIDED (2026-07-06) — where Cooking Cabins are:** they're **more common in the Snow Mountain area**. *(Lewis's invention, volunteered outside a homework round.)* Whether Snow Mountain is the *only* place with one, or there's also a smaller cabin somewhere earlier so cooking isn't gated entirely behind that area's gym badge, is still open — see **B36** in `HOMEWORK_BACKLOG.md`.

---

## 9. Economy & Items

**Tokens** — earned in gym battles and found in the world; spent on healing (Fakeatents) and Fakeaballs (Tall Towers). **[TO DECIDE: prices.]**

**DECIDED (2026-07-06) — pricing feel:** after winning about **3** wild battles, you should be able to afford **a Fakeaball and a heal** — comfortable, keeps the adventure moving. *(Lewis's call, B16 — Jeff still sets the exact token numbers to hit this feel.)*

**DECIDED (2026-07-06) — Tall Tower stock:** just Fakeaballs — cooking covers healing, keep shops simple. *(Lewis's call, B18.)*

**Berries & Recipes** — found while exploring; cooked into healing dishes.

**DECIDED (2026-07-06) — how you find berries:** **you can find them on the ground** while exploring the overworld. *(Lewis's invention, volunteered outside a homework round.)* Whether specific berries are themed to specific areas (matching each area's vibe, §7) or any of the 6 can turn up anywhere is still open — see **B35** in `HOMEWORK_BACKLOG.md`.

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

**DECIDED (2026-07-06) — how the adventure starts:** Artemis reveals his meteor plan to the whole world — that's the opening scene. *(Lewis's invention, B19.)*

**DECIDED (2026-07-05):** you **cannot catch Artemis** after beating it — it's so powerful it would one-shot every other Fakeamon; defeating it is the ending. And **gym badges open a new area** to explore. *(Both Lewis's calls.)*

**DECIDED (2026-07-06) — Artemis's lair:** you see purple fire and Artemis's throne of stars, then the battle begins. *(Lewis's invention, B22.)*

**DECIDED (2026-07-06) — the win screen:** *"Venta is saved! But adventures still await you…"* *(Lewis's invention, B24.)*

**DECIDED (2026-07-06) — after you win:** the world stays open — keep exploring and catching. *(Lewis's call, B25.)*

---

## 11. Development Roadmap (slice-first)

**M1 — Battle Slice (start here):** Growler vs Whaley, movesets + stats + type chart + damage formula. Turn loop, rare misses, HP bars, faint, win/lose. No overworld/catching/menus yet.
**M2 — Catching & Team:** Fakeaballs, capture formula, party/inventory.
**M3 — Overworld:** tile map, movement, encounter → battle.
**M4 — World Systems:** Fakeatents, Tall Towers, tokens, first gym, the Cooking Cabin, and area-by-area wild-roster growth.
**M5 — Depth & Story:** evolutions, the 5 mini-bosses, and the Artemis finale.

---

## 12. Assets & Attribution (Tuxemon references)

**Verified 2026-07-06 directly against the `Tuxemon/Tuxemon` GitHub repo** (not just the wiki — see §13 for the exact source path). Two corrections from earlier versions of this doc:

**License:** the repo's own `ATTRIBUTIONS.md` lists most relevant assets as **CC BY-SA 4.0** (not 3.0 as previously written here), with a genuine mix per asset — some entries are CC BY 3.0, CC BY 4.0, or even Public Domain in the same file. **Allagon is CC BY-SA 4.0** (share-alike) per that file — the earlier note calling it a non-share-alike "CC BY 4.0" exception appears to have been wrong. **Bottom line: check the license per asset before using it; don't assume a blanket license for the whole project.** Our own *code* can be any license; the CC obligation rides with the images.

**✅ Attribution gap resolved (2026-07-06):** the repo's `ATTRIBUTIONS.md` has no entry for **Hissiorite** or **Frondly**, but both wiki pages have been checked by hand — see `CONTENT_REFERENCE.md` §13 for the full record. Hissiorite is credited to princess-phoenix; Frondly to Leo (design), ReallyDarkandWindie (art), Levaine (sprites), and Sanglorian (back sprite) — both CC BY-SA 3.0. `CREDITS.md` reflects this.

### Starters

| Ours | Tuxemon | Battle sprite file | Wiki | Artists to credit |
|---|---|---|---|---|
| Growler | Hissiorite | `battle/hissiorite-sheet.png` | https://wiki.tuxemon.org/Hissiorite | princess-phoenix — CC BY-SA 3.0 (per wiki) |
| Whaley | Bigfin | `battle/bigfin-sheet.png` | https://wiki.tuxemon.org/Bigfin | Cavalcadeur, rsg167 (per repo `ATTRIBUTIONS.md`) |
| Leafick | Frondly | `battle/frondly-sheet.png` | https://wiki.tuxemon.org/Frondly | Leo, ReallyDarkandWindie, Levaine, Sanglorian — CC BY-SA 3.0 (per wiki) |

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

**Not flat images — they're composite sprite sheets, 128×88px.** *(Corrected 2026-07-06 — measured against 10 real sheets during M3 prep; the earlier "2×2 grid of ~64×44 cells" description here was wrong.)* Each `-sheet.png` holds three things: a large **front** (enemy-facing) pose, 64×64 at (0,0); a large **back** (player's-own-Fakeamon) pose, 64×64 at (64,0); and a small **2-frame idle animation**, two 24×24 frames at (0,64) and (24,64) — the little sprite that stands on the overworld map, already tile-scale. `tools/slice-sheets.mjs` cuts a sheet into exactly those pieces (`assets/sprites/front|back|idle/`). Scale with nearest-neighbor only, same as before.

**Curiosity, not a blocker:** both `dollfin-sheet.png` and `d0llf1n-sheet.png` (stylized zero/one spelling) exist in the repo as two different files. Doesn't affect us — Whaley has no pre-evolution (§3, Lewis's decision), so we don't need either.

Maintain a **`CREDITS.md`** in the repo once we actually pull files in (M3 step 3, per `ROADMAP.md`): file, our name, source path, artist(s), license, and the commit/date it was pulled from (the `development` branch moves — note the commit SHA at pull time so we can find the exact source again later).

**DECIDED (2026-07-06) — Lewis's own credit line:** declined — "don't have any credits, the game keeps going." *(B30.)* `CREDITS.md` stays focused on art attribution only.

---

## 13. Technical Notes

- **Stack: CONFIRMED (2026-07-06) by Jeff** — plain HTML/CSS/JS with global `<script>` tags (no build step, no ES modules) through M2, so double-clicking `index.html` keeps working; **Phaser 4** at M3, pinned to an exact version and loaded from a CDN as a classic script global (same no-build style — see `PLANS/M3_OVERWORLD_PLAN.md` §2 and `PLANS/M5_STATE_AND_SAVE_PLAN.md` §A.1). Built from scratch with Claude Code, Tuxemon as art source/reference (not a forked codebase).
- **Repo:** add `CLAUDE.md` (design + current milestone) and `CREDITS.md` (attribution).
- **Type system decision (new):** confirm adding Metal + Cosmic and lock the mapping in §4.
- **IP:** inspired by Pokémon only — no Nintendo names/sprites/music. Borrowed base art is Tuxemon's, credited. *(Not legal advice; none of this bites until public distribution.)*

**DECIDED (2026-07-06) — sound & music:** full chiptune — retro music for the map, battle, and bosses. *(Lewis's call, B32.)* Lands whenever audio is added (likely M3+).

---

## 14. Open Questions — Quick Index

**Resolved in v0.3:** Leafick's moves; Artemis stats (2× rule) + moveset (incl. self-hitting Meteor Shower); all 5 mini-bosses; all 3 gyms (leader/standard/ace); Tuxemon type mapping proposed; Metal type proposed; expanded type chart drafted.

**Resolved by Lewis (2026-07-05):** Cosmic = 2× vs all types (§4); single-type gyms (§8); Whaley has no pre-evolution (§3); auto-evolve, no confirm (§3); Fakeaball tiers — Great / Ultra / Cosmic — and mini-bosses catchable only with a Cosmic Fakeaball (§6); whole-team-faint = wake at Fakeatent, lose a few tokens (§6); gym badges open a new area (§10); can't catch Artemis (§10); full berry + recipe list (§9).

**Resolved by Lewis (2026-07-06):** team size = 4, overflow goes to Boxes with switching (§6); base catch rate = 50% (§6).

**Confirmed by Jeff (2026-07-06):** tech stack — plain HTML/JS with global scripts through M2, Phaser 4 via pinned CDN global starting M3 (§13).

**Resolved by Lewis (2026-07-06 — homework backlog batch, B1–B32 except B33):** fleeing always works (§6); caught Fakeamon join fully healed, no nicknames, the "Gotcha!"/broke-free lines (§6); battle-log flavor + move names kept as-is (§6); wild Fakeamon level depends on location, with a team-average stand-in for M2 (§5); connected areas (not one map), the world is named **Venta**, its six areas + vibes, day/night matters (mini-bosses only appear at night), a few villager NPCs (§7); mini-boss home turfs + entrance lines + any-order difficulty, Gym 2/3 re-themed to Fire/Water, badge names + what they unlock, straight-to-the-leader gyms, rematches allowed, self-serve Cooking Cabin (§8); pricing feel + Tall Tower sells just balls (§9); the opening scene, Artemis's lair, the win screen text, staying open after winning (§10); the hero's identity — original art, not a copy of any existing character (§1); the title screen (§1); Lewis declined a personal credit line (§12); one secret shiny variant exists (§3); the evolution ceremony is a full one (§3); full chiptune sound/music (§13).

**Still open — grown-up / number-tuning (Jeff):**
1. Officially confirm adding **Metal** and **Cosmic** types + lock the type chart.
2. Pull actual gym-leader (Enforcer Boss / Goth / Child Actor) sprites + credits.
3. Evolution **level** per starter; XP curve + per-Fakeamon XP; mini-boss levels/stats.
4. Per-ball catch bonuses (Great/Ultra/Cosmic exact multipliers), floor/cap; token prices + gym rewards (feel is decided, §9).
5. Windeye's and Spectera's off-type re-theme/swap for Gyms 2/3, at M4 build time (§8).
6. Wild-level location scaling — the real per-area numbers, once M3's areas (§7) exist.

**Still open — Lewis, whenever:** B33 — where you swap boxed Fakeamon onto your active team (needed by M5's Boxes UI).
