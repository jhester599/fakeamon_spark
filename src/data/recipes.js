// ===========================================================================
//  RECIPES — two berries go in, a healing dish comes out (DESIGN.md §9).
//  Every pairing below is Lewis's own invention, decided 2026-07-05.
//
//  Cooking is self-serve (Lewis's B26): you walk into the Cooking Cabin, pick
//  two berries you're carrying, and cook. There's no chef and nothing to pay.
//
//  A recipe's key is its two berry keys joined with a "+", ALPHABETICALLY, so
//  "fakeaberry+greenberry" is the same dish whichever order you picked them in
//  — that's what recipeKey() below is for. Any pairing not listed here makes
//  the BASIC_DISH instead, so you can always cook something.
// ===========================================================================
const RECIPES = {
  // Two of the same berry
  "fakeaberry+fakeaberry":   { dish: "Fakea Snack",  heals: 10 }, // [TUNE] all heals
  "greenberry+greenberry":   { dish: "Green Snack",  heals: 20 },
  "raspberry+raspberry":     { dish: "Rasp Snack",   heals: 20 },
  "cosmicberry+cosmicberry": { dish: "Cosmic Snack", heals: 40 },
  "greatberry+greatberry":   { dish: "Great Snack",  heals: 30 },
  "bossberry+bossberry":     { dish: "Boss Snack",   heals: 30 },

  // Mixed pairs (keys alphabetical — see recipeKey below)
  "fakeaberry+greenberry":   { dish: "Healthy Snack",    heals: 30 },
  "fakeaberry+raspberry":    { dish: "Healthier Snack",  heals: 40 },
  "cosmicberry+fakeaberry":  { dish: "Cosmic Dish",      heals: 50 },
  "fakeaberry+greatberry":   { dish: "Healthiest Snack", heals: 50 },
  "greenberry+raspberry":    { dish: "Rasp Dish",        heals: 30 },
  "cosmicberry+greenberry":  { dish: "Green Meal",       heals: 40 },
  "greatberry+greenberry":   { dish: "Great Meal",       heals: 40 },
};

// Anything not in the table above. DESIGN.md §9: "any other combination →
// Basic Dish +30".
const BASIC_DISH = { dish: "Basic Dish", heals: 30 }; // [TUNE]

// Two berry keys → the table key. Sorting them means Fakeaberry + Greenberry
// and Greenberry + Fakeaberry both find the same recipe, so the table only
// needs each pair written once.
function recipeKey(berryA, berryB) {
  return [berryA, berryB].sort().join("+");
}

// What do these two berries make? Always returns a dish — an unknown pairing
// falls back to the Basic Dish, so cooking never fails.
function recipeFor(berryA, berryB) {
  return RECIPES[recipeKey(berryA, berryB)] || BASIC_DISH;
}
