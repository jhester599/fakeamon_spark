// ===========================================================================
//  STATE — the species/individual split (PLANS/M5_STATE_AND_SAVE_PLAN.md §1).
//  A species (src/data/fakeamon.js) is a shared blueprint. An individual is
//  one actual creature: the thing that fights, gets hurt, and — once M5's
//  XP system lands — grows. This file is where individuals get made and
//  where their current stats get worked out.
//
//  This replaces the old hp = { player, opponent } map in battle.js — HP
//  now lives right on the individual (individual.currentHP), so two
//  Growlers never have to share one HP number again.
// ===========================================================================

// How much each stat grows per level above 1. Everything's 0 for now —
// nothing levels up yet, that's M5's job (src/progression.js) — but the
// numbers already live in one obvious spot for when leveling arrives.
const STAT_GROWTH_PER_LEVEL = { hp: 0, attack: 0, defense: 0, speed: 0 };

// Every individual starts at this level until M5's XP system exists.
const STARTING_LEVEL = 1;

// Makes one fresh individual of a species — fully healed, level 1 (for now).
function newIndividual(speciesKey, level) {
  const individual = {
    speciesKey: speciesKey,
    level: level,
    xp: 0,
    currentHP: 0, // filled in right below, once we know this individual's maxHP
  };
  individual.currentHP = statsFor(individual).maxHP;
  return individual;
}

// Works out an individual's current battle stats from its species + level.
// Stats are never stored on the individual itself — deriving them here is
// what makes leveling and evolution (M5) "just work" instead of needing
// separate bookkeeping every time a creature changes.
function statsFor(individual) {
  const species = FAKEAMON[individual.speciesKey];
  const grow = STAT_GROWTH_PER_LEVEL;
  const levelsAboveOne = individual.level - 1;

  return {
    maxHP:    species.baseHP      + Math.floor(grow.hp      * levelsAboveOne),
    attack:   species.baseAttack  + Math.floor(grow.attack  * levelsAboveOne),
    defense:  species.baseDefense + Math.floor(grow.defense * levelsAboveOne),
    speed:    species.baseSpeed   + Math.floor(grow.speed   * levelsAboveOne),
  };
}
