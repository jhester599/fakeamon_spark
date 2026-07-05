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

**Whaley/Dollfin note:** In Tuxemon, both Bigfin (Whaley) and the mini-boss Sharpfin evolve from **Dollfin**. To avoid the same base sprite appearing twice, either give Whaley no pre-evolution (start it as Bigfin) or pick a different base. **[TO DECIDE]**

**Evolutions** change the sprite and unlock higher stats at a set level. Because these Tuxemon are mid-chain, before/after art already exists for free. **[TO DECIDE: evolution level per starter; auto-evolve vs. player-confirm.]**

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

Reads cleanly: Fire melts Metal and burns Grass; Water douses Fire; Grass drinks Water; Metal chops Grass. **Cosmic** (Artemis) matchups are **[TO DECIDE]** — likely neutral or 2× against everything, tuned so the finale is hard but winnable.

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
Caught Fakeamon join your team. **[TO DECIDE: better Fakeaballs? can you catch a mini-boss?]**

**Losing:** **[TO DECIDE: whole team faints → return to last Fakeatent? keep it gentle.]**

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

**Gym typing note:** Gym 1 is cleanly Metal; Gyms 2 and 3 mix two types. Mixed gyms are fine (and simpler — just use the picks), but the "type advantage" strategy is muddier there. **[TO DECIDE: re-theme to single-type gyms, or keep mixed?]**

---

## 9. Economy & Items

**Tokens** — earned in gym battles and found in the world; spent on healing (Fakeatents) and Fakeaballs (Tall Towers). **[TO DECIDE: prices.]**
**Berries & Recipes** — found while exploring; cooked into healing dishes. **[TO DECIDE: berry list + recipes.]**

---

## 10. Story & Win Condition

**Premise:** legendary **Artemis** (art based on Tuxemon's **Djinnbo**) sends a meteor at the world. The meteor is **story only — no countdown timer.**

**Spine:**
1. Choose a starter, explore.
2. Catch/train a team; earn tokens; challenge gyms for extra rewards.
3. Find and defeat the **5 mini-bosses**.
4. That unlocks the **final battle with Artemis** (see stats/moveset in §5–6).
5. Beat Artemis → stop the meteor → win.

**[TO DECIDE: can you catch Artemis after beating it? what do gym badges do?]**

---

## 11. Development Roadmap (slice-first)

**M1 — Battle Slice (start here):** Growler vs Whaley, movesets + stats + type chart + damage formula. Turn loop, rare misses, HP bars, faint, win/lose. No overworld/catching/menus yet.
**M2 — Catching & Team:** Fakeaballs, capture formula, party/inventory.
**M3 — Overworld:** tile map, movement, encounter → battle.
**M4 — World Systems:** Fakeatents, Tall Towers, tokens, first gym.
**M5 — Depth & Story:** evolutions, the 5 mini-bosses, cooking, and the Artemis finale.

---

## 12. Assets & Attribution (Tuxemon references)

**License:** Tuxemon art is **Creative Commons Attribution-ShareAlike (CC BY-SA 3.0)** — usable with (a) credit to the artists and (b) keeping the art (and edits) under the same license. **Exception noticed:** Allagon comes from Spalding004's Sitran Fakedex under **CC BY 4.0** (no share-alike). So **check the license per asset** — most are BY-SA 3.0, some differ. Our own *code* can be any license; the CC obligation rides with the images.

### Starters

| Ours | Tuxemon | Wiki | Artists to credit |
|---|---|---|---|
| Growler | Hissiorite | https://wiki.tuxemon.org/Hissiorite | princess-phoenix |
| Whaley | Bigfin | https://wiki.tuxemon.org/Bigfin | Cavalcadeur, extyrannomon, + sprite team |
| Leafick | Frondly | https://wiki.tuxemon.org/Frondly | Leo, ReallyDarkandWindie, Levaine, Sanglorian |

### Legendary

| Ours | Tuxemon | Wiki | Artists |
|---|---|---|---|
| Artemis | Djinnbo | https://wiki.tuxemon.org/Djinnbo | Cavalcadeur, rsg167, Sanglorian, slickedbackArtisan |

### Mini-bosses

| Ours | Wiki | Artists |
|---|---|---|
| Banvengeance | https://wiki.tuxemon.org/Banvengeance | HippasusTwo, Jaskrendix, WDFA-Final |
| Saurchin | https://wiki.tuxemon.org/Saurchin | Serpexnessie, Sanglorian, PandiRocks-17 |
| Sharpfin | https://wiki.tuxemon.org/Sharpfin | Leo, extyrannomon, Sanglorian |
| Gastronium | https://wiki.tuxemon.org/Gastronium | WDFA-Final, JaskRendix |
| Tobishimi | https://wiki.tuxemon.org/Tobishimi | princess-phoenix, Lejun |

### Gyms

| Role | Ours | Wiki | Artists / notes |
|---|---|---|---|
| Gym 1 leader | Enforcer Boss | https://wiki.tuxemon.org/Enforcer_Boss | trainer/NPC sprite — confirm credits on page |
| Gym 1 standard | Allagon | https://wiki.tuxemon.org/Allagon | Spalding004, Chickenshowman — **CC BY 4.0** |
| Gym 1 ace | AV8R | https://wiki.tuxemon.org/AV8R | Leo, josepharaoh99, Sanglorian |
| Gym 2 leader | Goth | https://wiki.tuxemon.org/Goth | trainer/NPC sprite — confirm credits |
| Gym 2 standard | Agnite | https://wiki.tuxemon.org/Agnite | Leo, aviculor, Sanglorian, Levaine |
| Gym 2 ace | Windeye | https://wiki.tuxemon.org/Windeye | DevilDman, Levaine, Sanglorian |
| Gym 3 leader | Child Actor | https://wiki.tuxemon.org/Child_Actor | trainer/NPC sprite — confirm credits |
| Gym 3 standard | Spectera | https://wiki.tuxemon.org/Spectera | Leo, HippasusTwo |
| Gym 3 ace | Eaglace | https://wiki.tuxemon.org/Eaglace | Leo, DevilDman, Levaine, Sanglorian |

**Getting files:** pull sprites from the Tuxemon GitHub repo (`github.com/Tuxemon/Tuxemon`) — consistent naming + JSON DB — not the wiki. Battle sprites are mostly **64×64 PNG**; scale up 3–4× with nearest-neighbor. Evolution/base sprites (Cobarett, Pythonova, Dollfin, Budaye, Poinchin, Stomic, etc.) are available too. Maintain a **`CREDITS.md`** in the repo: file, our name, source page, artist(s), license.

---

## 13. Technical Notes

- **Stack: [TO CONFIRM]** — recommended: browser (HTML5 Canvas → Phaser), built from scratch with Claude Code, Tuxemon as art source/reference (not a forked codebase).
- **Repo:** add `CLAUDE.md` (design + current milestone) and `CREDITS.md` (attribution).
- **Type system decision (new):** confirm adding Metal + Cosmic and lock the mapping in §4.
- **IP:** inspired by Pokémon only — no Nintendo names/sprites/music. Borrowed base art is Tuxemon's, credited. *(Not legal advice; none of this bites until public distribution.)*

---

## 14. Open Questions — Quick Index

**Resolved in v0.3:** Leafick's moves; Artemis stats (2× rule) + moveset (incl. self-hitting Meteor Shower); all 5 mini-bosses; all 3 gyms (leader/standard/ace); Tuxemon type mapping proposed; Metal type proposed; expanded type chart drafted.

**New decisions from this version:**
1. Confirm adding **Metal** and **Cosmic** types; finalize the type chart + Cosmic matchups.
2. Single-type gyms vs. keep the mixed teams as-is.
3. Whaley's base form (Dollfin appears twice) — resolve.
4. Pull actual gym-leader (Enforcer Boss / Goth / Child Actor) sprites + credits.

**Still needed (M2–M3):** capture details + Fakeaball tiers; mini-boss individual levels/stats; party size + storage; encounter style; map structure; whole-team-faint behavior.

**Bigger picture:** XP curve + per-Fakeamon XP; token prices + gym rewards; berries + recipes; badge effects; can you catch Artemis.
