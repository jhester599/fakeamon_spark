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

// ===========================================================================
//  THE TEAM — Step 5. Up to MAX_PARTY_SIZE individuals fight for you
//  (party[0] is always the one currently in battle); anything caught
//  beyond that overflows into the box. No nicknames — species names only
//  (Lewis's B3 call), so an individual's species + level is its whole
//  identity for display.
// ===========================================================================
const MAX_PARTY_SIZE = 4; // Lewis's call — a 5th catch overflows to the Boxes

// ===========================================================================
//  INVENTORY — the M2 follow-up (DECISIONS.md #49): Fakeaballs are limited,
//  not infinite. Nested under `balls` (not a flat inventory.fakeaball) per
//  PLANS/M5_STATE_AND_SAVE_PLAN.md §1's gameState sketch — §A notes that
//  where the M3 and M5 plans' sketches disagree, §1's nested shape wins.
//  That's the shape Great/Ultra/Cosmic balls join later (Jeff's number-tuning
//  list) without reshaping anything that already exists.
// ===========================================================================
const STARTING_FAKEABALLS = 5; // Lewis's call — Tall Tower purchases (M4S3) add more

function defaultInventory() {
  return {
    balls: { fakeaball: STARTING_FAKEABALLS },
    // *M4 Step 5 — cooking input. berryKey → how many you're holding, empty to
    // start. This is NESTED under inventory, so an old (v1) save that predates
    // it needs a back-fill in src/save.js's parseSave: the loader's merge is
    // SHALLOW — it copies the whole old inventory object and so misses brand-new
    // sub-fields like this one.
    berries: {},
  };
}

// M4 — the "what have you unlocked?" facts: gym badges earned, and which maps
// you're allowed to walk into. Its own fresh-copy function (like defaultWorld /
// defaultInventory) so a New Game and the save defaults always start from the
// same clean slate. Badges are earned at gyms (M4S4) and open new areas (M4S6).
function defaultFlags() {
  return {
    badges: [],                    // gym badge ids you've earned, e.g. ["gearBadge"]
    gymsCleared: [],               // gym ids beaten — same as badges for now, but kept
                                   //   separate so a rematch (Lewis's B17) can tell a first
                                   //   clear (big reward) from a repeat (small one)
    unlockedAreas: ["theMeadows"], // maps you may enter — beating a gym pushes a new one here
  };
}

// The OVERWORLD slice of the save (M3): where the hero is standing, which map
// they're on, and which encounters have been cleared. A brand-new world puts
// the hero on The Meadows' start tile (from src/data/maps.js). Kept as a
// function so both the initial state and a New Game start from the same fresh
// copy (and src/save.js reuses it for its defaults).
function defaultWorld() {
  const start = MAPS.theMeadows.startTile;
  return {
    mapId: "theMeadows",
    player: { tileX: start.x, tileY: start.y, facing: "down" },
    defeatedEncounters: [], // encounter ids removed from the map (M3 Step S8)
  };
}

// ALL persistent facts live in this one object (PLANS/M5_STATE_AND_SAVE_PLAN.md
// §1). party + box + world + inventory came first; M4 adds tokens + flags (each
// landed as the feature that needed it arrived). Everything in here is plain
// data (no functions, no DOM, no sprites) so the save system (src/save.js) can
// turn the whole thing into text with JSON.stringify — that's the one rule.
const gameState = {
  // Save-format version. Must match SAVE_VERSION in src/save.js — bump both
  // together (and add a migration there) whenever this object's SHAPE changes.
  // Bumped to 2 for M4's new fields (tokens, flags, inventory.berries).
  version: 2,
  tokens: 0,              // *M4 Step 1 — the currency: wild wins + gyms pay it, shops + heals spend it
  party: [],
  box: [],
  flags: defaultFlags(),  // *M4 — badges earned + areas unlocked (see defaultFlags above)
  world: defaultWorld(),
  inventory: defaultInventory(),
};
