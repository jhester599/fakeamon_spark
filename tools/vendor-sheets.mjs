// ===========================================================================
//  vendor-sheets.mjs — copies battle sheets from the Tuxemon repo into
//  assets/sprites/battle/ for every monster that has a sheet-manifest.json
//  entry (i.e. verified attribution) but no sheet in our repo yet.
//
//      cd tools && npm run vendor-sheets
//
//  Clones Tuxemon shallow+sparse into a temp folder (needs network to
//  github.com), pinned to the same commit CREDITS.md references, copies the
//  missing sheets, and cleans up. Manifest-first on purpose: a sheet can't
//  arrive here without its attribution already recorded
//  (CONTENT_REFERENCE.md §14).
// ===========================================================================

import { execSync } from "node:child_process";
import { readFileSync, existsSync, copyFileSync, mkdtempSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const TOOLS = dirname(fileURLToPath(import.meta.url));
const DEST = join(TOOLS, "..", "assets", "sprites", "battle");
const PIN = "c34a9c72"; // the commit every CREDITS row references

const manifest = JSON.parse(readFileSync(join(TOOLS, "sheet-manifest.json"), "utf8"));
const missing = Object.keys(manifest).filter(
  (slug) => !slug.startsWith("_") && !existsSync(join(DEST, `${slug}-sheet.png`))
);

if (missing.length === 0) {
  console.log("Nothing to vendor — every manifest entry already has its sheet.");
  process.exit(0);
}
console.log(`${missing.length} sheet(s) to vendor: ${missing.join(", ")}\n`);

const tmp = mkdtempSync(join(tmpdir(), "tuxemon-"));
try {
  execSync(
    "git clone --depth 1 --filter=blob:none --sparse --branch development " +
      "https://github.com/Tuxemon/Tuxemon.git .",
    { cwd: tmp, stdio: "inherit" }
  );
  execSync("git sparse-checkout set mods/tuxemon/gfx/sprites/battle", { cwd: tmp });
  const head = execSync("git rev-parse --short HEAD", { cwd: tmp }).toString().trim();
  if (!head.startsWith(PIN.slice(0, 7))) {
    console.warn(`⚠️  Tuxemon's development branch has moved (now ${head}, pinned ${PIN}).`);
    console.warn("   Sheets are copied anyway; note the new SHA in CREDITS_ROSTER.md if any differ.");
  }
  let copied = 0;
  for (const slug of missing) {
    const src = join(tmp, "mods", "tuxemon", "gfx", "sprites", "battle", `${slug}-sheet.png`);
    if (existsSync(src)) {
      copyFileSync(src, join(DEST, `${slug}-sheet.png`));
      copied++;
    } else {
      console.warn(`✗ ${slug}: no sheet in Tuxemon repo?!`);
    }
  }
  console.log(`\nDone: ${copied} sheet(s) vendored. Now run: npm run roster-credits`);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
