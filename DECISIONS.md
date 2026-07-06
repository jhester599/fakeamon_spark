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
