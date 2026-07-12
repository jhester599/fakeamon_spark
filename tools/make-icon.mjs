// ===========================================================================
//  make-icon.mjs — compose a square PWA app icon from any sprite.
//
//  Run it from the tools/ folder (never in the browser):
//      cd tools && node make-icon.mjs ../assets/sprites/growler.png
//
//  Pads the source image onto a solid-color square (nearest-neighbor, so
//  pixel art stays crisp), then writes both sizes Android/Chrome want for
//  an installable PWA: assets/icons/icon-192.png and icon-512.png.
//
//  This is a PLACEHOLDER icon-maker — swap in whatever Lewis picks later by
//  re-running this against a different source image. See CREDITS.md for the
//  source sprite's attribution (this icon is a derived crop, same credit).
// ===========================================================================

import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const TOOLS = dirname(fileURLToPath(import.meta.url));
const OUT = join(TOOLS, "..", "assets", "icons");

const [, , sourcePath, backgroundColor] = process.argv;
if (!sourcePath) {
  console.error("Usage: node make-icon.mjs <path-to-source-image> [backgroundColor]");
  process.exit(1);
}

// [TUNE] Tuxemon battle sprites ship on an opaque white background (no real
// transparency around the character), so padding with any OTHER color shows
// as an ugly two-tone box. White keeps it seamless. Swap this default only
// if a future source sprite actually has real alpha transparency.
const BACKGROUND = backgroundColor || "#ffffff";
const SIZES = [192, 512];

mkdirSync(OUT, { recursive: true });

for (const size of SIZES) {
  // Pad the sprite onto a square background, leaving ~12% margin so it
  // doesn't touch the edges (Android sometimes crops icons into a circle).
  const inner = Math.round(size * 0.76);
  await sharp(sourcePath)
    .resize(inner, inner, { fit: "contain", background: BACKGROUND, kernel: "nearest" })
    .extend({
      top: Math.round((size - inner) / 2),
      bottom: Math.round((size - inner) / 2),
      left: Math.round((size - inner) / 2),
      right: Math.round((size - inner) / 2),
      background: BACKGROUND,
    })
    .resize(size, size) // extend() can be off by a pixel from rounding; snap to exact size
    .toFile(join(OUT, `icon-${size}.png`));
  console.log(`🖼️  icon-${size}.png`);
}

console.log("\nDone. Update CREDITS.md if the source sprite's attribution needs a line for the icon.");
