// ===========================================================================
//  BATTLE STATE
//  Step 3: this file's only public entry point is startBattle(config) below
//  — see PLANS/M3_OVERWORLD_PLAN.md §5 for the full contract it's built
//  from. player/opponent/hp stay simple module-level vars for now (only one
//  battle ever runs at a time); the individuals/state-bag upgrade that
//  retires this hp-by-name map lands before M2 Step 5.
// ===========================================================================
let player;
let opponent;
const hp = {};
let canFlee = true;
let resolveBattle; // set by startBattle(); called once the fight is over

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

function showFighter(fakeamon, currentHP) {
  // Build the list of this Fakeamon's moves as text.
  const moveItems = fakeamon.moves.map(function (moveKey) {
    const move = MOVES[moveKey];
    return "<li>" + move.name +
           " — " + move.type +
           ", power " + move.power +
           ", " + move.accuracy + "% hit</li>";
  }).join("");

  const percent = Math.max(0, Math.min(100, Math.round((currentHP / fakeamon.maxHP) * 100)));

  // Not every Fakeamon has real art yet (Leafick's lands at M3 Step 3) —
  // fall back to just the colored box instead of a broken image.
  const spriteImg = fakeamon.sprite
    ? '<img src="' + fakeamon.sprite + '" alt="' + fakeamon.name + '">'
    : "";

  return (
    '<div class="fighter">' +
      "<h2>" + fakeamon.name + "</h2>" +
      '<span class="type-badge type-' + fakeamon.type + '">' + fakeamon.type + "</span>" +
      '<div class="sprite type-' + fakeamon.type + '">' + spriteImg + "</div>" +
      '<div class="hp-bar-track">' +
        '<div class="hp-bar-fill" style="width: ' + percent + '%; background: ' + hpBarColor(percent) + ';"></div>' +
      "</div>" +
      '<div class="stats">' +
        "HP " + currentHP + "/" + fakeamon.maxHP +
        " &nbsp;•&nbsp; Attack " + fakeamon.attack +
        " &nbsp;•&nbsp; Defense " + fakeamon.defense +
        " &nbsp;•&nbsp; Speed " + fakeamon.speed +
      "</div>" +
      "<strong>Moves</strong>" +
      '<ul class="moves">' + moveItems + "</ul>" +
    "</div>"
  );
}

// Redraw both fighters with their current HP.
function renderArena() {
  document.getElementById("arena").innerHTML =
    showFighter(player, hp[player.name]) + showFighter(opponent, hp[opponent.name]);
}

// ===========================================================================
//  DAMAGE FORMULA — full version from DESIGN.md §6:
//    raw    = move power + attacker's Attack − defender's Defense (min 1)
//    damage = round(raw × typeMultiplier × random(0.85–1.15))
//  Returns both the damage and the type multiplier, so the battle log can
//  say "super effective" or "not very effective" when it matters.
// ===========================================================================
function calculateDamage(move, attacker, defender) {
  const raw = Math.max(1, move.power + attacker.attack - defender.defense);
  const typeMultiplier = TYPE_CHART[move.type][defender.type];
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
//  Step 7: first roll for accuracy. A miss does nothing but announce itself.
// ===========================================================================
function performAttack(attacker, defender, move) {
  const accuracyRoll = Math.random() * 100;
  if (accuracyRoll >= move.accuracy) {
    addLogLine(attacker.name + " used " + move.name + ", but it missed!");
    return;
  }

  const result = calculateDamage(move, attacker, defender);
  hp[defender.name] = Math.max(0, hp[defender.name] - result.damage);

  let line = attacker.name + " used " + move.name + "! It dealt " + result.damage + " damage.";
  if (result.typeMultiplier >= 2) {
    line += " It's super effective!";
  } else if (result.typeMultiplier <= 0.5) {
    line += " It's not very effective...";
  }
  addLogLine(line);
}

// The opponent doesn't think ahead yet — it just picks one of its moves at random.
function pickRandomMove(fakeamon) {
  const index = Math.floor(Math.random() * fakeamon.moves.length);
  return MOVES[fakeamon.moves[index]];
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
const TURN_PAUSE_MIN_MS = 1000;
const TURN_PAUSE_MAX_MS = 1500;

function randomTurnPause() {
  return TURN_PAUSE_MIN_MS + Math.random() * (TURN_PAUSE_MAX_MS - TURN_PAUSE_MIN_MS);
}

// Step 8: has this Fakeamon fainted? If so, announce it in the log.
function checkForFaint(fakeamon) {
  if (hp[fakeamon.name] > 0) return false;
  addLogLine(fakeamon.name + " fainted!");
  return true;
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
  const playerGoesFirst = player.speed >= opponent.speed;

  const first  = playerGoesFirst ? { attacker: player, defender: opponent, move: playerMove }
                                  : { attacker: opponent, defender: player, move: enemyMove };
  const second = playerGoesFirst ? { attacker: opponent, defender: player, move: enemyMove }
                                  : { attacker: player, defender: opponent, move: playerMove };

  performAttack(first.attacker, first.defender, first.move);
  renderArena();

  if (checkForFaint(first.defender)) {
    endBattle(first.attacker);
    return;
  }

  setTimeout(function () {
    performAttack(second.attacker, second.defender, second.move);
    renderArena();

    if (checkForFaint(second.defender)) {
      endBattle(second.attacker);
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
function endBattle(winner) {
  const playerWon = winner === player;
  const message = playerWon
    ? "🎉 " + player.name + " wins!"
    : "💀 " + player.name + " fainted — " + opponent.name + " wins.";

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
  addLogLine(player.name + " got away safely!");
  setTimeout(function () {
    resolveBattle({ result: "fled", xpGained: 0 });
  }, 900);
}

// ===========================================================================
//  MOVE BUTTONS — clicking one plays out a full turn (see resolveTurn
//  above). A Run button sits alongside them when the battle allows fleeing.
// ===========================================================================
function showMoveButtons(fakeamon) {
  const controls = document.getElementById("controls");
  controls.innerHTML = ""; // clear any old buttons first

  fakeamon.moves.forEach(function (moveKey) {
    const move = MOVES[moveKey];
    const button = document.createElement("button");
    button.className = "move-btn";
    button.textContent = move.name;
    button.addEventListener("click", function () {
      resolveTurn(move);
    });
    controls.appendChild(button);
  });

  if (canFlee) {
    const runButton = document.createElement("button");
    runButton.className = "move-btn run-btn";
    runButton.textContent = "Run";
    runButton.addEventListener("click", runAway);
    controls.appendChild(runButton);
  }
}

// ===========================================================================
//  START A BATTLE — the one function the rest of the game calls. Runs a
//  fight in #arena/#controls/#log and resolves once it's over.
//
//    config  = { player: <species>, enemy: <species>, canFlee }
//    outcome = { result: "win" | "lose" | "fled", xpGained }
//
//  This is the M2-sized version of the full contract in
//  PLANS/M3_OVERWORLD_PLAN.md §5 (config.playerParty/enemy.level and
//  outcome.caught arrive with catching in Step 4 and individuals/levels
//  before Step 5 — see PLANS/M5_STATE_AND_SAVE_PLAN.md §6).
// ===========================================================================
function startBattle(config) {
  return new Promise(function (resolve) {
    resolveBattle = resolve;

    player = config.player;
    opponent = config.enemy;
    canFlee = config.canFlee !== false;

    hp[player.name] = player.maxHP;
    hp[opponent.name] = opponent.maxHP;

    document.getElementById("title").textContent =
      "Fakeamon Battle — " + player.name + " vs " + opponent.name;
    document.getElementById("controls-label").textContent = "Choose your move:";

    logLines.length = 0;
    document.getElementById("log").innerHTML = "";

    renderArena();
    showMoveButtons(player);
    addLogLine("A wild " + opponent.name + " appears! Choose a move for " + player.name + ".");
  });
}
