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
//  faints, the loop pauses instead of instantly re-losing.
//
//  Step 6: two ways to Switch. Mid-battle, battle.js itself offers a
//  Switch button that costs a turn (see src/battle.js). Between
//  encounters, the team screen's own Switch/Swap In buttons reorder
//  gameState.party for free — battleInProgress gates those so they can't
//  be used to dodge the in-battle turn cost. Either way, gameState.party
//  is a LIVE array battle.js reads directly (config.playerParty), so a
//  mid-battle switch is instantly visible here too, via onStateChange.
//
//  M3 Step S1: main.js now also boots the OVERWORLD (the Phaser map, from
//  src/world/config.js) on load, alongside the battle game. The map and the
//  battle don't talk to each other yet — that doorway gets built at Step S7.
//  Until then, a temporary "Battle test" button (runBattleTest below) is how
//  you reach a fight from the new page.
// ===========================================================================

// True while a battle's startBattle() promise hasn't resolved yet.
let battleInProgress = false;

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
  // Never start a battle on top of another. This matters because after a
  // catch we briefly wait (setTimeout below) before the next fight begins,
  // and during that gap battleInProgress is false — so without this guard,
  // clicking the temporary "Battle test" button (or a between-encounter
  // Switch) in that window could start a second, overlapping battle and
  // strand the first one's promise. One line closes the whole class of bug.
  if (battleInProgress) return;

  battleInProgress = true;
  const wildSpeciesKey = pickRandomWildSpeciesKey();
  const wildIndividual = newIndividual(wildSpeciesKey, STARTING_LEVEL);

  startBattle({
    playerParty: gameState.party,
    enemy: wildIndividual,
    canFlee: true,
    canCatch: true,
    onStateChange: renderTeamList,
  }).then(handleBattleOutcome);
}

// Step 5: whatever the battle decided, this is where it becomes a team
// fact. A catch joins the team (an open slot) or overflows to the Boxes
// if the team's already full (Lewis's call — max 4 active). Any other
// result just starts the next encounter — unless party[0] fainted, in
// which case we pause here until a Step 6 Switch brings in someone healthy.
function handleBattleOutcome(outcome) {
  battleInProgress = false;

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
    addLogLine(FAKEAMON[activeFighter.speciesKey].name + " needs to rest — Switch in a teammate to keep going!");
    return; // pause instead of starting a new fight a fainted fighter can't win
  }

  fightRandomWildFakeamon();
}

// ===========================================================================
//  BATTLE TEST BUTTON — M3 Step S1, temporary. Until Step S7 makes walking
//  into a wild Fakeamon start a fight for real, this button is the bridge
//  from the new Phaser page into a battle, so we can confirm the battle
//  module still works. If you haven't picked a starter yet, it lends you a
//  random one so a fight can still happen. The whole test bar (and this
//  function) gets removed at Step S7/S9.
// ===========================================================================
function runBattleTest() {
  if (battleInProgress) return;               // already fighting — ignore
  if (gameState.party.length === 0) {
    gameState.party = [newIndividual(pickRandomWildSpeciesKey(), STARTING_LEVEL)];
    renderTeamList();
  }
  if (gameState.party[0].currentHP <= 0) return; // fainted — Switch first
  fightRandomWildFakeamon();
}

// ===========================================================================
//  SWITCH — Step 6: pick who fights next. switchToPartyMember() reorders
//  your own team; switchInFromBox() trades places with someone in
//  storage. Both just swap array positions — party[0] is always "who's
//  fighting" by convention, so nothing else has to change.
// ===========================================================================

// Makes party[index] the new active fighter by trading places with
// whoever's currently at party[0].
function switchToPartyMember(index) {
  const previousActive = gameState.party[0];
  gameState.party[0] = gameState.party[index];
  gameState.party[index] = previousActive;
  afterSwitch();
}

// Brings a boxed Fakeamon into the active slot; whoever it replaces goes
// to the Boxes in its place. Nothing is ever lost — it just changes places
// (Lewis's call, DESIGN.md §6).
function switchInFromBox(boxIndex) {
  const incoming = gameState.box[boxIndex];
  gameState.box[boxIndex] = gameState.party[0];
  gameState.party[0] = incoming;
  afterSwitch();
}

// Re-renders the team after any switch, and — if the encounter loop was
// paused waiting for a healthy fighter — picks it back up automatically.
function afterSwitch() {
  renderTeamList();
  if (!battleInProgress && gameState.party[0].currentHP > 0) {
    fightRandomWildFakeamon();
  }
}

// ===========================================================================
//  TEAM LIST — Step 5: your team, up to 4 active (the rest wait in your
//  Boxes). No nicknames — species names only (Lewis's B3 call).
// ===========================================================================

// One small card: species art, name, a mini HP bar, and (optionally) a
// Switch button. Used for both the team row and the Boxes list.
function teamCard(individual, isActive, buttonHtml) {
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
      (buttonHtml || "") +
    "</div>"
  );
}

// Step 6: a Switch button — disabled mid-battle, since switching only
// takes effect between encounters (see the battleInProgress note up top).
function switchButtonHtml(label, dataAttr, dataValue) {
  return '<button class="team-switch-btn" data-' + dataAttr + '="' + dataValue + '"' +
    (battleInProgress ? " disabled" : "") + ">" + label + "</button>";
}

function renderTeamList() {
  document.getElementById("team").innerHTML = gameState.party.map(function (individual, index) {
    const isActive = index === 0;
    const buttonHtml = isActive ? "" : switchButtonHtml("Switch In", "party-index", index);
    return teamCard(individual, isActive, buttonHtml);
  }).join("");

  document.querySelectorAll("#team .team-switch-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      switchToPartyMember(Number(button.dataset.partyIndex));
    });
  });

  document.getElementById("boxesBtn").textContent = "Boxes (" + gameState.box.length + ")";

  // Grey out the temporary Battle test button while a fight is happening, so
  // you can't start a second battle on top of the current one (M3 Step S1).
  const testBtn = document.getElementById("battleTestBtn");
  if (testBtn) testBtn.disabled = battleInProgress;

  if (boxesVisible) renderBoxList(); // keep an open Boxes panel in sync too
}

function renderBoxList() {
  const boxesDiv = document.getElementById("boxes");

  if (gameState.box.length === 0) {
    boxesDiv.innerHTML = "<p>Your Boxes are empty.</p>";
    return;
  }

  boxesDiv.innerHTML = gameState.box.map(function (individual, index) {
    return teamCard(individual, false, switchButtonHtml("Swap In", "box-index", index));
  }).join("");

  document.querySelectorAll("#boxes .team-switch-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      switchInFromBox(Number(button.dataset.boxIndex));
    });
  });
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
document.getElementById("battleTestBtn").addEventListener("click", runBattleTest);

// M3 Step S1: draw the overworld (an empty grass screen for now) at the top
// of the page, then run the M1/M2 battle game below it, exactly as before.
startWorld();
showStarterSelect();
