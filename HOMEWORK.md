# Homework Before We Continue 🌙

> **Round 3 is done! (2026-07-06)** Lewis answered **B1–B32** in one giant
> batch — basically the *entire* `HOMEWORK_BACKLOG.md` question bank. All
> ran through the decision loop into `DECISIONS.md` and `DESIGN.md`.
> Ten questions are still open, none urgent: **B33** (where you swap
> boxed Fakeamon), **B34** (new — found while testing Step 3), **B35**/
> **B36** (new — follow-ups on two design bits Lewis invented outside a
> homework round), **B37** (the fun one — review the draft of which wild
> Fakeamon live in which area of Venta), and **B38–B42** (new, 2026-07-10 —
> the touch & mobile plan's five creative calls: what the on-screen D-pad
> looks like, which side of the screen it's on, how see-through it is,
> whether desktop players see it too, and naming the feature).
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
- Everything is now folded into `DESIGN.md`, `HOMEWORK_BACKLOG.md`, and this
  file.
- **Lewis added two design bits on his own, outside a homework round:**
  berries can be found on the ground, and Cooking Cabins are more common
  in the Snow Mountain area. Both are logged as decisions (`DECISIONS.md`
  #46–47) and folded into `DESIGN.md` §8–9. Each has one follow-up detail
  filed as new homework — B35 and B36 below.
- **2026-07-10 — the touch & mobile plan was adopted.** Jeff signed off on
  `PLANS/M3_TOUCH_AND_MOBILE_PLAN.md`: an on-screen D-pad so you can walk
  the meadow with your thumbs on a phone or tablet, plus fitting the game
  to a smaller screen. It lands as a new build step (**S10**, after M3's
  current steps) — no code yet, but Lewis's creative calls (pad look,
  which side, opacity, desktop-too, feature name) are ready now as
  **B38–B42** below, so the answers are waiting when S10 gets built.

---

## 🎉 Nothing blocking right now

M2 Steps 3–4 (wild opponents + catching) have everything they need:
flee always works (B1), caught Fakeamon join fully healed (B2), wild level
uses team-average as a stand-in until M3's map exists (B4), and the catch
messages are locked in (B5). Steps 3 and 4 are both built and live.

**Ten open questions, no rush:**

- **B33** — where do you swap a boxed Fakeamon onto your active team? (At
  a Fakeatent / anywhere / a new building — needed by M5's Boxes screen,
  not before.)
- **B34** — new, found while testing Step 3: when you fight a wild
  Fakeamon that's the *same species* as yours (like Whaley vs. a wild
  Whaley), the log can't tell them apart ("Whaley used Splash!", "Whaley
  fainted — Whaley wins"). The battle plays correctly either way — this
  is purely about how it reads. Should we label the wild one somehow
  (e.g. "the wild Whaley"), leave it as-is, or invent something else?
- **B35** — you said berries can be found on the ground. Do specific
  areas of Venta tend to grow specific berries (matching that area's
  vibe), or can any of the 6 turn up anywhere?
- **B36** — you said Cooking Cabins are more common in Snow Mountain. Is
  Snow Mountain the *only* place with one, or is there a smaller cabin
  near the start too (so cooking isn't gated behind that area's badge)?
- **B37** — a big fun one: all **198 wild Fakeamon** now have
  a **draft home area** matched to your six area vibes — crocodiles in The
  Lagoon, war robots in The Factory, yetis on Snow Mountain… Open
  **`VENTA_ROSTER_DRAFT.md`** (it shows everyone's art) and tell us who's
  in the wrong place. Evolution lines move together; no wrong answers.
- **B38** — NEW: what should the on-screen D-pad look like — a classic
  solid cross (Game Boy style), or four separate floating arrow buttons?
- **B39** — NEW: which side of the screen should the D-pad sit on —
  bottom-left, bottom-right, or try both during testing and decide then?
- **B40** — NEW: how see-through should the D-pad be, sitting over the
  meadow — mostly solid, half see-through, or barely-there?
- **B41** — NEW: should mouse/desktop players see the D-pad too, or is it
  touch-only (fingers get it, keyboard/mouse players don't)?
- **B42** — NEW, INVENT: name the touch-play feature. "Pocket Venta" is
  just the plan's placeholder — got a better one?

---

## 🧑‍💻 Jeff's list

Nothing blocking the next session. The M3S0 prep session (2026-07-06)
knocked out most of the old list:

1. ✅ ~~Zoom level (2× vs 3×)~~ — *decided at S1 (2026-07-09):* **2×** (Jeff's
   call). It's a labeled constant — `WORLD_ZOOM` in `src/world/config.js` —
   so try 3× anytime to compare (`DECISIONS.md`).
2. ✅ ~~Pin Phaser 4~~ — *done at S1 (2026-07-09):* pinned **4.2.1** (it now
   exists — supersedes the M3S0 "4.2.0" note) and **vendored** to
   `assets/vendor/phaser.min.js` rather than a CDN, so double-click still
   works offline (`DECISIONS.md`).
3. ✅ ~~Vendor the Phaser skills~~ — *done 2026-07-06:* 10 skills + README
   in `PLANS/phaser-skills/`, from `phaserjs/phaser` @ `539e718`.
4. ✅ ~~**NEW — hero walk-sheet license check**~~ — *done 2026-07-06 (Cowork):*
   `wiki.tuxemon.org/Adventurer` credits the overland walk sheet to
   **Catch Challenger, adapted by Sanglorian** (full sheet also: front sprite
   & art by Leo, small back sprite by tamashihoshi). `CREDITS.md` hero row
   filled, license **CC BY-SA 3.0** — with a ⚠️ flag that the overland frames
   trace to the Catch Challenger project, so confirm its share-alike terms
   before a public deploy that features hero art.

5. ✅ ~~**NEW — wild-roster wiki credits (157 monsters)**~~ — *done 2026-07-06
   (Cowork, which could reach the wiki):* ran `fetch-wiki-credits.mjs --write`
   → **147 credited cleanly**, then hand-resolved 8 more from the wiki's
   `Sources` field (bedoo, primordia, xeon, dark_robo → CC BY-SA 3.0;
   **thumpurn → CC BY 4.0**; OPMon trio coaldiak/ninjasmine/toxiris → flagged
   ⚠️ *OPMon-derived, confirm OPMon terms*). Vendored all 155 sheets and
   regenerated `CREDITS_ROSTER.md` — **198 staged, 0 pending**. The only two
   without any wiki credit (`bearloch`, `foxko`) were **dropped from the
   roster** (the "200" was always approximate), so nothing is left hanging.
   Raw results in `tools/wiki-credits.json`.

**No rush — later milestones:** evolution level per starter & XP curve (M5),
exact Great/Ultra/Cosmic ball multipliers (M2 fine-tuning can wait), token
prices tuned to Lewis's "3 wins = a ball + a heal" feel (M4), officially
locking the Metal/Cosmic type chart (low urgency — already built and
working), Windeye/Spectera re-theme or swap for Gyms 2/3 (M4).

---

*Serve B33–B42 whenever Lewis is ready — `DECISIONS.md` has the loop.* 🌠
