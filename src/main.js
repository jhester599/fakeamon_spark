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
//  beaten/caught creatures leave the map, fled/wiped ones stay. S8 added real
//  XP (grantXP in battle.js) and a respawn roll (maybeRespawnEncounter below)
//  so a cleared creature can wander back later instead of staying gone for
//  good. The screen manager (src/screens.js) hides + freezes the map during
//  the fight. `worldActive` (config.js) gates walking so arrow keys don't move
//  the hero while a battle or menu is on screen.
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
  gameState.tokens = loaded.tokens;    // M4 — the currency
  gameState.party = loaded.party;
  gameState.box = loaded.box;
  gameState.flags = loaded.flags;      // M4 — badges earned + areas unlocked
  gameState.world = loaded.world;
  gameState.inventory = loaded.inventory;
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
  gameState.tokens = 0;
  gameState.party = [];
  gameState.box = [];
  gameState.flags = defaultFlags();
  gameState.world = defaultWorld();
  gameState.inventory = defaultInventory();
  showStarterSelect();
}

// ===========================================================================
//  THE OVERWORLD (M3) — from S3 on, the map is where you live between fights.
//  Choosing a starter or pressing Continue drops you onto The Meadows to walk
//  around; a battle is a discrete detour that returns you here when it ends.
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
      "<br><small>(Beat it or catch it and it leaves the map for a while; run " +
      "away and it stays put. Cleared ones may wander back later.)</small></p>" +
      "<p><small>🏕️ A Fakeatent stands nearby — walk into it any time to rest " +
      "your team for " + ECONOMY.HEAL_COST + " 🪙. 🗼 The Tall Tower next to it " +
      "sells Fakeaballs for " + ECONOMY.BALL_COST + " 🪙 each.</small></p>" +
    "</div>";

  renderTeamList();
  showWorld(); // bring the map back, unfreeze it, and hand it the keyboard (screens.js)
  saveGame();
}

// Heal everyone to full — used by the Fakeatent (M4S2) and a team-wipe below.
function healParty() {
  gameState.party.forEach(function (individual) {
    individual.currentHP = statsFor(individual).maxHP;
  });
}

// M4S2: where you wake up after your whole team faints — right outside this
// map's Fakeatent (replaces the old "back to the map's start tile" M3 stand-
// in). Falls back to the plain start tile if this map has no Fakeatent yet —
// defensive for whenever M4S6/M5 open areas before their tent is built.
function homeBaseTile(mapId) {
  const map = MAPS[mapId];
  const tent = (map.buildings || []).find(function (b) { return b.kind === "fakeatent"; });
  if (tent && tent.spawnTile) {
    return { tileX: tent.spawnTile.x, tileY: tent.spawnTile.y, facing: tent.spawnTile.facing };
  }
  return defaultWorld().player;
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
      gameState.tokens = loaded.tokens;    // M4 — the currency
      gameState.party = loaded.party;
      gameState.box = loaded.box;
      gameState.flags = loaded.flags;      // M4 — badges earned + areas unlocked
      gameState.world = loaded.world;
      gameState.inventory = loaded.inventory;
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

// ===========================================================================
//  THE HANDOFF (M3 S7) — bump a wild Fakeamon on the map → a real battle →
//  back to walking. enterBattle is the shared entry the map handoff goes
//  through, so "freeze the map, fight, come back" lives in exactly one place.
// ===========================================================================

// Freeze + hide the map (screens.js's showBattle), run the fight, then hand the
// result to handleBattleOutcome (which brings us back to the map). `encounter`
// is the map creature you bumped.
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
    inventory: gameState.inventory,
    canFlee: true,
    canCatch: true,
    onStateChange: renderTeamList,
  }, encounter);
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

  // M4S1: beating a wild Fakeamon pays out tokens — the currency M4's healing
  // tent and shop will spend. Only a WIN pays: catching spends a ball instead,
  // and fleeing/fainting pays nothing. (Small, reversible rule — should a catch
  // also earn tokens? One for Jeff & Lewis.)
  if (outcome.result === "win") {
    gameState.tokens += ECONOMY.TOKENS_PER_WILD_WIN;
    addLogLine("You earned " + ECONOMY.TOKENS_PER_WILD_WIN + " tokens! 🪙");
  }

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
    // M4S2: a wipe now sends you to this map's Fakeatent instead of the old M3
    // stand-in — healed for free, but a few tokens poorer (never below zero).
    healParty();
    gameState.world.player = homeBaseTile(gameState.world.mapId);
    gameState.tokens = Math.max(0, gameState.tokens - ECONOMY.TEAM_WIPE_TOKEN_LOSS);
    addLogLine("😪 Your team is worn out — the Fakeatent nurses you back to " +
      "health! (−" + ECONOMY.TEAM_WIPE_TOKEN_LOSS + " 🪙)");
  }

  // A wild Fakeamon you beat or caught leaves the map (it may respawn later —
  // see maybeRespawnEncounter below); a wipe or a flee leaves it standing put.
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
//  BUILDINGS (M4S2) — bump one on the map to open its panel. Unlike a battle,
//  the map stays visible and playing behind the panel (M4 plan §5.1: "a HUD
//  overlay, not the full battle takeover") — we just freeze walking
//  (worldActive = false, the same trick the title/starter-select screens
//  already use) and reuse the same #arena/#controls swap every other screen
//  uses. src/world/config.js's WorldScene.handleBuilding calls this.
// ===========================================================================
function enterBuilding(building) {
  worldActive = false; // no walking while a building's panel is open
  if (building.kind === "fakeatent") showFakeatentPanel();
  if (building.kind === "talltower") showTallTowerPanel();
  // The Cooking Cabin (M4S5) joins this switch later.
}

// The Fakeatent: rest your whole team to full HP for tokens. Self-serve, no
// NPC dialogue — just a panel with a price and a button (same spirit as the
// Cooking Cabin will be, B26). Also the hook for M5's box-swap UI (B33).
function showFakeatentPanel() {
  document.getElementById("title").textContent = "Fakeatent 🏕️";
  document.getElementById("controls-label").textContent = "";

  const canAfford = gameState.tokens >= ECONOMY.HEAL_COST;
  document.getElementById("arena").innerHTML =
    '<div class="title-card">' +
      "<h2>Fakeatent 🏕️</h2>" +
      "<p>Rest your whole team back to full health?</p>" +
      "<p><b>Cost: " + ECONOMY.HEAL_COST + " 🪙</b> — you have " + gameState.tokens + " 🪙</p>" +
      (canAfford ? "" : "<p><small>Come back after a few more wins!</small></p>") +
    "</div>";

  const controls = document.getElementById("controls");
  controls.innerHTML = "";

  const restButton = document.createElement("button");
  restButton.className = "move-btn";
  restButton.textContent = "Rest — " + ECONOMY.HEAL_COST + " 🪙";
  restButton.disabled = !canAfford;
  restButton.addEventListener("click", restAtFakeatent);
  controls.appendChild(restButton);

  // M5's box-swap UI (Lewis's B33: the Fakeatent is also where you swap a
  // boxed Fakeamon onto your active four) lands later — greyed out for now.
  const manageButton = document.createElement("button");
  manageButton.className = "save-btn";
  manageButton.textContent = "Manage Team (coming in M5)";
  manageButton.disabled = true;
  controls.appendChild(manageButton);

  addTitleButton(controls, "save-btn", "Leave", leaveFakeatent);
}

function restAtFakeatent() {
  gameState.tokens -= ECONOMY.HEAL_COST;
  healParty();
  addLogLine("😴 You rested at the Fakeatent — your team is fully healed!");
  renderTeamList();
  saveGame();
  leaveFakeatent();
}

function leaveFakeatent() {
  enterOverworld(); // back to exploring — re-renders the team and re-saves
}

// The Tall Tower: buy Fakeaballs for tokens. Only the basic ball is sold
// (Lewis's B18/#31) — Great/Ultra/Cosmic are a later feature, so there's
// just one item here, same self-serve spirit as the Fakeatent.
function showTallTowerPanel() {
  document.getElementById("title").textContent = "Tall Tower 🗼";
  document.getElementById("controls-label").textContent = "";

  const ballCount = gameState.inventory.balls.fakeaball;
  const canAfford = gameState.tokens >= ECONOMY.BALL_COST;
  document.getElementById("arena").innerHTML =
    '<div class="title-card">' +
      "<h2>Tall Tower 🗼</h2>" +
      "<p>Buy a Fakeaball?</p>" +
      "<p><b>Cost: " + ECONOMY.BALL_COST + " 🪙</b> — you have " + gameState.tokens + " 🪙</p>" +
      "<p>You're holding <b>" + ballCount + "</b> Fakeaball" + (ballCount === 1 ? "" : "s") + ".</p>" +
      (canAfford ? "" : "<p><small>Come back after a few more wins!</small></p>") +
    "</div>";

  const controls = document.getElementById("controls");
  controls.innerHTML = "";

  const buyButton = document.createElement("button");
  buyButton.className = "move-btn";
  buyButton.innerHTML =
    '<img src="assets/sprites/items/fakeaball.png" class="ball-icon" alt="">' +
    "Buy — " + ECONOMY.BALL_COST + " 🪙";
  buyButton.disabled = !canAfford;
  buyButton.addEventListener("click", buyFakeaball);
  controls.appendChild(buyButton);

  addTitleButton(controls, "save-btn", "Leave", leaveTallTower);
}

// Buying re-renders the SAME panel (unlike resting, which leaves right away)
// so you can buy several in a row without walking back in each time — the
// way a real shop works.
function buyFakeaball() {
  gameState.tokens -= ECONOMY.BALL_COST;
  gameState.inventory.balls.fakeaball += 1;
  addLogLine("🛍️ You bought a Fakeaball!");
  renderTeamList();
  saveGame();
  showTallTowerPanel(); // stay in the shop, refreshed with the new counts
}

function leaveTallTower() {
  enterOverworld();
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
  renderTokens(); // M4S1 — refresh the token counter alongside the team

  if (boxesVisible) renderBoxList(); // keep an open Boxes panel in sync too
}

// M4S1: keep the on-screen token counter matching gameState.tokens. Called from
// renderTeamList, so any state change that re-renders the team also refreshes
// the tokens — and it shows on both the map and the battle screen, since the
// #tokens chip lives in the always-present team header (index.html).
function renderTokens() {
  const el = document.getElementById("tokens");
  if (el) el.textContent = "🪙 " + gameState.tokens;
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

// Offline play (added 2026-07-12): register the service worker so the game
// keeps working with the wifi off, after being visited once online. Feature-
// detected because older/unusual browsers may not support it at all — the
// game plays fine without it, just not offline. See service-worker.js's
// header comment for the one sharp edge (bumping CACHE_VERSION on updates).
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js").catch(function (err) {
    console.warn("Offline play unavailable (service worker registration failed):", err);
  });
}

// Boot: draw the overworld (the meadow map, from S2) at the top of the page,
// then show the title screen — Continue if there's a saved adventure, or New
// Game (→ choose a starter → step onto the map) if not.
startWorld();
showTitleScreen();
