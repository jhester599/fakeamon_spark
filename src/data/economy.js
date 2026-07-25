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

  // Healing at the Fakeatent costs less while you're still on your own — the
  // very start of the game is when tokens are scarcest (Jeff & Lewis's
  // playtest call, 2026-07-25). One Fakeamon = SOLO price; two or more = the
  // normal price. src/main.js's healCost() picks between them.
  HEAL_COST_SOLO:       5,   // [TUNE] a full heal when your team is just ONE Fakeamon
  HEAL_COST:           10,   // [TUNE] a full heal once you have 2+ (decided 2026-07-24)

  BALL_COST:            5,   // [TUNE] one Fakeaball at the Tall Tower (M4S3 — LIVE) — basic ball only
  GYM_REWARD:          40,   // [TUNE] tokens for beating a gym the first time (M4S4)
  GYM_REMATCH_REWARD:  10,   // [TUNE] smaller reward for a rematch (Lewis's B17)

  // Fainting your WHOLE team costs the price of a heal plus this much extra —
  // so it always stings a bit more than just walking into the tent yourself
  // (playtest call, 2026-07-25). Solo: 5 + 5 = 10. Team of 2+: 10 + 5 = 15.
  // Replaced the old flat TEAM_WIPE_TOKEN_LOSS. See teamWipeCost() in main.js.
  TEAM_WIPE_SURCHARGE:  5,   // [TUNE] extra tokens lost on top of the heal price
};
