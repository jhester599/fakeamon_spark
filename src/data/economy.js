// ===========================================================================
//  ECONOMY — every "how much do you earn / how much does it cost" number for
//  M4's world systems, in ONE obvious spot (PLANS/M4_WORLD_SYSTEMS_PLAN.md §3).
//  Same idea as src/data/moves.js and src/data/fakeamon.js: game numbers live
//  as plain, labeled data so they're easy to find and tweak — change a number,
//  refresh the page, feel the difference.
//
//  [TUNE] The FEEL is decided (Lewis's B16: after about 3 wild wins you can
//  afford a Fakeaball AND a heal). The exact numbers are Lewis & Jeff's
//  playtesting call — nudge them here until that feel is right. A tidy set that
//  hits B16 exactly, all multiples of 5: WIN 5, HEAL 10, BALL 5 (3 wins = 15 =
//  heal + ball). TOKENS_PER_WILD_WIN, HEAL_COST, and BALL_COST are LIVE
//  (M4S1–S3); the rest are pre-declared so the gym step (M4S4) just reads them.
// ===========================================================================
const ECONOMY = {
  TOKENS_PER_WILD_WIN:  5,   // [TUNE] tokens for beating a wild Fakeamon (M4S1 — LIVE)
  HEAL_COST:           10,   // [TUNE] a full heal at the Fakeatent (M4S2 — LIVE; decided 2026-07-24)
  BALL_COST:            5,   // [TUNE] one Fakeaball at the Tall Tower (M4S3 — LIVE) — basic ball only
  GYM_REWARD:          40,   // [TUNE] tokens for beating a gym the first time (M4S4)
  GYM_REMATCH_REWARD:  10,   // [TUNE] smaller reward for a rematch (Lewis's B17)
  TEAM_WIPE_TOKEN_LOSS: 5,   // [TUNE] tokens dropped when your whole team faints (M4S2 — LIVE)
};
