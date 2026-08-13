# Homework Before We Continue 🌙

> # 🎉 **THE GAME IS FINISHED (2026-08-13).**
>
> **All 36 build steps, all five milestones.** You can play Fakeamon Spark
> from the title screen to the end credits: pick a starter, build a team,
> **watch them evolve**, beat Gym 1, sail to The Lagoon, walk to The Forest,
> chug on to The Factory, hunt down **all five mini-bosses**, then open the ☄️
> door and face **Artemis** — 260 HP, meteors falling on both of you — until
> its own storm brings it down. *"Venta is saved! But adventures still await
> you…"* — your words, Lewis, word for word.
>
> **So this page changes job.** Nothing below is blocking anything any more.
> It's about making the game properly **yours**, and picking what (if
> anything) we build next.

---

## 🎨 Lewis — the four to start with

The full list is **B46–B54** in `HOMEWORK_BACKLOG.md`. These four are the ones
you can answer *right now*, without playing first.

### 1. THE BIG ONE — name your Fakeamon 🐣 *(B46)*

**87 of the 98 creatures are still using placeholder names** like "Chenipode"
and "Nudiflot (fierce)" — the working labels the art came with. **42 of them
stand on maps you actually walk through**; the other 45 are the evolved forms
they turn into. Properly named so far: your three starters, the two gym
Fakeamon, the five mini-bosses and Artemis.

**The question isn't "what are the names" — it's how you want to tackle 87 of
them:**

- **A) Area by area** — The Meadows' 14 first (where every new player starts),
  then The Lagoon's 12, then The Forest's 8, then The Factory's 8.
- **B) Family by family** — name a creature and what it evolves into together,
  so the pair sounds related.
- **C) Only your favourites** — rename the ones you love, leave the rest.
- **D) One epic naming marathon.** 💪

*(Renaming one is a single word in the data file. Nothing else changes.)*

### 2. Name the five big moves 💥 *(B47)*

Evolving upgrades your whole attack set — but grass had only ONE attack in the
entire game, so five new "big" moves had to exist for evolved Fakeamon to
upgrade *into*. **I picked placeholder names so the code would run. Replace
them:**

| What it does | My placeholder | Your name |
|---|---|---|
| Big **fire** attack (power 22) | Firestorm | ______________ |
| Big **water** attack (power 20) | Tidal Wave | ______________ |
| Medium **grass** attack (power 16) | Vine Lash | ______________ |
| Big **grass** attack (power 22) | Forest Fury | ______________ |
| Big **normal** attack (power 16) | Slam | ______________ |

*(**Iron Beam** — your invention — is untouched.)*

### 3. Your starters' evolutions — keep the dragons? 🐉 *(B48)*

They evolve at **level 16**. But here's the snag we hit: in the original art,
**Whaley and Leafick don't evolve into anything at all** — they're already
their family's last form — and Growler's real evolution isn't in the art we're
allowed to use. You said "use art we already own," so:

- Growler → **Deviraptor** (fire dragon)
- Whaley → **Leviadile** (huge sea-dragon)
- Leafick → **Dragarbor** (tree-dragon)

All three came out as dragons **by accident**. Keep them? Swap one? *(Options
in B48.)*

### 4. What should we build next? 🛠️ *(B52 — rank your top three)*

The story's done, so everything from here is a bonus:

- **Great / Ultra / Cosmic Fakeaballs** — *their art is already in the game
  folder, waiting.* This is also what would let you **catch a mini-boss**,
  which you decided should be possible with a Cosmic ball.
- **Day and night** — you decided mini-bosses only come out at **night**
  (B11). They're currently out all day, because day/night doesn't exist.
- **Gyms 2 and 3** — the Fire gym and the Water gym.
- **Swapping Fakeamon at a Fakeatent** — you decided this (B33) but the screen
  was never built.
- **Sound and music** — you asked for chiptune (B32). The game is silent.
- **Villagers to talk to** — the NPCs from B12.

---

## 🎮 Lewis — after you've actually played it

Don't answer these from the page — **play first**, then tell us what you felt.

- **B53 — is the final battle the right hardness?** Artemis has 260 HP and
  hits double against everything. Too hard, too easy, or just right?
- **B54 — being two levels behind means you basically lose.** The maths says:
  level-for-level you win ~85% of fights; one level down, 8%; two down, 1%.
  Does that feel fair ("go train a bit more") or annoying?
- **B49 — four mini-bosses are wearing borrowed faces.** Banvengeance,
  Saurchin, Gastronium and Tobishimi use other creatures' pictures, because
  nobody recorded who drew their real ones. Do they look right to you anyway?
- **B51 — two areas of Venta still don't exist:** **Foggy City** and **Snow
  Mountain**. Build them, or leave them?
- **B50 — should The Factory be locked behind the Flame Badge again?** You
  decided that in B14, but Gym 2 doesn't exist, so right now you just sail
  there from The Lagoon.

---

## 🟡 Still open from before

- **B43 — the two "wrong-type" gym aces.** Gym 2 is all-Fire and Gym 3
  all-Water, but their ace creatures (Windeye, Spectera) are the wrong type.
  Swap them, or keep and re-theme? *(Only matters if we build Gyms 2 & 3 —
  see B52.)*

---

## ✅ Answered and built — B44 (berries) 🫐

- **B44 — which berries grow where?** ✅ **Answered a different way (2026-07-26):
  berries aren't split by area at all.** Every area grows every berry; what
  changes is how *often* each one turns up — Fakeaberry common, Greenberry and
  Raspberry medium, Greatberry unlikely, Cosmicberry extremely rare — and **The
  Factory grows none**. Bossberry still only drops from mini-bosses.
  ⚠️ **This replaced B35's "berries are themed by area"** (`DECISIONS.md` #75);
  the two were different systems and this is the one we built. If you'd rather
  have per-area berries back, Lewis, say the word — `AREA_BERRIES` in
  `src/data/berries.js` makes it a one-line edit.

---

## ✅ Answered — B45, found while building Gym 1 🛡️

- **B45 — should ONE fainted Fakeamon lose you the whole battle?** ✅ **Lewis
  picked B: your next one comes out automatically.** When the Fakeamon you're
  using faints, the next on your team joins the fight ("Go, Dandicub!"), and you
  only lose once *every* one of them has fainted — the same rule the gym leader's
  bench already followed. **Built the same day** (`DECISIONS.md` #72,
  `DESIGN.md` §6). Nice side effect: having a team of four finally *matters* in
  a gym.

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

## 📜 History — the day the backlog was cleared (2026-07-11)

*(Kept as the record. It was true then; B43 and B46–B54 have opened since.)*

M2 Steps 3–4 (wild opponents + catching) had everything they needed, and as
of **2026-07-11** the whole backlog was answered too. **B33–B42 — the last
ten — are decided and folded into the docs** (`DECISIONS.md` #51–60):

- **B33** — swap a boxed Fakeamon **at a Fakeatent** (heal *and* swap in one spot).
- **B34** — the wild opponent is written **"the wild `<name>`"** in the log
  and result messages, so a same-species fight reads clearly. *(A small M2
  battle-text tweak, now unblocked.)*
- ~~**B35** — berries are **themed by area**~~ — ⚠️ **superseded 2026-07-26 by B44**: every area grows every berry, only the odds differ (`DECISIONS.md` #75).
- **B36** — there's a **smaller Cooking Cabin near the start too**, so
  cooking isn't gated entirely behind Snow Mountain's badge.
- **B37** — the **Venta wild-roster draft is approved as-is**
  (`VENTA_ROSTER_DRAFT.md`); area assignments get wired in per area, M3-late onward.
- **B38–B42** — the touch D-pad is **four floating arrow buttons**,
  **bottom-right**, **half see-through**, with a **show/hide toggle** for
  everyone, and the feature keeps the name **"Pocket Venta."**

*(Later: the M4 checkpoint added **B43** and **B44**, building Gym 1 raised
**B45**, and finishing the game opened **B46–B54** — the naming pass, the move
names, and "what do we build now?". All at the top of this file.)*

---

## 🧑‍💻 Jeff's list

**Nothing is blocking.** The game is complete, tested (142 checks across six
suites) and deployed. These are the loose ends the finale left behind, roughly
in priority order.

### 1. ⚠️ Licensing — the one real outstanding risk

`wiki.tuxemon.org` has been **unreachable** from the build environment for a
while now (HTTP 403/timeouts, tried again 2026-08-13). Four things are waiting
on it, and all four are fine *for us playing at home* — they matter before any
a public push:

- **The four mini-bosses' real art.** Banvengeance, Saurchin, Gastronium and
  Tobishimi have real Tuxemon sprites, but none appear in Tuxemon's
  `ATTRIBUTIONS.md`, so we can't name an artist. They currently **borrow**
  licensed sprites from the verified pool (`DECISIONS.md` #88). To swap the
  real ones in later:
  ```bash
  cd tools && npm run wiki-credits -- banvengeance=Banvengeance --write
  ```
  then vendor + slice, then one `sprite:` edit per boss in `src/data/fakeamon.js`.
- **AV8R's credit is still an assumption** (Gym 1's ace) — inferred from the
  "Aviator" *trainer* row, which is a different asset. Same recheck command
  with `--force`.
- **The OPMon-derived trio** (coaldiak / ninjasmine / toxiris) — still needs
  OPMon's terms confirmed. **None of the three is in the game**, so this is
  only a blocker if a future area's roster picks them up.
- **The hero walk sheet** traces back to Catch Challenger — confirm its
  share-alike terms before a public deploy that features hero art.

### 2. Deploy check

`main` is merged, so GitHub Pages should have it. Worth eyeballing once:

- the live site plays: [jhester599.github.io/fakeamon_spark](https://jhester599.github.io/fakeamon_spark/)
- **offline still works** — `CACHE_VERSION` was bumped to `fakeamon-2026-08-13g`
  and `sw-precache-list.js` regenerated (249 files now, up from 111). Load it
  once online, then turn the wifi off and reload.
- ⚠️ **A note on testing:** Phaser does **not** boot from a `file://`
  double-click any more — the map silently never appears. It's been that way
  for a while and nothing in the game changed to cause it, but it means
  **local testing needs a server** (`python3 -m http.server`). Worth knowing
  before you think something's broken. *(This is what hid a real bug for most
  of the session — see `DECISIONS.md` and the last commit.)*

### 3. Balance dials, once you've both played

Every number below is `[TUNE]`-marked and lives in one obvious place:

| What | Where | Current |
|---|---|---|
| What a level is worth | `STAT_GROWTH_PER_LEVEL`, `src/state.js` | +3 HP, +2 Atk, +1 Def, +1 Spd |
| XP curve + level cap | `src/progression.js` | `10 × level`, cap 30 |
| What a win pays | `src/progression.js` | `8 × opponent level` (×3 mini-boss) |
| Evolve levels | `evolvesAt` in `src/data/fakeamon.js` | starters 16, wild 12–24 |
| Mini-boss / Artemis stats | `src/data/fakeamon.js` | Saurchin 130 … Artemis 260 |
| Boss rewards | `src/data/bosses.js` | 60 🪙 + a Bossberry; 500 🪙 for Artemis |

The one I'd watch: **the level cliff** (B54). It's structural — short fights
plus additive damage — so softening it properly means changing the damage
formula, which is the oldest code in the game and would need a re-balance
pass. Worth doing *only* if it actually annoys Lewis in play.

### 4. Process — if we start an M6

`ROADMAP.md` golden rule #7 says run a **peer-review checkpoint** at each
milestone boundary. M5 is complete, so if B52 turns into a real next
milestone, that's the moment for a Fable research-mode pass (prompt template
is in `MODELS.md`).

### 5. Done and dusted (kept as the record)


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
