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

  // ---- GYM 1 — ENFORCER BOSS'S TEAM (M4S4) ----
  // The first two creatures in the game that are NOT wild: they belong to a
  // trainer (src/data/gyms.js). Unlike the wild roster above, these two are
  // HAND-TUNED — the archetype table is for the ~200 background monsters,
  // while the handful of named creatures (starters, gym teams, bosses) get
  // their own numbers. DESIGN.md §8 picked the pair; the stats are ours.
  //
  // ⚠️ IMPORTANT [TUNE] NOTE: a gym mon's `level` (see gyms.js) currently
  // changes NOTHING — STAT_GROWTH_PER_LEVEL in src/state.js is all zeros until
  // M5 adds leveling. So a gym's difficulty comes entirely from the base
  // numbers below. To make Gym 1 harder or easier, change THESE, not the level.
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
