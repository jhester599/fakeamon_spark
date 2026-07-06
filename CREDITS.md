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

## In use

| Our name | File in our repo | Source in Tuxemon repo | Tuxemon name | Artist(s) | License |
|---|---|---|---|---|---|
| Growler (sprite) | `assets/sprites/growler.png` | `mods/tuxemon/gfx/sprites/battle/hissiorite-sheet.png` | Hissiorite | **⚠️ not listed in Tuxemon's own `ATTRIBUTIONS.md` — needs manual check of `wiki.tuxemon.org/Hissiorite` before any public release** | **⚠️ unconfirmed — do not distribute publicly until verified** |
| Whaley (sprite) | `assets/sprites/whaley.png` | `mods/tuxemon/gfx/sprites/battle/bigfin-sheet.png` | Bigfin | Cavalcadeur, rsg167 | CC BY-SA 4.0 |

**How these were made:** each source is a 128×88 sprite sheet containing two
large action poses plus a small 2-frame standing/idle pose. We cropped just
the standing pose (one frame), added a little transparent padding, and scaled
it 4× with nearest-neighbor (no blur) to get a crisp pixel-art portrait.

---

## Confirmed available, not yet pulled in

Everything below was checked against the actual repo (not just the wiki) and
exists at `mods/tuxemon/gfx/sprites/battle/<slug>-sheet.png` unless noted.
Full detail is in `DESIGN.md` §12.

**Starters:** Leafick ← Frondly *(⚠️ also not in Tuxemon's `ATTRIBUTIONS.md` — verify on wiki)*

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
