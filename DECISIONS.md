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

*(Evolution **level** per starter is still open — that's Jeff's number-tuning, not a creative call.)*

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

<!--
Template for a new row:
| 2026-07-05 | 6 | Gym badges open a new area to explore | "so beating a gym feels like it unlocks something" |
-->
