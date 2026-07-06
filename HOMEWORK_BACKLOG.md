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

## 🔴 M2 — Catching & Team *(needed soon!)*

### 🔲 B1. Can you run away from a wild battle?  *(needed by M2 Step 3)*
You bump into a wild Fakeamon you don't want to fight. What happens?

- [ ] **A) No escape** — every battle is a commitment. Tense!
- [ ] **B) Always works** — a "Run" button that never fails.
- [ ] **C) Usually works** — Run succeeds most of the time, but sometimes
  the wild Fakeamon blocks you and gets a free hit. Risky!

**Lewis picks:** ____________  **Because:** ________________________________

### 🔲 B2. When you catch a Fakeamon, how healthy is it?  *(needed by M2 Step 4)*
You weakened it to catch it. When it joins your team, is it…

- [ ] **A) Still hurt** — it keeps the low HP; heal it at a Fakeatent.
- [ ] **B) Fully healed** — joining your team is a fresh start.
- [ ] **C) Half healed** — it patches up a bit out of gratitude.

**Lewis picks:** ____________  **Because:** ________________________________

### 🔲 B3. Do caught Fakeamon get nicknames?  *(needed by M2 Step 5)*

- [ ] **A) Yes, always ask** — every catch, you get to name it.
- [ ] **B) Optional** — a little ✏️ button on the team screen, rename anytime.
- [ ] **C) No nicknames** — species names only, keeps the roster clear.

**Lewis picks:** ____________  **Because:** ________________________________

### 🔲 B4. What level are wild Fakeamon?  *(needed by M2 Step 3 — feel question, Jeff turns it into numbers)*

- [ ] **A) Same as your team** — always a fair fight.
- [ ] **B) A little random** — most are close to you, some weaker, some stronger.
- [ ] **C) Depends on where you are** — early areas easy, far areas dangerous.
  *(This one really kicks in at M3 when we have a map.)*

**Lewis picks:** ____________  **Because:** ________________________________

### 🔲 B5. INVENT: the "Gotcha!" moment ✨  *(anytime before M2 Step 4)*
Write the exact words the battle log says when a catch **succeeds** and when
the Fakeamon **breaks free**. Make them yours!

Caught: ____________________________________________________________
Broke free: ________________________________________________________

---

## 🔴 M3 — Overworld & Map

### 🔲 B6. One big map, or connected areas?  *(needed by M3 Step 1 — this is a real open [TO DECIDE] in DESIGN.md §7)*

- [ ] **A) One big map** — the whole world is one place you walk across.
- [ ] **B) Connected areas** — separate zones (forest, beach, mountain…)
  with paths between them. Badges can lock/unlock zones — which fits your
  "badges open a new area" decision!

**Lewis picks:** ____________  **Because:** ________________________________

### 🔲 B7. INVENT: name the world 🌍  *(needed by M3 — the map needs a title!)*
What is the Fakeamon world/region called?

Name: ______________________________________________________________

### 🔲 B8. INVENT: the areas and their vibes  *(needed by M3 Step 1, pairs with B6)*
List 4–6 areas/biomes for the world and one sentence of vibe for each.
(Example: "Emberfield — dry golden grass, Fire types everywhere.")
Remember each of the **5 mini-bosses** needs a home turf, and the wild
roster in `CONTENT_REFERENCE.md` has creatures of every type to populate them.

1. ____________________  vibe: ______________________________________
2. ____________________  vibe: ______________________________________
3. ____________________  vibe: ______________________________________
4. ____________________  vibe: ______________________________________
5. ____________________  vibe: ______________________________________
6. ____________________  vibe: ______________________________________

### 🔲 B9. Which mini-boss lives where?  *(needed by M3/M5 — after B8)*
Match each mini-boss to one of your areas from B8:

- **Banvengeance** (Grass/Shadow strangler-fig) → ____________________
- **Saurchin** (Water dino-urchin) → ____________________
- **Sharpfin** (Water shark, "the Rip") → ____________________
- **Gastronium** (Metal radioactive snail) → ____________________
- **Tobishimi** (Water dragon, learns Starfall) → ____________________

### 🔲 B10. INVENT: the hero 🧑‍🚀  *(needed by M3 Step 2 — we need a player sprite)*
Who are you in this game? Name, look, and one fun detail.

Name: ______________  Look: ________________________________________
Fun detail: ________________________________________________________

### 🔲 B11. Should the world have day and night?  *(anytime during M3)*

- [ ] **A) No** — always daytime, keep it simple.
- [ ] **B) Visual only** — the light changes as you play, just for mood.
- [ ] **C) It matters** — some Fakeamon only appear at night! 🌙

**Lewis picks:** ____________  **Because:** ________________________________

### 🔲 B12. How do other people (NPCs) work?  *(needed by M3/M4)*

- [ ] **A) Just the important ones** — gym leaders, shopkeeper, chef.
- [ ] **B) A few villagers** — some townsfolk with one line of advice each.
- [ ] **C) Chatty world** — lots of NPCs with hints, jokes, and mini-stories.

**Lewis picks:** ____________  **Because:** ________________________________

---

## 🔴 M4 — Gyms, Shops & Economy

### 🔲 B13. Re-theme Gyms 2 & 3 to single types  *(needed by M4 Step 4 — finishing YOUR single-type decision)*
You decided every gym is one type. Gym 1 is already all-Metal. Gyms 2 and 3
currently mix types, so pick each one's single type (the plan keeps the
ace's type unless you say otherwise):

- **Gym 2** (Goth's gym — ace is AV8R-style Metal… currently Fire + Metal):
  - [ ] All **Fire** 🔥  - [ ] All **Metal** ⚙️  - [ ] Other: ________
- **Gym 3** (Child Actor's gym — currently Grass + Water):
  - [ ] All **Grass** 🌿  - [ ] All **Water** 💧  - [ ] Other: ________

**Because:** _______________________________________________________

### 🔲 B14. INVENT: badge names + what they unlock 🏅  *(needed by M4 Step 4)*
You decided badges **open a new area**. Name each badge and say which area
(from B8) it opens:

- Gym 1 badge: ______________ opens → ______________
- Gym 2 badge: ______________ opens → ______________
- Gym 3 badge: ______________ opens → ______________

### 🔲 B15. What's inside a gym before the leader?  *(needed by M4 Step 4)*

- [ ] **A) Straight to the leader** — walk in, battle, done.
- [ ] **B) A junior trainer first** — one warm-up battle, then the leader.
- [ ] **C) A little puzzle** — flip switches / find the path, then the leader.

**Lewis picks:** ____________  **Because:** ________________________________

### 🔲 B16. How pricey should things feel?  *(needed by M4 Steps 1–3 — feel question, Jeff sets exact numbers)*
After winning about **three** wild battles, you should be able to afford…

- [ ] **A) One Fakeaball** — money is tight, every token matters.
- [ ] **B) A ball AND a heal** — comfortable, keeps the adventure moving.
- [ ] **C) A small shopping spree** — tokens rain, the fun is spending them.

**Lewis picks:** ____________  **Because:** ________________________________

### 🔲 B17. Can you rematch a gym you already beat?  *(anytime during M4)*

- [ ] **A) No** — one victory each, the badge is the trophy.
- [ ] **B) Yes, same team** — practice anytime, smaller token reward.
- [ ] **C) Yes, and they got stronger** — rematch mode with leveled-up teams!

**Lewis picks:** ____________  **Because:** ________________________________

### 🔲 B18. Should Tall Towers sell anything besides Fakeaballs?  *(anytime during M4)*

- [ ] **A) Just balls** — cooking covers healing, keep shops simple.
- [ ] **B) Balls + berries** — buy ingredients if you're unlucky finding them.
- [ ] **C) Balls + one special item** — invent it! ______________________

**Lewis picks:** ____________  **Because:** ________________________________

---

## 🔴 M5 — Story, Bosses & the Finale

### 🔲 B19. INVENT: how the adventure starts 🎬  *(needed by M5 — but fun to answer early!)*
Who tells the hero about Artemis and the meteor? A professor? A dream? A
panicked villager? Write the opening moment in 2–3 sentences:

____________________________________________________________________
____________________________________________________________________

### 🔲 B20. Mini-boss difficulty order  *(needed by M5 Step 2)*

- [ ] **A) Any order, same difficulty** — five equal challenges, explore freely.
- [ ] **B) Any order, but they scale** — each boss you beat makes the rest tougher.
- [ ] **C) A set path** — designed order, each one harder than the last.

**Lewis picks:** ____________  **Because:** ________________________________

### 🔲 B21. INVENT: mini-boss entrance lines 💬  *(anytime — needed by M5 Step 2)*
Each mini-boss gets one dramatic line when the battle starts:

- Banvengeance: ____________________________________________________
- Saurchin: ________________________________________________________
- Sharpfin: ________________________________________________________
- Gastronium: ______________________________________________________
- Tobishimi: _______________________________________________________

### 🔲 B22. INVENT: Artemis's lair 🌠  *(needed by M5 Step 5)*
The gate opens after all 5 mini-bosses fall. Describe where the final battle
happens — what does the place look like? What do you see as you walk in?

____________________________________________________________________
____________________________________________________________________

### 🔲 B23. Evolution moment — big or subtle?  *(needed by M5 Step 1 — you already chose auto-evolve; this is about the SHOW)*

- [ ] **A) Full ceremony** — screen flashes, "What?! Growler is evolving!",
  big sprite reveal.
- [ ] **B) Quick and cool** — a sparkle and the new sprite appears.
- [ ] **C) Sneaky surprise** — no announcement at all; you just notice. 😏

**Lewis picks:** ____________  **Because:** ________________________________

### 🔲 B24. INVENT: what the win screen says 🏆  *(needed by M5 Step 6)*
You beat Artemis. The meteor stops. What exact words appear on screen?

____________________________________________________________________

### 🔲 B25. After you win… then what?  *(needed by M5 Step 6)*

- [ ] **A) The End** — credits roll, that's the story.
- [ ] **B) Keep exploring** — the world stays open; catch 'em all.
- [ ] **C) Champion mode** — keep playing AND rematches get harder (pairs
  with B17-C).

**Lewis picks:** ____________  **Because:** ________________________________

### 🔲 B26. Who runs the Cooking Cabin? 👨‍🍳  *(anytime — needed by M5 Step 4)*

- [ ] **A) Nobody** — it's a self-serve kitchen, walk in and cook.
- [ ] **B) A chef NPC** — invent them! Name: ____________
  One-liner they always say: ______________________________________
- [ ] **C) A Fakeamon chef** — one of the creatures cooks for you. Which
  one? ____________

**Lewis picks:** ____________  **Because:** ________________________________

---

## 🎨 Anytime — pure flavor, no deadline

### 🔲 B27. INVENT: title screen ✨
The very first thing a player sees. What's on it besides the name "Fakeamon"?
(A creature? The meteor? A button that says…?)

____________________________________________________________________

### 🔲 B28. INVENT: battle-log flavor lines
The log currently says plain things like "It's not very effective…". Write
your own versions — funnier, punchier, more YOU:

- Super effective: __________________________________________________
- Not very effective: _______________________________________________
- A miss: ___________________________________________________________
- Fainting: _________________________________________________________

### 🔲 B29. Move-name glow-up pass 💅
Any current move names you'd rename to sound cooler? (Tackle, Bite, Burn,
Flare, Splash, Spout, Breech…) List old → new:

____________________________________________________________________

### 🔲 B30. INVENT: your credits line 🎬
`CREDITS.md` credits the artists. How should the game credit YOU? Pick your
official title (Creative Director? Game Designer? Something invented?):

Lewis's credit line: ________________________________________________

### 🔲 B31. Rare shiny-style variants?  *(if yes, lands in M3's art pass)*

- [ ] **A) No** — every Growler looks like Growler.
- [ ] **B) Yes, super rare recolors** — a golden Growler once in a blue moon! ✨
- [ ] **C) Only one secret shiny** in the whole game — a legend players hunt.

**Lewis picks:** ____________  **Because:** ________________________________

### 🔲 B32. Sound & music vibe 🎵  *(lands whenever we add audio — likely M3+)*

- [ ] **A) Silent film** — no audio, focus on the visuals.
- [ ] **B) Sound effects only** — hits, catches, faints go *bonk/ping/womp*.
- [ ] **C) Chiptune everything** — retro music for map, battle, and bosses.

**Lewis picks:** ____________  **Because:** ________________________________

---

## 📊 Progress tracker

| Milestone | Questions | Answered |
|---|---|---|
| M2 | B1–B5 | 0 / 5 |
| M3 | B6–B12 | 0 / 7 |
| M4 | B13–B18 | 0 / 6 |
| M5 | B19–B26 | 0 / 8 |
| Anytime | B27–B32 | 0 / 6 |
| **Total** | | **0 / 32** |

*(Update this table as decisions land — and add new questions to the bottom
of the right section whenever one comes up mid-build. The bank grows!)*

---

*The pantry is stocked. Serve a few at a time, run the decision loop, and
the game designs itself while Jeff's at work.* 🎒✨
