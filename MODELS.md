# MODELS.md — Picking the Right Brain for Each Step 🧠

Claude comes in different **models** — think of them as team members with
different strengths and prices. Part of this project is learning **when to use
which one**. Before every roadmap step, Jeff & Lewis hold a quick
**Model Huddle** (see below) and pick the model *on purpose*, together.

> **Why this matters:** the big models are smarter but burn through our
> monthly budget much faster. Great builders don't use the biggest tool for
> every job — they match the tool to the task. That's a real skill, and it's
> one of the things we're here to learn.

---

## 🧑‍🤝‍🧑 The team roster

| Model | Nickname | Best at | Cost feel |
|---|---|---|---|
| **Sonnet 5** | 🔨 The Builder | Writing code when the plan already exists. Our workhorse — most steps use this. | $ |
| **Opus 4.8** | 📐 The Architect | Big structural decisions: how systems fit together, tricky debugging when the Builder is stuck. | $$$ |
| **Fable 5** | 🔭 The Advisor | Long design conversations in **chat** (not Claude Code): reviewing plans, thinking between sessions. | $$$$ |
| **Haiku** | ⚡ The Sprinter | Quick mechanical chores: running a script the Builder already wrote, tiny text edits. | ¢ |

**The golden pattern:** *plan with the Architect, build with the Builder.*
Claude Code even has a built-in mode for this: `/model opusplan` uses Opus
while planning and switches to Sonnet for execution — and Sonnet still sees
everything Opus figured out.

## 🎚️ The effort dial

Models also have an **effort** setting (`/effort`): how long the model thinks
before answering. More thinking = better answers on hard problems, but
thinking tokens cost budget too — roughly like leaving the faucet running.

- **medium** — our default for routine steps
- **high** — refactors, debugging, anything where a mistake is expensive
- **low** — clerical work (decision-loop bookkeeping)

---

## 🗺️ Step-by-step recommendations

These match `ROADMAP.md`. They're **recommendations, not rules** — the Model
Huddle can override them (that's the point of huddling!).

### M2 — Catching & Team

| Step | What we build | Model | Effort | Why |
|---|---|---|---|---|
| 1 | Split code into `src/` modules | **Sonnet 5** | **high** | Touches everything at once; a "same game, tidier drawers" refactor deserves care |
| 2 | Leafick + starter-select screen | **Sonnet 5** | medium | Data + small UI against an existing spec |
| 3 | Random wild Fakeamon | **Sonnet 5** | medium | Small, well-specified |
| 4 | Catch action + Fakeaball formula | **Sonnet 5** | medium | Formula is already in DESIGN.md §6 |
| 5 | Team list | **Sonnet 5** | medium | UI + a simple array |
| 6 | Switch fighter | **Sonnet 5** | medium | Last M2 piece; small |
| — | Decision-loop runs (folding Lewis's picks into the docs) | **Sonnet 5** | low | Multi-file but purely clerical — DECISIONS.md is the recipe |

> **New since planning:** `PLANS/M5_STATE_AND_SAVE_PLAN.md` §6 adds
> state-foundation steps *into M2*: **S1** (individuals & the state bag,
> before Step 5 — Sonnet 5 / **high**), **S2** (the `startBattle` contract,
> alongside Steps 3–4), **S3–S4** (save v1 + export/import, end of M2).
> Huddle on those rows too — they're in that plan's table, not this one.

### M3 — Overworld ⚠️ *the big architecture moment*

Step numbers here are the **S1–S9** from `PLANS/M3_OVERWORLD_PLAN.md` §9,
which supersede ROADMAP's M3 **rows 1–5** (that plan's table carries the same
per-step picks — if the two ever disagree, the plan wins). ROADMAP's **row 6**
(expand the wild roster — The Meadows' slice) is new work *beyond* the plan;
its pick is the roster row at the bottom of this section.

| Step | What we build | Model | Effort | Why |
|---|---|---|---|---|
| **Planning session** ✅ | *Done!* How Phaser (map) and our HTML battle hand off — produced `PLANS/M3_OVERWORLD_PLAN.md` (+ the M5 state & save plan), via **Fable 5** in chat | — | — | The riskiest design decision in the whole project, now on paper |
| S1–S3 | Phaser hello-world, tile map, player walking the grid | **Sonnet 5** | high | Executing the Architect's plan, but new territory (S3 is the movement-*feel* step — budget tuning time with Lewis) |
| S4–S6 | Walk animation, the sprite-slicer tool, encounters standing on the map | **Sonnet 5** (slicer re-runs: **Haiku**) | medium | Batch work + CREDITS.md bookkeeping |
| S7 | **The handoff** 🌉 — bump a creature → real battle → back to the map | **Sonnet 5** | high | The whole plan converges here; if it fights back twice, escalate to **Opus 4.8** |
| S8–S9 | Catch/XP outcomes on the map + cleanup & docs | **Sonnet 5** | medium → low | Features against a settled seam |
| Row 6 — expand the wild roster | Swap The Meadows' test pool for its real slice of the 198-Fakeamon pool + Lewis's renames | **Sonnet 5** | medium | Data-entry against a settled encounter seam; the creative part is Lewis's renames, not model strength |

### M4 — World Systems

| Step | What we build | Model | Effort | Why |
|---|---|---|---|---|
| 1–4 | Tokens, Fakeatent, Tall Tower, Gym 1 | **Sonnet 5** | medium | Features against a settled architecture. Price tuning is playtesting, not model strength! |
| 5 | Cooking Cabin (berries → healing dishes) | **Sonnet 5** | medium | A self-contained screen + recipe data; specs in DESIGN.md §9 |
| 6 | Grow the wild roster, area-by-area | **Sonnet 5** | medium | Same data-entry job as M3 row 6, repeated per new area as gyms open |

### M5 — Depth & Story

| Step | What we build | Model | Effort | Why |
|---|---|---|---|---|
| **Pre-M5 planning session** ✅ | *Done early!* Save-game + evolution state design — produced `PLANS/M5_STATE_AND_SAVE_PLAN.md` (bundled with the M3 planning session) | — | — | Saving hurts if bolted on late — which is why its steps S1–S4 land back in **M2** (see the note in the M2 section above) |
| 1–5 | Evolutions, mini-bosses, Artemis finale (cooking moved to M4) | **Sonnet 5** | medium | The specs live in DESIGN.md; XP/evolution/box steps follow the M5 plan §6 (its S5–S8, with per-step picks) |

### Anytime

| Situation | Model |
|---|---|
| Sonnet gets stuck twice on the same bug | Escalate to **Opus 4.8**, effort high |
| Design conversations, plan reviews, "what should we do next?" | **Fable 5** in chat (not Claude Code) |
| Renames, comment cleanup, one-line tweaks | **Haiku** |

---

## 🤝 The Model Huddle (do this before every step)

When a Claude Code session starts, Claude asks these three questions and
**waits for answers before writing any code**:

1. **"Which roadmap step are we doing?"** — Jeff & Lewis name the step.
2. **"The table in MODELS.md recommends ___ at effort ___. Do you two agree,
   or do you want to override?"** — Jeff & Lewis talk it over (30 seconds is
   fine!) and decide. If the current model doesn't match the pick, Claude
   reminds them to run `/model` and `/effort` before continuing.
3. **"Lewis — prediction time: which files do you think will change, and
   what's the riskiest part?"** — Lewis guesses. At the end of the step,
   compare his prediction to the actual diff. (This is the learning part —
   guessing first makes the answer stick.)

Then build the step, and after it works, Claude briefly notes: *did the model
pick feel right? Too much brain, too little, or just right?* If the answer
teaches us something, update the table above.

## 🔎 The Peer-Review Checkpoint (do this at each milestone boundary)

`ROADMAP.md` golden rule #7: before starting a new milestone, get an
outside/expert design review of the **next** milestone — a Fable research-mode
pass is a good fit. It's a ritual, not a numbered step. Paste the results back
into a Claude Code session; Claude triages them against the rule (do-before vs
later; flag anything fighting the teaching constraints), runs a paired
`/code-review` on the real `src/` files, and folds accepted findings into the
plans and `DECISIONS.md`.

**The prompt template** — fill in the milestone under review, then run it in a
Fable research-mode session:

```
Do a design & roadmap peer review of an open-source hobby game project before
we start its next milestone. It's a turn-based monster-catching RPG ("Fakeamon")
built by a dad and his 10-year-old son as a *teaching* project. I want cited,
externally-benchmarked improvement opportunities and roadmap guidance — NOT a
line-by-line code audit.

MILESTONE UNDER REVIEW: [fill in, e.g. "M3, the Phaser overworld"]. This review
runs BEFORE that milestone's code is written, to de-risk it on paper.

WHAT TO READ (all public — read the ACTUAL files, do not infer from summaries):
- Repo: https://github.com/jhester599/fakeamon_spark
- Source of truth: DESIGN.md, ROADMAP.md.
- The architecture plans, IN FULL — they hold the real design decisions:
  PLANS/M3_OVERWORLD_PLAN.md and PLANS/M5_STATE_AND_SAVE_PLAN.md. If a rendered
  blob won't load, fetch the raw file view.
- The actual code, every file under src/ (src/battle.js, src/state.js,
  src/main.js, src/data/*.js) — the code itself, not a description of it.
- Also: CLAUDE.md, MODELS.md, DECISIONS.md, CONTENT_REFERENCE.md.
- Play the live game: https://jhester599.github.io/fakeamon_spark/
- Quest map:      https://jhester599.github.io/fakeamon_spark/roadmap.html

DEDUPE AGAINST WHAT ALREADY EXISTS (important): before reporting any finding,
confirm it is NOT already handled in the plans (PLANS/*.md) or the code (src/).
If it already is, list it under "already covered — validated, no action" instead
of as a new recommendation. Do not recommend something the plan or code already
does.

HARD CONSTRAINTS your recommendations MUST respect (these are features, not
flaws — do not recommend removing them):
- It must stay understandable to a 10-year-old. Plain, readable, small steps.
- No build step / no bundler through M2; plain <script> globals, no ES modules.
- Phaser is adopted only at M3, loaded as a vendored `<script>` global
  (`assets/vendor/phaser.min.js`, pinned 4.2.1 — decided at S1), still no bundler.
- Game numbers (HP, power, catch rate) must stay easy to find and tweak.
- Do NOT recommend TypeScript, a build pipeline, an ECS, or a test framework
  UNLESS you can make a strong case; if you do, frame it as strictly optional
  and much later, and explain the pedagogy trade-off.

FOCUS your review on these, most valuable first (add milestone-specific
questions for the milestone under review):
1. Architecture soundness of the next milestone's plan — is the approach
   community-proven? Cite comparable projects and flag concrete pitfalls.
2. Latent correctness bugs the design/formulas imply — CHECK THE ACTUAL CODE in
   src/ before claiming one; confirm, don't assume from DESIGN.md.
3. State/save robustness for whatever the next milestone adds.
4. Roadmap sequencing & scope — common failure modes for hobby games of this
   kind (scope creep, content treadmill, balancing) and how to guard them.
5. Balancing sanity-check vs genre norms — reasonable for a kid to tune?
6. Pedagogy — is "one small runnable step, numbers in obvious spots, no build
   step" well-aligned with how kids best learn to code?

OUTPUT: a prioritized list of concrete, actionable findings, each tagged with
(a) severity/impact, (b) the milestone it applies to, (c) at least one citation,
and (d) ALREADY COVERED (in plans/code) vs genuinely NEW. Separate "do before
the milestone" from "later." Call out anything that contradicts our hard
constraints so we can consciously accept or reject it.
```

> **Why these two tweaks (2026-07-08, after checkpoint #1):** the first run's
> reviewer couldn't fetch `PLANS/*.md` or `src/`, so it re-derived guidance the
> project already had — hence the "read the actual plans/code + dedupe" emphasis.
> And the licensing-review bullet was dropped: we don't intend to distribute the
> game, and the art licenses were already reviewed heavily (`DECISIONS.md` →
> Jeff's technical calls; `CREDITS.md` / `CREDITS_ROSTER.md`).

## 💰 Budget notes (Jeff)

- We're on the **Pro plan** — chat and Claude Code share **one usage pool**
  in 5-hour windows. Check `/usage` before a session with Lewis so we don't
  hit a wall mid-step.
- Run `/model` first thing to see which models Pro currently exposes —
  availability shifts over time; verify, don't assume.
- `/clear` between steps. Fresh context = cheaper and sharper.
- High effort ≈ 3–5× the quota of medium. Spend it where mistakes are
  expensive, not on routine steps.
- If we sprint M2 **and** start M3's Phaser work in one week, one month of
  Max 5x likely beats buying credits piecemeal. Try Pro first.

---

*Match the brain to the job. Huddle first, build second.* 🧠🔨
