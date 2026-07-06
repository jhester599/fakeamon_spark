# Homework Before We Continue 🌙

> **Round 3 is done! (2026-07-06)** Lewis answered **B1–B32** in one giant
> batch — basically the *entire* `HOMEWORK_BACKLOG.md` question bank. All
> ran through the decision loop into `DECISIONS.md` and `DESIGN.md`.
> Four questions are still open, none urgent: **B33** (where you swap
> boxed Fakeamon), **B34** (new — found while testing Step 3), and **B35**/
> **B36** (new — follow-ups on two design bits Lewis invented outside a
> homework round, see below).
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

---

## 🎉 Nothing blocking right now

M2 Steps 3–4 (wild opponents + catching) have everything they need:
flee always works (B1), caught Fakeamon join fully healed (B2), wild level
uses team-average as a stand-in until M3's map exists (B4), and the catch
messages are locked in (B5). Steps 3 and 4 are both built and live.

**Four open questions, no rush:**

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

---

## 🧑‍💻 Jeff's list

Nothing blocking the next session. The M3S0 prep session (2026-07-06)
knocked out most of the old list:

1. **Zoom level (2× vs 3×)** — still open; eyeball it on the family screen
   when the first Phaser canvas is up (M3 plan §11).
2. ✅ ~~Pin Phaser 4~~ — *prepped 2026-07-06:* newest stable 4.x on npm is
   **4.2.0** (the plan's "4.2.1" guess doesn't exist). Re-verify and pin in
   the CDN URL at S1, and record it in `DECISIONS.md` then.
3. ✅ ~~Vendor the Phaser skills~~ — *done 2026-07-06:* 10 skills + README
   in `PLANS/phaser-skills/`, from `phaserjs/phaser` @ `539e718`.
4. **NEW — hero walk-sheet license check (before the next public deploy of
   hero art):** `assets/sprites/player/hero.png` (Tuxemon's "adventurer"
   overworld sheet) has no entry in Tuxemon's `ATTRIBUTIONS.md`, and
   `wiki.tuxemon.org` wasn't reachable from the staging session. Check the
   wiki's Adventurer/NPC-sprites pages and fill in the ⚠️ row in
   `CREDITS.md` — same 2-minute drill that cleared Hissiorite/Frondly.
5. **NEW — wild-roster wiki credits (157 monsters, one command):** 43 of
   the §16 roster are staged with verified credits; the other 157 are
   credited only on the wiki, which the remote Claude environment's proxy
   refuses to reach (confirmed: CONNECT 403 at the proxy, not the wiki).
   Run from any machine with Node 18+ and git — **no `npm install`
   needed**, these scripts have zero dependencies. PowerShell-friendly:
   ```
   cd fakeamon_spark\tools
   node .\fetch-wiki-credits.mjs --write     # ~157 wiki lookups, ~1 min
   git diff                                  # review — you're the judge
   node .\vendor-sheets.mjs                  # pull the newly-credited sheets
   node .\make-roster-credits.mjs            # regenerate CREDITS_ROSTER.md
   ```
   then commit and push. Monsters printed with ✗ stayed pending on
   purpose — hand their list (or `tools/wiki-credits.json`) to any Claude
   session to chase down. Easiest of all: run it *via* Claude Code /
   Cowork on your machine with the prompt "Do HOMEWORK item 5, review
   ambiguous credits with me, then commit" — it can also do item 4 (the
   hero sheet) in the same sitting. No deadline — the roster wires in
   area by area, M3-late at the earliest.

**No rush — later milestones:** evolution level per starter & XP curve (M5),
exact Great/Ultra/Cosmic ball multipliers (M2 fine-tuning can wait), token
prices tuned to Lewis's "3 wins = a ball + a heal" feel (M4), officially
locking the Metal/Cosmic type chart (low urgency — already built and
working), Windeye/Spectera re-theme or swap for Gyms 2/3 (M4).

---

*Serve B33–B36 whenever Lewis is ready — `DECISIONS.md` has the loop.* 🌠
