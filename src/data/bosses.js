// ===========================================================================
//  BOSSES — the five mini-bosses and Artemis (M5 Steps 2–4).
//  Everything here comes straight out of DESIGN.md §8 and §10, which is where
//  Lewis invented them: the names, the types, the home turfs and every
//  entrance line are his (homework B9 + B21).
//
//  A mini-boss is a WILD Fakeamon that happens to be enormous — it stands on a
//  map like any other encounter and you bump into it. What makes it special:
//    • it hits far harder than anything else in its area,
//    • it pays TRIPLE XP (MINIBOSS_XP_MULT in src/progression.js),
//    • it drops a Bossberry — the one berry you can't find on the ground,
//    • and beating all five unlocks Artemis (M5 Step 3).
//
//  ⚠️ TWO THINGS ARE DELIBERATELY NOT BUILT YET, both flagged in DESIGN.md:
//   1. **You can't catch a mini-boss.** Lewis decided (DESIGN.md §6) you *can*
//      — but only with a **Cosmic Fakeaball**, and the four ball tiers don't
//      have their mechanics yet (their art is vendored and waiting). Until
//      they do, a mini-boss fight allows no catching, the same as a gym.
//   2. **Mini-bosses appear all the time, not just at night** (Lewis's B11
//      says night only). Day/night isn't built yet; when it is, this is the
//      list it filters.
// ===========================================================================

// [TUNE] What beating a mini-boss pays, on top of the tripled XP.
const MINIBOSS_TOKEN_REWARD = 60;

// [TUNE] And what saving the world pays. It's a trophy more than a wage —
// there's nothing left you need to buy.
const ARTEMIS_TOKEN_REWARD = 500;

const MINI_BOSSES = {
  banvengeance: {
    id: "banvengeance",
    name: "Banvengeance",
    speciesKey: "banvengeance",
    level: 18,                       // [TUNE]
    home: "theForest",               // DESIGN.md §8 — Lewis's B9
    tileX: 15, tileY: 10,
    entrance: "Prepare to die, puny monkey thing!",
  },
  saurchin: {
    id: "saurchin",
    name: "Saurchin",
    speciesKey: "saurchin",
    level: 20,                       // [TUNE] the strongest of the five
    home: "theLagoon",
    tileX: 5,  tileY: 12,
    entrance: "Get ready to be crushed.",
  },
  sharpfin: {
    id: "sharpfin",
    name: "Sharpfin",
    speciesKey: "sharpfin",
    level: 16,                       // [TUNE] the gentlest of the five
    home: "theLagoon",
    tileX: 14, tileY: 17,
    entrance: "You look easy.",
  },
  gastronium: {
    id: "gastronium",
    name: "Gastronium",
    speciesKey: "gastronium",
    level: 19,                       // [TUNE]
    home: "theFactory",
    tileX: 15, tileY: 11,
    entrance: "It's time to blow things up.",
  },
  tobishimi: {
    id: "tobishimi",
    name: "Tobishimi",
    speciesKey: "tobishimi",
    level: 19,                       // [TUNE]
    home: "theLagoon",
    tileX: 20, tileY: 2,
    entrance: "Prepare to meet your doom.",
  },
};

// Handy list of all five ids — "have you beaten them all?" (M5 Step 3) reads
// this rather than a second hand-written list that could drift out of step.
const MINI_BOSS_IDS = Object.keys(MINI_BOSSES);

// Look up any boss by id — the five mini-bosses OR Artemis. One lookup means
// src/main.js has a single "start a boss fight" path instead of two nearly
// identical ones (M5 Step 4).
function bossById(id) {
  if (MINI_BOSSES[id]) return MINI_BOSSES[id];
  return id === ARTEMIS.id ? ARTEMIS : null;
}

// Have all five mini-bosses been beaten? This is the whole Artemis gate
// (M5 Step 3) — asked of the save's flags.bossesCleared list.
function allMiniBossesBeaten(clearedIds) {
  return MINI_BOSS_IDS.every(function (id) { return clearedIds.indexOf(id) !== -1; });
}

// ===========================================================================
//  ARTEMIS — the final boss (DESIGN.md §10). Its lair opens only once all five
//  mini-bosses are down.
// ===========================================================================
const ARTEMIS = {
  id: "artemis",
  name: "Artemis",
  speciesKey: "artemis",
  level: 25,                         // [TUNE]
  home: "artemisLair",
  tileX: 15, tileY: 6,
  // Lewis's opening scene (B19) and lair (B22).
  entrance: "So — you are the one who has been meddling. The meteor is " +
            "already falling, little trainer. Watch it land!",
  // What you see the moment you walk in, before the fight (Lewis's B22:
  // "purple fire and Artemis's throne of stars").
  lairText: "Purple fire crackles around a throne made of stars. " +
            "Artemis is waiting.",
  // Lewis's win-screen line, word for word (B24).
  winText: "Venta is saved! But adventures still await you…",
};
