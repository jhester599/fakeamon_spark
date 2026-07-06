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
};
