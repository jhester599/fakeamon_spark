// ---- TYPE CHART ----  move type (rows) vs defender's type (columns).
// From DESIGN.md §4: Fire melts Metal and burns Grass; Water douses Fire;
// Grass drinks Water; Metal chops Grass. Normal moves are always neutral.
//
// ⚠️ EVERY type needs a row AND a column. A missing entry doesn't fall back to
// "normal damage" — it makes the multiplier `undefined`, and the damage maths
// turns into NaN. That's exactly what would have happened the first time
// Artemis attacked: `cosmic` was added as a TYPE (and as a colour, and as
// Artemis's whole identity) at M5, but never as a row here, so the finale
// would have crashed on its opening move. Found by the M5 Step 2 test suite.
//
// COSMIC (Artemis's type, added M5 Step 4) is Lewis's call, DESIGN.md §4:
// it hits **2× against every single type** — "if it wasn't hard then you'd feel
// like the training and journey were for nothing." Nothing in the game resists
// it. Coming the other way, cosmic defends at a plain 1×: your attacks land
// normally on Artemis, so the fight is brutal but fair. The pressure valve that
// keeps it winnable is Meteor Shower hurting Artemis too (src/data/moves.js).
const TYPE_CHART = {
  fire:   { fire: 1,   water: 0.5, grass: 2,   metal: 2,   normal: 1, cosmic: 1 },
  water:  { fire: 2,   water: 1,   grass: 0.5, metal: 1,   normal: 1, cosmic: 1 },
  grass:  { fire: 0.5, water: 2,   grass: 1,   metal: 0.5, normal: 1, cosmic: 1 },
  metal:  { fire: 0.5, water: 1,   grass: 2,   metal: 1,   normal: 1, cosmic: 1 },
  normal: { fire: 1,   water: 1,   grass: 1,   metal: 1,   normal: 1, cosmic: 1 },
  cosmic: { fire: 2,   water: 2,   grass: 2,   metal: 2,   normal: 2, cosmic: 2 },
};
