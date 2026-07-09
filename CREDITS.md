# Credits & Attribution

Fakeamon's starting art is based on sprites from the **[Tuxemon](https://github.com/Tuxemon/Tuxemon)**
project (`github.com/Tuxemon/Tuxemon`), used and edited under Creative Commons
licenses. **License is mixed per asset — always check the specific file**, not
a blanket assumption for the whole project. Our own code is not covered by
these licenses; only the art is.

Pulled from commit `c34a9c72` on the `development` branch (2026-07-06). If
Tuxemon's repo moves or renames a file later, that commit is where to find
the original again.

---

## Game engine

| What | File in our repo | Source | Version | License |
|---|---|---|---|---|
| Phaser (overworld game engine, M3+) | `assets/vendor/phaser.min.js` | [phaser.io](https://phaser.io) / `github.com/phaserjs/phaser` (via the npm `phaser` package) | 4.2.1 ("Giedi") | MIT — full text at `assets/vendor/phaser-LICENSE.md` |

Phaser is **vendored** (kept in the repo), not loaded from a CDN, so
double-clicking `index.html` still works offline and the exact version is
locked in (`DECISIONS.md`, M3 S1 decision). Only the overworld map uses it;
the battle screen is still plain HTML/CSS/JS.

---

## In use

| Our name | File in our repo | Source in Tuxemon repo | Tuxemon name | Artist(s) | License |
|---|---|---|---|---|---|
| Growler (sprite) | `assets/sprites/growler.png` | `mods/tuxemon/gfx/sprites/battle/hissiorite-sheet.png` | Hissiorite | princess-phoenix (per `wiki.tuxemon.org/Hissiorite`, confirmed via `CONTENT_REFERENCE.md` §13) | CC BY-SA 3.0 |
| Whaley (sprite) | `assets/sprites/whaley.png` | `mods/tuxemon/gfx/sprites/battle/bigfin-sheet.png` | Bigfin | Cavalcadeur, rsg167 | CC BY-SA 4.0 |
| Leafick (sprite) | `assets/sprites/leafick.png` | `mods/tuxemon/gfx/sprites/battle/frondly-sheet.png` | Frondly | Leo (original design), ReallyDarkandWindie (art), Levaine (sprites), Sanglorian (back sprite) (per `wiki.tuxemon.org/Frondly`, confirmed via `CONTENT_REFERENCE.md` §13) | CC BY-SA 3.0 |
| Growler (front/back/idle sprites) | `assets/sprites/{front,back,idle}/hissiorite.png` | `mods/tuxemon/gfx/sprites/battle/hissiorite-sheet.png` | Hissiorite | princess-phoenix | CC BY-SA 3.0 |
| Whaley (front/back/idle sprites) | `assets/sprites/{front,back,idle}/bigfin.png` | `mods/tuxemon/gfx/sprites/battle/bigfin-sheet.png` | Bigfin | Cavalcadeur, rsg167 | CC BY-SA 4.0 |
| Leafick (front/back/idle sprites) | `assets/sprites/{front,back,idle}/frondly.png` | `mods/tuxemon/gfx/sprites/battle/frondly-sheet.png` | Frondly | Leo (design), ReallyDarkandWindie (art), Levaine (sprites), Sanglorian (back sprite) | CC BY-SA 3.0 |
| Meadow terrain tiles | `assets/tilesets/terrain_george.png` | `mods/tuxemon/gfx/tilesets/Terrain_by_George.png` | "Terrain" | George_ (per Tuxemon `ATTRIBUTIONS.md`) | CC BY 3.0 |
| Meadow vegetation tiles | `assets/tilesets/vegetation_george.png` | `mods/tuxemon/gfx/tilesets/Vegetation_and_Outdoor_Fittings_by_George.png` | "Vegetation and outdoor fittings" | George_ (per Tuxemon `ATTRIBUTIONS.md`) | CC BY 3.0 |
| The Meadows tileset (composed) | `assets/tilesets/meadow.png` | derived from the two George tilesets above | — | tiles by George_; selection/composition ours | CC BY 3.0 (derived work, credit George_) |
| Hero (walk sheet) | `assets/sprites/player/hero.png` | `mods/tuxemon/sprites/adventurer.png` | Adventurer (overworld walk sheet) | Overland sprites by Catch Challenger, adapted by Sanglorian (full sheet also credits front sprite & art by Leo, small back sprite by tamashihoshi) — per `wiki.tuxemon.org/Adventurer` | CC BY-SA 3.0 (per `wiki.tuxemon.org/Adventurer`). ⚠️ Overland frames trace back to the Catch Challenger project — confirm its share-alike terms before a public deploy that features hero art. |

The unmodified source sheets for the three starters are also vendored at
`assets/sprites/battle/<slug>-sheet.png` (inputs for `tools/slice-sheets.mjs`)
— same credits as their rows above. The slicer regenerates attribution rows
for everything it cuts into `tools/credits-fragment.md`, so new creatures'
rows are generated, not hand-typed.

**Wild-roster sheets (staged 2026-07-06, not yet in the game):** the full
wild-encounter pool (`CONTENT_REFERENCE.md` §16 — now 198 monsters, after
`bearloch`/`foxko` were dropped for having no credit anywhere) lives in
`assets/sprites/battle/`, with the *generated* **`CREDITS_ROSTER.md`** as
its attribution ledger — **198 staged, 0 pending**. Three of them
(coaldiak, ninjasmine, toxiris) are ⚠️ OPMon-derived — confirm that
project's terms before they appear in the game.

**How the portraits were made:** each source sheet is 128×88: a large front
pose (64×64), a large back pose (64×64), and a small 2-frame standing/idle
pose (24×24 each). For the portrait PNGs we cropped one idle frame, added a
little transparent padding, and scaled it 4× with nearest-neighbor (no blur)
to get a crisp pixel-art portrait.

---

## Confirmed available, not yet pulled in

Everything below was checked against the actual repo (not just the wiki) and
exists at `mods/tuxemon/gfx/sprites/battle/<slug>-sheet.png` unless noted.
Full detail is in `DESIGN.md` §12.

**Legendary:** Artemis ← Djinnbo (Cavalcadeur, rsg167)

**Mini-bosses:** Banvengeance, Saurchin, Sharpfin, Gastronium, Tobishimi

**Gyms (standard/ace):** Allagon (Spalding004, Chickenshowman — CC BY-SA 4.0),
AV8R, Agnite, Windeye, Spectera, Eaglace

**Gym leaders (NPC trainer art — different folder, `mods/tuxemon/sprites/`):**
Goth → `goth.png`, Child Actor → `childactor.png`, Enforcer Boss → likely the
`boss.png` archetype (confirm exact color variant before use)

---

## Adding a new asset

When you pull in another sprite, add a row to the "In use" table above:
our name, the file path in our repo, the source path in Tuxemon's repo, the
Tuxemon name, the artist(s), and the license — copied from Tuxemon's own
`ATTRIBUTIONS.md` when it's listed there, or the matching `wiki.tuxemon.org`
page when it isn't.
