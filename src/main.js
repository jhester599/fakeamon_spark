// ===========================================================================
//  MAIN — the conductor. Owns the starter-select screen, the team list, and
//  picks each new wild opponent, then hands the fight to src/battle.js's
//  startBattle(). Step 3: starter-select moved here out of battle.js (see
//  PLANS/M5_STATE_AND_SAVE_PLAN.md §A.2) — this file will also own the
//  title screen once save/load lands.
//
//  M5-plan S1: every fighter is an *individual* (src/state.js), made fresh
//  from a species key with newIndividual().
//
//  Step 5: your chosen starter becomes gameState.party[0] — the individual
//  currently in battle is always party[0], so its HP now persists between
//  wild encounters (that's what having a team actually means). If it
//  faints, the loop pauses instead of instantly re-losing — Step 6's
//  Switch is how you bring in a fresh teammate.
// ===========================================================================

function showStarterSelect() {
  document.getElementById("title").textContent = "Fakeamon — Choose Your Starter";
  document.getElementById("controls-label").textContent = "";
  document.getElementById("log").innerHTML = "";
  document.getElementById("team").innerHTML = "";

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
      chooseStarter(button.dataset.key);
    });
  });
}

// Starting your adventure: your chosen starter is the only teammate you've
// got, and it's the one that fights first.
function chooseStarter(speciesKey) {
  gameState.party = [newIndividual(speciesKey, STARTING_LEVEL)];
  gameState.box = [];
  renderTeamList();
  fightRandomWildFakeamon();
}

// Step 3: a random wild Fakeamon, not always Whaley.
function pickRandomWildSpeciesKey() {
  const index = Math.floor(Math.random() * STARTER_KEYS.length);
  return STARTER_KEYS[index];
}

// Runs one wild battle for party[0] — the active fighter — against a
// fresh random wild opponent.
function fightRandomWildFakeamon() {
  const wildSpeciesKey = pickRandomWildSpeciesKey();
  const wildIndividual = newIndividual(wildSpeciesKey, STARTING_LEVEL);

  startBattle({
    player: gameState.party[0],
    enemy: wildIndividual,
    canFlee: true,
    canCatch: true,
  }).then(handleBattleOutcome);
}

// Step 5: whatever the battle decided, this is where it becomes a team
// fact. A catch joins the team (an open slot) or overflows to the Boxes
// if the team's already full (Lewis's call — max 4 active). Any other
// result just starts the next encounter — unless party[0] fainted, in
// which case we pause here; Step 6's Switch is how you'd recover.
function handleBattleOutcome(outcome) {
  if (outcome.result === "caught") {
    const caughtName = FAKEAMON[outcome.caught.speciesKey].name;
    const joinedParty = gameState.party.length < MAX_PARTY_SIZE;

    if (joinedParty) {
      gameState.party.push(outcome.caught);
      addLogLine(caughtName + " joined your team!");
    } else {
      gameState.box.push(outcome.caught);
      addLogLine(caughtName + " was sent to your Boxes — your team is full!");
    }

    renderTeamList();
    setTimeout(fightRandomWildFakeamon, 1500);
    return;
  }

  renderTeamList();

  const activeFighter = gameState.party[0];
  if (activeFighter.currentHP <= 0) {
    addLogLine(FAKEAMON[activeFighter.speciesKey].name + " needs to rest — Switch is coming in Step 6!");
    return; // pause instead of starting a new fight a fainted fighter can't win
  }

  fightRandomWildFakeamon();
}

// ===========================================================================
//  TEAM LIST — Step 5: your team, up to 4 active (the rest wait in your
//  Boxes). No nicknames — species names only (Lewis's B3 call).
// ===========================================================================

// One small card: species art, name, and a mini HP bar. Used for both the
// team row and the Boxes list.
function teamCard(individual, isActive) {
  const species = FAKEAMON[individual.speciesKey];
  const stats = statsFor(individual);
  const percent = Math.max(0, Math.min(100, Math.round((individual.currentHP / stats.maxHP) * 100)));

  const spriteImg = species.sprite
    ? '<img src="' + species.sprite + '" alt="' + species.name + '">'
    : "";

  return (
    '<div class="team-card' + (isActive ? " active-card" : "") + '">' +
      '<div class="sprite team-sprite type-' + species.type + '">' + spriteImg + "</div>" +
      "<div>" + species.name + (isActive ? " (fighting)" : "") + "</div>" +
      '<div class="hp-bar-track">' +
        '<div class="hp-bar-fill" style="width: ' + percent + '%; background: ' + hpBarColor(percent) + ';"></div>' +
      "</div>" +
      '<div class="team-hp-text">' + individual.currentHP + "/" + stats.maxHP + "</div>" +
    "</div>"
  );
}

function renderTeamList() {
  document.getElementById("team").innerHTML = gameState.party.map(function (individual, index) {
    return teamCard(individual, index === 0);
  }).join("");

  document.getElementById("boxesBtn").textContent = "Boxes (" + gameState.box.length + ")";

  if (boxesVisible) renderBoxList(); // keep an open Boxes panel in sync too
}

function renderBoxList() {
  const boxesDiv = document.getElementById("boxes");
  boxesDiv.innerHTML = gameState.box.length === 0
    ? "<p>Your Boxes are empty.</p>"
    : gameState.box.map(function (individual) { return teamCard(individual, false); }).join("");
}

// The Boxes panel starts hidden — it's just extra storage until Step 6
// adds a reason to open it (swapping a boxed Fakeamon in).
let boxesVisible = false;

function toggleBoxes() {
  boxesVisible = !boxesVisible;
  document.getElementById("boxes").classList.toggle("visible", boxesVisible);
  if (boxesVisible) renderBoxList();
}

document.getElementById("boxesBtn").addEventListener("click", toggleBoxes);

showStarterSelect();
