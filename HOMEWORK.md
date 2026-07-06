# Homework Before We Continue 🌙

> **Round 3 is done! (2026-07-06)** Lewis answered **B1–B32** in one giant
> batch — basically the *entire* `HOMEWORK_BACKLOG.md` question bank. All
> ran through the decision loop into `DECISIONS.md` and `DESIGN.md`.
> Two questions are still open, neither urgent: **B33** (where you swap
> boxed Fakeamon, needed by M5's Boxes screen) and **B34** (new — found
> while testing Step 3, see below).
>
> Round 2 is ✅ done — team of **4** with **Boxes**, **50%** base catch rate —
> see `DECISIONS.md` #11–12. Round 1's ten picks are all in there too.

---

## 🗺️ What happened this session

- **Lewis cleared the whole backlog.** One homework round answered B1–B32:
  flee/catch/nickname/wild-level rules for M2, the world map's shape and
  name (**Venta**, six connected areas), gym re-themes and badges, the
  story spine (opening, Artemis's lair, the win screen), the evolution
  ceremony, sound/music, and more. Full list in `DECISIONS.md` rows 14–45.
- **One item needed a check with Jeff:** B10's hero look ("looks like Ash")
  bumped into the no-Nintendo-IP rule — resolved as an **original design**
  inspired by the classic-trainer vibe, not a copy. See `DESIGN.md` §1.
- Everything is now folded into `DESIGN.md`, `HOMEWORK_BACKLOG.md` (all
  ticked ✅ except B33), and this file.

---

## 🎉 Nothing blocking right now

M2 Steps 3–4 (wild opponents + catching) have everything they need:
flee always works (B1), caught Fakeamon join fully healed (B2), wild level
uses team-average as a stand-in until M3's map exists (B4), and the catch
messages are locked in (B5). Steps 3 and 4 are both built and live.

**Two open questions, no rush:**

- **B33** — where do you swap a boxed Fakeamon onto your active team? (At
  a Fakeatent / anywhere / a new building — needed by M5's Boxes screen,
  not before.)
- **B34** — new, found while testing Step 3: when you fight a wild
  Fakeamon that's the *same species* as yours (like Whaley vs. a wild
  Whaley), the log can't tell them apart ("Whaley used Splash!", "Whaley
  fainted — Whaley wins"). The battle plays correctly either way — this
  is purely about how it reads. Should we label the wild one somehow
  (e.g. "the wild Whaley"), leave it as-is, or invent something else?

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
prices tuned to Lewis's "3 wins = a ball + a heal" feel (M4), officially
locking the Metal/Cosmic type chart (low urgency — already built and
working), Windeye/Spectera re-theme or swap for Gyms 2/3 (M4).

---

*Serve B33/B34 whenever Lewis is ready — `DECISIONS.md` has the loop.* 🌠
