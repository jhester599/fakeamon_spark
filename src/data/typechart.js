// ---- TYPE CHART ----  move type (rows) vs defender's type (columns).
// From DESIGN.md §4: Fire melts Metal and burns Grass; Water douses Fire;
// Grass drinks Water; Metal chops Grass. Normal moves are always neutral.
const TYPE_CHART = {
  fire:   { fire: 1,   water: 0.5, grass: 2,   metal: 2,   normal: 1 },
  water:  { fire: 2,   water: 1,   grass: 0.5, metal: 1,   normal: 1 },
  grass:  { fire: 0.5, water: 2,   grass: 1,   metal: 0.5, normal: 1 },
  metal:  { fire: 0.5, water: 1,   grass: 2,   metal: 1,   normal: 1 },
  normal: { fire: 1,   water: 1,   grass: 1,   metal: 1,   normal: 1 },
};
