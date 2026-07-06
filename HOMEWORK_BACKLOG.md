# Homework Backlog — Lewis's Question Bank 🎒

This is the **big list of creative-director decisions** for the whole game,
organized by when each answer is needed. Lewis works on these **async** —
whenever he has time — and Jeff serves them up a few at a time.

## How this file works

- **This file is the pantry; `HOMEWORK.md` is the plate.** When a coding
  session is coming up, Jeff (or Claude) copies the next 2–4 questions whose
  milestone is approaching into `HOMEWORK.md` (and `homework.html`
  if we regenerate it).
- When Lewis answers, run the **decision loop** in `DECISIONS.md` exactly as
  before: log it, update `DESIGN.md`, tick it here (flip 🔲 → ✅), commit.
- **"Needed by"** tells you the deadline: the milestone step that can't be
  built without the answer. Questions marked **anytime** are pure flavor —
  no deadline, grab whenever Lewis wants a fun one.
- Two question styles:
  - **Pick one** — options A/B/C/D, like Round 1.
  - **Invent** — naming and imagination questions with blank lines. These
    are Lewis specials. 🎨
- Already-decided things (Cosmic 2×, ball tiers, single-type gyms,
  auto-evolve, berries, etc.) are **not** in here — see `DECISIONS.md`.

> **Note:** the two questions that lived in `HOMEWORK.md` (team size + catch
> difficulty) were ✅ **answered 2026-07-06** — team of 4 with Boxes, 50% base
> catch rate. See `DECISIONS.md` #11–12. They aren't repeated below.

---

## 🟡 M2 — Catching & Team *(5 of 6 answered — B34 is new, found during Step 3 testing)*

### ✅ B1. Can you run away from a wild battle?  *(needed by M2 Step 3)*

**Lewis picks:** B — Always works, a "Run" button that never fails.

### ✅ B2. When you catch a Fakeamon, how healthy is it?  *(needed by M2 Step 4)*

**Lewis picks:** B — Fully healed, joining your team is a fresh start.

### ✅ B3. Do caught Fakeamon get nicknames?  *(needed by M2 Step 5)*

**Lewis picks:** C — No nicknames, species names only.

### ✅ B4. What level are wild Fakeamon?  *(needed by M2 Step 3 — feel question, Jeff turns it into numbers)*

**Lewis picks:** C — Depends on where you are. *(M2 has no map yet, so it
uses the player's team-average level as a stand-in until M3's areas exist
— see `DESIGN.md` §5.)*

### ✅ B5. INVENT: the "Gotcha!" moment ✨  *(anytime before M2 Step 4)*

Caught: `"Gotcha! <name> was caught!"`
Broke free: `"Oh no! <name> broke free!"` *(Lewis kept the example wording.)*

### 🔲 B34. INVENT: telling apart a mirror match  *(anytime — no rush, found during M2 Step 3 testing)*
Since B3 decided no nicknames, a battle where your Fakeamon and the wild
one are the **same species** (like Whaley vs. a wild Whaley) can read
confusingly in the log and the win/lose message — e.g. "Whaley used
Splash!" or "Whaley fainted — Whaley wins." The game plays correctly
either way (each side's HP is tracked separately); this is purely about
how it reads. How should we label the wild one?

- [ ] **A) Add "wild"** — e.g. "the wild Whaley used Splash!" everywhere
  the opponent is mentioned in the log and result message.
- [ ] **B) Leave it as-is** — the HP bars on screen already make it clear
  enough, don't bother.
- [ ] **C) Invent something else** — a label, a title, your own idea.

**Lewis picks:** ____________  **Because:** ________________________________

---

## ✅ M3 — Overworld & Map *(all 7 answered 2026-07-06!)*

### ✅ B6. One big map, or connected areas?  *(needed by M3 Step 1)*

**Lewis picks:** B — Connected areas, separate zones with paths between them.

### ✅ B7. INVENT: name the world 🌍  *(needed by M3)*

Name: **Venta**

### ✅ B8. INVENT: the areas and their vibes  *(needed by M3 Step 1, pairs with B6)*

1. The Meadows — grass land
2. The Forest — trees
3. Foggy City — urban, packed city
4. Snow Mountain — like Mount Everest
5. The Factory — poisonous war zone
6. The Lagoon — swamp

### ✅ B9. Which mini-boss lives where?  *(needed by M3/M5 — after B8)*

- **Banvengeance** → The Forest
- **Saurchin** → The Lagoon
- **Sharpfin** → The Lagoon
- **Gastronium** → The Factory
- **Tobishimi** → The Lagoon

### ✅ B10. INVENT: the hero 🧑‍🚀  *(needed by M3 Step 2 — we need a player sprite)*

Name: **Hero** (placeholder — Lewis can rename anytime). Look: original art
in the spirit of a classic monster-trainer protagonist (cap, backpack,
sturdy shoes) — Lewis's reference was Ash from the Pokémon anime, but per
the no-Nintendo-IP rule (`DESIGN.md` §13) the real design has to be ours,
not a copy.

### ✅ B11. Should the world have day and night?  *(anytime during M3)*

**Lewis picks:** C, specialized — it matters, and **all mini-bosses only
appear at night**.

### ✅ B12. How do other people (NPCs) work?  *(needed by M3/M4)*

**Lewis picks:** B — a few villagers with one line of advice each.

---

## ✅ M4 — Gyms, Shops & Economy *(all 6 answered 2026-07-06!)*

### ✅ B13. Re-theme Gyms 2 & 3 to single types  *(needed by M4 Step 4)*

- **Gym 2** → all **Fire** 🔥 (Agnite already fits; Windeye needs a re-theme
  or swap at M4 build time)
- **Gym 3** → all **Water** 💧 (Eaglace already fits; Spectera needs a
  re-theme or swap at M4 build time)

### ✅ B14. INVENT: badge names + what they unlock 🏅  *(needed by M4 Step 4)*

- Gym 1 badge: **Gear Badge** opens → The Lagoon
- Gym 2 badge: **Flame Badge** opens → The Factory
- Gym 3 badge: **Wet Badge** opens → Snow Mountain

### ✅ B15. What's inside a gym before the leader?  *(needed by M4 Step 4)*

**Lewis picks:** A — Straight to the leader, walk in, battle, done.

### ✅ B16. How pricey should things feel?  *(needed by M4 Steps 1–3 — feel question, Jeff sets exact numbers)*

**Lewis picks:** B — after ~3 wild-battle wins, a ball AND a heal.

### ✅ B17. Can you rematch a gym you already beat?  *(anytime during M4)*

**Lewis picks:** B — Yes, same team, smaller token reward.

### ✅ B18. Should Tall Towers sell anything besides Fakeaballs?  *(anytime during M4)*

**Lewis picks:** A — Just balls, cooking covers healing.

---

## 🟡 M5 — Story, Bosses & the Finale *(8 of 11 answered — B33, B35, B36 still open)*

### ✅ B19. INVENT: how the adventure starts 🎬  *(needed by M5 — but fun to answer early!)*

Opening: **the villain, Artemis, reveals his plan to the world.**

### ✅ B20. Mini-boss difficulty order  *(needed by M5 Step 2)*

**Lewis picks:** A — Any order, same difficulty, explore freely.

### ✅ B21. INVENT: mini-boss entrance lines 💬  *(anytime — needed by M5 Step 2)*

- Banvengeance: "Prepare to die, puny monkey thing!"
- Saurchin: "Get ready to be crushed."
- Sharpfin: "You look easy."
- Gastronium: "It's time to blow things up."
- Tobishimi: "Prepare to meet your doom."

### ✅ B22. INVENT: Artemis's lair 🌠  *(needed by M5 Step 5)*

You see purple fire and Artemis's throne of stars, then the battle begins.

### ✅ B23. Evolution moment — big or subtle?  *(needed by M5 Step 1)*

**Lewis picks:** A — Full ceremony: screen flashes, "What?! `<name>` is
evolving!", big sprite reveal.

### ✅ B24. INVENT: what the win screen says 🏆  *(needed by M5 Step 6)*

*"Venta is saved! But adventures still await you…"*

### ✅ B25. After you win… then what?  *(needed by M5 Step 6)*

**Lewis picks:** B — Keep exploring, the world stays open.

### ✅ B26. Who runs the Cooking Cabin? 👨‍🍳  *(anytime — needed by M5 Step 4)*

**Lewis picks:** A — Nobody, it's a self-serve kitchen.

### 🔲 B33. Where do you swap team members with boxed ones? 📦  *(needed by M5's Boxes screen — your team-of-4 pick made this real!)*
You decided a full team sends new catches to your **Boxes**. Where do you go
to swap a boxed Fakeamon onto your active team?

- [ ] **A) At a Fakeatent** — home base does one more job: heal AND swap.
- [ ] **B) Anywhere** — open the team screen and swap on the spot.
- [ ] **C) A brand-new building** — invent it! Name: ____________

**Lewis picks:** ____________  **Because:** ________________________________

### 🔲 B35. Berries on the ground — themed by area, or anywhere?  *(anytime — you already invented this one, just needs one more detail)*
You said: "you can find berries on the ground" while exploring. Do certain
areas of Venta tend to grow certain berries (matching that area's vibe —
B8), or can any of the 6 berries turn up in any area?

- [ ] **A) Themed by area** — each area mostly drops berries that fit its vibe.
- [ ] **B) Anywhere** — any of the 6 berries can appear in any area, pure luck.
- [ ] **C) Something else** — invent it!

**Lewis picks:** ____________  **Because:** ________________________________

### 🔲 B36. Cooking Cabins — Snow Mountain only, or elsewhere too?  *(anytime — you already invented this one, just needs one more detail)*
You said: "cooking cabins are more common in the snow mountain area." Does
that mean:

- [ ] **A) Snow Mountain is the only one** — "more common" is just flavor for
  its cozy cabin-hub vibe.
- [ ] **B) There's a smaller cabin near the start too** — so cooking isn't
  gated entirely behind Snow Mountain's gym badge — plus more once you're there.
- [ ] **C) Something else** — invent it (e.g. one per area)!

**Lewis picks:** ____________  **Because:** ________________________________

---

## ✅ Anytime — pure flavor, no deadline *(all 6 answered 2026-07-06!)*

### ✅ B27. INVENT: title screen ✨

The word "Spark" with a meteor next to it (alongside the "Fakeamon" name).

### ✅ B28. INVENT: battle-log flavor lines

**Lewis picks:** keep the current lines as suggested — no changes.

### ✅ B29. Move-name glow-up pass 💅

**Lewis picks:** none — keep the current move names as-is.

### ✅ B30. INVENT: your credits line 🎬

**Lewis picks:** declined — "don't have any credits, the game keeps going."

### ✅ B31. Rare shiny-style variants?  *(if yes, lands in M3's art pass)*

**Lewis picks:** C — Only one secret shiny in the whole game, "it's cool."

### ✅ B32. Sound & music vibe 🎵  *(lands whenever we add audio — likely M3+)*

**Lewis picks:** C — Chiptune everything, retro music for map, battle, and bosses.

---

## 📊 Progress tracker

| Milestone | Questions | Answered |
|---|---|---|
| M2 | B1–B5, B34 | 5 / 6 |
| M3 | B6–B12 | 7 / 7 |
| M4 | B13–B18 | 6 / 6 |
| M5 | B19–B26, B33, B35, B36 | 8 / 11 |
| Anytime | B27–B32 | 6 / 6 |
| **Total** | | **32 / 36** |

*(Update this table as decisions land — and add new questions to the bottom
of the right section whenever one comes up mid-build. The bank grows!)*

---

*The pantry is stocked. Serve a few at a time, run the decision loop, and
the game designs itself while Jeff's at work.* 🎒✨
