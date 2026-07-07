// ===========================================================================
//  MAIN — the conductor. Owns the starter-select screen and picks each new
//  wild opponent, then hands the fight to src/battle.js's startBattle().
//  Step 3: starter-select moved here out of battle.js (see
//  PLANS/M5_STATE_AND_SAVE_PLAN.md §A.2) — this file will also own the
//  title screen once save/load lands.
//
//  M5-plan S1: every fighter is now an *individual* (src/state.js), made
//  fresh from a species key with newIndividual(). Starter-select shows a
//  full-HP preview individual per starter; picking one carries its species
//  key forward into each new wild battle.
// ===========================================================================

function showStarterSelect() {
  document.getElementById("title").textContent = "Fakeamon — Choose Your Starter";
  document.getElementById("controls-label").textContent = "";
  document.getElementById("log").innerHTML = "";

  document.getElementById("arena").innerHTML = STARTER_KEYS.map(function (speciesKey) {
    const species = FAKEAMON[speciesKey];
    const preview = newIndividual(speciesKey, STARTING_LEVEL);
    return (
      '<div class="starter-card">' +
        showFighter(preview) +
        '<button class="move-btn choose-btn" data-key="' + speciesKey + '">Choose ' + species.name + '!</button>' +
      "</div>"
    );
  }).join("");

  document.querySelectorAll(".choose-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      fightRandomWildFakeamon(button.dataset.key);
    });
  });
}

// Step 3: a random wild Fakeamon, not always Whaley.
function pickRandomWildSpeciesKey() {
  const index = Math.floor(Math.random() * STARTER_KEYS.length);
  return STARTER_KEYS[index];
}

// Runs one wild battle, then — whatever happens (win, lose, flee, or catch)
// — starts another with a fresh random opponent. A caught Fakeamon doesn't
// join a persistent team yet; that lands at M2 Step 5 with the team list.
function fightRandomWildFakeamon(playerSpeciesKey) {
  const wildSpeciesKey = pickRandomWildSpeciesKey();
  const playerIndividual = newIndividual(playerSpeciesKey, STARTING_LEVEL);
  const wildIndividual = newIndividual(wildSpeciesKey, STARTING_LEVEL);

  startBattle({ player: playerIndividual, enemy: wildIndividual, canFlee: true, canCatch: true }).then(function () {
    fightRandomWildFakeamon(playerSpeciesKey);
  });
}

showStarterSelect();
