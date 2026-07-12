// ===========================================================================
//  MAIN — the conductor. Owns the title screen, the starter-select screen,
//  the team list, and picks each new wild opponent, then hands the fight to
//  src/battle.js's startBattle(). Step 3: starter-select moved here out of
//  battle.js (see PLANS/M5_STATE_AND_SAVE_PLAN.md §A.2).
//
//  M5-plan S3/S4 (save v1 + export/import): the game now REMEMBERS itself.
//  On load we look for a saved adventure (src/save.js) and show a title
//  screen — Continue / New Game, plus Export / Import Save. Autosave runs on
//  its own after every catch, battle, and switch (any function that changes
//  gameState ends by calling saveGame()), so there's no Save button and
//  progress is never lost by forgetting.
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
//  M3: the OVERWORLD (the Phaser map, src/world/config.js) is the hub. Choosing
//  a starter or pressing Continue drops the hero onto The Meadows
//  (enterOverworld); you walk it with the arrow keys. S7 — the handoff: walking
//  into a wild Fakeamon starts a real battle against THAT creature
//  (startMapEncounter → enterBattle), and returns you to the map when it ends —
//  beaten/caught creatures are gone, fled/wiped ones stay. The screen manager
//  (src/screens.js) hides + freezes the map during the fight. The temporary
//  "Battle test" button (runBattleTest) still triggers a random fight until it's
//  removed at S9. `worldActive` (config.js) gates walking so arrow keys don't
//  move the hero while a battle or menu is on screen.
// ===========================================================================

// True while a battle's startBattle() promise hasn't resolved yet.
let battleInProgress = false;

// ===========================================================================
//  TITLE SCREEN + SAVE FLOW — M5-plan S3. On load we check for a saved
//  adventure (src/save.js). If there is one, you get Continue / New Game;
//  if not, New Game is the only path. Autosave runs on its own (see the
//  saveGame() calls dotted through the mutating functions below).
// ===========================================================================

// The first thing you see. Shows the game's name and, when a save exists,
// a Continue button beside New Game.
function showTitleScreen() {
  worldActive = false; // no walking the map while the title screen is up
  const saveExists = hasSave();

  document.getElementById("title").textContent = "Fakeamon Spark ☄️";
  document.getElementById("controls-label").textContent = "";
  document.getElementById("log").innerHTML = "";
  document.getElementById("team").innerHTML = "";

  document.getElementById("arena").innerHTML =
    '<div class="title-card">' +
      "<h2>Fakeamon Spark ☄️</h2>" +
      "<p>" + (saveExists
        ? "Welcome back! Your adventure is waiting."
        : "Catch creatures, build a team, and save the world of Venta.") +
      "</p>" +
    "</div>";

  const controls = document.getElementById("controls");
  controls.innerHTML = "";
  if (saveExists) addTitleButton(controls, "move-btn", "Continue", continueGame);
  addTitleButton(controls, "move-btn", "New Game", startNewGame);

  // The little "settings corner" (M5-plan S4): Export a copy of your save,
  // or Import one (handy on a new computer, or if the browser forgets). These
  // are secondary, so they get the smaller grey .save-btn look.
  if (saveExists) addTitleButton(controls, "save-btn", "Export Save", exportSave);
  addTitleButton(controls, "save-btn", "Import Save", importSave);

  updateTestBar(); // no team on the title screen → hide the Battle test bar
}

// Small helper so each title button reads as one line.
function addTitleButton(container, className, label, onClick) {
  const button = document.createElement("button");
  button.className = className;
  button.textContent = label;
  button.addEventListener("click", onClick);
  container.appendChild(button);
}

// Continue: load the saved adventure back into gameState and drop the hero
// right back where they were standing on the map.
function continueGame() {
  const loaded = loadGame();
  if (!loaded) { showStarterSelect(); return; } // save vanished between clicks
  gameState.version = loaded.version;
  gameState.party = loaded.party;
  gameState.box = loaded.box;
  gameState.world = loaded.world;
  enterOverworld();
}

// New Game: if a save exists, make sure before erasing it. Then wipe the
// state (including the map position) and go pick a starter.
function startNewGame() {
  if (hasSave()) {
    const reallyErase = window.confirm(
      "Start a new game? This will erase your saved adventure.");
    if (!reallyErase) return;
  }
  clearSave();
  gameState.version = SAVE_VERSION;
  gameState.party = [];
  gameState.box = [];
  gameState.world = defaultWorld();
  showStarterSelect();
}

// ===========================================================================
//  THE OVERWORLD (M3) — from S3 on, the map is where you live between fights.
//  Choosing a starter or pressing Continue drops you onto The Meadows to walk
//  around; a battle is a discrete detour that returns you here when it ends.
//  (Until Step S7 wires wild Fakeamon on the map, the temporary "Battle test"
//  button is how you start a fight.)
// ===========================================================================
function enterOverworld() {
  battleInProgress = false;
  worldActive = true; // arrow keys walk the hero now

  document.getElementById("title").textContent = "The Meadows";
  document.getElementById("controls-label").textContent = "";
  document.getElementById("controls").innerHTML = "";
  document.getElementById("arena").innerHTML =
    '<div class="title-card">' +
      "<h2>Exploring The Meadows 🌱</h2>" +
      "<p>Use the <b>arrow keys</b> to walk around. Wild Fakeamon are standing " +
      "in the grass — <b>walk into one to battle it!</b>" +
      "<br><small>(Beat it or catch it and it's gone from the map; run away and " +
      "it stays put. The ⚔️ Battle test button still works too.)</small></p>" +
    "</div>";

  renderTeamList();
  showWorld(); // bring the map back, unfreeze it, and hand it the keyboard (screens.js)
  saveGame();
}

// Heal everyone to full — used by the M3 loss placeholder below.
function healParty() {
  gameState.party.forEach(function (individual) {
    individual.currentHP = statsFor(individual).maxHP;
  });
}

// Import Save: pop up a file picker, and if they choose a real Fakeamon save,
// make it THIS browser's game and jump in. A file that isn't a valid save
// changes nothing (parseSave in save.js rejects it) — we just say so.
function importSave() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json,.json";
  input.addEventListener("change", function () {
    const file = input.files && input.files[0];
    if (!file) return;
    importSaveFromFile(file, function (loaded) {
      if (!loaded) {
        window.alert("That file doesn't look like a Fakeamon save — nothing was changed.");
        return;
      }
      // Importing replaces your current save, so make sure — just like New Game.
      if (hasSave() && !window.confirm(
        "Import this save? It will replace your current adventure.")) {
        return;
      }
      gameState.version = loaded.version;
      gameState.party = loaded.party;
      gameState.box = loaded.box;
      gameState.world = loaded.world;
      saveGame();       // the imported adventure is now this browser's save
      enterOverworld(); // drop the hero onto the map where the save left off
    });
  });
  input.click();
}

function showStarterSelect() {
  worldActive = false; // no walking while choosing a starter
  document.getElementById("title").textContent = "Fakeamon — Choose Your Starter";
  document.getElementById("controls-label").textContent = "";
  document.getElementById("controls").innerHTML = ""; // clear the title screen's buttons
  document.getElementById("log").innerHTML = "";
  document.getElementById("team").innerHTML = "";
  updateTestBar(); // no team yet → keep the Battle test bar hidden

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

// Starting your adventure: your chosen starter is your only teammate, and
// then you step out onto The Meadows to explore (M3). A fresh world puts you
// on the start tile.
function chooseStarter(speciesKey) {
  gameState.party = [newIndividual(speciesKey, STARTING_LEVEL)];
  gameState.box = [];
  gameState.world = defaultWorld();
  enterOverworld(); // renders the team, places the hero, and autosaves
}

// Step 3: a random wild Fakeamon, not always Whaley.
function pickRandomWildSpeciesKey() {
  const index = Math.floor(Math.random() * STARTER_KEYS.length);
  return STARTER_KEYS[index];
}

// ===========================================================================
//  THE HANDOFF (M3 S7) — bump a wild Fakeamon on the map → a real battle →
//  back to walking. enterBattle is the ONE shared entry both the map handoff
//  and the temporary Battle test button go through, so "freeze the map, fight,
//  come back" lives in exactly one place.
// ===========================================================================

// Freeze + hide the map (screens.js's showBattle), run the fight, then hand the
// result to handleBattleOutcome (which brings us back to the map). `encounter`
// is the map creature you bumped, or null for a Battle test fight.
function enterBattle(config, encounter) {
  battleInProgress = true;
  worldActive = false; // no map-walking while the fight is on screen
  showBattle();        // hide the map + freeze the world scene
  startBattle(config).then(function (outcome) {
    handleBattleOutcome(outcome, encounter);
  });
}

// The map handoff: fight THIS specific wild Fakeamon (its own species + level).
// src/world/config.js's WorldScene.handleEncounter calls this when you bump one.
function startMapEncounter(encounter) {
  if (battleInProgress) return;
  enterBattle({
    playerParty: gameState.party,
    enemy: newIndividual(encounter.species, encounter.level),
    canFlee: true,
    canCatch: true,
    onStateChange: renderTeamList,
  }, encounter);
}

// The temporary Battle test button's fight: a fresh RANDOM wild opponent, not
// tied to any creature on the map (so nothing gets removed when it ends).
function fightRandomWildFakeamon() {
  if (battleInProgress) return;
  enterBattle({
    playerParty: gameState.party,
    enemy: newIndividual(pickRandomWildSpeciesKey(), STARTING_LEVEL),
    canFlee: true,
    canCatch: true,
    onStateChange: renderTeamList,
  }, null);
}

// S8: after a battle, maybe bring one previously-cleared wild Fakeamon back
// onto the map — never the one you JUST fought (justFoughtId), so nothing
// pops back the instant you clear it; it can only return on a LATER roll.
function maybeRespawnEncounter(justFoughtId) {
  const candidates = gameState.world.defeatedEncounters.filter(function (id) {
    return id !== justFoughtId;
  });
  if (candidates.length === 0) return;
  if (Math.random() >= RESPAWN_CHANCE) return;

  const pick = candidates[Math.floor(Math.random() * candidates.length)];
  if (worldScene) worldScene.respawnEncounter(pick);
}

// Whatever the battle decided, this is where it becomes a team fact — then
// you head back to the map (M3). A catch joins the team (open slot) or
// overflows to the Boxes (Lewis's call — max 4 active). A wipe uses the M3
// loss placeholder (heal + back to start) until M4's Fakeatents exist.
function handleBattleOutcome(outcome, encounter) {
  battleInProgress = false;

  if (outcome.result === "caught") {
    const caughtName = FAKEAMON[outcome.caught.speciesKey].name;
    if (gameState.party.length < MAX_PARTY_SIZE) {
      gameState.party.push(outcome.caught);
      addLogLine(caughtName + " joined your team!");
    } else {
      gameState.box.push(outcome.caught);
      addLogLine(caughtName + " was sent to your Boxes — your team is full!");
    }
  } else if (outcome.result === "lose") {
    // M3 PLACEHOLDER (plan §6.4): no Fakeatents until M4, so a wipe just heals
    // the team and pops you back to the map's start tile. Replaced by the real
    // faint + token-loss rule at M4.
    healParty();
    gameState.world.player = defaultWorld().player;
    addLogLine("You hurry back to safety, and your team rests up.");
  }

  // A wild Fakeamon you beat or caught leaves the map for good; a wipe or a
  // flee leaves it standing (you didn't win). Only a map bump passes an
  // `encounter` — the temporary Battle test button passes null, so nothing's
  // removed there.
  if (encounter && (outcome.result === "win" || outcome.result === "caught")) {
    if (worldScene) worldScene.removeEncounter(encounter.id);
  }

  // S8: The Meadows shouldn't stay empty forever — see the respawn note in
  // PLANS/M3_OVERWORLD_PLAN.md §6.3. Rolled after EVERY battle, not just wins,
  // so pacing stays steady no matter how the fight ended.
  maybeRespawnEncounter(encounter ? encounter.id : null);

  renderTeamList();
  saveGame();

  // Back to exploring. A short beat first when the fight auto-resolved (catch
  // or wipe) so the last log line is readable; immediate when the player just
  // clicked Continue / Run.
  if (outcome.result === "caught" || outcome.result === "lose") {
    setTimeout(enterOverworld, 1200);
  } else {
    enterOverworld();
  }
}

// ===========================================================================
//  BATTLE TEST BUTTON — M3 Step S1, temporary. Now that S7 makes walking into
//  a wild Fakeamon start a real fight, this is just a quick way to trigger a
//  random battle for testing (only while you're exploring with a healthy
//  team). The whole test bar and this function get removed at Step S9.
// ===========================================================================
function runBattleTest() {
  // Only start a fight while actually exploring the map. worldActive is false
  // during battles, on the title/starter screens, AND during the ~1.2s beat
  // after a catch/loss before we return to the map — so this closes the window
  // where the button was briefly clickable and could start a second battle
  // that the pending "back to map" timeout would then strand.
  if (!worldActive) return;
  if (battleInProgress) return;                  // already fighting — ignore
  if (gameState.party.length === 0) return;      // no team yet
  if (gameState.party[0].currentHP <= 0) return; // fainted — Switch first
  fightRandomWildFakeamon();
}

// Show the temporary "Battle test" bar only while a game is in progress (you
// have a team). On the title/starter screens it's hidden so it can't start a
// throwaway fight that autosaves over your real adventure.
function updateTestBar() {
  document.getElementById("test-bar").classList.toggle("visible", gameState.party.length > 0);
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

// Re-renders the team after a between-encounter switch (from the team screen)
// and saves the new order. You stay on the map — no fight starts (that was
// the retired M2 auto-loop). Mid-battle switches are handled inside battle.js.
function afterSwitch() {
  renderTeamList();
  saveGame(); // the new team order is part of your progress too
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
      '<div class="team-xp-text">XP: ' + individual.xp + "</div>" +
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
  updateTestBar(); // show the bar now that there's a team (hide it when empty)

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

// Boot: draw the overworld (the meadow map, from S2) at the top of the page,
// then show the title screen — Continue if there's a saved adventure, or New
// Game (→ choose a starter → step onto the map) if not.
startWorld();
showTitleScreen();
