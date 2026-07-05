# Lewis's Creative Director Homework 🎨

Hi Lewis! You're the **creative director** of Fakeamon. That means a bunch of
big fun decisions are *yours to make*. Below are the open questions from our
design doc, written as choices. **Circle or check the one you like** (or write
your own idea!), and tell us **why** — the "why" helps us build it right.

> **No rush.** Each question has a tag like *(needed at M5)* telling you when we
> actually build it. Nothing here is needed for our next coding session — pick
> away whenever you feel inspired. ✏️

*(Grown-up/technical decisions for Jeff are in a short list at the bottom.)*

---

> ## ✅ All 10 decided! (2026-07-05)
> Great work, Creative Director! Every question below is answered and now
> **official** in `DESIGN.md`. The full record (with your reasons) lives in
> `DECISIONS.md`. Quick recap of your picks:
>
> **1** Cosmic = super strong (2× vs all) · **2** Whaley has no baby form ·
> **3** four ball tiers (Great / Ultra / Cosmic) · **4** catch a mini-boss only
> with a Cosmic Fakeaball · **5** can't catch Artemis · **6** badges open a new
> area · **7** single-type gyms · **8** faint → heal at Fakeatent, lose a few
> tokens · **9** evolving is a surprise · **10** your berries & recipes 🍓

---

## 🔥 Types & Battles

### 1. How strong is Artemis's "Cosmic" power?  *(needed at M5 — the finale)*
Artemis is the final boss. Its attacks are a special type called **Cosmic**.
How strong should Cosmic hits be against everyone else?

- [ ] **A) Normal** — 1×, same as anything. A fair fight.
- [ ] **B) Super scary** — 2× against *everyone*. Makes the finale really hard.
- [ ] **C) Mixed** — strong vs some types, weak vs others (you tell us which!).

**Lewis picks:** ____________  **Because:** ________________________________

### 2. Whaley's look-alike twin  *(needed at M2–M3)*
In the art we're borrowing, **Whaley** and the shark mini-boss **Sharpfin** both
grow from the *same* baby creature — so they'd share a face. We should fix that.

- [ ] **A)** Whaley just has **no baby form** (starts grown-up). Simplest.
- [ ] **B)** Give Whaley a **different baby** creature so they look unique.

**Lewis picks:** ____________  **Because:** ________________________________

---

## 🌊 Catching

### 3. Fancier Fakeaballs?  *(needed at M2)*
Right now there's one **Fakeaball**. Should there be better balls that catch
more easily?

- [ ] **A)** Just one ball, keep it simple.
- [ ] **B)** A few kinds! Name them and say how strong each is:
      ____________________________________________________________

**Lewis picks:** ____________  **Because:** ________________________________

### 4. Can you catch a mini-boss?  *(needed at M5)*
The 5 mini-bosses are big and tough. Can you add one to *your* team?

- [ ] **A) Yes** — catch them if you weaken them enough (a real prize).
- [ ] **B) No** — they're battles only; you beat them, not keep them.

**Lewis picks:** ____________  **Because:** ________________________________

### 5. Can you catch Artemis after you beat it?  *(needed at M5)*
Once you defeat the legendary Artemis and stop the meteor…

- [ ] **A) Yes!** — a secret reward: the legend joins your team.
- [ ] **B) No** — beating it is the ending; you don't keep it.

**Lewis picks:** ____________  **Because:** ________________________________

---

## 🌿 The World & Gyms

### 6. What does a Gym Badge actually *do*?  *(needed at M4)*
You earn a **badge** for beating a gym. Besides bragging rights, should it give
a power-up?

- [ ] **A) Just bragging** — a shiny badge to collect.
- [ ] **B) Heal boost** — your team heals a little after each battle.
- [ ] **C) Catch boost** — Fakeaballs work a bit better.
- [ ] **D) Opens a new area** to explore.
- [ ] **E) Your idea:** ______________________________________________

**Lewis picks:** ____________  **Because:** ________________________________

### 7. Gym teams — matching type, or mixed?  *(needed at M4)*
Some gyms right now have two *different* types on one team. Should each gym…

- [ ] **A) Match one type** (like an all-Metal gym) — cleaner, easier strategy.
- [ ] **B) Stay mixed** — trickier and more surprising.

**Lewis picks:** ____________  **Because:** ________________________________

### 8. What happens when your whole team faints?  *(needed at M2–M4)*
We want losing to feel **gentle**, not mean. When everyone faints…

- [ ] **A)** You wake up at the last **Fakeatent**, fully healed. No penalty.
- [ ] **B)** Same, but you drop a few **tokens** (a small sting).
- [ ] **C) Your idea:** ______________________________________________

**Lewis picks:** ____________  **Because:** ________________________________

---

## 🌟 Growing Up & Cooking

### 9. Evolving — surprise, or ask first?  *(needed at M5)*
When a Fakeamon is strong enough to **evolve** into its bigger form…

- [ ] **A) Surprise!** — it just evolves right away.
- [ ] **B) Ask me first** — "Do you want Growler to evolve?" Yes/No.

**Lewis picks:** ____________  **Because:** ________________________________

### 10. Invent the berries and recipes! 🍓  *(needed at M5)*
The **Cooking Cabin** turns berries into healing snacks. This one's all you —
make some up!

**Berries** (name a few): ________________________________________________

**Recipes** (berries → dish → how much it heals):
- ______________ + ______________ → ______________ heals ______ HP
- ______________ + ______________ → ______________ heals ______ HP
- ______________ + ______________ → ______________ heals ______ HP

---

## 🧑‍💻 Grown-up decisions (Jeff's list — not homework for Lewis)

These are technical/number-tuning calls. Lewis can still have opinions, but
they're really Jeff's to lock in:

- **Game stack:** confirm plain HTML/JS now → adopt **Phaser** at M3 (the map).
- **Type system:** officially lock in adding **Metal** + **Cosmic** and the type chart.
- **The math:** XP curve, how much XP each creature gives, mini-boss levels & stats.
- **Capture numbers:** base catch rate, ball bonus, and the floor/cap on catch chance.
- **Team storage:** how many Fakeamon in your party, where extras go, and **saving** the game.
- **Map structure:** one big map vs. connected areas (build detail).
- **Token prices:** cost of healing, balls, etc. (Lewis can suggest; Jeff balances.)
- **Art task:** grab the real Tuxemon gym-leader sprites and record them in `CREDITS.md`.

---

*Full design lives in `DESIGN.md`. When Lewis decides something, we'll write it
into DESIGN.md so it becomes official. Have fun, Creative Director!* 🌠
