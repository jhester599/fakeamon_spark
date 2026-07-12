# Touch & Mobile Plan — Playing Venta on a Tablet 📱

> **What this is:** the proposal for making Fakeamon Spark playable on a
> phone or tablet — specifically, overworld character control without a
> keyboard. Written as an *amendment proposal* to
> `PLANS/M3_OVERWORLD_PLAN.md`, because that plan's §9 explicitly lists
> touch controls on the M3 do-not-build list. Per the golden rules, that
> means: flag it, plan it, and let Jeff & Lewis decide where it lands —
> don't just build it.
>
> **How to use it:** the adoption session runs the **§A reconciliation
> first** (this plan was drafted while S2–S4 were landing, so the repo is
> ahead of it — deliberately the same pattern as the M3/M5 plans' §A:
> when code and plan disagree, the plan gets updated, not the code).
> After reconciling: §3's seam becomes a small retrofit inside the new
> step, and §3–§6 together are proposed **S10**, after S9. `DESIGN.md`
> stays authoritative for game rules; the M3 plan stays authoritative
> for S1–S9.
>
> **Status:** ADOPTED (2026-07-09, Jeff; reconciled 2026-07-10 — see §A).
> Lewis's creative calls (§9) — B38–B42 — are **decided (2026-07-11)** and folded into §4/§9 below (four floating arrows, bottom-right, half see-through, a show/hide toggle, name kept as "Pocket Venta").
> Drafted against `main` @ `bbe4a9e` (S1 done); **S2–S4 have landed
> since**, so §1's code findings and §3's framing describe the repo *as
> drafted* — §A below records what's actually true now. All code for this
> plan (§3–§6) still lands as the new **S10**, after `PLANS/M3_OVERWORLD_PLAN.md`'s
> S9 — see that plan's §A.6 and §9 row for S10.

---

## §A. Reconciliation — written by the adoption session (2026-07-10)

Checked against `main` at commit `c3734a3` (branch `claude/touch-mobile-plan-adopt-hsett5`,
based on the M3S1 PR chain through `100bbf4`/`ff7de76`).

### A.1 How far did the repo get?

**M3 Steps S1–S4 are done, and nothing beyond.** Per `git log`, `CLAUDE.md`'s
status line, and `PLANS/M3_OVERWORLD_PLAN.md` §A.5–§A.6:

- S1 (2026-07-09): Phaser 4.2.1 vendored, `src/world/config.js` +
  BootScene + empty WorldScene, the "Battle test" bridge.
- S2–S4 (2026-07-10): the meadow tilemap renders, the hero walks the grid
  with tween movement + tile collision, and four walk-cycle animations play.
- Two small hardening commits landed after S4 and before this session
  (`100bbf4` "derive collision from the tile, not a parallel array",
  `ff7de76` "fix hero facing: walking left showed up, up showed left") —
  both are bugfixes *within* S3/S4's existing scope (collision correctness,
  animation-frame mapping), not new roadmap steps. They don't change any
  finding below.
- **S5–S9 have not landed.** In particular, **S7 has not shipped: there is
  no `src/screens.js`** (confirmed — no such file exists anywhere in the
  repo). So §6's "F3 interplay" is still describing *future* wiring, not an
  amendment to existing code — the "amend existing code" scenario this §A
  was told to watch for doesn't apply yet. That's expected and fine: this
  plan's own sequencing (§7) already puts S10 after S9, so by the time S10
  is actually built, S7's `screens.js` will exist and §6 applies as
  written — a real `showBattle()`/`showWorld()` pair to add two lines to,
  not a `worldActive` flag to extend.

### A.2 Is there already an input seam? (locating §3's retrofit)

Read `src/world/config.js`'s `WorldScene` (S3/S4's code). Held-arrow-key
state is polled in **exactly one place**: `WorldScene.update()`
(lines 254–271), which checks `this.cursors.left.isDown` /
`.right.isDown` / `.up.isDown` / `.down.isDown` in an if/else-if chain,
gated by `if (!worldActive) return;` and `if (this.isMoving) return;`.

This is **simpler than §3's draft assumed.** The M3 plan's original §6.2
sketch described a separate "on tween-complete, re-check held keys" step;
S3/S4 didn't build it that way — there's no second read site in the
tween's `onComplete`. Instead, `update()` runs every frame regardless
(Phaser's normal scene loop), and the `if (this.isMoving) return;` guard
at the top is what makes it feel like a "re-check on completion": the
very next frame after a tween finishes, `update()` polls again. So:

- **Only one call site needs to change.** The retrofit is: replace the
  four-line `if (c.left.isDown) dir = "left"; else if …` block in
  `update()` with `const dir = heldDirection();` — nothing else in the
  file reads `this.cursors` directly.
- `this.cursors` is scene-scoped (`this.cursors = this.input.keyboard.createCursorKeys()`
  in `create()`), not a bare global named `cursors` — §3's sketch used a
  bare `cursors` name for illustration; the real retrofit wraps
  `this.cursors`, so `heldDirection()` will most naturally live as a
  `WorldScene` method (`this.heldDirection()`) so it can reach both
  `this.cursors` and the pad's `virtualPad.direction`.
- §3's pure-refactor rule (commit 1 changes zero behavior with
  `virtualPad.direction` still null) is straightforward to satisfy — it's
  a one-line swap at a single call site.

### A.3 Did scaling already change?

**No — none of §5's work has happened.**

- `index.html` has **no `<meta name="viewport">` tag** (confirmed:
  `grep -n viewport index.html` returns nothing). §5.1 is fully unbuilt.
- `src/world/config.js` still pins a **fixed zoom**:
  `scale: { zoom: WORLD_ZOOM }` with `WORLD_ZOOM = 2` (a labeled constant,
  Jeff's S1 pick — see `PLANS/M3_OVERWORLD_PLAN.md` §A.2). There is no
  Scale Manager `mode`/`min`/`max` config anywhere. §5.2 is fully unbuilt.

Nothing to strike in §5 — it's all still S10 work, exactly as drafted.

### A.4 Is `scale-and-responsive` vendored?

**It was not, before this session.** `PLANS/phaser-skills/` held the
original ten skills (`animations`, `cameras`, `game-setup-and-config`,
`input-keyboard-mouse-touch`, `loading-assets`, `scenes`,
`sprites-and-images`, `tilemaps`, `tweens`, `v3-to-v4-migration`) — no
`scale-and-responsive` folder. **Vendored today** as this session's
Task 7, from `phaserjs/phaser` @ `539e718` (the same pin as the other
ten — that commit already has the skill, so no tag fallback was needed).
It's a single `SKILL.md` (no `references/` subfolder, unlike
`input-keyboard-mouse-touch`). Confirmed its `scale` config example
includes real `min`/`max` fields, matching §5.2's code sketch. Added to
`PLANS/phaser-skills/README.md`'s table.

### A.5 Camera-follow check

**Not landed.** `src/world/config.js`'s camera only gets
`setBackgroundColor(...)` — no `startFollow` call anywhere in the file.
The map (30×20 tiles at 16px, 2× zoom = 960×640 CSS pixels) still fits
the fixed 480×320 logical canvas exactly, so there was no reason for S2–S4
to add follow. §5's note stands unchanged: FIT scales the canvas, not the
camera, and the pad overlay must not assume the whole map is visible if a
later map *does* outgrow the screen and add camera-follow.

### A.6 §7 table adjustment

No re-sequencing needed. §7's existing text ("Revised after S2–S4 landed…
their cargo moves into S10") already anticipated exactly what A.1–A.5
found — the plan was drafted with that framing already in place, and this
reconciliation confirms it's accurate against the actual code, not just
the changelog. One refinement worth recording: **A.2's finding shrinks
S10 commit 1 slightly** — the seam retrofit is a single call-site swap,
not a multi-site rewiring, so it's lower-risk than "if the seam retrofit
fights back, split into two sessions" implied. That escape hatch (§7's
last column) can stay as written; it just likely won't be needed.

**Status flip:** this plan moves from PROPOSAL to **ADOPTED** (Jeff,
2026-07-09; reconciled 2026-07-10). Lewis's §9 questions are now homework
**B38–B42** in `HOMEWORK.md`/`homework.html`. `PLANS/M3_OVERWORLD_PLAN.md`
§A.6 and §9 now carry the S10 row. No `src/` or `index.html` changes were
made in this session — all of §3–§6's code lands when S10 is actually built.

---

## §1. What "playable on a tablet" actually requires

A code review against `main` @ `bbe4a9e` *(pre-S2 — re-verified per §A:
still accurate at S4, nothing in §A.2–§A.3 changed these conclusions)*
shows this is **two problems, not one**:

1. **The screen doesn't fit.** `index.html` has no
   `<meta name="viewport">` tag at all, so a phone renders the page at a
   ~980px virtual width and makes you pinch-zoom. And
   `src/world/config.js` pins the canvas at a fixed
   `scale: { zoom: 2 }` — 960×640 CSS pixels — which overflows every
   phone and squeezes small tablets. Fix in §5.
2. **There's no way to walk.** The M3 plan's §6.2 movement spec (built at
   S3) is driven entirely by arrow keys. A tablet has none. Fix in §3–§4.

And one non-problem worth naming: **the battle already works on touch.**
The whole M1/M2 fight screen is plain DOM buttons, and so are the title
screen, team list, and Boxes. That's the two-rooms architecture (M3 plan
§1, Option B) paying out a dividend nobody ordered: only the Phaser room
needs touch work at all.

---

## §2. The core decision: a DOM D-pad feeding one input seam

**Recommendation: an on-screen D-pad built from plain HTML buttons,
overlaid on the world canvas, feeding the same "which direction is held?"
question the keyboard answers.**

### Why this and not the alternatives

| Option | Verdict | Why |
|---|---|---|
| **A. DOM D-pad overlay** | ✅ **Chosen** | Same reasoning that won §1's battle decision: *button UIs are what DOM does best.* Zero new Phaser code (dodges the v3-training-skew risk), Lewis can restyle it in CSS he already knows, and it plugs into the movement loop through one tiny seam (§3). Doubles as a mouse control on desktop. |
| **B. Phaser-drawn virtual pad** (sprites + `setInteractive`) | ❌ Rejected | Eats real estate on a 480×320 logical canvas, adds Phaser surface area for no player-visible gain over A, and is harder for Lewis to tweak than CSS. |
| **C. Tap-to-move pathfinding** (tap a tile, hero walks there) | ⏸️ Deferred (M4+ candidate) | Genuinely nice on tablets, but it needs BFS pathfinding, changes the movement *feel* Lewis tunes at S3, and muddies the bump-to-battle rule (does tapping a wild Fakeamon path you into it on purpose?). A good future layer *on top of* the D-pad, not instead of it. |
| **D. Swipe gestures** | ❌ Rejected | One swipe per step feels laggy; swipe-and-hold for continuous walking is awkward and undiscoverable. |
| **E. Invisible tap quadrants** on the canvas | ❌ Rejected | Undiscoverable for a 10-year-old's friends, and collides with every future "tap a thing on the map" interaction (M4 NPCs, doors). |

---

## §3. The input seam — now a small retrofit (S3/S4 landed without it)

*(As drafted, this section was a provision for S3's prompt. S3/S4 have
since shipped movement + held-key walking, so it's now a refactor of
existing code — done as S10's first commit. §A.2 pinpoints the single
edit site: `WorldScene.update()` in `src/world/config.js` — no separate
tween-onComplete re-check exists to also update.)*

§6.2's loop is intent-shaped by design: *"On arrow key (held or pressed)
when `isMoving === false` → set facing → check target → tween → on
complete, re-check held keys."* The retrofit: the one place S3/S4's code
asks the keyboard directly gets replaced with a call to one function:

```js
// src/world/config.js, as a WorldScene method
// "Which direction is the player asking to walk, right now?"
// Checks the on-screen pad first, then the arrow keys. null = nobody's asking.
heldDirection() {
  if (virtualPad.direction) return virtualPad.direction;  // §4's pad
  const c = this.cursors;
  if (c.left.isDown)  return "left";
  if (c.right.isDown) return "right";
  if (c.up.isDown)    return "up";
  if (c.down.isDown)  return "down";
  return null;
}
```

That's the whole architecture. Because `update()` already runs every
frame and re-polls after each tween completes (§A.2 — there's no separate
re-check function to also touch), **hold-to-keep-walking works for a held
finger with zero extra code** — the pad just keeps answering "down" until
the finger lifts, riding the exact same per-frame poll S4 already built.

Retrofit rules (this is S10's first, separate commit):

- It's a **pure refactor**: with `virtualPad.direction` still null, the
  game must play *identically* — same movement feel, same S4 walk
  animations, same arrow-key capture. Verify by playing before the pad
  commit starts.
- Adapt the sketch to reality: the real call site is inside `update()`,
  reading `this.cursors` (scene-scoped, not a bare global) — §A.2 has the
  exact line numbers. Since it's a single site, there's no "second direct
  keyboard read" risk to guard against.
- Declare `virtualPad = { direction: null }` with a
  `// TOUCH SEAM (see PLANS/M3_TOUCH_AND_MOBILE_PLAN.md)` marker; the
  pad commit is the only thing that ever writes to it.

---

## §4. The D-pad itself (built at S10)

A `#dpad` div inside `#world` (which becomes `position: relative`),
anchored **bottom-right** (B39), a 3×3 CSS grid with **four separate,
floating arrow buttons** in the cross positions — spaced with gaps, *not*
one solid Game-Boy cross (B38). All it does is write to the stub from §3:

```js
// pointerdown on the ▲ button:  virtualPad.direction = "up"
// pointerup / pointercancel / pointerleave:  virtualPad.direction = null
```

Hard-won details that save a debugging session each — treat these as
requirements, not suggestions:

- **Pointer Events, not touch events.** `pointerdown` / `pointerup` /
  `pointercancel` / `pointerleave` unify mouse and finger, so the pad is
  testable with a mouse on the family desktop. (The vendored input skill
  covers Phaser's side; the pad is plain DOM so it uses the browser's.)
- **The stuck-walk bug, killed three ways.** Clear `direction` on
  `pointercancel` (iOS interrupts), on `pointerleave` (finger slides off
  the button), *and* on `document` `visibilitychange`/`blur`
  (backgrounding the tab mid-hold). Miss any one and the hero
  sleepwalks into a tree forever.
- **Stop the browser's own gestures.** `touch-action: none` on the pad
  *and* the canvas; `preventDefault()` in `pointerdown`; CSS
  `user-select: none` and `-webkit-tap-highlight-color: transparent`;
  swallow `contextmenu` on the pad (long-press menu on iPad).
- **Thumb-sized targets:** direction buttons ≥ 56px, **half see-through
  (~0.5 opacity — B40; still a Lewis dial, §9)**, with a dead center cell so diagonals
  can't happen by accident — the grid walker only knows four directions.
- **One finger is enough.** Track the active `pointerId`; ignore extra
  fingers rather than letting them fight.
- **When to show it:** **DECIDED (B41) — a show/hide toggle.** A small
  on/off button controls the pad for *everyone*, touch and desktop alike,
  rather than auto-hiding on a mouse. Reasonable starting state: on when
  `(pointer: coarse)` (a phone/tablet), off on a plain mouse — but either
  way the toggle is always there to flip it.
- **Layout note:** center cell stays empty in M3. It's the reserved
  parking spot for an **A button** when M4's NPCs and doors need a
  "talk/interact" action — the pad is built as a 3×3 grid *now* so that
  button is a one-cell change *later*.

---

## §5. Fit the screen (S10 commit 2 — confirmed still fully unbuilt, §A.3)

Two changes, both tiny, both independent of the pad:

1. `index.html` gains the standard tag every mobile page needs:

   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1">
   ```

2. `src/world/config.js` swaps the fixed zoom for the Scale Manager's
   FIT mode — **capped so the desktop looks pixel-identical to today**:

   ```js
   scale: {
     mode: Phaser.Scale.FIT,            // shrink-to-fit, aspect preserved
     autoCenter: Phaser.Scale.CENTER_BOTH,
     max: { width: 960, height: 640 },  // = today's 2× cap on desktop
   },
   ```

   Big screens still get exactly 960×640; a phone gets the whole meadow
   scaled to its width. (Verified against the vendored
   `scale-and-responsive` skill, §A.4 — `min`/`max` under `scale` is real
   Phaser 4.) One honest trade-off to note in the commit: FIT produces
   non-integer scales on some screens, so pixels can shimmer slightly
   during walk tweens. If it bothers anyone, the documented dial is an
   integer-snap zoom (compute `Math.max(1, Math.floor(fit))` on resize) —
   crisper pixels, letterboxed edges. Start with FIT; it's simpler.

3. **Vendor one more Phaser skill first — done, see §A.4.** The official
   `skills/` folder has a `scale-and-responsive` skill that wasn't pulled
   at M3S0; it's now vendored into `PLANS/phaser-skills/`, ahead of the
   session that touches scaling, per the §2 mandate.

The battle room mostly fits already (320px cards + `flex-wrap`), but S10
should include a quick phone-width CSS pass (log height, button padding)
while a real tablet is in hand.

---

## §6. Screen-manager wiring (the F3 interplay)

The pre-M3 review's F3 fix (disable `worldScene.input` when the battle
shows) gets **one sibling rule**: `showBattle()` also hides `#dpad` and
nulls `virtualPad.direction`; `showWorld()` restores it. Otherwise a
thumb resting on the pad during a fight walks the hidden hero into an
encounter tile, and the moment the battle ends a *second* battle fires —
the exact class of bug F3 exists to prevent, arriving through the new
door we just built. `src/screens.js` stays the only file that touches
visibility (§3 of the M3 plan), so this is two lines in each function.

*(§A.1: `src/screens.js` doesn't exist yet as of this reconciliation —
S7 hasn't landed. This section describes work against the real
`showWorld()`/`showBattle()` pair S7 will build; by S10's turn, per this
plan's own sequencing, S7 will already be done.)*

---

## §A.8 What S10 actually built (execution session, 2026-07-12)

Built with **Sonnet 5**, as three separate commits per §7's plan — each left
the game playable, verified with headless-browser smoke tests before moving
to the next.

1. **Seam retrofit** — `heldDirection()` on `WorldScene` (§A.2's exact call
   site), backed by a module-level `virtualPad = { direction: null }`.
   Verified as a pure no-op: keyboard-only walking and the map→battle
   handoff behave identically.
2. **Fit the screen** — the viewport `<meta>` tag (`index.html`) and Phaser's
   `scale: { mode: FIT, autoCenter: CENTER_BOTH, max: {...} }` (§5.2), capped
   at `WORLD_WIDTH/HEIGHT × WORLD_ZOOM` (960×640 — unchanged from before).
3. **The pad + wiring** — `src/world/dpad.js` (new file): Pointer Events,
   the three-way stuck-walk clear (`pointerup`/`pointercancel`/
   `pointerleave`, plus `visibilitychange`/`blur`), one-finger tracking via
   `pointerId`, and the show/hide toggle defaulting on `(pointer: coarse)`.
   `src/screens.js` gained the two-line §6 wiring (`hideDpadForBattle()` /
   `restoreDpadAfterBattle()`).

**⚠️ A real bug this plan didn't anticipate, found and fixed during
verification:** giving `#world` `position: relative` (so the pad/toggle
could overlay the canvas) was not enough on its own. Phaser's FIT scale
mode needs a parent element with a *bounded* size to fit the game into —
`#world` had never had an explicit width/height (it just sized to its flex
content), and without one, Phaser's Scale Manager fell back to sizing
against the full window, which (a) threw off Phaser's own canvas-centering
inline margin and (b) left the pad/toggle — correctly positioned relative
to `#world` — anchored to a box far larger than the visible canvas, so they
rendered nowhere near it (confirmed via `getBoundingClientRect`, not just
eyeballing a screenshot — the toggle sat right under the page title, the
pad sat well below the canvas). **Fix:** `#world` now gets
`width: 100%; max-width: 960px; aspect-ratio: 480 / 320;` — a real,
bounded box for Phaser to fit into, and the correct anchor for the overlay.
Verified after the fix: `#world`'s rect matches the canvas's rect on both a
960-wide desktop and a 390px-wide phone viewport, and the pad/toggle render
exactly on the canvas's corners at both sizes (screenshots taken, not
committed). **Lesson for future Scale-Manager work:** always give a Phaser
`parent` element an explicit CSS size before turning on FIT/RESIZE modes —
Phaser's docs mention this, but it's easy to miss since fixed-zoom mode
(what S1–S9 used) never needed it.

---

## §7. Proposed sequencing (Jeff's call)

*(Revised after S2–S4 landed: the original "seam into S3's prompt" and
"scaling rides with S2" rows are gone — those trains left the station,
so their cargo moves into S10. Confirmed accurate by the §A reconciliation,
2026-07-10 — no re-sequencing needed.)*

| When | What | Size |
|---|---|---|
| **Adoption session** ✅ (2026-07-10, docs-only) | §A reconciliation written into this plan; M3 plan §A/§9 amendments; roadmap pair + counters; DECISIONS row; Lewis homework (B38–B42); vendor the `scale-and-responsive` skill (§5.3 — a doc pull, done) | Sonnet 5 / medium — no `src/` changes |
| **New step S10 — "Pocket Venta"** (after S9) | Three commits in one session, each leaving the game playable: **(1)** the §3 seam retrofit — pure refactor, keyboard-only, verified identical by playing; **(2)** viewport tag + FIT scaling (§5.1–5.2), verified on desktop *and* a phone-width window; **(3)** the D-pad (§4) + screens.js wiring (§6) + phone-width CSS pass | One session, Sonnet 5 / medium–high — DOM+CSS with careful event handling, no new Phaser; §A.2 found the seam retrofit is a single call-site swap, so the "split into two sessions" escape hatch likely won't be needed, but stays available if commit 3's event handling fights back |

Why S10 stays *after* S9 even though the seam could technically land
sooner: S6–S7 touch the same input code (encounter bumps, keyboard
enable/disable), and refactoring underneath in-flight steps invites
merge pain for zero player-visible gain. Landing it all after S9
preserves the M3 plan's scope promise (S1–S9's do-not-build list stays
true) and gives S10 a crisp definition of done:
**M3's own DoD, replayed start-to-finish on a tablet with thumbs** — walk
the meadow, bump a wild Fakeamon, fight, catch, return — on the live
GitHub Pages URL, no keyboard anywhere. The alternative (fold it into
M4) works too, but means the family's first overworld demos stay
desktop-only; S10's whole audience owns iPads.

Dev loop for testing before it's live: `python3 -m http.server` on the
family machine, then visit `http://<that-computer's-LAN-IP>:8000` from
the tablet on the same Wi-Fi. Refreshing on the tablet after each tweak
is a great Lewis feedback loop for §9's dials.

---

## §8. Risk register

| Risk | Likelihood | Mitigation |
|---|---|---|
| Plan drift — the repo moves faster than this plan (already happened once: S2–S4) | **High** | §A reconciliation is mandatory before any session acts on this plan; findings are recorded as dated amendments, same as the M3/M5 plans |
| Seam retrofit breaks S4's movement feel | Medium | §3's pure-refactor rule: commit 1 changes zero behavior, verified by playing before commit 2 starts; the seam adapts to S3/S4's code, never vice versa. §A.2 also found the retrofit is a single call-site swap, lowering this risk further |
| Stuck-walk (direction never clears) | High if §4 shortcuts taken | The three-way clear rule (§4) is a requirement; test by sliding a finger off the pad mid-walk |
| Pad presses leak into battle | Medium | §6 wiring lands in the same commit as the pad; test: hold pad, trigger encounter, confirm hero is still when battle ends |
| FIT scaling shimmer annoys on some screens | Low–Medium | Documented integer-snap dial (§5); decide by eyeball on the actual family tablet, like the zoom-2× call at S1 |
| Phaser 4 scale API skew | Low | `scale-and-responsive` skill vendored before the session (§5, §A.4) |
| Scope creep (A button, tap-to-move) | Medium | A button waits for M4's first interactable; tap-to-move is a logged M4+ candidate (§2 Option C), not S10 work |

---

## §9. New homework for Lewis (creative director calls)

Following the `DECISIONS.md` loop — these are his to decide. Filed as
**B38–B42** in `HOMEWORK.md`/`homework.html` (2026-07-10):

1. **Pad look:** classic cross (Game Boy homage) or four floating arrow
   buttons?
2. **Which side?** Bottom-left is tradition, but which thumb does Lewis
   *actually* steer with on the iPad? (Handedness is a real design
   input — test both during S10.)
3. **How see-through?** The pad sits over meadow — pick the opacity
   where it's findable but not blocking flowers.
4. **Desktop too?** Should mouse players see the pad, or is it
   touch-only? (Ties to the `(pointer: coarse)` default in §4.)
5. **Name the feature** for the changelog. ("Pocket Venta" is a
   placeholder — he'll beat it.)

**✅ DECIDED (2026-07-11) — Lewis's picks (folded into §4 above):**
1. **Pad look:** four separate floating arrow buttons, *not* a solid
   cross (B38).
2. **Which side:** **bottom-right** (B39).
3. **How see-through:** **half** (~0.5 opacity, B40).
4. **Desktop too:** a **show/hide toggle** for everyone (B41).
5. **Name:** he kept **"Pocket Venta"** (B42).

---

*The battle room already speaks touch; this plan just teaches the world
room the same language — through one 10-line seam and a pad Lewis can
restyle in CSS. Plan with the Architect, build with the Builder.* 📱🕹️
