// ===========================================================================
//  GYMS — trainer challenges, as plain data (PLANS/M4_WORLD_SYSTEMS_PLAN.md §4.3).
//
//  A gym is a leader with a TEAM: a standard Fakeamon plus a stronger "ace".
//  That's the whole difference from a wild fight — beat the first one and the
//  leader sends out the second, exactly like your own bench (src/battle.js's
//  enemyParty). Beating a gym for the first time earns tokens AND a badge; a
//  badge opens up a new area to explore (M4 Step 6 builds the gate itself).
//
//  Only Gym 1 exists so far. Gyms 2 (Fire, Goth) and 3 (Water, Child Actor)
//  are M5 work — DESIGN.md §8 has their rosters waiting, and adding one here
//  is meant to be nothing more than another entry in this table plus a
//  building on a map.
//
//  Every gym carries an explicit `type` on the gym AND on each team member.
//  It's spelled out rather than looked up so re-theming a gym later (DESIGN.md
//  §8 flags Gym 2's and Gym 3's aces as needing a re-theme) is a one-line edit
//  you can see with your eyes.
// ===========================================================================
const GYMS = {
  gym1: {
    id: "gym1",
    leader: "Enforcer Boss",
    type: "metal",
    badge: "gearBadge",           // the id stored in gameState.flags.badges
    badgeName: "Gear Badge",      // what the player actually sees
    badgeIcon: "⚙️",
    opens: "theLagoon",           // the area this badge unlocks (DECISIONS.md #27)
    // What the leader says when you walk in. One line, in character.
    greeting: "So you want the Gear Badge? My Fakeamon are built out of solid " +
              "metal. Let's see you dent them!",
    // The team, in the order they're sent out: standard first, ace last.
    //
    // ⚠️ `level` is FLAVOUR ONLY right now — it shows up in battle text, but
    // it changes no stats, because STAT_GROWTH_PER_LEVEL (src/state.js) is
    // still all zeros until M5 adds leveling. A gym's real difficulty lives in
    // the base stats in src/data/fakeamon.js. Don't "buff" a gym by raising
    // these numbers — nothing will happen!
    team: [
      { species: "allagon", level: 8,  type: "metal" }, // standard
      { species: "av8r",    level: 10, type: "metal" }, // ace (stronger)
    ],
  },
};
