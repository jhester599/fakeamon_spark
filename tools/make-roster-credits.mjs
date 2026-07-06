// ===========================================================================
//  make-roster-credits.mjs — regenerates CREDITS_ROSTER.md (the attribution
//  ledger for wild-roster battle sheets staged in assets/sprites/battle/)
//  from sheet-manifest.json + roster-200.json. Never edit CREDITS_ROSTER.md
//  by hand — fix the manifest and re-run:
//
//      cd tools && npm run roster-credits
// ===========================================================================

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const TOOLS = dirname(fileURLToPath(import.meta.url));
const REPO = join(TOOLS, "..");

const manifest = JSON.parse(readFileSync(join(TOOLS, "sheet-manifest.json"), "utf8"));
const roster = JSON.parse(readFileSync(join(TOOLS, "roster-200.json"), "utf8")).monsters;

const STARTERS = new Set(["hissiorite", "bigfin", "frondly"]); // ledgered in CREDITS.md itself

const staged = [];
const pending = [];
for (const slug of Object.keys(roster).sort()) {
  const entry = manifest[slug];
  const hasSheet = existsSync(join(REPO, "assets", "sprites", "battle", `${slug}-sheet.png`));
  if (entry && hasSheet) staged.push({ slug, ...entry });
  else pending.push(slug);
}

const rows = staged.map(
  (s) =>
    `| \`${s.slug}\` | ${s.ourName ?? "*(Lewis names it later)*"} | ${s.artists} | ${s.license} | \`${s.sourceCommit}\` |`
);

const md = `# Wild-roster art ledger (generated — do not hand-edit)

Attribution for the **wild-encounter roster** battle sheets staged in
\`assets/sprites/battle/\` (the 200-monster pool from \`CONTENT_REFERENCE.md\`
§16). These are **staged, not yet in the game** — they enter play area by
area (M3-late → M5), when Lewis's rename pass gives each one its Fakeamon
name (fill in the "Our name" column via \`ourName\` in
\`tools/sheet-manifest.json\`).

Regenerate this file with \`cd tools && npm run roster-credits\`. The three
starters' sheets are ledgered in \`CREDITS.md\` itself, not here. Source path
pattern for every row: \`mods/tuxemon/gfx/sprites/battle/<slug>-sheet.png\`
on \`github.com/Tuxemon/Tuxemon\`, at the commit in the last column.

## Staged — ${staged.length} sheets, attribution verified

| Tuxemon slug | Our name | Artist(s) | License | Pulled from |
|---|---|---|---|---|
${rows.join("\n")}

## Not staged yet — ${pending.length} awaiting a license check

These roster monsters have **no verified attribution yet** (they're missing
from Tuxemon's \`ATTRIBUTIONS.md\`; their credits live on the wiki), so their
art is deliberately **not** in our repo — no asset ships without attribution
(\`CONTENT_REFERENCE.md\` §14). To clear them:
\`cd tools && npm run wiki-credits -- --write\` (needs access to
wiki.tuxemon.org), review the diff, then \`npm run vendor-sheets\` and
\`npm run roster-credits\`.

${pending.map((s) => `\`${s}\``).join(" · ")}
`;

writeFileSync(join(REPO, "CREDITS_ROSTER.md"), md);
console.log(`CREDITS_ROSTER.md written: ${staged.length} staged, ${pending.length} pending.`);
