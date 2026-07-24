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
| 51 | (B33) Where you swap boxed Fakeamon | §6/§8 (M5 Boxes UI) | ✅ Decided |
| 46 | Berries found on the ground | §9 Economy & Items | ✅ Decided |
| 52 | (B34) Telling apart a mirror match | §6 Battle System | ✅ Decided |
| 53 | (B35) Berries — area-themed or anywhere | §9 Economy & Items | ✅ Decided |
| 47 | Cooking Cabins more common in Snow Mountain | §7/§8 World Locations | ✅ Decided |
| 54 | (B36) Cooking Cabins — Snow-Mountain-only or elsewhere too | §8 World Locations & Roster | ✅ Decided |
| 49 | Fakeaballs are limited (start with 5, decrement per throw, block at zero) | §6 Battle System (Capturing) / §9 Economy & Items | ✅ Decided |
| 50 | Pause with a Continue button after a catch | §6 Battle System (Capturing) | ✅ Decided |
| 55 | (B37) Venta wild-roster area draft | `VENTA_ROSTER_DRAFT.md` (roster areas, §7–§8) | ✅ Decided |
| 56 | (B38) Touch D-pad look | `PLANS/M3_TOUCH_AND_MOBILE_PLAN.md` §4/§9 | ✅ Decided |
| 57 | (B39) Touch D-pad screen side | `PLANS/M3_TOUCH_AND_MOBILE_PLAN.md` §4/§9 | ✅ Decided |
| 58 | (B40) Touch D-pad opacity | `PLANS/M3_TOUCH_AND_MOBILE_PLAN.md` §4/§9 | ✅ Decided |
| 59 | (B41) Touch D-pad shows on desktop? | `PLANS/M3_TOUCH_AND_MOBILE_PLAN.md` §4/§9 | ✅ Decided |
| 60 | (B42) Touch feature name | `PLANS/M3_TOUCH_AND_MOBILE_PLAN.md` §9 | ✅ Decided |

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
| 2026-07-10 | 49 | **Fakeaballs are limited** — you start with **5**; each throw (catch or miss) uses one; a Tall Tower purchase (M4) adds more; the "Throw Fakeaball" button disables at **zero** | Lewis's design — catching shouldn't be a free, infinite action; built 2026-07-22, see `ROADMAP.md` M2 |
| 2026-07-10 | 50 | **Pause after a catch** — a caught Fakeamon shows a **Continue** button (like a battle win) instead of jumping straight into a new battle | Lewis's design — wanted a beat to actually see "Gotcha!" before the screen moves on; built 2026-07-22, see `ROADMAP.md` M2 |
| 2026-07-11 | 51 | **Swap boxed Fakeamon at a Fakeatent** — the home base heals *and* manages your team, all in one stop (needed by M5's Boxes UI) | (option A) — the Fakeatent already exists as home base, so it does one more job |
| 2026-07-11 | 52 | **Label the wild opponent "the wild `<name>`"** in the battle log and result messages (e.g. "the wild Whaley used Splash!") — clears up same-species mirror matches now that there are no nicknames (B3). A small M2 battle-text tweak, now unblocked | (option A) — "add wild everywhere the opponent is mentioned" |
| 2026-07-11 | 53 | **Berries are themed by area** — each Venta area mostly grows berries that fit its vibe (§7), rather than any of the 6 turning up anywhere | (option A) |
| 2026-07-11 | 54 | **A smaller Cooking Cabin near the start too** — so cooking isn't gated entirely behind Snow Mountain's gym badge; Snow Mountain still has the most (and coziest) cabins | (option B) |
| 2026-07-11 | 55 | **Venta wild-roster area draft approved as-is** — the proposed home areas in `VENTA_ROSTER_DRAFT.md` stand; `areaProposed` becomes the real `area` as each area's roster is wired in (M3S11 → M4S6) | (option A) — "looks great, keep the draft" |
| 2026-07-11 | 56 | **Touch D-pad = four floating arrow buttons** (separate ▲▼◀▶ with gaps between them), not one solid Game-Boy cross | (option B) |
| 2026-07-11 | 57 | **Touch D-pad sits on the bottom-right** of the screen | (option B) |
| 2026-07-11 | 58 | **Touch D-pad is half see-through** (~0.5 opacity) — findable with a thumb but doesn't block the meadow | (option B) |
| 2026-07-11 | 59 | **A toggle controls whether the D-pad shows** — a small on/off button so it works for touch and desktop players either way, instead of auto-hiding on a mouse | (option C) |
| 2026-07-11 | 60 | **The touch-play feature keeps the name "Pocket Venta"** | "the same, pocket venta" — Lewis kept the plan's placeholder |
| 2026-07-12 | 61 | **Wild Fakeamon respawn on the map** — overrides the M3 plan's earlier "gone is gone, respawn is an M4 question" note. After every battle, a `RESPAWN_CHANCE` roll (starts at 0.3, a tunable dial) can bring back one previously-cleared encounter, same species/level/spot as before | Jeff's call, made live during the M3S8 huddle — "the intent is to keep wild Fakeamon on the map" |

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
| 2026-07-12 | **M3S11 built — The Meadows' 14-line wild-roster slice wired in, using a [TUNE] type-archetype stat table.** Swapped the leafick/growler/whaley placeholder encounters (an M2 stand-in) for `aardorn`/`baoby`/`capiti`/`chenipode`/`chickadee`/`dandicub`/`hatchling`/`lambert`/`marvillar`/`pairagrin`/`pantherafira`/`shybulb`/`snaki`/`tumbleworm` (`VENTA_ROSTER_DRAFT.md`'s Meadows list), each spread across open grass tiles. Stats came from a small per-*type* table in `src/data/fakeamon.js` (fire/water/grass/normal/metal — one row each) rather than hand-authored per monster — the pre-M3 peer-review's "F14" idea, since Jeff/Lewis weren't available mid-session to hand-tune 14 creatures individually. Names are Title-Cased Tuxemon slugs, clearly flagged as **placeholders pending Lewis's rename pass** — nothing here overrides "Lewis invents every player-facing name." Movesets reuse existing moves by type (no new move data needed). Sliced only these 14 sheets (`tools/slice-sheets.mjs` gained an optional slug-filter arg), not the whole 198-pool, per the M3 plan's "pay per use" note — the rest waits for M4S6 | Built autonomously while Jeff & Lewis were away (explicit instruction: "keep going... until you finish M3"); flagged clearly for their review rather than guessing on anything Lewis-only (names) |
| 2026-07-12 | **Offline play added as a PWA (Jeff's request, after M3 shipped) — Android tablet target.** `manifest.webmanifest` + `service-worker.js`: on the first (online) visit, every game file gets cached (a generated list, `tools/generate-sw-manifest.mjs` → `sw-precache-list.js`, so it can't go stale by hand); after that the game plays with no network, and Chrome's "Add to Home Screen" installs a real app icon. Chosen over a downloadable zip / native wrapper — this project has zero backend calls and already vendors every dependency locally (the earlier Phaser-vendoring call), so a PWA needed no new architecture, just two small files. The one real risk (a returning offline player stuck on a stale cached build) is handled by a `CACHE_VERSION` string that must be bumped on every asset-changing deploy — documented loudly in the service worker's own header comment. App icon is placeholder art (Growler's sprite via the new `tools/make-icon.mjs`) pending Lewis's actual pick. Verified with a headless-browser test: cut the network entirely, reload from scratch, and the title screen, Continue (save load), map walk, and a real battle all still worked | Built autonomously while Jeff & Lewis were away; asked first whether this was "easy" before starting, per their own framing |
| 2026-07-10 | **Touch & mobile plan adopted, lands as M3 S10 (after S9).** `PLANS/M3_TOUCH_AND_MOBILE_PLAN.md`: an on-screen **DOM D-pad** overlay feeding a `heldDirection()` input seam (wraps `WorldScene.update()`'s existing keyboard poll — a single call-site swap, per the plan's §A reconciliation), plus a viewport `<meta>` tag + Scale Manager **FIT** mode (960×640 max, desktop unchanged) so the canvas fits a phone/tablet screen. Chosen over a Phaser-drawn virtual pad (eats canvas real estate, harder for Lewis to restyle) and tap-to-move pathfinding (needs BFS, changes S3's movement feel, muddies bump-to-battle — logged as a deferred M4+ candidate instead — plan §2). All of it is docs/plan-only as of this adoption session; the actual code (seam retrofit, D-pad, scaling) lands only when S10 is built, after S9 | For a father-son project whose audience owns iPads, playing on a tablet matters — but S1–S9's scope promise (no touch controls) shouldn't slip; landing it as one clean step after S9 keeps both true. DOM-over-Phaser matches the same "button UIs are what DOM does best" reasoning that already won the battle-screen decision |
| 2026-07-24 | **Fakeaball tier art sourced from Tuxemon's real `gfx/items/` icons (Jeff & Lewis's find, via `wiki.tuxemon.org/Category:Item`).** The wiki itself is blocked from this session's network (same issue noted 2026-07-06), so verified + pulled the actual files a different way: confirmed license/artist for all three via `ATTRIBUTIONS.md` (Tuxeball Earth/Metal/Ancient, all JaskRendix-adapted-from-tamashihoshi, CC BY-SA 4.0), found their real repo path (`mods/tuxemon/db/item/*.yaml` → `sprite: gfx/items/<slug>.png`) via GitHub code search, and pulled the files from `raw.githubusercontent.com` — byte-identical to this project's existing pinned commit (`c34a9c72`), confirmed by diff. **Fakeaball** (`assets/sprites/items/fakeaball.png`) is wired into the existing "Throw Fakeaball" button (a small icon, `.ball-icon` in `index.html`) — a pure visual upgrade to an already-shipped feature, no mechanics touched. **Great/Ultra Fakeaball** art is vendored (`greatfakeaball.png`/`ultrafakeaball.png`) but deliberately **not wired into any screen** — the 4-tier catch-rate mechanics themselves are still deferred (Jeff's number-tuning backlog; `PLANS/M4_WORLD_SYSTEMS_PLAN.md` §10). **Cosmic Fakeaball** landed the same session: a custom AI-generated asset (Jeff & Lewis's call — "needed something more dramatic," a cracked black ball with a purple lightning aura), uploaded to the repo root then moved to `assets/sprites/items/cosmicfakeaball.png` — confirmed genuinely transparent (not just visually white/black), cropped to its content, and scaled to 40×40 with nearest-neighbor (bigger than the 24×24 Tuxemon icons, since its fine lightning detail needed the extra pixels to stay readable — compared 24/32/40/48 side-by-side first). Vendored and credited the same "staged, not wired in" way as Great/Ultra. | Same "stage the art now, wire in the feature later" pattern this project already uses for the 198-monster wild roster — verifying/vendoring costs nothing now and de-risks whenever the tier mechanics actually get built |
| 2026-07-24 | **M4 economy numbers, first two: `TOKENS_PER_WILD_WIN` = 5, `HEAL_COST` = 10** (`src/data/economy.js`, M4S1/S2). Together they hit Lewis's B16 feel exactly: 3 wild wins = 15 tokens = a Fakeatent heal (10) + a Fakeaball (5, once the Tall Tower sells them at M4S3). | Jeff & Lewis's joint call, mid-M4S2 build session — both agreed 10 felt right for "a heal should sting a little, but never be out of reach" |
| 2026-07-22 | **M4 peer-review checkpoint #2 (golden rule #7) — produced `PLANS/M4_WORLD_SYSTEMS_PLAN.md`.** Ran an outside design/roadmap review (Fable research mode) of M4 **plus** a paired code-correctness pass on the real `src/`, and triaged both against the actual code (not the review's description of it). **Accepted & folded into the plan:** pre-declare every M4 save field (`tokens`, `flags.badges/gymsCleared/unlockedAreas`, `inventory.berries`) up front + bump `SAVE_VERSION` to 2 with a migration stub (Fable #4); a single `src/data/economy.js` constants file, feel per B16 (#6); extend the battle contract with an **enemy party/queue** for the 2-mon gym, reusing the *already-present* `canCatch`/`canFlee` flags (#5); gym data carrying explicit per-mon `type` (#7 data-half); a stat-authoring damage-floor invariant (#3 — the F11 code floor is already in `battle.js`). **Re-scoped ROADMAP M4 Step 6** from open-ended "grow the roster across all 5 areas" to bounded "open ONE new area (The Lagoon) via the Gear Badge"; the rest → M5 (Fable #1). Step *count* unchanged, so `tools/check-roadmap.mjs` still prints ✅. **Paired code review found real bugs** (plan §A.3): **CR-A (High)** — encounter sprites never re-sync to `defeatedEncounters` after Continue, so cleared wild Fakeamon reappear and can be re-farmed for XP on reload, plus a double-spawn sprite leak (M4's scene-resync seam fixes it); CR-B shallow save-merge won't default *nested* fields; CR-C missing `.type-normal/.type-metal` CSS (live cosmetic on the M3S11 roster); CR-D no metal move for Gym 1; CR-E no `cosmic` in the type chart (a guaranteed crash once Artemis lands — flagged for the M5 plan). **Rejected on teaching grounds:** none needed — the review itself declined TypeScript/bundler/ECS/tests and kept the subtractive damage formula; per-species catch rates left out unless Lewis wants rarity. **Filed as creative homework:** B43 (Windeye/Spectera off-type gym aces), B44 (berry→area mapping). | Golden rule #7: de-risk the milestone on paper first. As at M3, the outside review largely converged with the existing plans; the genuinely new value was the M4 save-schema discipline, the enemy-party seam, the Step-6 scope cut, and the code review's live CR-A bug — none of which the external reviewer could see without reading `src/` |
