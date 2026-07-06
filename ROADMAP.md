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

## How to run the game

Right now (M1) there's no setup — just open the file:

```bash
# from the project folder
python3 -m http.server
# then visit http://localhost:8000 in a browser
```

Or double-click `index.html`. (When we reach M3 and add a map with **Phaser**,
this section gets updated.)

---

## ✅ M1 — Battle Slice  *(we are here)*

**Goal:** one full turn-based fight — **Growler vs Whaley**. Pick a move,
deal damage, HP drops, someone faints, win/lose screen. Nothing else.

A good fight lasts about **3–5 hits per side**, misses are **rare**, and
**type advantage clearly matters**.

| Step | What we build | ▶ You'll see |
|---|---|---|
| **1** ✅ | Show both fighters with stats + moves (placeholder colored boxes) | Growler & Whaley side by side — *done!* |
| **2** ✅ | Add a **move button** for each of Growler's moves, and a **text battle log** under the arena | Four buttons; clicking one writes "Growler used Flare!" in the log — *done!* |
| **3** ✅ | The **damage formula**: `raw = power + attack − defense` (min 1). Clicking a move lowers Whaley's HP number | Whaley's HP number drops when you attack — *done!* |
| **4** ✅ | **HP bars** — a colored bar that shrinks as HP falls | Green/yellow/red bars that visibly shrink — *done!* |
| **5** ✅ | Add **type multiplier** + the small **random wiggle** (×0.85–1.15) so damage varies and Fire-vs-Water feels different | "It's not very effective…" vs bigger hits; damage jitters a little each time — *done!* |
| **6** | **Whaley fights back** with a random move, and **turn order by Speed** (ties go to the player) | A real back-and-forth: you hit, then Whaley hits |
| **7** | **Accuracy / misses** — roll each move; a miss does nothing that turn (rare) | Occasionally "Flare missed!" appears |
| **8** | **Fainting + win/lose screen** + a **Play Again** button | At 0 HP a Fakeamon faints and a "You win! / You lose!" message shows |

**🎉 M1 done when:** you can play a whole Growler-vs-Whaley battle in the
browser, moves sometimes miss, type advantage is obvious, and fights last a
few hits each.

---

## 🔴 M2 — Catching & Team

**Goal:** turn a one-off fight into "catch creatures and build a team."

| Step | What we build | ▶ You'll see |
|---|---|---|
| **1** | Split game code into small files: `src/data/moves.js`, `src/data/fakeamon.js`, `src/data/typechart.js`, plus `src/battle.js`. Same game, tidier code | Game plays exactly the same — just easier to read and grow |
| **2** | Add the third starter **Leafick** (Grass) to the data, and a simple **"Choose your starter"** screen | Pick Growler, Whaley, or Leafick before the fight |
| **3** | A **wild Fakeamon** appears (pick a random one to fight) instead of always Whaley | Different opponents each battle |
| **4** | Add the **Catch** action + a **Fakeaball**, using the capture formula (better chance at low HP) | A "Throw Fakeaball" button; sometimes "Gotcha! …was caught!" |
| **5** | A **team list** — caught Fakeamon join your party | A row of your creatures below the battle |
| **6** | **Switch** which Fakeamon is fighting | A "Switch" button swaps in a teammate |

**🎉 M2 done when:** you can fight a wild Fakeamon, weaken it, catch it, and
see it join a team you can swap between.

---

## 🔴 M3 — Overworld (the map)

**Goal:** walk around a world and bump into wild Fakeamon. This is where we
bring in **Phaser** (a game engine that handles tile maps and movement).

| Step | What we build | ▶ You'll see |
|---|---|---|
| **1** | Add **Phaser** and show a tiny **tile map** (grass + paths) | A little world on screen |
| **2** | A **player character** you move with the **arrow keys**, four directions, grid by grid | Walk around the map |
| **3** | **Real sprites** art pass — drop in Tuxemon PNGs for the starters (scaled up, nearest-neighbor), and start `CREDITS.md` | Actual creature art instead of colored boxes |
| **4** | **Visible encounters** — a wild Fakeamon stands on the map; walking into it **starts a battle** | Touch the creature → the M1/M2 battle opens |
| **5** | **Return to the map** after a battle ends | Win/catch/flee → back to walking |

**🎉 M3 done when:** you explore a map, meet a visible wild Fakeamon, battle it,
and return to exploring.

---

## 🔴 M4 — World Systems (places to visit)

**Goal:** reasons to explore — heal, shop, and the first trainer challenge.

| Step | What we build | ▶ You'll see |
|---|---|---|
| **1** | **Tokens** — earn them from winning battles; show a token counter | A number that goes up when you win |
| **2** | **Fakeatent** — step on it to **heal your whole team** to full (costs tokens) | A tent building; HP refills |
| **3** | **Tall Tower** — spend tokens to **buy Fakeaballs** | A shop; your ball count goes up |
| **4** | **Gym 1** — a trainer NPC with a **2-Fakeamon team** (a standard + a stronger ace); beating them gives tokens | Talk to the leader → a two-creature trainer battle |

**🎉 M4 done when:** you can win tokens, heal at a Fakeatent, buy balls at a
Tall Tower, and beat your first gym.

---

## 🔴 M5 — Depth & Story (the finale)

**Goal:** the big finish — evolutions, the mini-bosses, and stopping Artemis.

| Step | What we build | ▶ You'll see |
|---|---|---|
| **1** | **Evolutions** — a Fakeamon that reaches its evolve level gets a **new sprite + higher stats** | "Growler is evolving!" with new art |
| **2** | The **5 mini-bosses** (single strong encounters) placed in the world | Tough special battles worth big XP |
| **3** | **"Beat all 5 → unlock Artemis"** gate | A locked area that opens once all five are down |
| **4** | **Cooking Cabin** — combine berries into healing dishes | A cooking screen; recipes that heal different amounts |
| **5** | **Artemis finale** — the legendary boss with **Meteor Shower** (hits your Fakeamon **and** damages Artemis itself — Lewis's idea!) | An epic, huge-HP battle that's hard but winnable |
| **6** | **Win screen** — beat Artemis, stop the meteor 🌠 | "You saved the Fakeamon world!" |

**🎉 M5 done when:** you can evolve creatures, clear all 5 mini-bosses, cook
healing dishes, and defeat Artemis to win the game.

---

## Decisions to make *when we get there*

These are marked **[TO DECIDE]** in `DESIGN.md` — don't guess, ask Jeff & Lewis:

- **M2:** better Fakeaballs? can you catch a mini-boss? party size + storage.
- **M3:** one big map or connected areas? (visible encounters already chosen.)
- **M4:** token prices; what gym badges *do*.
- **M5:** evolution level per starter; auto-evolve vs. confirm; Cosmic type
  matchups; berry list + recipes; can you catch Artemis after beating it.

---

*Slice-first: each milestone is playable before we start the next one.
Small steps, keep it fun.* 🎮
