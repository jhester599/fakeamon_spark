# Fakeamon — Development Roadmap 🗺️

A **step-by-step build plan** for Jeff & Lewis. Each step is small, and after
almost every step you can **open the game and see something new**. That's the
whole idea: build a little, play it, then build the next little bit.

> **How to read this:** Big sections are **Milestones (M1–M5)**. Inside each
> milestone are **numbered steps**. Every step says what we build and, in
> **▶ You'll see:**, what shows up on screen when it works.
>
> **Source of truth:** `DESIGN.md` (the full plan). This roadmap is the
> *order we do things in*. If a step and DESIGN.md ever disagree, DESIGN.md wins.

## The golden rules (how we build)

1. **One small step at a time.** Finish a step, play it, then move on.
2. **Keep it runnable.** The game should open and work after every step.
3. **Numbers live in obvious spots.** HP, power, catch rate — all easy to find
   and tweak (Lewis's experiments!).
4. **Commit after each working step**, with a plain message like
   `"growler can now use Flare"`.
5. **Stay in scope.** If a step starts dragging in a *later* milestone, stop
   and flag it.
6. **Tick both trackers, same commit — and recount the totals.** This file
   and `roadmap.html` (the live quest map) show the same steps two ways.
   Whenever a step is finished **or** the step list changes (adding, moving,
   or removing a step), update `roadmap.html` in the *same commit*, and
   recompute **every derived number**, not just the ✅ marks:
   - the **overall** header — `X / Y steps · Milestone N of 5` and its meter
     `width:` — where **X = steps marked done across all milestones**,
     **Y = total steps**, and the meter width is `X / Y` as a percent;
   - each milestone's **`N of M steps done`** line and its zone-meter `width:`.

   This is the rule's whole point: the header counter drifted **twice** —
   Steps 3–4 shipped here but not there (2026-07-06), and later M2's overall
   count sat at `12` after all 6 M2 steps were done (should've been `14`,
   caught 2026-07-08). The per-zone "6 of 6" was right both times; the
   **overall** line is the one that gets forgotten. When in doubt, recount
   all five zones from scratch and re-add them.
7. **Peer-review checkpoint at each milestone boundary.** Before starting a
   new milestone, get an *outside/expert* pair of eyes on the **next**
   milestone's design and roadmap — a deep-research / Fable research-mode
   pass is a good fit (external, cited, benchmarked). **Use the ready-made
   prompt template in `MODELS.md`** ("The Peer-Review Checkpoint"). It's a
   ritual, like the Model Huddle, **not** a numbered step (it doesn't change
   the counter). Keep it to these rules:
   - **Scope it** to what's decided or about to be built — not speculative
     later milestones.
   - **Hold it to our teaching constraints.** Plain, readable, no-build,
     kid-friendly. A reviewer who says "add TypeScript, a bundler, an ECS,
     a test framework" is fighting the whole point — accept such advice only
     with eyes open, and mark it "much later, optional."
   - **Pair it with a code pass.** Deep research judges *design*, not code
     correctness — run the local `/code-review` on the real files for bugs.
   - **Fold accepted findings in** through the normal Decision loop
     (`DECISIONS.md`).
   - **First checkpoint: now, before M3 S1** — the M2→M3 Phaser handoff is the
     riskiest step, so it's cheapest to de-risk on paper. Run one at every
     later boundary too, when there's a playable slice to critique.

## How to run the game

**Easiest — play it live, no setup:** [jhester599.github.io/fakeamon_spark](https://jhester599.github.io/fakeamon_spark/)
(auto-deployed from `main` on every push, always current).

**Or run it locally:**

```bash
# from the project folder
python3 -m http.server
# then visit http://localhost:8000 in a browser
```

Or double-click `index.html`. (When we reach M3 and add a map with **Phaser**,
this section gets updated.)

---

## ✅ M1 — Battle Slice  *(complete! 🎉 M2 is next)*

**Goal:** one full turn-based fight — **Growler vs Whaley**. Pick a move,
deal damage, HP drops, someone faints, win/lose screen. Nothing else.

**Bonus, ahead of schedule:** all 3 starters — Growler, Whaley, and Leafick —
now show real Tuxemon-based art (`assets/sprites/growler.png` / `whaley.png`
/ `leafick.png`) instead of colored boxes — see `CREDITS.md`. The rest of
the roster's art (mini-bosses, gyms, evolutions) is still planned for **M3
Step 3** below, once Phaser is in and we need proper sprite-sheet slicing
for the overworld anyway.

A good fight lasts about **3–5 hits per side**, misses are **rare**, and
**type advantage clearly matters**.

| Step | What we build | ▶ You'll see |
|---|---|---|
| **1** ✅ | Show both fighters with stats + moves (placeholder colored boxes) | Growler & Whaley side by side — *done!* |
| **2** ✅ | Add a **move button** for each of Growler's moves, and a **text battle log** under the arena | Four buttons; clicking one writes "Growler used Flare!" in the log — *done!* |
| **3** ✅ | The **damage formula**: `raw = power + attack − defense` (min 1). Clicking a move lowers Whaley's HP number | Whaley's HP number drops when you attack — *done!* |
| **4** ✅ | **HP bars** — a colored bar that shrinks as HP falls | Green/yellow/red bars that visibly shrink — *done!* |
| **5** ✅ | Add **type multiplier** + the small **random wiggle** (×0.85–1.15) so damage varies and Fire-vs-Water feels different | "It's not very effective…" vs bigger hits; damage jitters a little each time — *done!* |
| **6** ✅ | **Whaley fights back** with a random move, and **turn order by Speed** (ties go to the player) | A real back-and-forth: you hit, then Whaley hits — *done!* |
| **7** ✅ | **Accuracy / misses** — roll each move; a miss does nothing that turn (rare) | Occasionally "…but it missed!" appears — *done!* |
| **8** ✅ | **Fainting + win/lose screen** + a **Play Again** button | At 0 HP a Fakeamon faints and a win/lose message shows — *done!* |

**🎉 M1 done when:** you can play a whole Growler-vs-Whaley battle in the
browser, moves sometimes miss, type advantage is obvious, and fights last a
few hits each.

---

## ✅ M2 — Catching & Team  *(complete! 🎉 all 6 steps + save v1 + export/import)*

**Goal:** turn a one-off fight into "catch creatures and build a team."

> **🧩 New since planning:** `PLANS/M5_STATE_AND_SAVE_PLAN.md` §6 schedules
> state-foundation work *into* M2: the `startBattle` contract lands with
> Steps 3–4, "individuals & the state bag" lands **before Step 5**, and
> save v1 + export/import land at the **end of M2**. Read that plan's §A
> before starting Step 3 — it maps the plans onto our global-script style.
> **Status (2026-07-10):** Steps 1–6 below AND the M5-plan follow-ups **S3
> (save v1 — autosave + Continue/New Game)** and **S4 (export/import)** are
> all done — so M2 is fully wrapped. (These two aren't numbered rows here, so
> the step counter stays 14/31; they're the "still to come" items the plan
> folded into M2.) On to **M3** — its **S1** is already done (see the M3
> section + `PLANS/M3_OVERWORLD_PLAN.md` §A.5).

| Step | What we build | ▶ You'll see |
|---|---|---|
| **1** ✅ | Split game code into small files: `src/data/moves.js`, `src/data/fakeamon.js`, `src/data/typechart.js`, plus `src/battle.js`. Same game, tidier code | Game plays exactly the same — just easier to read and grow — *done!* |
| **2** ✅ | Add the third starter **Leafick** (Grass) to the data, and a simple **"Choose your starter"** screen | Pick Growler, Whaley, or Leafick before the fight — *done!* |
| **3** ✅ | A **wild Fakeamon** appears (pick a random one to fight) instead of always Whaley | Different opponents each battle — *done!* |
| **4** ✅ | Add the **Catch** action + a **Fakeaball**, using the capture formula (50% base chance, better at low HP — Lewis's call) | A "Throw Fakeaball" button; sometimes "Gotcha! …was caught!" — *done!* |
| **5** ✅ | A **team list** — caught Fakeamon join your party, up to **4 active** (Lewis's call). A 5th catch goes to your **Boxes** | A row of up to 4 creatures below the battle, plus a Boxes screen for overflow — *done!* |
| **6** ✅ | **Switch** which Fakeamon is fighting, including swapping one in from your Boxes | A "Switch" button swaps in a teammate — *done! Switch works two ways: mid-battle (costs your turn, same speed-order risk as any other action) and between encounters from the team screen (free, since no fight's happening)* |

**🎉 M2 done when:** you can fight a wild Fakeamon, weaken it, catch it, and
see it join a team you can swap between.

---

## 🔴 M3 — Overworld (the map)

**Goal:** walk around a world and bump into wild Fakeamon. This is where we
bring in **Phaser** (a game engine that handles tile maps and movement).

> **📐 M3 now has a full architecture plan:** `PLANS/M3_OVERWORLD_PLAN.md`.
> Its nine finer-grained steps (**S1–S9**, in its §9) supersede **rows 1–5**
> below — roughly 1≈S1–S2, 2≈S3–S4, 3≈S5, 4≈S6–S7, 5≈S8, **plus S9**
> (cleanup: remove the temporary "Battle test" button below, flip status/
> ticks, clear stale `M3 PLACEHOLDER` comments, verify the live Pages build
> plays start-to-finish) — S9 doesn't get its own row since it's wrap-up,
> not new player-visible behavior, but it still has to happen before M3 is
> actually done. **Row 6 (expand the wild roster) is new work *beyond* that
> plan** — the plan deliberately left the roster for "later," and this is the
> "later." The table below stays as the short version; build from the plan.

| Step | What we build | ▶ You'll see |
|---|---|---|
| **1** | Add **Phaser** and show a tiny **tile map** — pull a real Tuxemon tileset (+ a `CREDITS.md` row, per `CONTENT_REFERENCE.md` §15) rather than placeholder colors; wire a temporary **"Battle test" button** so the M1/M2 battle stays reachable/testable until the real map↔battle handoff lands at Step 4 | A little world on screen, built from real tile art, with a button to jump into a battle |
| **2** | A **player character** you move with the **arrow keys**, four directions, grid by grid — pull a real Tuxemon player walk-sheet (+ a `CREDITS.md` row) for the hero's sprite | Walk around the map with real character art |
| **3** | **Real sprites** art pass for the rest of the roster (mini-bosses, gyms, evolutions — everyone in M4/M5) — all 3 starters already done, see `CREDITS.md` | Actual creature art instead of colored boxes, full roster |
| **4** | **Visible encounters** — a wild Fakeamon stands on the map (to start: just a small pool, e.g. the 3 starters, per `PLANS/M3_OVERWORLD_PLAN.md` §6.1's one-map slice); walking into it **starts a battle** | Touch the creature → the M1/M2 battle opens |
| **5** | **Return to the map** after a battle ends | Win/catch/flee → back to walking |
| **6** | **Expand the wild roster** — swap The Meadows' 3-starter test pool (from Step 4) for its real slice of the approved **198-Fakeamon** encounter pool (`CONTENT_REFERENCE.md` §16), including Lewis's Tuxemon-slug → Fakeamon **rename pass** for that area | The Meadows fills up with a proper cast of wild Fakeamon — not just the 3 starters |

**🎉 M3 done when:** you explore a map, meet a visible wild Fakeamon — a real
Meadows cast, not just the starters — battle it, and return to exploring.

> **🎒 The rest of the pool comes area-by-area:** Step 6 wires in only **The
> Meadows'** slice, because The Meadows is the one map M3 builds. The other five
> Venta areas (B8 — The Forest, Foggy City, Snow Mountain, The Factory, The
> Lagoon) each get their own slice of the 198-Fakeamon pool **as they open** —
> and since Snow Mountain / The Factory / The Lagoon only unlock via gym badges
> (B14), that can't be one step. So it's now a scheduled, repeating job in
> **M4 (Step 6)** that carries on into M5's late-game areas — no longer
> "unscheduled," just paced to when each area actually gets built. The art and
> licensing for the whole pool is already staged (`CONTENT_REFERENCE.md` §16);
> what lands per area is the creative wiring — Lewis's renames, encounter
> tables, and stats.

---

## 🔴 M4 — World Systems (places to visit)

**Goal:** reasons to explore — heal, shop, cook, and the first trainer
challenge. *(Beating a gym opens a new area — and Step 6 stocks each new area
with its own wild Fakeamon.)*

| Step | What we build | ▶ You'll see |
|---|---|---|
| **1** | **Tokens** — earn them from winning battles; show a token counter | A number that goes up when you win |
| **2** | **Fakeatent** — step on it to **heal your whole team** to full (costs tokens) | A tent building; HP refills |
| **3** | **Tall Tower** — spend tokens to **buy Fakeaballs** | A shop; your ball count goes up |
| **4** | **Gym 1** — a trainer NPC with a **2-Fakeamon team** (a standard + a stronger ace); beating them gives tokens | Talk to the leader → a two-creature trainer battle |
| **5** | **Cooking Cabin** — combine berries into **healing dishes** (recipes heal different amounts); self-serve, walk in and cook (B26). *Moved here from M5 — it's a world system, not part of the story* | A cooking screen; recipes that heal different amounts |
| **6** | **Grow the wild roster, area-by-area** — as each gym badge opens a new area (The Forest, Foggy City, Snow Mountain, The Factory, The Lagoon), stock it with its own slice of the **198-Fakeamon** pool + Lewis's renames (`CONTENT_REFERENCE.md` §16). A repeating job that keeps going into M5's late-game areas | Every new area you unlock has its own fresh cast of wild Fakeamon |

**🎉 M4 done when:** you can win tokens, heal at a Fakeatent, buy balls at a
Tall Tower, beat your first gym, cook healing dishes at a Cooking Cabin, and
each new area you open comes stocked with its own wild Fakeamon.

---

## 🔴 M5 — Depth & Story (the finale)

**Goal:** the big finish — evolutions, the mini-bosses, and stopping Artemis.
*(New late-game areas keep getting their own wild-roster slice — the same
area-by-area job that starts in M4 Step 6.)*

| Step | What we build | ▶ You'll see |
|---|---|---|
| **1** | **Evolutions** — a Fakeamon that reaches its evolve level gets a **new sprite + higher stats** | "Growler is evolving!" with new art |
| **2** | The **5 mini-bosses** (single strong encounters) placed in the world | Tough special battles worth big XP |
| **3** | **"Beat all 5 → unlock Artemis"** gate | A locked area that opens once all five are down |
| **4** | **Artemis finale** — the legendary boss with **Meteor Shower** (hits your Fakeamon **and** damages Artemis itself — Lewis's idea!) | An epic, huge-HP battle that's hard but winnable |
| **5** | **Win screen** — beat Artemis, stop the meteor 🌠 | "You saved the Fakeamon world!" |

**🎉 M5 done when:** you can evolve creatures, clear all 5 mini-bosses, and
defeat Artemis to win the game.

---

## Decisions to make *when we get there*

The full question bank is **`HOMEWORK_BACKLOG.md`** (B1–B36). Lewis cleared
**B1–B32** in one big homework round (2026-07-06) — see `DECISIONS.md` rows
14–45 and `DESIGN.md` for where each landed. Four are still open, none
urgent:

- **M5:** where you swap boxed Fakeamon onto your team (B33) — needed by
  the Boxes UI, no rush.
- **M2 (flavor):** how a mirror match (same species on both sides) should
  read in the battle log (B34) — found during Step 3 testing; the battle
  itself plays correctly either way.
- **M5 (flavor):** Lewis invented two new design bits outside a homework
  round — berries on the ground (B35: themed by area or anywhere?) and
  Cooking Cabins being more common in Snow Mountain (B36: only there, or
  a starter cabin too?) — see `DECISIONS.md` rows 46–47.

Plus Jeff's ongoing number-tuning list (not creative calls, just math):
evolution levels per starter, the XP curve, exact Great/Ultra/Cosmic ball
multipliers, token prices (feel is decided — B16), and the Gym 2/3 ace
re-theme/swap (Windeye, Spectera).

*(Everything else — ball tiers, mini-boss catching, party size, badges,
auto-evolve, Cosmic chart, berries, Artemis, plus this whole B1–B32 batch —
is decided. See `DECISIONS.md`.)*

---

*Slice-first: each milestone is playable before we start the next one.
Small steps, keep it fun.* 🎮
