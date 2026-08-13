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
  },
  whaley: {
    name: "Whaley", type: "water", sprite: "assets/sprites/whaley.png",
    overworld: "assets/sprites/idle/bigfin.png",
    baseHP: 44, baseAttack: 12, baseDefense: 12, baseSpeed: 9,
    moves: ["tackle", "splash", "spout", "breech"],
  },
  leafick: {
    name: "Leafick", type: "grass", sprite: "assets/sprites/leafick.png",
    overworld: "assets/sprites/idle/frondly.png",
    baseHP: 42, baseAttack: 11, baseDefense: 13, baseSpeed: 10,
    moves: ["tackle", "leafage", "pounce", "confusion"],
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
  },
  baoby: {
    name: "Baoby", type: "grass", sprite: "assets/sprites/front/baoby.png",
    overworld: "assets/sprites/idle/baoby.png",
    baseHP: 41, baseAttack: 11, baseDefense: 13, baseSpeed: 10,
    moves: ["tackle", "leafage", "pounce", "confusion"],
  },
  capiti: {
    name: "Capiti", type: "normal", sprite: "assets/sprites/front/capiti.png",
    overworld: "assets/sprites/idle/capiti.png",
    baseHP: 38, baseAttack: 12, baseDefense: 11, baseSpeed: 11,
    moves: ["tackle", "bite", "pounce", "confusion"],
  },
  chenipode: {
    name: "Chenipode", type: "normal", sprite: "assets/sprites/front/chenipode.png",
    overworld: "assets/sprites/idle/chenipode.png",
    baseHP: 38, baseAttack: 12, baseDefense: 11, baseSpeed: 11,
    moves: ["tackle", "bite", "pounce", "confusion"],
  },
  chickadee: {
    name: "Chickadee", type: "normal", sprite: "assets/sprites/front/chickadee.png",
    overworld: "assets/sprites/idle/chickadee.png",
    baseHP: 38, baseAttack: 12, baseDefense: 11, baseSpeed: 11,
    moves: ["tackle", "bite", "pounce", "confusion"],
  },
  dandicub: {
    name: "Dandicub", type: "grass", sprite: "assets/sprites/front/dandicub.png",
    overworld: "assets/sprites/idle/dandicub.png",
    baseHP: 41, baseAttack: 11, baseDefense: 13, baseSpeed: 10,
    moves: ["tackle", "leafage", "pounce", "confusion"],
  },
  hatchling: {
    name: "Hatchling", type: "normal", sprite: "assets/sprites/front/hatchling.png",
    overworld: "assets/sprites/idle/hatchling.png",
    baseHP: 38, baseAttack: 12, baseDefense: 11, baseSpeed: 11,
    moves: ["tackle", "bite", "pounce", "confusion"],
  },
  lambert: {
    name: "Lambert", type: "grass", sprite: "assets/sprites/front/lambert.png",
    overworld: "assets/sprites/idle/lambert.png",
    baseHP: 41, baseAttack: 11, baseDefense: 13, baseSpeed: 10,
    moves: ["tackle", "leafage", "pounce", "confusion"],
  },
  marvillar: {
    name: "Marvillar", type: "normal", sprite: "assets/sprites/front/marvillar.png",
    overworld: "assets/sprites/idle/marvillar.png",
    baseHP: 38, baseAttack: 12, baseDefense: 11, baseSpeed: 11,
    moves: ["tackle", "bite", "pounce", "confusion"],
  },
  pairagrin: {
    name: "Pairagrin", type: "normal", sprite: "assets/sprites/front/pairagrin.png",
    overworld: "assets/sprites/idle/pairagrin.png",
    baseHP: 38, baseAttack: 12, baseDefense: 11, baseSpeed: 11,
    moves: ["tackle", "bite", "pounce", "confusion"],
  },
  pantherafira: {
    name: "Pantherafira", type: "fire", sprite: "assets/sprites/front/pantherafira.png",
    overworld: "assets/sprites/idle/pantherafira.png",
    baseHP: 36, baseAttack: 14, baseDefense: 9, baseSpeed: 13,
    moves: ["tackle", "bite", "burn", "flare"],
  },
  shybulb: {
    name: "Shybulb", type: "grass", sprite: "assets/sprites/front/shybulb.png",
    overworld: "assets/sprites/idle/shybulb.png",
    baseHP: 41, baseAttack: 11, baseDefense: 13, baseSpeed: 10,
    moves: ["tackle", "leafage", "pounce", "confusion"],
  },
  snaki: {
    name: "Snaki", type: "normal", sprite: "assets/sprites/front/snaki.png",
    overworld: "assets/sprites/idle/snaki.png",
    baseHP: 38, baseAttack: 12, baseDefense: 11, baseSpeed: 11,
    moves: ["tackle", "bite", "pounce", "confusion"],
  },
  tumbleworm: {
    name: "Tumbleworm", type: "grass", sprite: "assets/sprites/front/tumbleworm.png",
    overworld: "assets/sprites/idle/tumbleworm.png",
    baseHP: 41, baseAttack: 11, baseDefense: 13, baseSpeed: 10,
    moves: ["tackle", "leafage", "pounce", "confusion"],
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
  },
  claymorior: {
    name: "Claymorior", type: "grass", sprite: "assets/sprites/front/claymorior.png",
    overworld: "assets/sprites/idle/claymorior.png",
    baseHP: 41, baseAttack: 11, baseDefense: 13, baseSpeed: 10,
    moves: ["tackle", "leafage", "pounce", "confusion"],
  },
  fluoresfin: {
    name: "Fluoresfin", type: "water", sprite: "assets/sprites/front/fluoresfin.png",
    overworld: "assets/sprites/idle/fluoresfin.png",
    baseHP: 44, baseAttack: 11, baseDefense: 12, baseSpeed: 9,
    moves: ["tackle", "splash", "spout", "breech"],
  },
  gupphish: {
    name: "Gupphish", type: "water", sprite: "assets/sprites/front/gupphish.png",
    overworld: "assets/sprites/idle/gupphish.png",
    baseHP: 44, baseAttack: 11, baseDefense: 12, baseSpeed: 9,
    moves: ["tackle", "splash", "spout", "breech"],
  },
  jelillow: {
    name: "Jelillow", type: "water", sprite: "assets/sprites/front/jelillow.png",
    overworld: "assets/sprites/idle/jelillow.png",
    baseHP: 44, baseAttack: 11, baseDefense: 12, baseSpeed: 9,
    moves: ["tackle", "splash", "spout", "breech"],
  },
  kroki: {
    name: "Kroki", type: "water", sprite: "assets/sprites/front/kroki.png",
    overworld: "assets/sprites/idle/kroki.png",
    baseHP: 44, baseAttack: 11, baseDefense: 12, baseSpeed: 9,
    moves: ["tackle", "splash", "spout", "breech"],
  },
  lesmagu: {
    name: "Lesmagu", type: "water", sprite: "assets/sprites/front/lesmagu.png",
    overworld: "assets/sprites/idle/lesmagu.png",
    baseHP: 44, baseAttack: 11, baseDefense: 12, baseSpeed: 9,
    moves: ["tackle", "splash", "spout", "breech"],
  },
  nebufin: {
    name: "Nebufin", type: "water", sprite: "assets/sprites/front/nebufin.png",
    overworld: "assets/sprites/idle/nebufin.png",
    baseHP: 44, baseAttack: 11, baseDefense: 12, baseSpeed: 9,
    moves: ["tackle", "splash", "spout", "breech"],
  },
  nostray: {
    name: "Nostray", type: "water", sprite: "assets/sprites/front/nostray.png",
    overworld: "assets/sprites/idle/nostray.png",
    baseHP: 44, baseAttack: 11, baseDefense: 12, baseSpeed: 9,
    moves: ["tackle", "splash", "spout", "breech"],
  },
  nudiflot_female: {
    // See the note on nudiflot_male below — two different creatures that would
    // both otherwise be called "Nudiflot".
    name: "Nudiflot (dreamy)", type: "water", sprite: "assets/sprites/front/nudiflot_female.png",
    overworld: "assets/sprites/idle/nudiflot_female.png",
    baseHP: 44, baseAttack: 11, baseDefense: 12, baseSpeed: 9,
    moves: ["tackle", "splash", "spout", "breech"],
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
  },
  skwib: {
    name: "Skwib", type: "normal", sprite: "assets/sprites/front/skwib.png",
    overworld: "assets/sprites/idle/skwib.png",
    baseHP: 38, baseAttack: 12, baseDefense: 11, baseSpeed: 11,
    moves: ["tackle", "bite", "pounce", "confusion"],
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
};

// ---- STARTERS ----  The species keys shown on the "Choose your starter" screen.
const STARTER_KEYS = ["growler", "whaley", "leafick"];
