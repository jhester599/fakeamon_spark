// ===========================================================================
//  PROGRESSION — growing up (M5 Step 1, the M5 plan's S5).
//  PLANS/M5_STATE_AND_SAVE_PLAN.md §2.
//
//  Winning fights earns XP. Enough XP earns a LEVEL. A level makes your
//  Fakeamon stronger — and until this file existed, that last part wasn't
//  true: `level` was just a number printed on the screen, because
//  STAT_GROWTH_PER_LEVEL in src/state.js was all zeros. Turning that on is
//  what this step is really about; this file is the rules that go with it.
//
//  WHO DOES WHAT (the one rule that keeps this tidy):
//    • src/battle.js runs the fight and says "you knocked something out".
//    • THIS file decides what that's worth and what it changes.
//  Battles never do level maths themselves — they call giveXP() and print
//  whatever messages come back.
//
//  🎛️ EVERY NUMBER YOU'D WANT TO FIDDLE WITH IS AT THE TOP OF THIS FILE.
// ===========================================================================

// --- [TUNE] how much XP a level costs -------------------------------------
// The curve is deliberately the simplest one that feels right:
//   to get from level 1 to 2 costs XP_BASE
//   to get from level 2 to 3 costs XP_BASE × 2
//   to get from level 9 to 10 costs XP_BASE × 9  … and so on.
// So early levels fly by and later ones take real work. Raise XP_BASE to slow
// the whole game down, lower it to speed everything up.
const XP_BASE = 10;

// [TUNE] Nobody levels past this. It's a safety rail as much as a rule —
// stats keep climbing forever otherwise, and Artemis (M5) needs numbers that
// still mean something when you get there.
const MAX_LEVEL = 30;

// --- [TUNE] how much XP a fight pays --------------------------------------
// A knockout pays XP_REWARD_BASE × the opponent's level, so tougher opponents
// are worth more. (A level-3 wild Fakeamon pays 24 XP at these numbers —
// enough for a level or two early on, barely a dent later.)
const XP_REWARD_BASE = 8;

// [TUNE] Catching pays this share of a knockout. Half, because you got a whole
// Fakeamon out of it as well.
const CATCH_XP_FRACTION = 0.5;

// [TUNE] Mini-bosses (M5 Step 2) pay this many times the normal amount —
// DESIGN.md §5 says they should be worth more. Nothing sets `isMiniBoss` yet;
// the socket is here so Step 2 is a one-word change.
const MINIBOSS_XP_MULT = 3;

// ===========================================================================
//  THE CURVE
// ===========================================================================

// How much XP it takes to get from `level` to the next one.
function xpToNext(level) {
  return XP_BASE * level;
}

// How far along the current level you are, 0–100 (for the little XP bar).
function xpBarPercent(individual) {
  if (individual.level >= MAX_LEVEL) return 100;
  const needed = xpToNext(individual.level);
  return Math.max(0, Math.min(100, Math.round((individual.xp / needed) * 100)));
}

// What beating (or catching) this opponent is worth.
// `fraction` is 1 for a knockout, CATCH_XP_FRACTION for a catch.
function xpReward(opponent, fraction) {
  const bossBonus = opponent.isMiniBoss ? MINIBOSS_XP_MULT : 1;
  return Math.round(XP_REWARD_BASE * opponent.level * fraction * bossBonus);
}

// ===========================================================================
//  LEVELLING UP
//
//  giveXP() is the only way XP ever goes up. It hands back a little report:
//    { amount, levelsGained, newLevel, messages }
//  …and the caller prints `messages` wherever it likes (the battle log during
//  a fight, the overworld news note outside one). Machinery here, showbiz
//  there — same split the evolution ceremony will use at S7.
// ===========================================================================

function giveXP(individual, amount) {
  individual.xp += amount;
  const report = applyLevelUps(individual);
  report.amount = amount;
  return report;
}

// The loop itself. One big win can be worth several levels at once, so this
// keeps going while there's enough XP banked for another one.
//
// Kept separate from giveXP because it's ALSO run when a save is loaded — an
// adventure saved before this file existed has XP banked that was never spent,
// so it gets cashed in the moment you press Continue (see src/save.js).
function applyLevelUps(individual) {
  const messages = [];
  const startLevel = individual.level;
  const species = FAKEAMON[individual.speciesKey];

  while (individual.level < MAX_LEVEL && individual.xp >= xpToNext(individual.level)) {
    individual.xp -= xpToNext(individual.level);

    const maxHPBefore = statsFor(individual).maxHP;
    individual.level += 1;
    const maxHPAfter = statsFor(individual).maxHP;

    // Growing up gives you the new HP as well — but it is NOT a free full
    // heal. Half-health in, half-health out; you just have a bigger tank.
    // A fainted Fakeamon (0 HP) stays fainted: levelling up doesn't revive
    // anybody, that's what the Fakeatent is for.
    if (individual.currentHP > 0) {
      individual.currentHP = Math.min(maxHPAfter,
        individual.currentHP + (maxHPAfter - maxHPBefore));
    }

    messages.push(species.name + " grew to level " + individual.level + "! ⭐");
  }

  // At the cap, extra XP has nowhere to go — don't let it pile up forever.
  if (individual.level >= MAX_LEVEL) individual.xp = 0;

  return {
    amount: 0,
    levelsGained: individual.level - startLevel,
    newLevel: individual.level,
    messages: messages,
  };
}

// Cash in any XP a Fakeamon is sitting on. Used on load (see above) — safe to
// call on anybody at any time, because it does nothing unless there's enough
// XP banked for a level.
function catchUpLevels(individual) {
  return applyLevelUps(individual);
}
