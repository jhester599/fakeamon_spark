// ===========================================================================
//  fetch-wiki-credits.mjs — looks up artist credits on wiki.tuxemon.org for
//  every roster monster whose license we could NOT verify from Tuxemon's
//  ATTRIBUTIONS.md (attribution.status === "pending-wiki" in roster-200.json).
//
//      cd tools && npm run wiki-credits            # report only
//      cd tools && npm run wiki-credits -- --write # also fill sheet-manifest.json
//
//  With no slug arguments it scans roster-200.json for anything still
//  "pending-wiki". You can also name creatures explicitly — needed for any
//  creature added AFTER the 200-roster pass (gym aces from DESIGN.md §12, for
//  instance), since those have no roster entry to be "pending" in:
//
//      npm run wiki-credits -- av8r --write          # page name inferred
//      npm run wiki-credits -- av8r=AV8R --write     # page name given
//
//  Use the slug=Page form whenever the wiki page is not simply the slug with
//  each underscore-part capitalised. MediaWiki is case-SENSITIVE after the
//  first letter, so the inferred "Av8r" does NOT find the page "AV8R".
//
//  OVERWRITE GUARD: a slug that already has a sheet-manifest.json entry is
//  SKIPPED, because that entry is a credit a human already checked and worded
//  by hand — av8r's, for instance, carries a deliberate "assumed, unverified,
//  recheck" warning. A --write run would silently replace that with whatever
//  the wiki happens to return today, which could be a thinner credit or a
//  generic license line. To deliberately re-check and replace one, add --force:
//
//      npm run wiki-credits -- av8r=AV8R --write --force
//
//  (That is the command to use once wiki.tuxemon.org is back up and av8r's
//  assumed credit can finally be replaced with the real one.)
//
//  ⚠️ Needs normal internet access to wiki.tuxemon.org — the Claude remote
//  environment used for M3S0 could NOT reach it (network policy), which is
//  why this exists as a script: run it from a laptop, or add wiki.tuxemon.org
//  to the environment's allowed domains and let a session run it.
//
//  What it does per monster: fetches the wiki page's wikitext via the
//  MediaWiki API, pulls out the "…by <artist>" credit sentence(s), and
//  records them. With --write it adds a sheet-manifest.json entry using the
//  same convention the Hissiorite/Frondly gap was resolved with:
//  license "CC BY-SA 3.0 (per wiki.tuxemon.org/<Page>)". REVIEW THE DIFF —
//  a human (Jeff) stays the judge of anything ambiguous, and pages where no
//  credit sentence was found are left pending on purpose.
//
//  After a successful --write run:  npm run vendor-sheets   (pull the art)
//                             then: npm run roster-credits  (rebuild ledger)
// ===========================================================================

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const TOOLS = dirname(fileURLToPath(import.meta.url));
const WRITE = process.argv.includes("--write");
const FORCE = process.argv.includes("--force"); // allow replacing an existing manifest entry
const API = "https://wiki.tuxemon.org/api.php";

const roster = JSON.parse(readFileSync(join(TOOLS, "roster-200.json"), "utf8")).monsters;
const manifestPath = join(TOOLS, "sheet-manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

// slug → wiki page name ("chrome_robo" → "Chrome_Robo", "nut" → "Nut")
function pageFor(slug) {
  return slug.split("_").map((w) => w[0].toUpperCase() + w.slice(1)).join("_");
}

// Anything on the command line that is not a flag is a target: "av8r" or
// "av8r=AV8R". Explicit targets win over the roster scan entirely.
const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));

let targets;
if (args.length) {
  const named = args.map((arg) => {
    const [slug, page] = arg.split("=");
    return { slug, page: page || pageFor(slug), arg };
  });
  // The overwrite guard (see the header). An existing manifest entry is a
  // hand-checked credit; don't let a routine --write quietly replace it.
  targets = named.filter(({ slug, arg }) => {
    if (!manifest[slug] || FORCE) return true;
    console.log(`⏭️  ${slug} already has a hand-checked manifest entry — skipping.`);
    console.log(`   To deliberately re-check and replace it:`);
    console.log(`     npm run wiki-credits -- ${arg} --write --force`);
    return false;
  });
  if (FORCE && targets.some(({ slug }) => manifest[slug])) {
    console.log("⚠️  --force: existing manifest entries WILL be overwritten. Review the diff.");
  }
  console.log(`${targets.length} creature(s) named on the command line…\n`);
} else {
  targets = Object.keys(roster)
    .filter((slug) => roster[slug].attribution.status === "pending-wiki" && !manifest[slug])
    .map((slug) => ({ slug, page: pageFor(slug) }));
  console.log(`${targets.length} monsters need a wiki credit check…`);
  if (targets.length === 0) {
    console.log(
      "Nothing pending in roster-200.json. If you are chasing a creature added\n" +
        "after the roster pass (a DESIGN.md §12 gym ace, say), name it directly:\n" +
        "  npm run wiki-credits -- <slug>=<WikiPage> --write"
    );
  }
  console.log("");
}

const found = {};
const notFound = [];

for (const { slug, page } of targets) {
  const url = `${API}?action=parse&page=${encodeURIComponent(page)}&prop=wikitext&format=json&formatversion=2`;
  try {
    const res = await fetch(url);
    const body = await res.text();
    // The wiki sometimes serves an HTML "technical difficulties" page instead
    // of JSON (it was down on 2026-07-25). Say so plainly rather than dying on
    // a confusing "Unexpected token '<'" from JSON.parse.
    if (!body.trimStart().startsWith("{")) {
      throw new Error(`wiki returned ${res.status} non-JSON — site may be down, try again later`);
    }
    const data = JSON.parse(body);
    if (data?.error) {
      throw new Error(`no wiki page "${page}" (${data.error.code}) — check spelling/CASE`);
    }
    const text = data?.parse?.wikitext ?? "";
    // credit sentences look like "Art and sprites by princess-phoenix." or
    // "Original design by Leo. Sprites by Levaine."
    const credits = [...text.matchAll(/[^.\n|=]*(?:art|sprite|design)[^.\n|]*\bby\b[^.\n|]+/gi)]
      .map((m) => m[0].replace(/\[\[|\]\]|'''?/g, "").trim())
      .slice(0, 4);
    if (credits.length) {
      found[slug] = { page, credits };
      console.log(`✓ ${slug}: ${credits.join(" · ")}`);
      if (WRITE) {
        manifest[slug] = {
          ourName: null, // Lewis's rename pass fills this in
          artists: credits.join("; "),
          license: `CC BY-SA 3.0 (per wiki.tuxemon.org/${page})`,
          sourceCommit: "c34a9c72",
        };
      }
    } else {
      notFound.push(slug);
      const why = text ? "page fetched but no credit sentence found" : `no wiki page "${page}"`;
      console.log(`✗ ${slug}: ${why} — check by hand`);
      // Most likely cause for a named creature: the title isn't the Capitalised
      // slug. Show what the wiki actually has so the retry is obvious.
      const guesses = await suggestTitle(slug);
      if (guesses.length) {
        console.log(`   wiki search suggests: ${guesses.join(", ")}`);
        console.log(`   retry with:  npm run wiki-credits -- ${slug}=${guesses[0].replace(/ /g, "_")} --write`);
      }
    }
  } catch (err) {
    notFound.push(slug);
    console.log(`✗ ${slug}: ${err.message}`);
  }
  await new Promise((r) => setTimeout(r, 250)); // be polite to the wiki
}

writeFileSync(join(TOOLS, "wiki-credits.json"), JSON.stringify({ found, notFound }, null, 1));
console.log(`\nDone: ${Object.keys(found).length} credited, ${notFound.length} still need a human.`);
console.log("Raw results saved to tools/wiki-credits.json.");
if (WRITE) {
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n");
  console.log("sheet-manifest.json updated — REVIEW THE DIFF, then run:");
  console.log("  npm run vendor-sheets && npm run roster-credits");
}
