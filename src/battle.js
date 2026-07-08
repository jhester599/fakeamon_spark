// ===========================================================================
//  BATTLE STATE
//  Step 3: this file's only public entry point is startBattle(config) below
//  — see PLANS/M3_OVERWORLD_PLAN.md §5 for the full contract it's built
//  from.
//
//  M5-plan S1: opponent is an *individual* (src/state.js), not a bare
//  species object — it carries its own currentHP.
//
//  Step 6: the player side is now `party` — a LIVE reference to
//  gameState.party (per the M3 plan's §5 contract: config.playerParty).
//  activePlayer() is always party[0]; switching just reorders the array,
//  so there's never a separate "player" variable to fall out of sync.
//  Battle still tracks everything through a *role* ("player"/"opponent")
//  rather than an individual, since resolveTurn needs to say "whoever's
//  turn is first" before it knows who that is.
// ===========================================================================
let party;    // config.playerParty
let opponent;
let canFlee = true;
let canCatch = true;
let resolveBattle; // set by startBattle(); called once the fight is over
let onStateChange = function () {}; // optional; lets the host UI stay in sync

// The individual currently fighting for the player.
function activePlayer() {
  return party[0];
}

// The individual currently playing this role.
function fighterFor(role) {
  return role === "player" ? activePlayer() : opponent;
}

// ===========================================================================
//  SHOW THE FIGHTERS ON SCREEN
// ===========================================================================

// Step 4: pick the HP bar color — green when healthy, yellow when hurt,
// red when in real danger. Easy to retune these thresholds/colors later.
function hpBarColor(percent) {
  if (percent > 50) return "#4bbd6b"; // green
  if (percent > 20) return "#f5c445"; // yellow
  return "#e05252";                   // red
}

// Renders one individual as a fighter card: species art/name/type + this
// individual's current stats and HP.
function showFighter(individual) {
  const species = FAKEAMON[individual.speciesKey];
  const stats = statsFor(individual);

  // Build the list of this Fakeamon's moves as text.
  const moveItems = species.moves.map(function (moveKey) {
    const move = MOVES[moveKey];
    return "<li>" + move.name +
           " — " + move.type +
           ", power " + move.power +
           ", " + move.accuracy + "% hit</li>";
  }).join("");

  const percent = Math.max(0, Math.min(100, Math.round((individual.currentHP / stats.maxHP) * 100)));

  // Not every Fakeamon has real art yet (Leafick's lands at M3 Step 3) —
  // fall back to just the colored box instead of a broken image.
  const spriteImg = species.sprite
    ? '<img src="' + species.sprite + '" alt="' + species.name + '">'
    : "";

  return (
    '<div class="fighter">' +
      "<h2>" + species.name + "</h2>" +
      '<span class="type-badge type-' + species.type + '">' + species.type + "</span>" +
      '<div class="sprite type-' + species.type + '">' + spriteImg + "</div>" +
      '<div class="hp-bar-track">' +
        '<div class="hp-bar-fill" style="width: ' + percent + '%; background: ' + hpBarColor(percent) + ';"></div>' +
      "</div>" +
      '<div class="stats">' +
        "HP " + individual.currentHP + "/" + stats.maxHP +
        " &nbsp;•&nbsp; Attack " + stats.attack +
        " &nbsp;•&nbsp; Defense " + stats.defense +
        " &nbsp;•&nbsp; Speed " + stats.speed +
      "</div>" +
      "<strong>Moves</strong>" +
      '<ul class="moves">' + moveItems + "</ul>" +
    "</div>"
  );
}

// Redraw both fighters with their current HP, then let the host UI (e.g.
// main.js's team row) know something changed — HP, or who's active.
function renderArena() {
  document.getElementById("arena").innerHTML = showFighter(activePlayer()) + showFighter(opponent);
  onStateChange();
}

// ===========================================================================
//  DAMAGE FORMULA — full version from DESIGN.md §6:
//    raw    = move power + attacker's Attack − defender's Defense (min 1)
//    damage = round(raw × typeMultiplier × random(0.85–1.15))
//  Takes each fighter's *current* stats (from statsFor), not the individual
//  itself, since the damage math never needs to know anything about HP.
//  Returns both the damage and the type multiplier, so the battle log can
//  say "super effective" or "not very effective" when it matters.
// ===========================================================================
function calculateDamage(move, attackerStats, defenderStats, defenderType) {
  const raw = Math.max(1, move.power + attackerStats.attack - defenderStats.defense);
  const typeMultiplier = TYPE_CHART[move.type][defenderType];
  const wiggle = 0.85 + Math.random() * 0.30; // a random number from 0.85 to 1.15
  const damage = Math.round(raw * typeMultiplier * wiggle);

  return { damage: damage, typeMultiplier: typeMultiplier };
}

// ===========================================================================
//  BATTLE LOG — a running list of what's happened so far.
// ===========================================================================
const logLines = [];

function addLogLine(text) {
  logLines.push(text);
  const logBox = document.getElementById("log");
  logBox.innerHTML = logLines.map(function (line) {
    return "<div>" + line + "</div>";
  }).join("");
  logBox.scrollTop = logBox.scrollHeight; // keep the newest line in view
}

// ===========================================================================
//  ONE ATTACK — attacker hits defender with a move, HP and log both update.
//  Takes battle *roles*, not individuals directly — see the note up top.
//  Step 7: first roll for accuracy. A miss does nothing but announce itself.
// ===========================================================================
function performAttack(attackerRole, defenderRole, move) {
  const attacker = fighterFor(attackerRole);
  const defender = fighterFor(defenderRole);
  const attackerName = FAKEAMON[attacker.speciesKey].name;

  const accuracyRoll = Math.random() * 100;
  if (accuracyRoll >= move.accuracy) {
    addLogLine(attackerName + " used " + move.name + ", but it missed!");
    return;
  }

  const attackerStats = statsFor(attacker);
  const defenderStats = statsFor(defender);
  const defenderType = FAKEAMON[defender.speciesKey].type;

  const result = calculateDamage(move, attackerStats, defenderStats, defenderType);
  defender.currentHP = Math.max(0, defender.currentHP - result.damage);

  let line = attackerName + " used " + move.name + "! It dealt " + result.damage + " damage.";
  if (result.typeMultiplier >= 2) {
    line += " It's super effective!";
  } else if (result.typeMultiplier <= 0.5) {
    line += " It's not very effective...";
  }
  addLogLine(line);
}

// The opponent doesn't think ahead yet — it just picks one of its moves at random.
function pickRandomMove(individual) {
  const species = FAKEAMON[individual.speciesKey];
  const index = Math.floor(Math.random() * species.moves.length);
  return MOVES[species.moves[index]];
}

// Turn-out the buttons while a turn is playing, so a fast second click can't
// start a new turn before the first one has finished showing itself.
function setControlsEnabled(enabled) {
  document.querySelectorAll(".move-btn").forEach(function (button) {
    button.disabled = !enabled;
  });
}

// A random pause between the two attacks, so the turn reads as "first this
// happens, THEN that happens" instead of both landing at once. Tweak these
// two numbers (in milliseconds) to make battles feel snappier or slower.
// Lengthened 2026-07-06 after Jeff & Lewis's testing feedback — the
// back-and-forth was reading too fast to follow.
const TURN_PAUSE_MIN_MS = 2000;
const TURN_PAUSE_MAX_MS = 2800;

function randomTurnPause() {
  return TURN_PAUSE_MIN_MS + Math.random() * (TURN_PAUSE_MAX_MS - TURN_PAUSE_MIN_MS);
}

// The catch "wobble" suspense beats keep their own, snappier pacing (see
// Step 4's throwFakeaball below) so a longer attack pause doesn't also
// drag out throwing a ball.
const CATCH_PAUSE_MIN_MS = 1000;
const CATCH_PAUSE_MAX_MS = 1500;

function randomCatchPause() {
  return CATCH_PAUSE_MIN_MS + Math.random() * (CATCH_PAUSE_MAX_MS - CATCH_PAUSE_MIN_MS);
}

// Step 8: has this role's Fakeamon fainted? If so, announce it in the log.
function checkForFaint(role) {
  const individual = fighterFor(role);
  if (individual.currentHP > 0) return false;
  addLogLine(FAKEAMON[individual.speciesKey].name + " fainted!");
  return true;
}

// ===========================================================================
//  CATCHING — Step 4: throw a Fakeaball at the wild Fakeamon. Formula and
//  base rate are from DESIGN.md §6 (Lewis's call: 50% base, better at low
//  HP). Only the basic Fakeaball exists so far — ballBonus is always 1
//  until Great/Ultra/Cosmic balls land (Jeff's number-tuning list).
//  Tweak these three numbers to change how catching feels.
// ===========================================================================
const BASE_CATCH_RATE = 0.5;      // Lewis: "about 1 in 4" at half HP
const CATCH_CHANCE_FLOOR = 0.05;  // never truly impossible, even at full HP
const CATCH_CHANCE_CAP = 0.95;    // room for stronger balls later

// You only ever throw a ball at the wild Fakeamon, so this always reads
// the opponent's HP.
function catchChance() {
  const missingHPFraction = 1 - opponent.currentHP / statsFor(opponent).maxHP;
  const raw = BASE_CATCH_RATE * missingHPFraction; // ballBonus = 1 for now
  return Math.max(CATCH_CHANCE_FLOOR, Math.min(CATCH_CHANCE_CAP, raw));
}

// How many suspenseful "wobble" beats play between the throw and the
// reveal, and how long each one pauses — tweak these to make catching
// feel snappier or more dramatic.
const CATCH_WOBBLE_COUNT = 2;

// Lewis's B5 pick — the "Gotcha!" moment. Announces the throw, plays a
// couple of suspenseful wobbles, then reveals whether it worked. Calls
// onDone(caught) once the whole sequence has finished, since the log now
// takes a few beats to play out instead of resolving instantly.
function throwFakeaball(onDone) {
  const playerName = FAKEAMON[activePlayer().speciesKey].name;
  const opponentName = FAKEAMON[opponent.speciesKey].name;

  addLogLine(playerName + " threw a Fakeaball at " + opponentName + "!");
  const caught = Math.random() < catchChance();

  function wobble(remaining) {
    if (remaining <= 0) {
      reveal();
      return;
    }
    setTimeout(function () {
      addLogLine("The Fakeaball wobbles...");
      wobble(remaining - 1);
    }, randomCatchPause());
  }

  function reveal() {
    setTimeout(function () {
      if (caught) {
        addLogLine("Gotcha! " + opponentName + " was caught!");
      } else {
        addLogLine("Oh no! " + opponentName + " broke free!");
      }
      onDone(caught);
    }, randomCatchPause());
  }

  wobble(CATCH_WOBBLE_COUNT);
}

// Throwing a ball takes your turn, just like an attack — same speed-order
// rule as DESIGN.md §6. If the wild Fakeamon is faster, it may get its
// attack in before you even throw.
function attemptCatch() {
  setControlsEnabled(false);
  const playerGoesFirst = statsFor(activePlayer()).speed >= statsFor(opponent).speed;

  function enemyCounterAttack(afterAttack) {
    const enemyMove = pickRandomMove(opponent);
    performAttack("opponent", "player", enemyMove);
    renderArena();

    if (checkForFaint("player")) {
      endBattle("opponent");
      return;
    }

    afterAttack();
  }

  // Caught Fakeamon join fully healed, per Lewis's B2 pick (joining your
  // team is a fresh start). The individual itself — species, level, XP,
  // now-full HP — is what rides along in the outcome; actually adding it
  // to a persistent team lands with M2 Step 5.
  function afterThrow(caught) {
    if (caught) {
      opponent.currentHP = statsFor(opponent).maxHP;
      resolveBattle({
        result: "caught",
        caught: opponent,
        xpGained: 0,
      });
      return;
    }

    if (playerGoesFirst) {
      setTimeout(function () {
        enemyCounterAttack(function () { setControlsEnabled(true); });
      }, randomTurnPause());
    } else {
      setControlsEnabled(true);
    }
  }

  if (playerGoesFirst) {
    throwFakeaball(afterThrow);
  } else {
    enemyCounterAttack(function () {
      setTimeout(function () {
        throwFakeaball(afterThrow);
      }, randomTurnPause());
    });
  }
}

// ===========================================================================
//  SWITCH — Step 6: swap in a different teammate mid-battle. Costs your
//  turn, same speed-order risk as Catch: if you're faster, the switch
//  happens safely and the new fighter just eats the opponent's attack; if
//  you're slower, the opponent gets a free hit on your CURRENT fighter
//  first — and if that faint ends the battle, the switch never completes.
// ===========================================================================

// Is there anyone healthy on the bench to switch to?
function hasHealthySwitchTarget() {
  return party.some(function (individual, index) {
    return index !== 0 && individual.currentHP > 0;
  });
}

function attemptSwitch(targetIndex) {
  setControlsEnabled(false);
  const playerGoesFirst = statsFor(activePlayer()).speed >= statsFor(opponent).speed;

  function enemyCounterAttack(afterAttack) {
    const enemyMove = pickRandomMove(opponent);
    performAttack("opponent", "player", enemyMove);
    renderArena();

    if (checkForFaint("player")) {
      endBattle("opponent");
      return;
    }

    afterAttack();
  }

  // Always succeeds (unlike a catch) — swap party[0] and party[targetIndex].
  function performSwitch() {
    const incomingName = FAKEAMON[party[targetIndex].speciesKey].name;
    const outgoing = party[0];
    party[0] = party[targetIndex];
    party[targetIndex] = outgoing;
    addLogLine("Go, " + incomingName + "!");
    renderArena();
  }

  function afterSwitchTurn() {
    setControlsEnabled(true);
    showMoveButtons(activePlayer());
  }

  if (playerGoesFirst) {
    // Fast enough to switch before the opponent can react.
    performSwitch();
    setTimeout(function () {
      enemyCounterAttack(afterSwitchTurn);
    }, randomTurnPause());
  } else {
    // Too slow — the opponent hits your CURRENT fighter before you can
    // switch out. If that faints them, the battle's over and the switch
    // never happens.
    enemyCounterAttack(function () {
      performSwitch();
      afterSwitchTurn();
    });
  }
}

// ===========================================================================
//  ONE TURN — you attack AND your opponent attacks back, with a pause
//  between so it feels like a real back-and-forth. Whoever has higher
//  Speed swings first; a tie goes to the player. If either fighter faints,
//  the battle ends right there instead of playing out the rest of the turn.
// ===========================================================================
function resolveTurn(playerMove) {
  setControlsEnabled(false);

  const enemyMove = pickRandomMove(opponent);
  const playerGoesFirst = statsFor(activePlayer()).speed >= statsFor(opponent).speed;

  const first  = playerGoesFirst ? { attackerRole: "player", defenderRole: "opponent", move: playerMove }
                                  : { attackerRole: "opponent", defenderRole: "player", move: enemyMove };
  const second = playerGoesFirst ? { attackerRole: "opponent", defenderRole: "player", move: enemyMove }
                                  : { attackerRole: "player", defenderRole: "opponent", move: playerMove };

  performAttack(first.attackerRole, first.defenderRole, first.move);
  renderArena();

  if (checkForFaint(first.defenderRole)) {
    endBattle(first.attackerRole);
    return;
  }

  setTimeout(function () {
    performAttack(second.attackerRole, second.defenderRole, second.move);
    renderArena();

    if (checkForFaint(second.defenderRole)) {
      endBattle(second.attackerRole);
      return;
    }

    setControlsEnabled(true);
  }, randomTurnPause());
}

// ===========================================================================
//  WIN / LOSE — Step 8 (M1) / Step 3 (M2): swap the move buttons for a
//  result + Continue button. Clicking Continue resolves startBattle()'s
//  promise so main.js can decide what happens next.
// ===========================================================================
function endBattle(winnerRole) {
  const playerWon = winnerRole === "player";
  const playerName = FAKEAMON[activePlayer().speciesKey].name;
  const opponentName = FAKEAMON[opponent.speciesKey].name;
  const message = playerWon
    ? "🎉 " + playerName + " wins!"
    : "💀 " + playerName + " fainted — " + opponentName + " wins.";

  const controls = document.getElementById("controls");
  controls.innerHTML =
    '<p class="result-message">' + message + "</p>" +
    '<button id="continueBtn" class="move-btn">Continue</button>';

  document.getElementById("continueBtn").addEventListener("click", function () {
    resolveBattle({ result: playerWon ? "win" : "lose", xpGained: 0 });
  });
}

// Lewis's B1 pick: Run always works — no risk, no free hit for the wild
// Fakeamon. A short pause so the log line is readable before the screen
// moves on.
function runAway() {
  setControlsEnabled(false);
  addLogLine(FAKEAMON[activePlayer().speciesKey].name + " got away safely!");
  setTimeout(function () {
    resolveBattle({ result: "fled", xpGained: 0 });
  }, 900);
}

// ===========================================================================
//  MOVE BUTTONS — clicking one plays out a full turn (see resolveTurn
//  above). Switch, Catch, and Run sit alongside them when the battle
//  allows it.
// ===========================================================================
function showMoveButtons(individual) {
  const controls = document.getElementById("controls");
  controls.innerHTML = ""; // clear any old buttons first

  const species = FAKEAMON[individual.speciesKey];
  species.moves.forEach(function (moveKey) {
    const move = MOVES[moveKey];
    const button = document.createElement("button");
    button.className = "move-btn";
    button.textContent = move.name;
    button.addEventListener("click", function () {
      resolveTurn(move);
    });
    controls.appendChild(button);
  });

  if (hasHealthySwitchTarget()) {
    const switchButton = document.createElement("button");
    switchButton.className = "move-btn switch-btn";
    switchButton.textContent = "Switch";
    switchButton.addEventListener("click", showSwitchPicker);
    controls.appendChild(switchButton);
  }

  if (canCatch) {
    const catchButton = document.createElement("button");
    catchButton.className = "move-btn catch-btn";
    catchButton.textContent = "Throw Fakeaball";
    catchButton.addEventListener("click", attemptCatch);
    controls.appendChild(catchButton);
  }

  if (canFlee) {
    const runButton = document.createElement("button");
    runButton.className = "move-btn run-btn";
    runButton.textContent = "Run";
    runButton.addEventListener("click", runAway);
    controls.appendChild(runButton);
  }
}

// Step 6: a sub-menu of who you could switch to. Cancel goes back to the
// normal move screen for free — only actually picking someone costs a turn.
function showSwitchPicker() {
  const controls = document.getElementById("controls");
  controls.innerHTML = "";

  party.forEach(function (individual, index) {
    if (index === 0 || individual.currentHP <= 0) return;
    const species = FAKEAMON[individual.speciesKey];
    const button = document.createElement("button");
    button.className = "move-btn switch-btn";
    button.textContent = "Switch to " + species.name;
    button.addEventListener("click", function () {
      attemptSwitch(index);
    });
    controls.appendChild(button);
  });

  const cancelButton = document.createElement("button");
  cancelButton.className = "move-btn run-btn";
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", function () {
    showMoveButtons(activePlayer());
  });
  controls.appendChild(cancelButton);
}

// ===========================================================================
//  START A BATTLE — the one function the rest of the game calls. Runs a
//  fight in #arena/#controls/#log and resolves once it's over.
//
//    config  = { playerParty: <live array>, enemy: <individual>,
//                canFlee, canCatch, onStateChange }
//    outcome = { result: "win" | "lose" | "fled" | "caught",
//                caught: <individual> | null, xpGained }
//
//  playerParty is a LIVE reference (per PLANS/M3_OVERWORLD_PLAN.md §5) —
//  battle.js mutates it directly (HP, switches), so the caller always sees
//  up-to-date state without needing to copy anything back out.
// ===========================================================================
function startBattle(config) {
  return new Promise(function (resolve) {
    resolveBattle = resolve;

    party = config.playerParty;
    opponent = config.enemy;
    canFlee = config.canFlee !== false;
    canCatch = config.canCatch !== false;
    onStateChange = config.onStateChange || function () {};

    const playerSpecies = FAKEAMON[activePlayer().speciesKey];
    const opponentSpecies = FAKEAMON[opponent.speciesKey];

    document.getElementById("title").textContent =
      "Fakeamon Battle — " + playerSpecies.name + " vs " + opponentSpecies.name;
    document.getElementById("controls-label").textContent = "Choose your move:";

    logLines.length = 0;
    document.getElementById("log").innerHTML = "";

    renderArena();
    showMoveButtons(activePlayer());
    addLogLine("A wild " + opponentSpecies.name + " appears! Choose a move for " + playerSpecies.name + ".");
  });
}
