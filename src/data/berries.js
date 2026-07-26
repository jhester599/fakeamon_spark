// ===========================================================================
//  BERRIES — the things you pick up on the map and cook at the Cooking Cabin.
//
//  Six berries exist (DESIGN.md §9). Five of them grow on the ground and can
//  be found while exploring; the sixth, BOSSBERRY, only ever drops from a
//  mini-boss (M5), so it has no weight and no artwork yet — it can still be
//  held and cooked, it just can't be found lying about.
//
//  HOW OFTEN EACH ONE TURNS UP (Jeff & Lewis's call, 2026-07-26):
//    common          → Fakeaberry
//    medium          → Greenberry, Raspberry
//    unlikely        → Greatberry
//    extremely rare  → Cosmicberry
//
//  `weight` is how that's expressed. Think of it as "out of 100 berries you
//  find, how many are this one" — the weights below add up to exactly 100, so
//  a weight IS a percentage. Change a number, reload, and berries get rarer or
//  commoner straight away. (They don't HAVE to add up to 100 — the game just
//  divides by whatever the total is — but keeping them at 100 makes them easy
//  to read.)
// ===========================================================================
const BERRIES = {
  fakeaberry: {
    name: "Fakeaberry",
    weight: 50,                                              // [TUNE] common
    icon: "assets/sprites/items/berries/fakeaberry.png",     // 32×32, for the Cabin panel
    pickup: "assets/sprites/items/berries/pickup/fakeaberry.png", // 16×16, lying on a tile
  },
  greenberry: {
    name: "Greenberry",
    weight: 20,                                              // [TUNE] medium
    icon: "assets/sprites/items/berries/greenberry.png",
    pickup: "assets/sprites/items/berries/pickup/greenberry.png",
  },
  raspberry: {
    name: "Raspberry",
    weight: 20,                                              // [TUNE] medium
    icon: "assets/sprites/items/berries/raspberry.png",
    pickup: "assets/sprites/items/berries/pickup/raspberry.png",
  },
  greatberry: {
    name: "Greatberry",
    weight: 8,                                               // [TUNE] unlikely
    icon: "assets/sprites/items/berries/greatberry.png",
    pickup: "assets/sprites/items/berries/pickup/greatberry.png",
  },
  cosmicberry: {
    name: "Cosmicberry",
    weight: 2,                                               // [TUNE] extremely rare
    icon: "assets/sprites/items/berries/cosmicberry.png",
    pickup: "assets/sprites/items/berries/pickup/cosmicberry.png",
  },
  bossberry: {
    name: "Bossberry",
    weight: 0,          // never found on the ground — mini-bosses drop it (M5)
    icon: null,         // no art yet
    pickup: null,
  },
};

// ---------------------------------------------------------------------------
//  WHICH BERRIES GROW WHERE
//
//  Jeff & Lewis's rule (2026-07-26): every area grows every berry, using the
//  weights above — EXCEPT The Factory, which is a poisonous war zone (DESIGN.md
//  §7) and grows nothing at all.
//
//  This list is the exception table, not the rule: an area named here gets the
//  berry list it's given, and any area NOT named simply uses all of them. So
//  giving one area its own hand-picked berries later is a data edit here — no
//  code change. (That matters: Lewis's earlier B35 idea was area-themed
//  berries, and this is the seam it would slot into.)
// ---------------------------------------------------------------------------
const AREA_BERRIES = {
  theFactory: [], // no berries grow here at all
};

// Which berry keys can be found in this area? (Everything findable, unless the
// area has its own list above.)
function berriesFoundIn(mapId) {
  if (AREA_BERRIES[mapId]) return AREA_BERRIES[mapId];
  return Object.keys(BERRIES).filter(function (key) { return BERRIES[key].weight > 0; });
}

// Roll one random berry for this area, respecting the weights. Returns a berry
// key, or null if nothing grows here.
//
// How the weighted roll works, in plain terms: line all the berries up on a
// number line, each taking as much room as its weight. Throw a dart somewhere
// along that line, then walk left to right subtracting weights until the dart
// lands inside one — that's your berry. Bigger weight = bigger target = found
// more often.
function randomBerryFor(mapId) {
  const keys = berriesFoundIn(mapId);
  let total = 0;
  keys.forEach(function (key) { total += BERRIES[key].weight; });
  if (total <= 0) return null; // nothing grows here (The Factory)

  let dart = Math.random() * total;
  for (let i = 0; i < keys.length; i++) {
    dart -= BERRIES[keys[i]].weight;
    if (dart < 0) return keys[i];
  }
  return keys[keys.length - 1]; // rounding safety net — can only happen on a tie
}
