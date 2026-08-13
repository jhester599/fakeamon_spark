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
};
