// ===========================================================================
//  MAIN — the conductor. Owns the starter-select screen and picks each new
//  wild opponent, then hands the fight to src/battle.js's startBattle().
//  Step 3: starter-select moved here out of battle.js (see
//  PLANS/M5_STATE_AND_SAVE_PLAN.md §A.2) — this file will also own the
//  title screen once save/load lands.
// ===========================================================================

function showStarterSelect() {
  document.getElementById("title").textContent = "Fakeamon — Choose Your Starter";
  document.getElementById("controls-label").textContent = "";
  document.getElementById("log").innerHTML = "";

  document.getElementById("arena").innerHTML = STARTERS.map(function (starter) {
    return (
      '<div class="starter-card">' +
        showFighter(starter, starter.maxHP) +
        '<button class="move-btn choose-btn" data-name="' + starter.name + '">Choose ' + starter.name + '!</button>' +
      "</div>"
    );
  }).join("");

  document.querySelectorAll(".choose-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      const chosen = STARTERS.find(function (starter) {
        return starter.name === button.dataset.name;
      });
      fightRandomWildFakeamon(chosen);
    });
  });
}

// Step 3: a random wild Fakeamon, not always Whaley.
function pickRandomWildOpponent() {
  const index = Math.floor(Math.random() * STARTERS.length);
  return STARTERS[index];
}

// Runs one wild battle, then — whatever happens (win, lose, flee, or catch)
// — starts another with a fresh random opponent. A caught Fakeamon doesn't
// join a persistent team yet; that lands at M2 Step 5 with the state bag.
function fightRandomWildFakeamon(starter) {
  const wildOpponent = pickRandomWildOpponent();
  startBattle({ player: starter, enemy: wildOpponent, canFlee: true, canCatch: true }).then(function () {
    fightRandomWildFakeamon(starter);
  });
}

showStarterSelect();
