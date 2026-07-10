# Fakeamon — Decision Log & Loop 📓

This is where **creative-director decisions become official.** When Lewis picks
answers in his homework (`HOMEWORK.md` / `homework.html`), we run the loop below
to fold them into the real design so nothing gets lost between coding sessions.

---

## 🔁 The Decision Loop

**How a decision travels from Lewis's brain into the game:**

```
Lewis does homework  →  tells Jeff his picks  →  Claude records them here
        │                                                    │
        │                                    updates DESIGN.md (clears [TO DECIDE])
        │                                                    │
        └──────────────── ticks the homework, commits ───────┘
```

**To run the loop, just tell Claude the picks**, e.g.:

> "Lewis decided: Q1 = B (super strong), Q6 = D (opens a new area), and for Q10
> the berries are Zingberry + Sunmelon → Sunny Smoothie heals 20."

Claude then, for each decision:

1. **Logs it** in the *Decisions Made* table below (number, what, why, date).
2. **Updates `DESIGN.md`** — finds the matching `[TO DECIDE]` (use the index
   below) and replaces it with the decision, tagged **`DECIDED (date):`** so the
   open question is gone.
3. **Ticks the question** in `HOMEWORK.md` (mark it ✅ / done).
4. **Updates `CLAUDE.md`'s milestone status** if the decision affects the
   current build.
5. **Commits** with a plain message, e.g. `"decide: gym badges open new areas"`.

*Small rule:* if a pick is unclear or clashes with something already decided,
Claude asks before writing it in — we don't guess on Lewis's behalf.

---

## 🗂️ Question Index — where each decision lives in DESIGN.md

Use this to jump straight to the right spot when recording a decision.

| # | Homework question | Lands in DESIGN.md | Status |
|---|---|---|---|
| 1 | Cosmic type strength | §4 Types & Type Chart (Cosmic matchups) | ✅ Decided |
| 2 | Whaley's base form / twin | §3 Fakeamon (Whaley/Dollfin note) | ✅ Decided |
| 3 | Fancier Fakeaballs? | §6 Battle System (Capturing) | ✅ Decided |
| 4 | Catch a mini-boss? | §6 Battle System (Capturing) | ✅ Decided |
| 5 | Catch Artemis after beating it? | §10 Story & Win Condition | ✅ Decided |
| 6 | What a gym badge does | §10 Story (badge effects) | ✅ Decided |
| 7 | Gyms: single-type vs mixed | §8 World Locations & Roster (gym note) | ✅ Decided |
| 8 | Whole-team faint behavior | §6 Battle System (Losing) | ✅ Decided |
| 9 | Evolutions: surprise vs ask | §3 Fakeamon (Evolutions) | ✅ Decided |
| 10 | Berries & recipes | §9 Economy & Items | ✅ Decided |
| 11 | Team size / storage | §6 Battle System (Capturing) | ✅ Decided |
| 12 | Catch-rate feel (base rate) | §6 Battle System (Capturing) | ✅ Decided |
| 13 | Encounter style (visible vs random) | §7 The Overworld | ✅ Decided |
| 14 | (B1) Fleeing wild battles | §6 Battle System (Flee) | ✅ Decided |
| 15 | (B2) Caught Fakeamon HP | §6 Battle System (Capturing) | ✅ Decided |
| 16 | (B3) Nicknames | §6 Battle System (Capturing) | ✅ Decided |
| 17 | (B4) Wild Fakeamon level | §5 Stats & Progression | ✅ Decided |
| 18 | (B5) The "Gotcha!" catch/broke-free lines | §6 Battle System (Capturing) | ✅ Decided |
| 19 | (B6) Map structure — one map vs. connected areas | §7 The Overworld | ✅ Decided |
| 20 | (B7) The world's name | §7 The Overworld | ✅ Decided |
| 21 | (B8) The six areas of Venta + vibes | §7 The Overworld | ✅ Decided |
| 22 | (B9) Mini-boss home turfs | §8 World Locations & Roster | ✅ Decided |
| 23 | (B10) The hero's identity | §1 Vision | ✅ Decided |
| 24 | (B11) Day/night | §7 The Overworld | ✅ Decided |
| 25 | (B12) NPCs | §7 The Overworld | ✅ Decided |
| 26 | (B13) Gym 2/3 re-theme to single types | §8 World Locations & Roster | ✅ Decided |
| 27 | (B14) Badge names + what they unlock | §8 World Locations & Roster | ✅ Decided |
| 28 | (B15) Inside a gym | §8 World Locations & Roster | ✅ Decided |
| 29 | (B16) Pricing feel | §9 Economy & Items | ✅ Decided |
| 30 | (B17) Gym rematches | §8 World Locations & Roster | ✅ Decided |
| 31 | (B18) Tall Tower stock | §9 Economy & Items | ✅ Decided |
| 32 | (B19) How the adventure starts | §10 Story & Win Condition | ✅ Decided |
| 33 | (B20) Mini-boss difficulty order | §8 World Locations & Roster | ✅ Decided |
| 34 | (B21) Mini-boss entrance lines | §8 World Locations & Roster | ✅ Decided |
| 35 | (B22) Artemis's lair | §10 Story & Win Condition | ✅ Decided |
| 36 | (B23) The evolution ceremony | §3 Fakeamon (Evolutions) | ✅ Decided |
| 37 | (B24) The win screen text | §10 Story & Win Condition | ✅ Decided |
| 38 | (B25) After you win | §10 Story & Win Condition | ✅ Decided |
| 39 | (B26) Who runs the Cooking Cabin | §8 World Locations & Roster | ✅ Decided |
| 40 | (B27) Title screen | §1 Vision | ✅ Decided |
| 41 | (B28) Battle-log flavor lines | §6 Battle System | ✅ Decided (kept as-is) |
| 42 | (B29) Move-name glow-up | §6 Battle System | ✅ Decided (kept as-is) |
| 43 | (B30) Lewis's own credit line | §12 Assets & Attribution | ✅ Decided (declined) |
| 44 | (B31) Shiny variants | §3 Fakeamon | ✅ Decided |
| 45 | (B32) Sound & music vibe | §13 Technical Notes | ✅ Decided |
| — | (B33) Where you swap boxed Fakeamon | §6/§8 (M5 Boxes UI) | 🔲 Still open |
| 46 | Berries found on the ground | §9 Economy & Items | ✅ Decided |
| — | (B34) Telling apart a mirror match | §6 Battle System | 🔲 Still open |
| — | (B35) Berries — area-themed or anywhere | §9 Economy & Items | 🔲 Still open |
| 47 | Cooking Cabins more common in Snow Mountain | §7/§8 World Locations | ✅ Decided |
| — | (B36) Cooking Cabins — Snow-Mountain-only or elsewhere too | §8 World Locations & Roster | 🔲 Still open |

*(Evolution **level** per starter is still open — that's Jeff's number-tuning, not a creative call. So are the exact Great/Ultra/Cosmic ball bonus multipliers from Q12.)*

*(When a decision is made, change its Status to ✅ and add a row to the table below.)*

---

## ✅ Decisions Made

| Date | # | Decision | Lewis's reason |
|---|---|---|---|
| 2026-07-05 | 1 | Cosmic type hits **2× against every type** | "if it wasn't hard then you'd feel like the training and journey were for nothing" |
| 2026-07-05 | 2 | Whaley has **no baby form** (starts as Bigfin) | picked the simplest fix for the shared sprite |
| 2026-07-05 | 3 | **Four ball tiers:** Fakeaball, Great (slightly better), Ultra (100% if target <50% HP), Cosmic (best; only ball that catches a mini-boss) | wanted balls that get better, with a special one for the toughest catches |
| 2026-07-05 | 4 | You **can catch a mini-boss — but only with a Cosmic Fakeaball** | makes catching a mini-boss a real prize |
| 2026-07-05 | 5 | You **cannot catch Artemis** after beating it | "Artemis is so powerful he would one-shot every other character" |
| 2026-07-05 | 6 | Gym badges **open a new area** to explore | (option D) |
| 2026-07-05 | 7 | Gyms are **single-type** | (option A — cleaner strategy) |
| 2026-07-05 | 8 | Whole team faints → heal at Fakeatent **and lose a few tokens** | (option B) |
| 2026-07-05 | 9 | Evolving is a **surprise** (auto-evolve, no prompt) | (option A) |
| 2026-07-05 | 10 | **Berries & recipes** (6 berries, 14 recipe rules) — see §9 of DESIGN.md | invented the full cooking list; Bossberry only drops from mini-bosses |
| 2026-07-06 | 11 | **Team size = 4**, overflow goes to **Boxes** (switch a boxed Fakeamon in for an active one) | "a little room to experiment" |
| 2026-07-06 | 12 | **Base catch rate = 50%** (works out to ~1-in-4 at half HP with a regular Fakeaball, per the capture formula) | "catching is pretty hard" |
| 2026-07-05 | 13 | **Visible encounters** — wild Fakeamon stand on the map and you bump into them (no random tall-grass battles) | simpler and less frustrating — you can see who you're walking into *(logged 2026-07-06; decided during planning)* |
| 2026-07-06 | 14 | **Fleeing always works** — a "Run" button that never fails | (option B) |
| 2026-07-06 | 15 | Caught Fakeamon join your team **fully healed** | "joining your team is a fresh start" (option B) |
| 2026-07-06 | 16 | **No nicknames** — species names only | "keeps the roster clear" (option C) |
| 2026-07-06 | 17 | Wild Fakeamon level **depends on where you are** (early areas easy, far areas dangerous) | (option C — really kicks in once M3's map exists; M2 uses team-average level as a stand-in) |
| 2026-07-06 | 18 | The "Gotcha!" lines: caught → `"Gotcha! <name> was caught!"`, breaks free → `"Oh no! <name> broke free!"` | kept the example wording as-is — "the same … are fine" |
| 2026-07-06 | 19 | **Connected areas**, not one big map | (option B — pairs with "badges open a new area") |
| 2026-07-06 | 20 | The Fakeamon world is named **Venta** | invented |
| 2026-07-06 | 21 | **Six areas of Venta:** The Meadows (grassland), The Forest (trees), Foggy City (packed urban), Snow Mountain (icy peaks), The Factory (poisonous war zone), The Lagoon (swamp) | invented |
| 2026-07-06 | 22 | **Mini-boss homes:** Banvengeance → The Forest; Saurchin, Sharpfin, Tobishimi → The Lagoon; Gastronium → The Factory | invented (the three Water mini-bosses share the swampy Lagoon) |
| 2026-07-06 | 23 | **The hero:** placeholder name "Hero"; look is original art in the spirit of a classic monster-trainer protagonist (cap, backpack) — **not** a copy of any existing character, per the no-Nintendo-IP rule | Lewis's reference point was Ash from the Pokémon anime; redirected to an original design per `DESIGN.md` §13's IP rule (Jeff's call, confirmed with Lewis) |
| 2026-07-06 | 24 | **Day/night matters** — mini-bosses only appear at night | (option C, specialized) |
| 2026-07-06 | 25 | **NPCs:** a few villagers, each with one line of advice | (option B) |
| 2026-07-06 | 26 | **Gym re-theme:** Gym 2 → all **Fire**; Gym 3 → all **Water** | Lewis's pick (Agnite/Eaglace already fit; Windeye/Spectera need a re-theme or swap at M4) |
| 2026-07-06 | 27 | **Badge names:** Gym 1 → Gear Badge (opens The Lagoon); Gym 2 → Flame Badge (opens The Factory); Gym 3 → Wet Badge (opens Snow Mountain) | invented |
| 2026-07-06 | 28 | **Inside a gym:** straight to the leader, no warm-up trainer or puzzle | (option A) |
| 2026-07-06 | 29 | **Pricing feel:** after ~3 wild-battle wins, afford a Fakeaball **and** a heal | (option B — comfortable, keeps the adventure moving) |
| 2026-07-06 | 30 | **Gym rematches:** yes, same team, smaller token reward | (option B) |
| 2026-07-06 | 31 | **Tall Tower stock:** just Fakeaballs | (option A — cooking covers healing) |
| 2026-07-06 | 32 | **Opening scene:** Artemis reveals his meteor plan to the whole world | invented |
| 2026-07-06 | 33 | **Mini-boss order:** any order, same difficulty — explore freely | (option A) |
| 2026-07-06 | 34 | **Mini-boss entrance lines:** Banvengeance "Prepare to die, puny monkey thing!" · Saurchin "Get ready to be crushed." · Sharpfin "You look easy." · Gastronium "It's time to blow things up." · Tobishimi "Prepare to meet your doom." | invented |
| 2026-07-06 | 35 | **Artemis's lair:** purple fire and a throne of stars, then the battle begins | invented |
| 2026-07-06 | 36 | **Evolution ceremony:** full ceremony — screen flash, "What?! `<name>` is evolving!", big sprite reveal | (option A) |
| 2026-07-06 | 37 | **Win screen:** *"Venta is saved! But adventures still await you…"* | invented |
| 2026-07-06 | 38 | **After you win:** the world stays open — keep exploring and catching | (option B) |
| 2026-07-06 | 39 | **Cooking Cabin:** self-serve, no NPC chef | (option A) |
| 2026-07-06 | 40 | **Title screen:** "Fakeamon" with the word **"Spark"** and a meteor icon beside it | invented |
| 2026-07-06 | 41 | **Battle-log flavor lines:** keep the current wording, no changes | "use the same … as suggested" |
| 2026-07-06 | 42 | **Move names:** keep the current names, no renaming | "none, keep the same" |
| 2026-07-06 | 43 | **Lewis's own credit line:** declined — no personal credit line added to `CREDITS.md` | "don't have any credits, the game keeps going" |
| 2026-07-06 | 44 | **Shiny variants:** just **one** secret shiny Fakeamon exists in the whole game — a rare legend to hunt | "its cool" (option C) |
| 2026-07-06 | 45 | **Sound & music:** full chiptune — retro music for map, battle, and bosses | (option C) |
| 2026-07-06 | 46 | **Berries can be found on the ground** while exploring the overworld | invented — volunteered outside a formal homework round; follow-up detail (area-themed vs. anywhere) filed as **B35** |
| 2026-07-06 | 47 | **Cooking Cabins are more common in the Snow Mountain area** | invented — volunteered outside a formal homework round; follow-up detail (Snow-Mountain-only vs. a starter cabin too) filed as **B36** |
| 2026-07-08 | 48 | **Switch is a real mid-battle action** (M2 Step 6) — bringing in a teammate costs your turn, with the same speed-order risk as every other action: faster switches in safely, slower means the opponent hits your *current* Fakeamon first | invented live with Jeff during Step 6 — wanted Switch to feel like a real strategic choice, not a free out |

<!--
Template for a new row:
| 2026-07-05 | 6 | Gym badges open a new area to explore | "so beating a gym feels like it unlocks something" |
-->

---

## 🔧 Jeff's technical calls

Engineering decisions, not creative-director picks — logged here so they
don't get lost. (Lewis's creative decisions stay in the table above.)

| Date | Decision | Why |
|---|---|---|
| 2026-07-06 | **Tech stack confirmed:** plain HTML/CSS/JS with global scripts (no build step, no ES modules) through M2; **Phaser 4** at M3, pinned to an exact version and loaded from a CDN as a script global | Keeps double-click-to-play alive and the code Lewis-readable; Phaser-as-CDN-global is the same style, so nothing has to be rewritten. Details: `PLANS/M3_OVERWORLD_PLAN.md` §2 + `PLANS/M5_STATE_AND_SAVE_PLAN.md` §A.1, recorded in `DESIGN.md` §13 |
| 2026-07-06 | **M3 prep staged ("M3S0"):** meadow tilesets, hero walk sheet, and Frondly vendored with credits; Leafick portrait wired in (all 3 starters have art); sheet-slicer tool built with the **corrected sheet layout** (front/back 64×64 + two 24×24 idle frames — the old "2×2 grid of 64×44 cells" note in the docs was measured and found wrong); The Meadows map data drafted (`src/data/maps.js`, dormant until M3 S2); Phaser 4 skills vendored to `PLANS/phaser-skills/`. Newest stable Phaser verified = **4.2.0** (pin happens at S1). Full inventory: M3 plan §A.4 | Jeff asked for background prep while Lewis was away, to de-risk M3's build steps — the tedious sourcing/licensing/tooling is done, the fun build steps are saved for Lewis |
| 2026-07-06 | **Wild-roster art staging (M3S0, part 2):** of the §16 200-monster pool, the **43 with licenses verifiable from Tuxemon's `ATTRIBUTIONS.md` are vendored** (`assets/sprites/battle/`, ledgered in the generated `CREDITS_ROSTER.md`); the **157 credited only on the wiki stay out of the repo** until their check — no asset ships without attribution. Reference data for all 200 (types, evolution lines, catch rates, blurbs) generated into `tools/roster-200.json`; three helper scripts (`wiki-credits`, `vendor-sheets`, `roster-credits`) turn the remaining licensing work into one command from any normal machine | Jeff asked to pre-stage the roster art; wiki.tuxemon.org is blocked from the remote session's network, so the split is "verified now / scripted for later" rather than guessing licenses |
| 2026-07-06 | **Wild-roster staging finished (Cowork wiki run, applied via git bundle):** the wiki-credit pipeline resolved **155** more monsters (147 scripted + 8 by hand); `bearloch` and `foxko` — no credit in `ATTRIBUTIONS.md` *or* on the wiki — were **dropped from the pool, which is now 198** (both were standalone lines, no family broken). `CREDITS_ROSTER.md`: **198 staged, 0 pending**. Still ⚠️: `coaldiak`/`ninjasmine`/`toxiris` are OPMon-derived (confirm OPMon terms) and the hero sheet's overland frames trace to Catch Challenger (confirm share-alike) — neither blocks anything until those sprites actually appear in-game | Jeff ran HOMEWORK items 4–5 from Cowork, where the wiki was reachable; dropping two art-less monsters beats shipping uncredited art |
| 2026-07-08 | **Pre-M3 peer-review checkpoint #1 (golden rule #7):** ran an outside design/roadmap review (Fable research mode) before starting M3. It **independently validated the existing plans** — the seam contract (M3 §5), keyboard-disable + pause/resume (M3 §3), engine separation (M3 §1), CDN-global pinning (M3 §2), the save `version` field + tolerant/migrating reader (M5 §4.2), the individuals fix, and the capture floor/cap were all already in place. Genuine gaps found and folded in: **F11** final-value damage floor (`DESIGN.md` §6 + `src/battle.js`); **F3** disable pointer input on battle show (M3 §3); **F6** add SRI or vendor Phaser (M3 §2); **F8** wrap `saveGame`'s `setItem` in try/catch (M5 §4.2). Noted for later (M4): **F14** generate the 198-roster stats from archetypes and hand-tune only the ~15 named creatures; **F12** keep Attack+Power scaling ≥ Defense so subtractive damage doesn't collapse | The point of rule #7 — de-risk the biggest architectural leap on paper before writing Phaser code; the review converging with the plan is a strong signal the plan is sound |
| 2026-07-08 → **resolved 2026-07-09** | **Phaser delivery (was F6): VENDORED, not CDN.** `assets/vendor/phaser.min.js` (pinned 4.2.1, MIT), loaded by a plain `<script>` tag, with its license beside it (`assets/vendor/phaser-LICENSE.md`) and a `CREDITS.md` row. Chosen over CDN+SRI because it keeps double-click-`index.html` working offline (the project's core "just works" promise — verified at S1), removes CDN supply-chain trust entirely, and matches how we already vendor every other asset — at a ~1.3 MB repo cost. (The CDNs were also network-blocked from the build environment, making CDN+SRI untestable here.) | Settled at S1 per this open item; for a father-son teaching project the offline/"just works" property outweighs repo size |
| 2026-07-09 | **M3 S1 built — Phaser pinned to 4.2.1; overworld zoom = 2×.** Newest stable 4.x at build time is **4.2.1** (release "Giedi", verified against the npm registry — it now exists, superseding both the plan's original "4.2.1" guess *and* M3S0's "4.2.0"). The overworld renders at 480×320 (30×20 tiles × 16 px) scaled up **2×** (`WORLD_ZOOM` in `src/world/config.js`; try 3× for a closer view — Jeff's call). `src/world/config.js` holds a BootScene + an empty grass-green WorldScene; a temporary "Battle test" button bridges to the battle until Step S7 wires real map encounters | The plan told S1 to re-check/pin the version and make Jeff's zoom call; 2× reads well and every world number is a labeled constant for later tuning |
| 2026-07-10 | **Save v1 + export/import built (M5-plan S3/S4) — M2 fully wrapped.** `src/save.js`: one localStorage slot `"fakeamon-save"`, payload is `JSON.stringify(gameState)`; a `version` field + `MIGRATIONS` path + merge-onto-defaults loader; both the read *and* the write are wrapped in try/catch (Safari Private Browsing gives a 0-byte quota — F8). Autosave fires after every starter pick / battle outcome / catch / switch (no Save button). Title screen "Fakeamon Spark": **Continue** (if a save exists) / **New Game** (confirms before erasing) + a settings corner with **Export Save** (downloads `fakeamon-save.json`) / **Import Save** (validated through the same parse path; a non-save file changes nothing). | End-of-M2 persistence per the M5 plan §4; single-slot autosave is the simplest thing that never loses a kid's progress, and export/import is both a safety net and the best save-system lesson (your whole game is one JSON file you can read and edit) |
