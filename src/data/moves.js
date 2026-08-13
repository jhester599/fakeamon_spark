// ===========================================================================
//  GAME VALUES — tweak these freely! (Lewis: change numbers and reload.)
// ===========================================================================

// ---- MOVES ----  Each move: { name, type, power, accuracy(%) }
const MOVES = {
  // Growler's moves
  tackle: { name: "Tackle", type: "normal", power: 8,  accuracy: 100 },
  bite:   { name: "Bite",   type: "normal", power: 10, accuracy: 95  },
  burn:   { name: "Burn",   type: "fire",   power: 12, accuracy: 95  },
  flare:  { name: "Flare",  type: "fire",   power: 18, accuracy: 85  },

  // Whaley's moves
  splash: { name: "Splash", type: "water",  power: 8,  accuracy: 100 },
  spout:  { name: "Spout",  type: "water",  power: 12, accuracy: 95  },
  breech: { name: "Breech", type: "water",  power: 16, accuracy: 90  },

  // Leafick's moves
  leafage:   { name: "Leafage",   type: "grass",  power: 12, accuracy: 95 },
  pounce:    { name: "Pounce",    type: "normal", power: 10, accuracy: 95 },
  confusion: { name: "Confusion", type: "normal", power: 10, accuracy: 95 },

  // ---- METAL MOVES (M4S4) ----
  // Iron Beam is Lewis's invention and the game's FIRST metal attack. Gym 1 is
  // the Metal gym, so before this existed its team had no on-type move to hit
  // with at all (the type CHART already knew about metal — only the move data
  // was missing). Metal hits Grass for 2× and Fire for 0.5× (src/data/typechart.js).
  //
  // [TUNE] Power 14 sits deliberately BELOW Flare (18) and Breech (16): metal
  // already gets a 2× bonus against grass Fakeamon, so a big number here would
  // one-shot a Leafick. Nudge it up if Gym 1 feels too easy.
  ironBeam: { name: "Iron Beam", type: "metal", power: 14, accuracy: 90 },

  // ---- BIG MOVES — what you get for EVOLVING (M5 Step 1 / the plan's S6) ----
  // An evolved Fakeamon uses its new form's four moves, so evolving upgrades
  // the whole kit at once. That only means something if there are stronger
  // moves to upgrade INTO — before this, grass had exactly one attack in the
  // entire game (Leafage), so a "fully evolved" grass Fakeamon fought exactly
  // like a baby one.
  //
  // [TUNE] Each one sits above its type's old best (Flare 18, Breech 16,
  // Leafage 12) and trades accuracy for power — the classic deal.
  // 🎨 LEWIS: these five names are PLACEHOLDERS I picked so the code would run.
  // Renaming them is a five-word edit right here and changes nothing else.
  firestorm:  { name: "Firestorm",   type: "fire",   power: 22, accuracy: 85 },
  tidalWave:  { name: "Tidal Wave",  type: "water",  power: 20, accuracy: 85 },
  vineLash:   { name: "Vine Lash",   type: "grass",  power: 16, accuracy: 95 },
  forestFury: { name: "Forest Fury", type: "grass",  power: 22, accuracy: 85 },
  slam:       { name: "Slam",        type: "normal", power: 16, accuracy: 90 },

  // ---- BOSS MOVES (M5 Steps 2–4) ----
  // The five mini-bosses hit harder than anything you'll meet in the grass.
  // [TUNE] Each is a big version of its type's normal attack.
  crushingBlow: { name: "Crushing Blow", type: "normal", power: 24, accuracy: 85 },
  starfall:     { name: "Starfall",      type: "water",  power: 24, accuracy: 85 },
  meltdown:     { name: "Meltdown",      type: "metal",  power: 24, accuracy: 85 },
  stranglevine: { name: "Stranglevine",  type: "grass",  power: 24, accuracy: 85 },

  // ---- ARTEMIS'S COSMIC MOVES (DESIGN.md §6) ----
  // ⚠️ Cosmic hits 2× against EVERY type (Lewis's call), so these are brutal
  // by design — the finale is meant to feel like a wall you have to be clever
  // about. Read the Meteor Shower note below; it's what keeps it winnable.
  hyperBeam:   { name: "Hyper Beam",   type: "cosmic", power: 28, accuracy: 90 },
  cosmicShift: { name: "Cosmic Shift", type: "cosmic", power: 18, accuracy: 95 },

  // ⭐ LEWIS'S IDEA, and the best one in the game: Meteor Shower hits YOU hard
  // — and Artemis takes half of that damage itself. Artemis has a mountain of
  // HP, so a patient trainer wins by surviving while the meteors wear the
  // legend down. `selfDamage` is the fraction of the damage dealt that comes
  // back on the attacker; src/battle.js is what actually applies it, and any
  // move can use it.
  meteorShower: {
    name: "Meteor Shower", type: "cosmic", power: 24, accuracy: 90,
    selfDamage: 0.5, // [TUNE] half the damage dealt rebounds onto the attacker
  },
};
