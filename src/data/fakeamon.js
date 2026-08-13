// ---- FAKEAMON SPECIES ----  Shared definitions, keyed by species key
// ("growler", "whaley", "leafick"). A species is just the blueprint —
// base* stats and the move list. The actual creature that fights and gets
// hurt is an "individual" (src/state.js's newIndividual()), so two
// Growlers in the same battle are two different individuals pointing at
// this one shared entry. See PLANS/M5_STATE_AND_SAVE_PLAN.md §1.
// `sprite` is the big battle portrait. `overworld` is the little 2-frame idle
// sheet (24×24 per frame) used when this Fakeamon is standing on the map (S6) —
// sliced from the same source sheet into assets/sprites/idle/<slug>.png. The
// filenames there use Tuxemon's slugs, so we spell the path out here rather
// than guess it from our species key.
const FAKEAMON = {
  growler: {
    name: "Growler", type: "fire", sprite: "assets/sprites/growler.png",
    overworld: "assets/sprites/idle/hissiorite.png",
    baseHP: 40, baseAttack: 13, baseDefense: 10, baseSpeed: 12,
    moves: ["tackle", "bite", "burn", "flare"],
    evolvesTo: "deviraptor", evolvesAt: 16,
  },
  whaley: {
    name: "Whaley", type: "water", sprite: "assets/sprites/whaley.png",
    overworld: "assets/sprites/idle/bigfin.png",
    baseHP: 44, baseAttack: 12, baseDefense: 12, baseSpeed: 9,
    moves: ["tackle", "splash", "spout", "breech"],
    evolvesTo: "leviadile", evolvesAt: 16,
  },
  leafick: {
    name: "Leafick", type: "grass", sprite: "assets/sprites/leafick.png",
    overworld: "assets/sprites/idle/frondly.png",
    baseHP: 42, baseAttack: 11, baseDefense: 13, baseSpeed: 10,
    moves: ["tackle", "leafage", "pounce", "confusion"],
    evolvesTo: "dragarbor", evolvesAt: 16,
  },

  // ---- WILD ROSTER — THE MEADOWS (M3 Step S11) ----
  // The Meadows' 14-line slice of the approved 200-monster pool
  // (CONTENT_REFERENCE.md §16, VENTA_ROSTER_DRAFT.md). Names below are
  // Title-Cased Tuxemon slugs — clear PLACEHOLDERS. "Lewis invents every
  // player-facing name" (VENTA_ROSTER_DRAFT.md) is still true; these just
  // let the roster play before his rename pass reaches this area.
  //
  // Stats come from a [TUNE] TYPE ARCHETYPE, not hand-authored per monster —
  // the pre-M3 peer-review's "F14" idea (DECISIONS.md): generate the
  // wild-roster's stats from a small per-type table, and save hand-tuning
  // for the ~15 *named* creatures (starters, evolutions, bosses, gyms).
  // Every monster of a type shares that type's row below — change the row
  // and every monster of that type updates. Roughly matches the 3 starters'
  // existing feel (compare fire/water/grass above) so battles stay the same
  // difficulty; a metal/normal row is included for future areas.
  //
  //   TYPE ARCHETYPE  [TUNE]      HP  Attack  Defense  Speed
  //   fire   (glass cannon)       36    14       9       13
  //   water  (bulky, slow)        44    11      12        9
  //   grass  (defensive)          41    11      13       10
  //   normal (balanced/generic)   38    12      11       11
  //   metal  (tanky)              40    12      14        8
  //
  // Movesets are also shared by type (existing moves reused — no new move
  // data needed): normal → tackle/bite/pounce/confusion; grass → Leafick's
  // kit; fire → Growler's kit.
  aardorn: {
    name: "Aardorn", type: "normal", sprite: "assets/sprites/front/aardorn.png",
    overworld: "assets/sprites/idle/aardorn.png",
    baseHP: 38, baseAttack: 12, baseDefense: 11, baseSpeed: 11,
    moves: ["tackle", "bite", "pounce", "confusion"],
    evolvesTo: "aardart", evolvesAt: 14,
  },
  baoby: {
    name: "Baoby", type: "grass", sprite: "assets/sprites/front/baoby.png",
    overworld: "assets/sprites/idle/baoby.png",
    baseHP: 41, baseAttack: 11, baseDefense: 13, baseSpeed: 10,
    moves: ["tackle", "leafage", "pounce", "confusion"],
    evolvesTo: "baobaraffe", evolvesAt: 14,
  },
  capiti: {
    name: "Capiti", type: "normal", sprite: "assets/sprites/front/capiti.png",
    overworld: "assets/sprites/idle/capiti.png",
    baseHP: 38, baseAttack: 12, baseDefense: 11, baseSpeed: 11,
    moves: ["tackle", "bite", "pounce", "confusion"],
    evolvesTo: "capinyah", evolvesAt: 22,
  },
  chenipode: {
    name: "Chenipode", type: "normal", sprite: "assets/sprites/front/chenipode.png",
    overworld: "assets/sprites/idle/chenipode.png",
    baseHP: 38, baseAttack: 12, baseDefense: 11, baseSpeed: 11,
    moves: ["tackle", "bite", "pounce", "confusion"],
    evolvesTo: "exapode", evolvesAt: 14,
  },
  chickadee: {
    name: "Chickadee", type: "normal", sprite: "assets/sprites/front/chickadee.png",
    overworld: "assets/sprites/idle/chickadee.png",
    baseHP: 38, baseAttack: 12, baseDefense: 11, baseSpeed: 11,
    moves: ["tackle", "bite", "pounce", "confusion"],
    evolvesTo: "birdee", evolvesAt: 12,
  },
  dandicub: {
    name: "Dandicub", type: "grass", sprite: "assets/sprites/front/dandicub.png",
    overworld: "assets/sprites/idle/dandicub.png",
    baseHP: 41, baseAttack: 11, baseDefense: 13, baseSpeed: 10,
    moves: ["tackle", "leafage", "pounce", "confusion"],
    evolvesTo: "dandylion", evolvesAt: 14,
  },
  hatchling: {
    name: "Hatchling", type: "normal", sprite: "assets/sprites/front/hatchling.png",
    overworld: "assets/sprites/idle/hatchling.png",
    baseHP: 38, baseAttack: 12, baseDefense: 11, baseSpeed: 11,
    moves: ["tackle", "bite", "pounce", "confusion"],
    evolvesTo: "birdling", evolvesAt: 14,
  },
  lambert: {
    name: "Lambert", type: "grass", sprite: "assets/sprites/front/lambert.png",
    overworld: "assets/sprites/idle/lambert.png",
    baseHP: 41, baseAttack: 11, baseDefense: 13, baseSpeed: 10,
    moves: ["tackle", "leafage", "pounce", "confusion"],
    evolvesTo: "legko", evolvesAt: 18,
  },
  marvillar: {
    name: "Marvillar", type: "normal", sprite: "assets/sprites/front/marvillar.png",
    overworld: "assets/sprites/idle/marvillar.png",
    baseHP: 38, baseAttack: 12, baseDefense: 11, baseSpeed: 11,
    moves: ["tackle", "bite", "pounce", "confusion"],
    evolvesTo: "marvantis", evolvesAt: 12,
  },
  pairagrin: {
    name: "Pairagrin", type: "normal", sprite: "assets/sprites/front/pairagrin.png",
    overworld: "assets/sprites/idle/pairagrin.png",
    baseHP: 38, baseAttack: 12, baseDefense: 11, baseSpeed: 11,
    moves: ["tackle", "bite", "pounce", "confusion"],
    evolvesTo: "pairagrim", evolvesAt: 20,
  },
  pantherafira: {
    name: "Pantherafira", type: "fire", sprite: "assets/sprites/front/pantherafira.png",
    overworld: "assets/sprites/idle/pantherafira.png",
    baseHP: 36, baseAttack: 14, baseDefense: 9, baseSpeed: 13,
    moves: ["tackle", "bite", "burn", "flare"],
    evolvesTo: "criniotherme", evolvesAt: 14,
  },
  shybulb: {
    name: "Shybulb", type: "grass", sprite: "assets/sprites/front/shybulb.png",
    overworld: "assets/sprites/idle/shybulb.png",
    baseHP: 41, baseAttack: 11, baseDefense: 13, baseSpeed: 10,
    moves: ["tackle", "leafage", "pounce", "confusion"],
    evolvesTo: "narcileaf", evolvesAt: 14,
  },
  snaki: {
    name: "Snaki", type: "normal", sprite: "assets/sprites/front/snaki.png",
    overworld: "assets/sprites/idle/snaki.png",
    baseHP: 38, baseAttack: 12, baseDefense: 11, baseSpeed: 11,
    moves: ["tackle", "bite", "pounce", "confusion"],
    evolvesTo: "snokari", evolvesAt: 14,
  },
  tumbleworm: {
    name: "Tumbleworm", type: "grass", sprite: "assets/sprites/front/tumbleworm.png",
    overworld: "assets/sprites/idle/tumbleworm.png",
    baseHP: 41, baseAttack: 11, baseDefense: 13, baseSpeed: 10,
    moves: ["tackle", "leafage", "pounce", "confusion"],
    evolvesTo: "tumblebee", evolvesAt: 14,
  },

  // ---- WILD ROSTER — THE LAGOON (M4S6) ----
  // The Lagoon's 12-line slice of the same approved pool
  // (VENTA_ROSTER_DRAFT.md → "The Lagoon"). Built exactly like The Meadows'
  // slice above: names are Title-Cased Tuxemon slugs — PLACEHOLDERS until
  // Lewis's rename pass reaches this area — and the stats come from the same
  // [TUNE] type-archetype table, not hand-authored per monster.
  //
  //   water  (bulky, slow)      44  11  12   9
  //   grass  (defensive)        41  11  13  10
  //   normal (balanced/generic) 38  12  11  11
  //
  // ⚠️ WORTH KNOWING: ten of these twelve are water type, so ten of them have
  // IDENTICAL stats and moves — only the picture and the name differ. That's
  // the archetype table doing its job (it's what keeps 200 monsters possible
  // without 200 balancing decisions), but it does mean The Lagoon fights all
  // feel alike. The fix isn't a new system — it's Jeff & Lewis picking a
  // handful of these to hand-tune, the way the gym team above was. Good
  // homework once the area has been played.
  //
  // ⚠️ AND: the stats below are the SAME archetype numbers as The Meadows'
  // roster — this area is harder only because its Fakeamon are a higher LEVEL.
  // ✅ That finally counts for something: M5 Step 1 (2026-08-13) turned level
  // into real stats, and the same change re-levelled this area from 10–15 down
  // to 8–12 (see the note above the encounter list in src/data/maps.js),
  // because a two-level deficit turned out to be nearly an automatic loss.
  axolightl: {
    name: "Axolightl", type: "water", sprite: "assets/sprites/front/axolightl.png",
    overworld: "assets/sprites/idle/axolightl.png",
    baseHP: 44, baseAttack: 11, baseDefense: 12, baseSpeed: 9,
    moves: ["tackle", "splash", "spout", "breech"],
    evolvesTo: "ampystoma", evolvesAt: 22,
  },
  claymorior: {
    name: "Claymorior", type: "grass", sprite: "assets/sprites/front/claymorior.png",
    overworld: "assets/sprites/idle/claymorior.png",
    baseHP: 41, baseAttack: 11, baseDefense: 13, baseSpeed: 10,
    moves: ["tackle", "leafage", "pounce", "confusion"],
    evolvesTo: "regalance", evolvesAt: 22,
  },
  fluoresfin: {
    name: "Fluoresfin", type: "water", sprite: "assets/sprites/front/fluoresfin.png",
    overworld: "assets/sprites/idle/fluoresfin.png",
    baseHP: 44, baseAttack: 11, baseDefense: 12, baseSpeed: 9,
    moves: ["tackle", "splash", "spout", "breech"],
    evolvesTo: "incandesfin", evolvesAt: 14,
  },
  gupphish: {
    name: "Gupphish", type: "water", sprite: "assets/sprites/front/gupphish.png",
    overworld: "assets/sprites/idle/gupphish.png",
    baseHP: 44, baseAttack: 11, baseDefense: 12, baseSpeed: 9,
    moves: ["tackle", "splash", "spout", "breech"],
    evolvesTo: "gupphire", evolvesAt: 16,
  },
  jelillow: {
    name: "Jelillow", type: "water", sprite: "assets/sprites/front/jelillow.png",
    overworld: "assets/sprites/idle/jelillow.png",
    baseHP: 44, baseAttack: 11, baseDefense: 12, baseSpeed: 9,
    moves: ["tackle", "splash", "spout", "breech"],
    evolvesTo: "bedoo", evolvesAt: 24,
  },
  kroki: {
    name: "Kroki", type: "water", sprite: "assets/sprites/front/kroki.png",
    overworld: "assets/sprites/idle/kroki.png",
    baseHP: 44, baseAttack: 11, baseDefense: 12, baseSpeed: 9,
    moves: ["tackle", "splash", "spout", "breech"],
    evolvesTo: "krokivip", evolvesAt: 12,
  },
  lesmagu: {
    name: "Lesmagu", type: "water", sprite: "assets/sprites/front/lesmagu.png",
    overworld: "assets/sprites/idle/lesmagu.png",
    baseHP: 44, baseAttack: 11, baseDefense: 12, baseSpeed: 9,
    moves: ["tackle", "splash", "spout", "breech"],
    evolvesTo: "shelagu", evolvesAt: 14,
  },
  nebufin: {
    name: "Nebufin", type: "water", sprite: "assets/sprites/front/nebufin.png",
    overworld: "assets/sprites/idle/nebufin.png",
    baseHP: 44, baseAttack: 11, baseDefense: 12, baseSpeed: 9,
    moves: ["tackle", "splash", "spout", "breech"],
    evolvesTo: "galasces", evolvesAt: 13,
  },
  nostray: {
    name: "Nostray", type: "water", sprite: "assets/sprites/front/nostray.png",
    overworld: "assets/sprites/idle/nostray.png",
    baseHP: 44, baseAttack: 11, baseDefense: 12, baseSpeed: 9,
    moves: ["tackle", "splash", "spout", "breech"],
    evolvesTo: "shnark", evolvesAt: 14,
  },
  nudiflot_female: {
    // See the note on nudiflot_male below — two different creatures that would
    // both otherwise be called "Nudiflot".
    name: "Nudiflot (dreamy)", type: "water", sprite: "assets/sprites/front/nudiflot_female.png",
    overworld: "assets/sprites/idle/nudiflot_female.png",
    baseHP: 44, baseAttack: 11, baseDefense: 12, baseSpeed: 9,
    moves: ["tackle", "splash", "spout", "breech"],
    evolvesTo: "nudimind", evolvesAt: 14,
  },
  nudiflot_male: {
    // Tuxemon ships two Nudiflots. They're different creatures with different
    // art, so they're two species here — but both would show as "Nudiflot",
    // which reads as a bug. Until Lewis renames them they're told apart in
    // brackets.
    name: "Nudiflot (fierce)", type: "water", sprite: "assets/sprites/front/nudiflot_male.png",
    overworld: "assets/sprites/idle/nudiflot_male.png",
    baseHP: 44, baseAttack: 11, baseDefense: 12, baseSpeed: 9,
    moves: ["tackle", "splash", "spout", "breech"],
    evolvesTo: "nudikill", evolvesAt: 14,
  },
  skwib: {
    name: "Skwib", type: "normal", sprite: "assets/sprites/front/skwib.png",
    overworld: "assets/sprites/idle/skwib.png",
    baseHP: 38, baseAttack: 12, baseDefense: 11, baseSpeed: 11,
    moves: ["tackle", "bite", "pounce", "confusion"],
    evolvesTo: "octabode", evolvesAt: 14,
  },

  // ---- GYM 1 — ENFORCER BOSS'S TEAM (M4S4) ----
  // The first two creatures in the game that are NOT wild: they belong to a
  // trainer (src/data/gyms.js). Unlike the wild roster above, these two are
  // HAND-TUNED — the archetype table is for the ~200 background monsters,
  // while the handful of named creatures (starters, gym teams, bosses) get
  // their own numbers. DESIGN.md §8 picked the pair; the stats are ours.
  //
  // ✅ [TUNE] NOTE, UPDATED 2026-08-13 (M5 Step 1): a gym mon's `level` (see
  // gyms.js) used to change NOTHING, because STAT_GROWTH_PER_LEVEL in
  // src/state.js was all zeros. It works now — Allagon at level 8 really is
  // tougher than Allagon at level 1. So there are now TWO ways to tune a gym:
  // its level (a big, blunt lever — every stat at once) and the base numbers
  // below (fine control over what KIND of fighter it is).
  //
  // The target feel (Jeff & Lewis's call): "a fair step up" — clearly stronger
  // than The Meadows' wild roster (HP 36-41, Attack 11-14, Defense 9-13), but
  // beatable on the first try with a healthy team.
  //
  // Damage-floor invariant (PLANS/M4_WORLD_SYSTEMS_PLAN.md §4.4): the weakest
  // attacker in the game (Leafick, Attack 11) using the weakest move (Tackle,
  // power 8) must still get through with room to spare —
  //   vs Allagon: 8 + 11 − 14 = 5 ✅   vs AV8R: 8 + 11 − 13 = 6 ✅
  // (both comfortably above the "≥ 3" rule), so no fight degrades into a
  // string of minimum-1 chip hits.
  allagon: {
    name: "Allagon", type: "metal", sprite: "assets/sprites/front/allagon.png",
    overworld: "assets/sprites/idle/allagon.png",
    baseHP: 46, baseAttack: 13, baseDefense: 14, baseSpeed: 9, // [TUNE] the standard: tanky, slow
    moves: ["tackle", "bite", "ironBeam"],
  },
  av8r: {
    // ⚠️ Art is IN, but its credit is ASSUMED, not verified. `av8r` has no
    // monster entry in Tuxemon's ATTRIBUTIONS.md — the only "AV8R" mention
    // there is the "Aviator" *trainer* row, a different asset — and
    // wiki.tuxemon.org was down when the sprite was vendored. The artists and
    // CC BY-SA 4.0 license recorded in CREDITS.md are a best inference, to be
    // rechecked once the wiki is back up. See CREDITS.md for the exact
    // re-verification command.
    name: "AV8R", type: "metal", sprite: "assets/sprites/front/av8r.png",
    overworld: "assets/sprites/idle/av8r.png",
    baseHP: 52, baseAttack: 15, baseDefense: 13, baseSpeed: 14, // [TUNE] the ace: faster than EVERY starter, so it strikes first
    moves: ["tackle", "pounce", "ironBeam"],
  },

  // ---- THE FIVE MINI-BOSSES + ARTEMIS (M5 Steps 2–4) ----
  // HP comes straight from DESIGN.md §5's mini-boss tier table (Lewis and
  // Jeff's numbers); Attack/Defense/Speed are hand-authored to match, the same
  // way the gym team was. These are NOT archetype creatures — there are only
  // six of them and each is supposed to feel like an event.
  //
  //   Saurchin     130 HP  ← the strongest
  //   Banvengeance 120 HP
  //   Tobishimi    115 HP
  //   Gastronium   110 HP
  //   Sharpfin     100 HP
  //
  // ⚠️ ART NOTE — four of these five wear BORROWED faces. Tuxemon does have
  // real sprites for Banvengeance, Saurchin, Gastronium and Tobishimi, but
  // none of them appear in Tuxemon's `ATTRIBUTIONS.md`, and `wiki.tuxemon.org`
  // (the project's fallback for checking who drew something) could not be
  // reached when they were built. The rule in CONTENT_REFERENCE.md §14 is
  // simple and worth keeping: no asset ships without a verified credit. So
  // each borrows a sprite from the 198 already-verified sheets — the same
  // "use art we already own" call Lewis made for the starters' evolutions
  // (DECISIONS.md #85). Swapping in the real art later is a one-line `sprite`
  // edit per boss, once the wiki can be reached:
  //     cd tools && npm run wiki-credits -- banvengeance=Banvengeance --write
  // Sharpfin and Artemis (Djinnbo) wear their OWN art — both are credited in
  // Tuxemon's ATTRIBUTIONS.md, so they needed no substitute.
  banvengeance: {
    name: "Banvengeance", type: "grass",
    sprite: "assets/sprites/front/brickhemoth.png",   // ⚠️ borrowed art, see above
    overworld: "assets/sprites/idle/brickhemoth.png",
    baseHP: 120, baseAttack: 22, baseDefense: 18, baseSpeed: 12, // [TUNE]
    moves: ["stranglevine", "forestFury", "vineLash", "slam"],
  },
  saurchin: {
    name: "Saurchin", type: "water",
    sprite: "assets/sprites/front/crustagu.png",      // ⚠️ borrowed art, see above
    overworld: "assets/sprites/idle/crustagu.png",
    baseHP: 130, baseAttack: 24, baseDefense: 19, baseSpeed: 11, // [TUNE] the strongest
    moves: ["starfall", "tidalWave", "breech", "crushingBlow"],
  },
  sharpfin: {
    name: "Sharpfin", type: "water",
    sprite: "assets/sprites/front/sharpfin.png",      // its own art — credited
    overworld: "assets/sprites/idle/sharpfin.png",
    baseHP: 100, baseAttack: 21, baseDefense: 15, baseSpeed: 18, // [TUNE] fast, but frailest
    moves: ["starfall", "tidalWave", "bite", "breech"],
  },
  gastronium: {
    name: "Gastronium", type: "metal",
    sprite: "assets/sprites/front/nimbulex.png",      // ⚠️ borrowed art, see above
    overworld: "assets/sprites/idle/nimbulex.png",
    baseHP: 110, baseAttack: 22, baseDefense: 22, baseSpeed: 10, // [TUNE] the tank
    moves: ["meltdown", "ironBeam", "crushingBlow", "slam"],
  },
  tobishimi: {
    name: "Tobishimi", type: "water",
    sprite: "assets/sprites/front/lightmare.png",     // ⚠️ borrowed art, see above
    overworld: "assets/sprites/idle/lightmare.png",
    baseHP: 115, baseAttack: 23, baseDefense: 17, baseSpeed: 16, // [TUNE]
    moves: ["starfall", "tidalWave", "spout", "crushingBlow"],
  },

  // ARTEMIS — the legend at the end of the game (DESIGN.md §5, §10).
  // The HP rule is Jeff's: **at least 2× the strongest mini-boss.** Saurchin
  // is 130, so Artemis is 260. If Saurchin's number ever changes, change this
  // one too and keep the ratio.
  //
  // Its Cosmic type hits 2× against everything (Lewis's call), which would be
  // unfair if it weren't for Meteor Shower hurting Artemis too — that's the
  // pressure valve that makes the finale winnable. Don't remove it without
  // re-balancing the whole fight.
  artemis: {
    name: "Artemis", type: "cosmic",
    sprite: "assets/sprites/front/djinnbo.png",       // its own art — credited
    overworld: "assets/sprites/idle/djinnbo.png",
    baseHP: 260, baseAttack: 22, baseDefense: 16, baseSpeed: 14, // DESIGN.md §5
    moves: ["meteorShower", "hyperBeam", "cosmicShift", "meteorShower"],
  },

  // ---- EVOLVED FORMS (M5 Step 1 / the M5 plan's S6) ----
  // What everything above turns INTO. Every Fakeamon in the game — all three
  // starters and all 26 wild ones — now has exactly one evolution, listed on
  // the base form as `evolvesTo` + `evolvesAt`. The rules live in
  // src/progression.js; this is just the cast list.
  //
  // ⚠️ NAMES ARE PLACEHOLDERS, same as their base forms — Title-Cased Tuxemon
  // slugs, waiting for Lewis's rename pass.
  //
  // 🎨 THREE OF THESE ARE A CHOICE, NOT A FACT — and they're a one-word edit:
  //   Growler → Deviraptor (a fire dragon)
  //   Whaley  → Leviadile  (a huge sea-dragon)
  //   Leafick → Dragarbor  (a tree-dragon)
  // In the original Tuxemon art, Growler's real evolution is Cobarett — and
  // Whaley and Leafick have NO evolution at all; they're already the last form
  // of their families. So these three were picked from art the project already
  // has permission to use (Lewis's call, 2026-08-13), which is why all three
  // happen to be dragons. Swap any `evolvesTo` above for another species and
  // it just works.
  //
  //   STATS [TUNE]: an evolved form is its base form + 14 HP, +5 Attack,
  //   +4 Defense, +3 Speed. One rule for all of them, same spirit as the type
  //   archetype table above — hand-tune individual ones later if a favourite
  //   deserves it.
  //   TYPE: an evolved form always keeps its base form's type, so evolving
  //   never changes what you're strong or weak against. One less surprise.
  //   MOVES: an evolved form gets its type's BIG kit (src/data/moves.js) —
  //   that's the reward: Firestorm, Tidal Wave, Forest Fury and friends.
  deviraptor: {
    name: "Deviraptor", type: "fire", sprite: "assets/sprites/front/deviraptor.png",
    overworld: "assets/sprites/idle/deviraptor.png",
    baseHP: 54, baseAttack: 18, baseDefense: 14, baseSpeed: 15,
    moves: ["bite","burn","flare","firestorm"],
  },
  leviadile: {
    name: "Leviadile", type: "water", sprite: "assets/sprites/front/leviadile.png",
    overworld: "assets/sprites/idle/leviadile.png",
    baseHP: 58, baseAttack: 17, baseDefense: 16, baseSpeed: 12,
    moves: ["bite","spout","breech","tidalWave"],
  },
  dragarbor: {
    name: "Dragarbor", type: "grass", sprite: "assets/sprites/front/dragarbor.png",
    overworld: "assets/sprites/idle/dragarbor.png",
    baseHP: 56, baseAttack: 16, baseDefense: 17, baseSpeed: 13,
    moves: ["leafage","vineLash","forestFury","pounce"],
  },
  aardart: {
    name: "Aardart", type: "normal", sprite: "assets/sprites/front/aardart.png",
    overworld: "assets/sprites/idle/aardart.png",
    baseHP: 52, baseAttack: 17, baseDefense: 15, baseSpeed: 14,
    moves: ["bite","pounce","confusion","slam"],
  },
  capinyah: {
    name: "Capinyah", type: "normal", sprite: "assets/sprites/front/capinyah.png",
    overworld: "assets/sprites/idle/capinyah.png",
    baseHP: 52, baseAttack: 17, baseDefense: 15, baseSpeed: 14,
    moves: ["bite","pounce","confusion","slam"],
  },
  birdee: {
    name: "Birdee", type: "normal", sprite: "assets/sprites/front/birdee.png",
    overworld: "assets/sprites/idle/birdee.png",
    baseHP: 52, baseAttack: 17, baseDefense: 15, baseSpeed: 14,
    moves: ["bite","pounce","confusion","slam"],
  },
  birdling: {
    name: "Birdling", type: "normal", sprite: "assets/sprites/front/birdling.png",
    overworld: "assets/sprites/idle/birdling.png",
    baseHP: 52, baseAttack: 17, baseDefense: 15, baseSpeed: 14,
    moves: ["bite","pounce","confusion","slam"],
  },
  pairagrim: {
    name: "Pairagrim", type: "normal", sprite: "assets/sprites/front/pairagrim.png",
    overworld: "assets/sprites/idle/pairagrim.png",
    baseHP: 52, baseAttack: 17, baseDefense: 15, baseSpeed: 14,
    moves: ["bite","pounce","confusion","slam"],
  },
  exapode: {
    name: "Exapode", type: "normal", sprite: "assets/sprites/front/exapode.png",
    overworld: "assets/sprites/idle/exapode.png",
    baseHP: 52, baseAttack: 17, baseDefense: 15, baseSpeed: 14,
    moves: ["bite","pounce","confusion","slam"],
  },
  snokari: {
    name: "Snokari", type: "normal", sprite: "assets/sprites/front/snokari.png",
    overworld: "assets/sprites/idle/snokari.png",
    baseHP: 52, baseAttack: 17, baseDefense: 15, baseSpeed: 14,
    moves: ["bite","pounce","confusion","slam"],
  },
  marvantis: {
    name: "Marvantis", type: "normal", sprite: "assets/sprites/front/marvantis.png",
    overworld: "assets/sprites/idle/marvantis.png",
    baseHP: 52, baseAttack: 17, baseDefense: 15, baseSpeed: 14,
    moves: ["bite","pounce","confusion","slam"],
  },
  baobaraffe: {
    name: "Baobaraffe", type: "grass", sprite: "assets/sprites/front/baobaraffe.png",
    overworld: "assets/sprites/idle/baobaraffe.png",
    baseHP: 55, baseAttack: 16, baseDefense: 17, baseSpeed: 13,
    moves: ["leafage","vineLash","forestFury","pounce"],
  },
  dandylion: {
    name: "Dandylion", type: "grass", sprite: "assets/sprites/front/dandylion.png",
    overworld: "assets/sprites/idle/dandylion.png",
    baseHP: 55, baseAttack: 16, baseDefense: 17, baseSpeed: 13,
    moves: ["leafage","vineLash","forestFury","pounce"],
  },
  legko: {
    name: "Legko", type: "grass", sprite: "assets/sprites/front/legko.png",
    overworld: "assets/sprites/idle/legko.png",
    baseHP: 55, baseAttack: 16, baseDefense: 17, baseSpeed: 13,
    moves: ["leafage","vineLash","forestFury","pounce"],
  },
  narcileaf: {
    name: "Narcileaf", type: "grass", sprite: "assets/sprites/front/narcileaf.png",
    overworld: "assets/sprites/idle/narcileaf.png",
    baseHP: 55, baseAttack: 16, baseDefense: 17, baseSpeed: 13,
    moves: ["leafage","vineLash","forestFury","pounce"],
  },
  tumblebee: {
    name: "Tumblebee", type: "grass", sprite: "assets/sprites/front/tumblebee.png",
    overworld: "assets/sprites/idle/tumblebee.png",
    baseHP: 55, baseAttack: 16, baseDefense: 17, baseSpeed: 13,
    moves: ["leafage","vineLash","forestFury","pounce"],
  },
  criniotherme: {
    name: "Criniotherme", type: "fire", sprite: "assets/sprites/front/criniotherme.png",
    overworld: "assets/sprites/idle/criniotherme.png",
    baseHP: 50, baseAttack: 19, baseDefense: 13, baseSpeed: 16,
    moves: ["bite","burn","flare","firestorm"],
  },
  ampystoma: {
    name: "Ampystoma", type: "water", sprite: "assets/sprites/front/ampystoma.png",
    overworld: "assets/sprites/idle/ampystoma.png",
    baseHP: 58, baseAttack: 16, baseDefense: 16, baseSpeed: 12,
    moves: ["bite","spout","breech","tidalWave"],
  },
  regalance: {
    name: "Regalance", type: "grass", sprite: "assets/sprites/front/regalance.png",
    overworld: "assets/sprites/idle/regalance.png",
    baseHP: 55, baseAttack: 16, baseDefense: 17, baseSpeed: 13,
    moves: ["leafage","vineLash","forestFury","pounce"],
  },
  incandesfin: {
    name: "Incandesfin", type: "water", sprite: "assets/sprites/front/incandesfin.png",
    overworld: "assets/sprites/idle/incandesfin.png",
    baseHP: 58, baseAttack: 16, baseDefense: 16, baseSpeed: 12,
    moves: ["bite","spout","breech","tidalWave"],
  },
  gupphire: {
    name: "Gupphire", type: "water", sprite: "assets/sprites/front/gupphire.png",
    overworld: "assets/sprites/idle/gupphire.png",
    baseHP: 58, baseAttack: 16, baseDefense: 16, baseSpeed: 12,
    moves: ["bite","spout","breech","tidalWave"],
  },
  bedoo: {
    name: "Bedoo", type: "water", sprite: "assets/sprites/front/bedoo.png",
    overworld: "assets/sprites/idle/bedoo.png",
    baseHP: 58, baseAttack: 16, baseDefense: 16, baseSpeed: 12,
    moves: ["bite","spout","breech","tidalWave"],
  },
  krokivip: {
    name: "Krokivip", type: "water", sprite: "assets/sprites/front/krokivip.png",
    overworld: "assets/sprites/idle/krokivip.png",
    baseHP: 58, baseAttack: 16, baseDefense: 16, baseSpeed: 12,
    moves: ["bite","spout","breech","tidalWave"],
  },
  shelagu: {
    name: "Shelagu", type: "water", sprite: "assets/sprites/front/shelagu.png",
    overworld: "assets/sprites/idle/shelagu.png",
    baseHP: 58, baseAttack: 16, baseDefense: 16, baseSpeed: 12,
    moves: ["bite","spout","breech","tidalWave"],
  },
  galasces: {
    name: "Galasces", type: "water", sprite: "assets/sprites/front/galasces.png",
    overworld: "assets/sprites/idle/galasces.png",
    baseHP: 58, baseAttack: 16, baseDefense: 16, baseSpeed: 12,
    moves: ["bite","spout","breech","tidalWave"],
  },
  shnark: {
    name: "Shnark", type: "water", sprite: "assets/sprites/front/shnark.png",
    overworld: "assets/sprites/idle/shnark.png",
    baseHP: 58, baseAttack: 16, baseDefense: 16, baseSpeed: 12,
    moves: ["bite","spout","breech","tidalWave"],
  },
  nudimind: {
    name: "Nudimind", type: "water", sprite: "assets/sprites/front/nudimind.png",
    overworld: "assets/sprites/idle/nudimind.png",
    baseHP: 58, baseAttack: 16, baseDefense: 16, baseSpeed: 12,
    moves: ["bite","spout","breech","tidalWave"],
  },
  nudikill: {
    name: "Nudikill", type: "water", sprite: "assets/sprites/front/nudikill.png",
    overworld: "assets/sprites/idle/nudikill.png",
    baseHP: 58, baseAttack: 16, baseDefense: 16, baseSpeed: 12,
    moves: ["bite","spout","breech","tidalWave"],
  },
  octabode: {
    name: "Octabode", type: "normal", sprite: "assets/sprites/front/octabode.png",
    overworld: "assets/sprites/idle/octabode.png",
    baseHP: 52, baseAttack: 17, baseDefense: 15, baseSpeed: 14,
    moves: ["bite","pounce","confusion","slam"],
  },
};

// ---- STARTERS ----  The species keys shown on the "Choose your starter" screen.
const STARTER_KEYS = ["growler", "whaley", "leafick"];
