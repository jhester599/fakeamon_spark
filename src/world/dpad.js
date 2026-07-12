// ===========================================================================
//  "POCKET VENTA" — the on-screen D-pad (M3 Step S10).
//  PLANS/M3_TOUCH_AND_MOBILE_PLAN.md §3-§6. Plain DOM buttons that feed the
//  virtualPad seam declared in src/world/config.js — Phaser never touches a
//  <button> here, and this file never touches a Phaser object, the same
//  "two rooms, one hallway" split as the map/battle handoff (M3 plan §1).
// ===========================================================================

// Only one finger drives the pad at a time (Lewis dial: "one finger is
// enough" — plan §4). A second finger touching another arrow while the
// first is still held is ignored until the first one lets go.
let dpadPointerId = null;

function setPadDirection(direction, pointerId) {
  dpadPointerId = pointerId;
  virtualPad.direction = direction;
}

// Call with no pointerId to force-clear no matter whose finger it was —
// used when backgrounding the page, or when a battle starts (src/screens.js).
function clearPadDirection(pointerId) {
  if (pointerId !== undefined && pointerId !== dpadPointerId) return;
  dpadPointerId = null;
  virtualPad.direction = null;
}

// Wire one arrow button: press-and-hold sets the direction; letting go in
// ANY of the three ways a touch can end must clear it — miss one and the
// hero "sleepwalks" into a tree forever (plan §4).
function wireDpadButton(button, direction) {
  button.addEventListener("pointerdown", function (e) {
    if (dpadPointerId !== null && dpadPointerId !== e.pointerId) return; // someone else's finger is already steering
    e.preventDefault();
    setPadDirection(direction, e.pointerId);
  });
  button.addEventListener("pointerup", function (e) { clearPadDirection(e.pointerId); });
  button.addEventListener("pointercancel", function (e) { clearPadDirection(e.pointerId); }); // iOS interrupts (e.g. a notification)
  button.addEventListener("pointerleave", function (e) { clearPadDirection(e.pointerId); });   // finger slides off the button
  button.addEventListener("contextmenu", function (e) { e.preventDefault(); }); // no iPad long-press menu
}

// Shown by default on a touch device (a coarse pointer), hidden on a plain
// mouse — but the toggle button always works either way (Lewis's B41).
function defaultPadVisible() {
  return window.matchMedia("(pointer: coarse)").matches;
}

function setPadVisible(visible) {
  document.getElementById("dpad").classList.toggle("visible", visible);
  document.getElementById("dpadToggle").textContent = visible ? "🕹️ Hide pad" : "🕹️ Show pad";
}

// Screen-manager wiring (plan §6) — src/screens.js calls these so a thumb
// resting on the pad during a battle can't walk the hidden hero around (the
// same bug class the pre-M3 review's F3 fix already guards against for the
// keyboard). restoreDpadAfterBattle() doesn't force the pad back on/off —
// it just stops overriding whatever the toggle preference already was.
function hideDpadForBattle() {
  document.getElementById("dpad").classList.add("battle-hidden");
  clearPadDirection();
}

function restoreDpadAfterBattle() {
  document.getElementById("dpad").classList.remove("battle-hidden");
}

function initDpad() {
  ["up", "down", "left", "right"].forEach(function (direction) {
    wireDpadButton(document.getElementById("dpad-" + direction), direction);
  });

  let padVisible = defaultPadVisible();
  setPadVisible(padVisible);
  document.getElementById("dpadToggle").addEventListener("click", function () {
    padVisible = !padVisible;
    setPadVisible(padVisible);
  });

  // Backgrounding the tab/app mid-hold (switching apps, a notification)
  // must clear the direction too, or the hero keeps walking with nobody
  // touching anything (plan §4).
  document.addEventListener("visibilitychange", function () { clearPadDirection(); });
  window.addEventListener("blur", function () { clearPadDirection(); });
}

initDpad();
