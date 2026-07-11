// ===========================================================================
//  check-roadmap.mjs — keep ROADMAP.md and roadmap.html honest.
//
//  WHY THIS EXISTS: the two roadmap files show the same steps two ways, and
//  the step counter has silently drifted more than once (the header said one
//  number while a different number of steps were actually ticked ✅/green).
//  That shipped as a real bug. This script recomputes the counts from the
//  actual done-marks and fails if anything disagrees — so "keep both roadmaps
//  current" stops being a thing you have to remember.
//
//  HOW TO RUN (no install needed, Node 18+):   node tools/check-roadmap.mjs
//  It prints a per-milestone table and exits 0 (all good) or 1 (drift found).
//  Run it whenever you tick a step done, add/move/remove a step, or edit a
//  counter — see ROADMAP.md golden rule #6.
//
//  It is a dev-only tool. The game never loads it.
// ===========================================================================

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(ROOT, "roadmap.html"), "utf8");
const md = readFileSync(join(ROOT, "ROADMAP.md"), "utf8");

const problems = [];
const fail = (msg) => problems.push(msg);

// --- roadmap.html: one <section class="zone mN"> per milestone --------------
// For each zone we compare three things that must agree:
//   (a) how many <li> steps are actually marked class="done"
//   (b) the "X of Y steps done" text the zone prints
//   (c) the zone progress meter width (should be done/total as a %)
const htmlZones = {};
for (const m of [1, 2, 3, 4, 5]) {
  const start = html.indexOf(`<section class="zone m${m}"`);
  if (start === -1) { fail(`roadmap.html: no <section class="zone m${m}">`); continue; }
  const block = html.slice(start, html.indexOf("</section>", start));

  const total = (block.match(/<li[ >]/g) || []).length;
  const done = (block.match(/<li class="done"/g) || []).length;

  const countTxt = block.match(/zone-count">(\d+) of (\d+)/);
  if (!countTxt) { fail(`roadmap.html m${m}: no "X of Y steps done" text`); continue; }
  const statedDone = +countTxt[1], statedTotal = +countTxt[2];

  if (done !== statedDone)   fail(`roadmap.html m${m}: ${done} <li> are class="done" but the text says ${statedDone} done`);
  if (total !== statedTotal) fail(`roadmap.html m${m}: ${total} <li> steps but the text says ${statedTotal} total`);

  const meter = block.match(/zone-meter"><span style="width:([\d.]+)%/);
  if (meter) {
    const want = total ? round1((done / total) * 100) : 0;
    if (Math.abs(parseFloat(meter[1]) - want) > 0.15)
      fail(`roadmap.html m${m}: zone meter is ${meter[1]}% but ${done}/${total} = ${want}%`);
  }
  htmlZones[m] = { done, total };
}

// roadmap.html overall header: "X / Y steps" + the big meter width.
const overall = html.match(/class="count">(\d+) \/ (\d+) steps/);
if (!overall) fail(`roadmap.html: no "X / Y steps" overall count`);
const htmlDone = sum(Object.values(htmlZones).map((z) => z.done));
const htmlTotal = sum(Object.values(htmlZones).map((z) => z.total));
if (overall) {
  if (+overall[1] !== htmlDone)  fail(`roadmap.html overall: header says ${overall[1]} done, zones add up to ${htmlDone}`);
  if (+overall[2] !== htmlTotal) fail(`roadmap.html overall: header says ${overall[2]} total, zones add up to ${htmlTotal}`);
  const bigMeter = html.match(/<div class="meter"><span style="width:([\d.]+)%/);
  if (bigMeter) {
    const want = htmlTotal ? round1((htmlDone / htmlTotal) * 100) : 0;
    if (Math.abs(parseFloat(bigMeter[1]) - want) > 0.15)
      fail(`roadmap.html overall: meter is ${bigMeter[1]}% but ${htmlDone}/${htmlTotal} = ${want}%`);
  }
}

// --- ROADMAP.md: count step-table rows per "## Mn" milestone section --------
// A step row is a table row whose first cell is bold: | **1** ✅ | ... or
// | **M3S6** ✅ | ...  Done = a ✅ in that first cell.
const mdZones = {};
const sections = md.split(/^## /m);
for (const sec of sections) {
  const head = sec.match(/^.*?M([1-5])\b/);
  if (!head) continue;
  const m = +head[1];
  if (mdZones[m]) continue; // first heading for this milestone wins
  let total = 0, done = 0;
  for (const line of sec.split("\n")) {
    const cell = line.match(/^\|\s*\*\*([^|]+?)\*\*([^|]*)\|/);
    if (!cell) continue;                 // not a bold-first-cell table row
    total++;
    if ((cell[1] + cell[2]).includes("✅")) done++;
  }
  if (total) mdZones[m] = { done, total };
}

// --- Cross-check the two files agree, milestone by milestone ----------------
for (const m of [1, 2, 3, 4, 5]) {
  const h = htmlZones[m], d = mdZones[m];
  if (h && d && (h.done !== d.done || h.total !== d.total))
    fail(`M${m}: roadmap.html says ${h.done}/${h.total} but ROADMAP.md says ${d.done}/${d.total}`);
  if (h && !d) fail(`M${m}: found in roadmap.html but not parsed from ROADMAP.md`);
}

// --- Report -----------------------------------------------------------------
console.log("Milestone | roadmap.html | ROADMAP.md");
console.log("----------|--------------|-----------");
for (const m of [1, 2, 3, 4, 5]) {
  const h = htmlZones[m] ? `${htmlZones[m].done}/${htmlZones[m].total}` : "—";
  const d = mdZones[m] ? `${mdZones[m].done}/${mdZones[m].total}` : "—";
  console.log(`   M${m}    |    ${pad(h)}    |   ${d}`);
}
console.log(`  TOTAL   |    ${pad(htmlDone + "/" + htmlTotal)}    |`);

if (problems.length) {
  console.log(`\n❌ FAIL — ${problems.length} roadmap inconsistency(ies):`);
  for (const p of problems) console.log("  • " + p);
  process.exit(1);
}
console.log("\n✅ PASS — roadmap.html and ROADMAP.md agree, and every counter matches its done-marks.");

function sum(a) { return a.reduce((x, y) => x + y, 0); }
function round1(n) { return Math.round(n * 10) / 10; }
function pad(s) { return String(s).padEnd(5); }
