// ---- FAKEAMON SPECIES ----  Shared definitions, keyed by species key
// ("growler", "whaley", "leafick"). A species is just the blueprint —
// base* stats and the move list. The actual creature that fights and gets
// hurt is an "individual" (src/state.js's newIndividual()), so two
// Growlers in the same battle are two different individuals pointing at
// this one shared entry. See PLANS/M5_STATE_AND_SAVE_PLAN.md §1.
const FAKEAMON = {
  growler: {
    name: "Growler", type: "fire", sprite: "assets/sprites/growler.png",
    baseHP: 40, baseAttack: 13, baseDefense: 10, baseSpeed: 12,
    moves: ["tackle", "bite", "burn", "flare"],
  },
  whaley: {
    name: "Whaley", type: "water", sprite: "assets/sprites/whaley.png",
    baseHP: 44, baseAttack: 12, baseDefense: 12, baseSpeed: 9,
    moves: ["tackle", "splash", "spout", "breech"],
  },
  leafick: {
    name: "Leafick", type: "grass", sprite: "assets/sprites/leafick.png",
    baseHP: 42, baseAttack: 11, baseDefense: 13, baseSpeed: 10,
    moves: ["tackle", "leafage", "pounce", "confusion"],
  },
};

// ---- STARTERS ----  The species keys shown on the "Choose your starter" screen.
const STARTER_KEYS = ["growler", "whaley", "leafick"];
