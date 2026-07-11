# Homework Before We Continue 🌙

> **🎉 Round 4 is done! (2026-07-11)** Lewis answered the **last ten** —
> **B33–B42** — so **every creative-director question B1–B42 is now
> decided.** All ran through the decision loop into `DECISIONS.md` (#51–60),
> `DESIGN.md`, the touch plan, and the roster draft. What he picked: swap
> boxed Fakeamon **at a Fakeatent** (B33); the wild opponent reads **"the
> wild `<name>`"** (B34); berries are **themed by area** (B35); a **small
> starter Cooking Cabin** exists too (B36); the Venta wild-roster draft is
> **kept as-is** (B37); and the touch D-pad is **four floating arrows,
> bottom-right, half see-through, with a show/hide toggle**, still called
> **"Pocket Venta"** (B38–B42).
>
> **Earlier rounds:** Round 3 (2026-07-06) cleared B1–B32; Round 2 set the
> team of **4** with **Boxes** and the **50%** base catch rate
> (`DECISIONS.md` #11–12); Round 1's ten picks are in there too.

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

## 🎉 All caught up — every question answered!

M2 Steps 3–4 (wild opponents + catching) have everything they need, and as
of **2026-07-11** the whole backlog is answered too. **B33–B42 — the last
ten — are decided and folded into the docs** (`DECISIONS.md` #51–60):

- **B33** — swap a boxed Fakeamon **at a Fakeatent** (heal *and* swap in one spot).
- **B34** — the wild opponent is written **"the wild `<name>`"** in the log
  and result messages, so a same-species fight reads clearly. *(A small M2
  battle-text tweak, now unblocked.)*
- **B35** — berries are **themed by area** — each area mostly grows the
  berries that fit its vibe.
- **B36** — there's a **smaller Cooking Cabin near the start too**, so
  cooking isn't gated entirely behind Snow Mountain's badge.
- **B37** — the **Venta wild-roster draft is approved as-is**
  (`VENTA_ROSTER_DRAFT.md`); area assignments get wired in per area, M3-late onward.
- **B38–B42** — the touch D-pad is **four floating arrow buttons**,
  **bottom-right**, **half see-through**, with a **show/hide toggle** for
  everyone, and the feature keeps the name **"Pocket Venta."**

Nothing creative is blocking the build now — the only open items are Jeff's
number-tuning list (below) and future per-step calls as they come up.

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

*B33–B42 answered 2026-07-11 — the whole B1–B42 bank is now cleared. New questions get added to `HOMEWORK_BACKLOG.md` as they come up.* 🌠
