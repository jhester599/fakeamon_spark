// ===========================================================================
//  SAVE / LOAD — M5-plan S3 (see PLANS/M5_STATE_AND_SAVE_PLAN.md §4).
//
//  Your whole adventure lives in ONE object, gameState (src/state.js), and
//  it's all plain data — so saving is literally "turn gameState into text and
//  stash it," and loading is the reverse. No database, no server: the
//  browser's localStorage remembers it between visits.
//
//  Three sharp edges worth knowing (§4.4):
//   • localStorage is PER SITE — your save at http://localhost is a DIFFERENT
//     save from the one at jhester599.github.io, or from a double-clicked
//     file. That's on purpose (dev saves don't touch the real game), but it
//     surprises people, so: your game "vanishing" usually means you opened it
//     from a different address.
//   • Incognito / Private windows throw the save away when you close them.
//   • Some browsers (Safari Private Browsing) refuse to save at all — so every
//     write is wrapped so a refusal never crashes the game; you just keep
//     playing without saving (and see a gentle note).
// ===========================================================================

const SAVE_KEY = "fakeamon-save";
const SAVE_VERSION = 1; // bump when gameState's SHAPE changes (+ add a migration)

// Turning an OLD save into a newer shape. Empty for now (we're on v1). When
// the shape changes: bump SAVE_VERSION above, then add an entry here, e.g.
//   1: function (old) { old.newField = []; return old; }   // v1 -> v2
const MIGRATIONS = {
};

function migrateSave(save) {
  while (save.version < SAVE_VERSION) {
    const step = MIGRATIONS[save.version];
    if (!step) return null; // we don't know how to upgrade it — treat as no save
    save = step(save);
    save.version = save.version + 1;
  }
  return save;
}

// A brand-new, empty adventure — the shape everything else expects. Loading
// merges an old save ON TOP of this, so any field added in a later version
// gets a sensible default for free (only *reshaped* fields need a migration).
function defaultState() {
  return { version: SAVE_VERSION, party: [], box: [] };
}

// Write gameState to localStorage. Wrapped in try/catch because the WRITE can
// throw (Safari Private Browsing gives localStorage a quota of 0, so even the
// first save fails) — F8 from the pre-M3 peer review. On failure we keep
// playing in memory and warn once, never crash.
function saveGame() {
  gameState.version = SAVE_VERSION; // stamp the current shape version
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(gameState));
    return true;
  } catch (err) {
    console.warn("Fakeamon: couldn't save the game.", err);
    notifySaveFailed();
    return false;
  }
}

// Read the save back. Returns a ready-to-use state object, or null if there's
// no save (or it's corrupt, or from an unknown future version). Never throws.
function loadGame() {
  let text = null;
  try {
    text = localStorage.getItem(SAVE_KEY);
  } catch (err) {
    return null; // storage disabled entirely
  }
  if (!text) return null;
  return parseSave(text);
}

// Shared by loadGame() and Import Save: raw text -> a validated state object,
// or null. This is the ONE place a save is checked, so a corrupt file (or one
// Lewis hand-edited into nonsense) can only ever cost you a New Game, never a
// crash.
function parseSave(text) {
  let save;
  try {
    save = JSON.parse(text);
  } catch (err) {
    return null; // not valid JSON
  }
  if (!save || typeof save !== "object" ||
      typeof save.version !== "number" || !Array.isArray(save.party)) {
    return null; // doesn't look like a Fakeamon save
  }

  const migrated = migrateSave(save);
  if (!migrated) return null;

  // Merge onto a fresh default so newly-added fields get defaults for free.
  return Object.assign(defaultState(), migrated);
}

// Is there a real, loadable save right now? (Used to decide whether to show
// the "Continue" button.)
function hasSave() {
  return loadGame() !== null;
}

// Forget the saved adventure (New Game uses this).
function clearSave() {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch (err) {
    // If we can't touch storage there was nothing saved anyway — ignore.
  }
}

// ===========================================================================
//  EXPORT / IMPORT — M5-plan S4 (§4.3). The safety net (browsers DO clear
//  localStorage — storage pressure, "clear browsing data," a different
//  browser) and, honestly, the best lesson in the whole project: your entire
//  game world is one little JSON file you can download, read, and — inevitably
//  — edit. Give yourself 999 Fakeaballs by hand; that's not cheating, that's
//  understanding how saving works.
// ===========================================================================

// Download the saved game as "fakeamon-save.json".
//
// We export what's IN localStorage, not the in-memory gameState — because
// Export lives on the title screen, where gameState hasn't been loaded yet
// (it's still the empty default until you press Continue). Autosave keeps
// localStorage current with the live game, so this is always the real save.
// (Fallback: if storage is off — e.g. Safari Private — export whatever is in
// memory, so an in-progress game can still be rescued to a file.)
function exportSave() {
  let text = null;
  try {
    text = localStorage.getItem(SAVE_KEY);
  } catch (err) {
    text = null;
  }
  if (!text) text = JSON.stringify(gameState); // storage off → use memory

  const blob = new Blob([text], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "fakeamon-save.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Read a picked file and hand back a validated state (or null if it isn't a
// real Fakeamon save). Goes through the SAME parseSave() checks as loading,
// so a bad or hand-edited file can never corrupt the game — worst case is
// "nothing changed." Calls onDone(stateOrNull) when the read finishes.
function importSaveFromFile(file, onDone) {
  const reader = new FileReader();
  reader.onload = function () {
    onDone(parseSave(String(reader.result)));
  };
  reader.onerror = function () {
    onDone(null);
  };
  reader.readAsText(file);
}

// Gentle one-time "couldn't save" note, shown in the battle log (the one text
// area that's always on screen). Only fires once so it never nags.
let saveFailureAnnounced = false;
function notifySaveFailed() {
  if (saveFailureAnnounced) return;
  saveFailureAnnounced = true;
  if (typeof addLogLine === "function") {
    addLogLine("⚠️ Couldn't save — this browser may be in private mode. " +
      "You can keep playing, but progress won't be remembered. " +
      "(Try Export Save to keep a copy.)");
  }
}
