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

### M3 — Overworld ⚠️ *the big architecture moment*

| Step | What we build | Model | Effort | Why |
|---|---|---|---|---|
| **Pre-M3 planning session** | How Phaser (map) and our HTML battle hand off to each other | **Opus 4.8** (or `/model opusplan`) | high | The riskiest design decision in the whole project — it shapes M4 & M5. Worth the expensive brain. |
| 1–2 | Phaser + tile map + walking | **Sonnet 5** | high | Executing the Architect's plan, but new territory |
| 3 | Sprite art pass (~200 monsters) | **Sonnet 5** writes the slicing script, **Haiku** can run the repetitive parts | medium | Batch work + CREDITS.md bookkeeping |
| 4–5 | Visible encounters + return-to-map | **Sonnet 5** | high | This is where the map↔battle handoff actually gets built |

### M4 — World Systems

| Step | What we build | Model | Effort | Why |
|---|---|---|---|---|
| 1–4 | Tokens, Fakeatent, Tall Tower, Gym 1 | **Sonnet 5** | medium | Features against a settled architecture. Price tuning is playtesting, not model strength! |

### M5 — Depth & Story

| Step | What we build | Model | Effort | Why |
|---|---|---|---|---|
| **Pre-M5 planning session** | Save-game + evolution state design | **Opus 4.8** | high | Saving isn't on the roadmap yet and hurts if bolted on late |
| 1–6 | Evolutions, mini-bosses, cooking, Artemis finale | **Sonnet 5** | medium | The specs live in DESIGN.md; this is building, not architecting |

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
