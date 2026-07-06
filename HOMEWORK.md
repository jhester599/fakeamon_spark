# Homework Before We Continue 🌙

Good stopping point for tonight! This is a short one — just the couple of
things we need answered before picking **M2** back up. (Round 1's 10
creative decisions are all done — see `DECISIONS.md` for the full history,
they're already written into `DESIGN.md`.)

---

## ✅ What we built tonight

- **M1 — Battle Slice: complete.** Move buttons, damage formula, type
  advantage, HP bars, misses, fainting, and a win/lose screen with Play
  Again. Turn pacing tuned so it reads as a real back-and-forth.
- **Bonus, ahead of schedule:** Growler and Whaley now show real
  Tuxemon-based art instead of colored boxes.
- **Docs:** verified exactly where Tuxemon's art lives in their repo, fixed
  a wrong license note (it's CC BY-SA 4.0, not 3.0), and found two sprites
  with missing attribution (see Jeff's list below).
- **The game is live!** [jhester599.github.io/fakeamon_spark](https://jhester599.github.io/fakeamon_spark/)
  — added a `README.md`, made the repo public, and set up GitHub Pages so
  it auto-deploys on every push to `main`. No more Claude-session-linked
  preview links; this is a real, permanent, repo-owned URL.

---

## 🌊 Lewis's 2 questions

Both are fun, feel-based questions — Jeff will turn your picks into exact
numbers.

### 1. How many Fakeamon can be on your team at once?  *(needed for M2 Step 5)*
Once you start catching creatures, how big is your active team before extras
have to wait in storage?

- [ ] **A) 3** — small and tight, every pick matters a lot.
- [ ] **B) 4** — a little room to experiment.
- [ ] **C) 6** — classic "full team" size, like the games that inspired us.

**What happens when your team is full and you catch a new one?**
____________________________________________________________

**Lewis picks:** ____________  **Because:** ________________________________

### 2. How easy should catching be?  *(needed for M2 Step 4)*
Picture a wild Fakeamon at **half health**. You throw a regular Fakeaball
(not a fancy one). How often should it work?

- [ ] **A) About 1 in 4** — catching feels hard-won and exciting.
- [ ] **B) About 1 in 2** — a coin flip, fair and simple.
- [ ] **C) About 3 in 4** — catching is easy, the fun is battling.

**Lewis picks:** ____________  **Because:** ________________________________

---

## 🧑‍💻 Jeff's list

Not blocking M2, but shouldn't be forgotten:

1. ✅ ~~Check Hissiorite/Frondly attribution on the wiki~~ — done, resolved
   via `CONTENT_REFERENCE.md` §13. Hissiorite: princess-phoenix. Frondly:
   Leo, ReallyDarkandWindie, Levaine, Sanglorian. Both CC BY-SA 3.0.
   `CREDITS.md` updated — no longer blocking public distribution.
2. Officially confirm the tech stack (still marked `[TO CONFIRM]` in
   `DESIGN.md` — plain HTML/JS through M2, Phaser starting M3). We've been
   building on this assumption all along; just needs a formal sign-off.
3. ✅ ~~Decide on PR timing~~ — done. Opened and merged as we went (PRs #2–#4).
4. ✅ ~~Make the repo public~~ — done.
5. ✅ ~~Turn on Pages~~ — done. Site is live and confirmed working:
   [jhester599.github.io/fakeamon_spark](https://jhester599.github.io/fakeamon_spark/).

**No rush — later milestones:** evolution level per starter & XP curve (M5),
capture-formula exact numbers beyond the basic rate above (M2, fine-tuning
can wait), token prices (M4), map structure & encounter style (M3),
officially locking the Metal/Cosmic type chart (low urgency — already built
and working).

---

*Sleep well! Pick this back up any time — `DESIGN.md` and `DECISIONS.md`
have the full history.* 🌠
