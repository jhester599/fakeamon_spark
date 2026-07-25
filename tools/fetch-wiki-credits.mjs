// ===========================================================================
//  fetch-wiki-credits.mjs — looks up artist credits on wiki.tuxemon.org for
//  every roster monster whose license we could NOT verify from Tuxemon's
//  ATTRIBUTIONS.md (attribution.status === "pending-wiki" in roster-200.json).
//
//      cd tools && npm run wiki-credits            # report only
//      cd tools && npm run wiki-credits -- --write # also fill sheet-manifest.json
//
//  NAMED CREATURES (added M4S4) — you can also pass slugs explicitly:
//
//      cd tools && npm run wiki-credits -- av8r --write
//      cd tools && npm run wiki-credits -- av8r=AV8R --write   (page name override)
//
//  Why this exists: roster-200.json only holds the 198 WILD monsters. Every
//  *named* creature — gym teams, the 5 mini-bosses, Artemis — is outside it, so
//  the roster-driven sweep above can never see them. Named slugs skip the
//  roster entirely. Use `slug=PageTitle` when the wiki page isn't just the
//  Capitalised slug: wiki titles are case-sensitive after the first letter, so
//  `av8r` would otherwise be looked up as "Av8r" and 404. If the derived title
//  misses, the script searches the wiki and tells you the closest match.
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
const API = "https://wiki.tuxemon.org/api.php";

const roster = JSON.parse(readFileSync(join(TOOLS, "roster-200.json"), "utf8")).monsters;
const manifestPath = join(TOOLS, "sheet-manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

// slug → wiki page name ("chrome_robo" → "Chrome_Robo", "nut" → "Nut")
function pageFor(slug) {
  return slug.split("_").map((w) => w[0].toUpperCase() + w.slice(1)).join("_");
}

// Anything on the command line that isn't a --flag is an explicit slug to look
// up, optionally as slug=PageTitle. Named creatures (gym teams, mini-bosses,
// Artemis) live outside roster-200.json, so this is the only way to reach them.
const pageOverrides = {};
const explicitSlugs = process.argv.slice(2)
  .filter((arg) => !arg.startsWith("-"))
  .map((arg) => {
    const [slug, page] = arg.split("=");
    if (page) pageOverrides[slug] = page;
    return slug;
  });

let pending;
if (explicitSlugs.length) {
  // Named slugs bypass the roster, but never silently overwrite an entry a
  // human already verified by hand.
  pending = explicitSlugs.filter((slug) => {
    if (manifest[slug]) {
      console.log(`• ${slug}: already in sheet-manifest.json — skipping (delete the entry to re-check)`);
      return false;
    }
    return true;
  });
  console.log(`Looking up ${pending.length} named creature(s) by hand-picked slug…\n`);
} else {
  pending = Object.keys(roster).filter(
    (slug) => roster[slug].attribution.status === "pending-wiki" && !manifest[slug]
  );
  console.log(`${pending.length} monsters need a wiki credit check…\n`);
}

// Wiki titles are case-sensitive past the first letter, so a derived title can
// miss ("Av8r" vs the real "AV8R"). Ask the wiki's search what it actually has.
async function suggestTitle(slug) {
  try {
    const url = `${API}?action=query&list=search&srsearch=${encodeURIComponent(slug)}` +
      `&srlimit=3&format=json&formatversion=2`;
    const data = await (await fetch(url)).json();
    return (data?.query?.search ?? []).map((hit) => hit.title);
  } catch {
    return [];
  }
}

const found = {};
const notFound = [];

for (const slug of pending) {
  const page = pageOverrides[slug] || pageFor(slug);
  const url = `${API}?action=parse&page=${encodeURIComponent(page)}&prop=wikitext&format=json&formatversion=2`;
  try {
    const res = await fetch(url);
    const data = await res.json();
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
