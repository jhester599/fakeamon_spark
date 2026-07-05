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
| 1 | Cosmic type strength | §4 Types & Type Chart (Cosmic matchups) | 🔴 Open |
| 2 | Whaley's base form / twin | §3 Fakeamon (Whaley/Dollfin note) | 🔴 Open |
| 3 | Fancier Fakeaballs? | §6 Battle System (Capturing) | 🔴 Open |
| 4 | Catch a mini-boss? | §6 Battle System (Capturing) | 🔴 Open |
| 5 | Catch Artemis after beating it? | §10 Story & Win Condition | 🔴 Open |
| 6 | What a gym badge does | §10 Story (badge effects) | 🔴 Open |
| 7 | Gyms: single-type vs mixed | §8 World Locations & Roster (gym note) | 🔴 Open |
| 8 | Whole-team faint behavior | §6 Battle System (Losing) | 🔴 Open |
| 9 | Evolutions: surprise vs ask + level | §3 Fakeamon (Evolutions) | 🔴 Open |
| 10 | Berries & recipes | §9 Economy & Items | 🔴 Open |

*(When a decision is made, change its Status to ✅ and add a row to the table below.)*

---

## ✅ Decisions Made

*(None yet — Lewis's homework is fresh! Rows get added here as picks come in.)*

| Date | # | Decision | Lewis's reason |
|---|---|---|---|
| — | — | *waiting for the first homework session* | — |

<!--
Template for a new row:
| 2026-07-05 | 6 | Gym badges open a new area to explore | "so beating a gym feels like it unlocks something" |
-->
