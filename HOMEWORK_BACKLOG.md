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

## ✅ M2 — Catching & Team *(6 of 6 answered)*

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

### ✅ B34. INVENT: telling apart a mirror match  *(answered 2026-07-11)*
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

**Lewis picks:** **A** — the wild opponent is written **"the wild `<name>`"** everywhere it appears in the log and result messages.

---

## ✅ M3 — Overworld & Map *(13 of 13 answered)*

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

### ✅ B37. Review the Venta wild-roster draft 🗺️  *(answered 2026-07-11)*

All 198 wild Fakeamon have been dealt a **draft** home area matching your
six area vibes (B8) — see **`VENTA_ROSTER_DRAFT.md`** (it has all the art!).
For each area: does the crew feel right? Move anyone you want — evolution
lines move together, and there are no wrong answers. (Renaming everyone is
a separate, ongoing job — one area at a time, whenever you like.)

- [ ] **A) Looks great** — keep the draft as-is.
- [ ] **B) Mostly good, with trades** — list who moves where.
- [ ] **C) Big reshuffle** — grab a printout and go wild.

**Lewis picks:** **A** — looks great, keep the draft as-is. *(Approved 2026-07-11; see `VENTA_ROSTER_DRAFT.md`.)*

### ✅ B38. Pad look — classic cross or floating arrows? 🎮  *(answered 2026-07-11)*

The touch & mobile plan (`PLANS/M3_TOUCH_AND_MOBILE_PLAN.md`) adds an
on-screen D-pad so you can walk the meadow with your thumbs. What should
it look like?

- [ ] **A) Classic cross** — one solid Game-Boy-style D-pad shape.
- [ ] **B) Four floating arrow buttons** — separate ▲▼◀▶ buttons with gaps
  between them.
- [ ] **C) Something else** — invent it!

**Lewis picks:** **B** — four separate floating arrow buttons, not a solid cross.

### ✅ B39. Which side of the screen?  *(answered 2026-07-11)*

Bottom-left is tradition for a D-pad, but which thumb does Lewis actually
want to steer with on the iPad? Worth testing both during S10 before
locking it in.

- [ ] **A) Bottom-left**
- [ ] **B) Bottom-right**
- [ ] **C) Let me try both and decide during testing**

**Lewis picks:** **B** — bottom-right.

### ✅ B40. How see-through should the pad be?  *(answered 2026-07-11)*

The pad sits right on top of the meadow. Too solid and it blocks the
view; too see-through and it's hard to find with a thumb.

- [ ] **A) Mostly solid** — easy to see, a bit more of the meadow is covered.
- [ ] **B) Half see-through** — a balance.
- [ ] **C) Barely there** — just visible enough to find, mostly see-through.

**Lewis picks:** **B** — half see-through.

### ✅ B41. Should mouse/desktop players see the pad too?  *(answered 2026-07-11)*

The pad can default to showing only on touch devices (fingers), or Lewis
might just want it on for everyone, including desktop players using a
mouse.

- [ ] **A) Touch only** — fingers get the pad, mouse players use arrow keys.
- [ ] **B) Everyone** — show it always, even on desktop.
- [ ] **C) A toggle** — a small button to turn it on/off either way.

**Lewis picks:** **C** — a toggle, so it works for touch and desktop players either way.

### ✅ B42. INVENT: name the feature 🎬  *(answered 2026-07-11)*

"Pocket Venta" is the plan's placeholder name for playing on a phone or
tablet. Got a better one?

Name: **Pocket Venta** — Lewis kept the placeholder ("the same, pocket venta").

---

## 🟡 M4 — Gyms, Shops & Economy *(8 of 9 answered — B43 & B44 opened at the M4 peer-review checkpoint, 2026-07-22; B45 found while building Gym 1 and answered 2026-07-26)*

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

### 🔲 B43. Windeye & Spectera — swap or re-flavor the off-type gym aces?  *(needed by M5's Gyms 2 & 3 — but the pattern is set when Gym 1 is built, so it's raised now)*

Gym 2 is all-**Fire** 🔥 and Gym 3 all-**Water** 💧 (B13), but their *ace*
creatures are the wrong type: **Windeye** is a Metal/Lightning tower-bot and
**Spectera** is a Grass/Sky fruit bat. Two clean ways to fix it:

- [ ] **A) Swap them** — replace Windeye/Spectera with on-type aces from the
  roster (a Fire ace for Gym 2, a Water ace for Gym 3). The rest of that gym is
  already on-type.
- [ ] **B) Re-flavor them** — keep Windeye & Spectera but re-theme them as Fire
  / Water (a recolor can come later).
- [ ] **C) Something else** — invent it!

**Lewis picks:** _(open — filed at the M4 peer-review checkpoint, 2026-07-22.
Only affects M5's later gyms; nothing blocks M4's Gym 1, which is cleanly
Metal.)_

### ✅ B44. INVENT: which berries grow in which area? 🫐  *(needed by M4 Step 5 — cooking; a sensible default prototypes it)*

You decided berries are **found on the ground** while exploring and **themed by
area** (B35) — each area mostly grows berries that fit its vibe. This is the
actual map: which of the **5 findable** berries (Fakeaberry, Greenberry,
Raspberry, Cosmicberry, Greatberry) turn up where? *(The 6th, Bossberry, is
already decided to drop only from mini-bosses, so it isn't an overworld find.)* Start with **The
Meadows** (where cooking is first demoed) and **The Lagoon** (M4's new area);
the rest can wait, one area at a time.

- [ ] **Invent it** 🎨 — list a couple of berries per area…
- [ ] **…or "surprise me"** — we'll pick a sensible default you can change any
  time by editing a number.

**Lewis picks:** **Answered a different way (2026-07-26): berries aren't split by area at all.** Every area grows every berry — what changes is how OFTEN each turns up (Fakeaberry common → Cosmicberry extremely rare), and **The Factory grows none**. This replaces B35's area-theming (`DECISIONS.md` #75). Built the same day.

---

### ✅ B45. Should ONE fainted Fakeamon lose you the whole battle? 🛡️  *(found while building Gym 1, M4S4 — affects every battle in the game)*

Right now, the moment the Fakeamon you're fighting with faints, **the whole
battle ends** — even if the other three on your team are perfectly healthy.
Nobody chose that; it's just how the very first battle was written back in M1,
when you only ever had one Fakeamon.

It matters much more now that gyms exist: **Enforcer Boss gets to send out a
second Fakeamon when his first one drops, but you don't.** That's why building
up a team of four doesn't help you survive a gym at the moment.

- [ ] **A — Keep it as is.** One faint = battle over. Simple, and it makes you
  really careful about healing before a gym.
- [x] **B — You send out your next one too.** ← **Lewis's pick** Just like the gym leader does. You
  only lose when *all* your Fakeamon have fainted. Fairest, and it finally makes
  having a team of four matter — but it's the bigger change.
- [ ] **C — You get to CHOOSE who comes out next.** Same as B, but instead of the
  game picking, you get a "Who's next?" screen. The most control, the most
  clicking.

**Lewis picks:** **B — your next Fakeamon comes out automatically.** You only
lose once your whole team has fainted, exactly like the gym leader's bench.
*(Answered 2026-07-26 after playing it; built the same day — `DECISIONS.md` #72.)*

---

## ✅ M5 — Story, Bosses & the Finale *(11 of 11 answered)*

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

### ✅ B33. Where do you swap team members with boxed ones? 📦  *(answered 2026-07-11)*
You decided a full team sends new catches to your **Boxes**. Where do you go
to swap a boxed Fakeamon onto your active team?

- [ ] **A) At a Fakeatent** — home base does one more job: heal AND swap.
- [ ] **B) Anywhere** — open the team screen and swap on the spot.
- [ ] **C) A brand-new building** — invent it! Name: ____________

**Lewis picks:** **A** — at a Fakeatent (heal *and* swap in one spot).

### ✅ B35. Berries on the ground — themed by area, or anywhere?  *(answered 2026-07-11)*
You said: "you can find berries on the ground" while exploring. Do certain
areas of Venta tend to grow certain berries (matching that area's vibe —
B8), or can any of the 6 berries turn up in any area?

- [ ] **A) Themed by area** — each area mostly drops berries that fit its vibe.
- [ ] **B) Anywhere** — any of the 6 berries can appear in any area, pure luck.
- [ ] **C) Something else** — invent it!

**Lewis picks:** **A** — themed by area; each area mostly grows berries that fit its vibe.

### ✅ B36. Cooking Cabins — Snow Mountain only, or elsewhere too?  *(answered 2026-07-11)*
You said: "cooking cabins are more common in the snow mountain area." Does
that mean:

- [ ] **A) Snow Mountain is the only one** — "more common" is just flavor for
  its cozy cabin-hub vibe.
- [ ] **B) There's a smaller cabin near the start too** — so cooking isn't
  gated entirely behind Snow Mountain's gym badge — plus more once you're there.
- [ ] **C) Something else** — invent it (e.g. one per area)!

**Lewis picks:** **B** — a smaller cabin near the start too, so cooking isn't gated behind Snow Mountain's badge.

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

---

## 🏁 Post-game — the game is FINISHED, so what now? *(B46–B54, opened 2026-08-13)*

> **All 36 build steps are done.** You can play Fakeamon Spark from the title
> screen to the end credits. These questions aren't about *finishing* it any
> more — they're about making it properly **yours**, and about what (if
> anything) we build next. Nothing here blocks anything. 🎉

### 🔲 B46. THE BIG ONE — name your Fakeamon 🎨  *(no deadline, but it's the biggest thing left)*

**87 of the 98 creatures in the game are still called things like "Chenipode"
and "Nudiflot (fierce)".** Those are the placeholder names the original art
came with — working labels, never meant to stay. **42 of them stand on maps**
where you'll meet them, and **45 are the evolved forms** they turn into.

The only ones already properly named are the three starters (Growler, Whaley,
Leafick), the two gym Fakeamon, the five mini-bosses and Artemis.

This is a big job, so the real question is **how you want to eat the elephant**:

- [ ] **A) Area by area** — name The Meadows' 14 first (that's where every new
  player starts), then The Lagoon's 12, and so on. Small chunks, and each
  batch is playable straight away.
- [ ] **B) Family by family** — name a creature and its evolved form together
  (Chenipode → Exapode becomes, say, Leafcrawl → Leafwing), so the pairs
  actually sound related.
- [ ] **C) Only the ones you like** — flick through them all, rename your
  favourites, and leave the rest as-is for now.
- [ ] **D) All 87 in one epic sitting** — a proper naming marathon. 💪

*(Whichever you pick, renaming one is a **single word** in
`src/data/fakeamon.js` — nothing else in the game has to change.)*

### 🔲 B47. INVENT: name the five big moves 💥  *(no deadline)*

Evolving gives your Fakeamon a **stronger set of attacks** — but grass only
had ONE attack in the whole game, so five new "big" moves had to be invented
to give evolved Fakeamon something worth upgrading into. **I picked
placeholder names so the code would run. They're yours to replace:**

| What it does | Placeholder name | Your name |
|---|---|---|
| The big **fire** attack (power 22) | Firestorm | ______________ |
| The big **water** attack (power 20) | Tidal Wave | ______________ |
| A medium **grass** attack (power 16) | Vine Lash | ______________ |
| The big **grass** attack (power 22) | Forest Fury | ______________ |
| A big **normal** attack (power 16) | Slam | ______________ |

*(Iron Beam — your invention from Gym 1 — is still in there and unchanged.)*

### 🔲 B48. Your starters' evolutions — keep the dragons? 🐉  *(no deadline)*

Growler, Whaley and Leafick now evolve at **level 16**. But there was a snag:
in the original art **Whaley and Leafick don't evolve into anything at all** —
they're already the last form of their family — and Growler's real evolution
isn't in the art we're allowed to use. You said "use art we already own", so
they became:

- Growler → **Deviraptor** (a fire dragon)
- Whaley → **Leviadile** (a huge sea-dragon)
- Leafick → **Dragarbor** (a tree-dragon)

All three turned out to be dragons **by accident**. Do you want to:

- [ ] **A) Keep all three** — three dragons is a great look, honestly.
- [ ] **B) Swap one or two** for something else from the 198 creatures we own
  (tell me what kind of thing you want and I'll show you the options).
- [ ] **C) Go and get their real family members** — needs a licence check
  first, which we can't do until `wiki.tuxemon.org` is reachable again.

### 🔲 B49. Four mini-bosses are wearing borrowed faces 🎭  *(no deadline)*

**Sharpfin and Artemis look like themselves.** The other four —
**Banvengeance, Saurchin, Gastronium, Tobishimi** — are wearing sprites
borrowed from other creatures, because their real pictures don't have a
recorded artist anywhere we can check, and the rule in this project is that
nothing ships without knowing who drew it.

- [ ] **A) Leave them** — they look fine, honestly. Fix it if the wiki ever
  comes back.
- [ ] **B) Pick better stand-ins** — go through the 198 we own and choose
  faces that suit them better.
- [ ] **C) Wait for the real art** — leave the four out of the game until the
  licence can be checked. *(They'd be unbeatable, so Artemis would stay
  locked — probably not what you want!)*

### 🔲 B50. Should The Factory go back to being badge-locked? 🔥  *(needed if we ever build Gym 2)*

⚠️ **This one is me checking something against a decision you already made.**
Back in **B14** you decided the **Flame Badge** (Gym 2) opens **The Factory**.
But Gym 2 doesn't exist, and The Factory had to exist for Gastronium to live
in — so right now you reach it **by boat from The Lagoon**, with no Flame
Badge involved. (It's still behind the Gear Badge, since The Lagoon is.)

- [ ] **A) Leave it open** — one badge-locked door is enough; the world flows
  better without a wall every few steps.
- [ ] **B) Lock it behind the Flame Badge again** *when Gym 2 is built* — as
  originally decided.
- [ ] **C) Lock it now** — and Gym 2 becomes the next thing we build.

### 🔲 B51. Two areas of Venta still don't exist 🌫️❄️  *(no deadline)*

You invented **six** areas for Venta (B8). Four are built and playable:
The Meadows, The Lagoon, The Forest, The Factory — plus Artemis's lair. Still
missing: **Foggy City** (packed urban city) and **Snow Mountain** (icy
Everest-like peaks). The game is completable without them.

- [ ] **A) Build them both** — Venta isn't Venta until all six exist.
- [ ] **B) Build one** — pick your favourite of the two.
- [ ] **C) Leave them for now** — there's plenty to do already.

*(Each new area is a day's work now: the mood-dial trick means no new art.
Snow Mountain would want a white/blue dial and Foggy City a grey one — plus
Foggy City is the natural home for the **villager NPCs** you asked for in B12,
which also don't exist yet.)*

### 🔲 B52. What should we build next? 🛠️  *(the fun one — pick as many as you like)*

The story is finished, so everything from here is extra. Which of these do you
want most? **Rank your top three.**

- [ ] **Great / Ultra / Cosmic Fakeaballs** — better balls that catch better.
  *(Their art is already drawn and waiting in the game folder!)* This is also
  what would let you **catch a mini-boss**, which you decided should be
  possible with a Cosmic ball.
- [ ] **Day and night** — you decided mini-bosses should only come out at
  **night** (B11). Right now they're out all the time, because day/night
  doesn't exist yet.
- [ ] **Gyms 2 and 3** — the Fire gym and the Water gym, with their badges.
- [ ] **Swapping Fakeamon at a Fakeatent** — you decided this in B33; the
  Boxes work, but the swapping screen was never built.
- [ ] **Sound and music** — you asked for full chiptune (B32). The game is
  completely silent right now.
- [ ] **Villagers to talk to** — the NPCs from B12, with a line of advice each.
- [ ] **Something else entirely** — your idea: ______________________

### 🔲 B53. Is the final battle the right hardness? ⚔️  *(after you've played it!)*

Artemis has **260 HP**, hits **double against every type**, and hurts itself
with Meteor Shower — your idea, and the only reason it's beatable. In testing,
a level-30 team of four with mixed types wins, but not easily.

- [ ] **A) Just right** — hard but fair.
- [ ] **B) Too hard** — I couldn't win. *(We'd lower its Attack, or make
  Meteor Shower hurt it more.)*
- [ ] **C) Too easy** — I want a proper wall. *(We'd raise its HP or Attack.)*

### 🔲 B54. Being two levels behind means you basically lose 📉  *(after you've played it)*

Something the maths turned up: because fights are short (about 3 hits), **a
level gap decides almost everything.** Level-for-level you win about 85% of
the time; **one level down, 8%; two levels down, 1%.** Type matchup matters
just as much — a level-30 fire Growler genuinely loses to a level-16 Sharpfin.

That means "go and train a bit more" is often the answer, which is very
classic-RPG — but it can also feel unfair.

- [ ] **A) Leave it** — it makes levelling up feel powerful, and it teaches
  you to bring the right type.
- [ ] **B) Soften it** — make fights **longer** (everyone gets more HP), so
  one bad turn doesn't decide it. *(Warning: we tested this and it actually
  made the gap WORSE. The real fix is C.)*
- [ ] **C) Change how damage is worked out** — a bigger change to the battle
  maths, so being a bit behind stings instead of ending you. This is the one
  that would really fix it, and it touches the oldest code in the game.

---

## 📊 Progress tracker

| Milestone | Questions | Answered |
|---|---|---|
| M2 | B1–B5, B34 | 6 / 6 |
| M3 | B6–B12, B37–B42 | 13 / 13 |
| M4 | B13–B18, B43–B45 | 8 / 9 |
| M5 | B19–B26, B33, B35, B36 | 11 / 11 |
| Anytime | B27–B32 | 6 / 6 |
| Post-game | B46–B54 | 0 / 9 |
| **Total** | | **44 / 54** |

*(Update this table as decisions land — and add new questions to the bottom
of the right section whenever one comes up mid-build. The bank grows!)*

---

*The pantry is stocked. Serve a few at a time, run the decision loop, and
the game designs itself while Jeff's at work.* 🎒✨
