# Homework Before We Continue 🌙

> **Round 3 is up! (2026-07-06)** Four questions for Lewis, all feeding the
> very next build steps — **M2 Steps 3–4: wild battles + catching.** They
> come from the big question bank in `HOMEWORK_BACKLOG.md` (B1, B2, B4, B5).
>
> Round 2 is ✅ done — team of **4** with **Boxes**, **50%** base catch rate —
> see `DECISIONS.md` #11–12. Round 1's ten picks are all in there too.

---

## 🗺️ What happened this session

- **The planning docs landed.** A high-end planning session produced two
  architecture plans, now in `PLANS/`: the **M3 overworld plan** (how the
  Phaser map and our battle screen hand off to each other) and the
  **state & save plan** (XP, evolution, Boxes, saving — some of it lands
  during M2!). Plus `HOMEWORK_BACKLOG.md` — a bank of **33 questions** for
  Lewis covering the whole rest of the game. 🎒
- **Tech stack pinned:** plain scripts (double-click still works!) through
  M2; **Phaser 4** from a CDN at M3. Logged in `DECISIONS.md`.
- All the docs got a freshen-up so they agree with each other again.

---

## 🌊 Lewis's 4 questions — Round 3

### 🔲 1. (B1) Can you run away from a wild battle?  *(needed by M2 Step 3)*
You bump into a wild Fakeamon you don't want to fight. What happens?

- [ ] **A) No escape** — every battle is a commitment. Tense!
- [ ] **B) Always works** — a "Run" button that never fails.
- [ ] **C) Usually works** — Run succeeds most of the time, but sometimes
  the wild Fakeamon blocks you and gets a free hit. Risky!

**Lewis picks:** ____________  **Because:** ________________________________

### 🔲 2. (B2) When you catch a Fakeamon, how healthy is it?  *(needed by M2 Step 4)*
You weakened it to catch it. When it joins your team, is it…

- [ ] **A) Still hurt** — it keeps the low HP; heal it at a Fakeatent.
- [ ] **B) Fully healed** — joining your team is a fresh start.
- [ ] **C) Half healed** — it patches up a bit out of gratitude.

**Lewis picks:** ____________  **Because:** ________________________________

### 🔲 3. (B4) What level are wild Fakeamon?  *(needed by M2 Step 3 — feel question, Jeff turns it into numbers)*

- [ ] **A) Same as your team** — always a fair fight.
- [ ] **B) A little random** — most are close to you, some weaker, some stronger.
- [ ] **C) Depends on where you are** — early areas easy, far areas dangerous.
  *(This one really kicks in at M3 when we have a map.)*

**Lewis picks:** ____________  **Because:** ________________________________

### 🔲 4. (B5) INVENT: the "Gotcha!" moment ✨  *(anytime before M2 Step 4)*
Write the exact words the battle log says when a catch **succeeds** and when
the Fakeamon **breaks free**. Make them yours!

Caught: ____________________________________________________________
Broke free: ________________________________________________________

**On deck for next round:** B3 — do caught Fakeamon get nicknames?
*(needed by M2 Step 5)*

---

## 🧑‍💻 Jeff's list

Nothing blocking the next session; these come due at M3 Step S1:

1. **Zoom level (2× vs 3×)** — eyeball it on the family screen when the
   first Phaser canvas is up (M3 plan §11).
2. **Pin Phaser 4** — check [phaser.io/download/stable](https://phaser.io/download/stable)
   and pin the newest 4.x in the CDN URL; record it in `DECISIONS.md`
   (M3 plan §2).
3. **Vendor the Phaser skills** — copy the relevant `skills/` files from the
   Phaser 4 repo into `PLANS/phaser-skills/` before any Phaser code gets
   written (M3 plan §2 — it's the defense against Claude's v3 habits).

**No rush — later milestones:** evolution level per starter & XP curve (M5),
exact Great/Ultra/Cosmic ball multipliers (M2 fine-tuning can wait), token
prices (M4), officially locking the Metal/Cosmic type chart (low urgency —
already built and working).

---

*Serve the picks whenever Lewis is ready — `DECISIONS.md` has the loop.* 🌠
