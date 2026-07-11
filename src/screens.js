// ===========================================================================
//  SCREENS — the doorway between the two "rooms" (PLANS/M3_OVERWORLD_PLAN.md §3).
//
//  Fakeamon is a Phaser MAP (#world) and a plain-HTML BATTLE (#battle) that
//  never talk to each other directly. This tiny file owns which one you see:
//  when a battle starts we hide the map and freeze it; when it ends we bring
//  the map back and hand the keyboard to it. Nothing else in the game touches
//  #world's visibility or the world scene's paused/input state — keep it that
//  way and the map↔battle handoff (M3 S7) stays a two-function seam.
//
//  Note: only the MAP is ever hidden. The #battle box also hosts the
//  overworld's little HUD (the "Exploring The Meadows" card + your team row),
//  so it stays on screen the whole time — what we toggle is whether the map
//  is showing above it.
//
//  worldScene / worldGame are the globals from src/world/config.js (this file
//  loads right after it). They may be null very early on, so we guard.
// ===========================================================================

// Show the battle: hide the map and FREEZE the world so nothing leaks through.
// Each guard here is a real bug the plan calls out (§3):
//   - pause the scene so it stops updating (the hero can't drift);
//   - disable the keyboard so arrow-key presses during the fight don't walk
//     the now-hidden hero around the map;
//   - disable pointer input so a click on a battle button doesn't also land
//     as a click on the map tile underneath it.
function showBattle() {
  document.getElementById("world").classList.add("hidden");
  if (worldScene) {
    if (!worldScene.scene.isPaused()) worldScene.scene.pause();
    worldScene.input.keyboard.enabled = false;
    worldScene.input.enabled = false;
  }
}

// Show the map: bring it back, un-freeze it, and give the canvas keyboard
// focus so the arrow keys move the hero again instead of scrolling the page.
function showWorld() {
  document.getElementById("world").classList.remove("hidden");
  if (worldScene) {
    worldScene.input.enabled = true;
    worldScene.input.keyboard.enabled = true;
    if (worldScene.scene.isPaused()) worldScene.scene.resume();
    // Snap the hero to wherever the save says (unchanged normally; the start
    // tile after a loss reset it) so the sprite matches the state on return.
    worldScene.syncHeroToState();
  }
  if (worldGame && worldGame.canvas) {
    worldGame.canvas.setAttribute("tabindex", "0"); // focusable → it can hold the keyboard
    worldGame.canvas.focus();
  }
}
