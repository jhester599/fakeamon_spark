# CONTENT_REFERENCE.md — Tuxemon Content Source Guide for Fakeamon Spark

<!-- ============================================================ -->
<!-- PREAMBLE FOR CLAUDE CODE — read this section first            -->
<!-- ============================================================ -->

## 📖 What this document is and how to use it

**Read this file whenever a task involves art, sound, creature data, or any
other asset that comes from outside this repo.** It is the single source of
truth for *where external content comes from and the rules for using it.*

**Context.** Fakeamon Spark is a father-and-son project: Jeff (drives the
repo) and Lewis (age 10, creative director). Rather than creating all
artwork, statistics, and creature designs from scratch, the project borrows
openly-licensed content from the **Tuxemon** open-source monster-catching
RPG (`github.com/Tuxemon/Tuxemon`). This document records that decision, why
the alternative (Pokémon Void) was rejected, exactly what Tuxemon offers,
where every useful file lives, and the licensing rules that keep this
publicly-deployed project safe to share.

**How this file relates to the other project docs:**

| Doc | Role | This file's relationship to it |
|---|---|---|
| `DESIGN.md` | Game design — the source of truth for *what we're building* | This file is the source of truth for *where borrowed content comes from*. If they conflict on game design, `DESIGN.md` wins. |
| `CLAUDE.md` | Working brief + current milestone | Read first every session, as usual. It may point here. |
| `CREDITS.md` | Attribution ledger of assets actually pulled in | Every file pulled using this document **must** get a `CREDITS.md` row (rules in §14). |
| `DECISIONS.md` | Decision log | Items marked **(proposed)** here are not decided until they go through the normal decision loop with Lewis/Jeff. |

**Hard rules when working from this document:**

1. **Never pull an asset without checking its license/attribution first**
   (§14). Tuxemon's licensing is per-asset, not blanket.
2. **Record the commit SHA** the asset was pulled from in `CREDITS.md`.
3. **Assets only, never engine code.** Tuxemon's Python code is GPL-3.0; we
   use Tuxemon as an art/data library, not a code source (§14, rule 4).
4. **Never pull anything from Pokémon Void** — inspiration only (§1).
5. The wild-encounter roster in §16 supplies Tuxemon **slugs, art, and
   data**; the Fakeamon-facing *names* are Lewis's to invent. Do not
   surface raw Tuxemon names to players without a rename pass.
6. Anything marked **(proposed)** or **[TO CONFIRM]** is a suggestion
   awaiting Jeff/Lewis sign-off — flag it, don't silently treat it as
   decided.

**Freshness.** Everything below was verified 2026-07-05 against a local
clone of Tuxemon's `development` branch at commit **`c34a9c7`**. If that
branch has moved significantly by the time you read this, re-verify paths
before bulk-pulling (the raw-URL pattern and clone commands are in §2).

<!-- ============================================================ -->
<!-- END PREAMBLE                                                  -->
<!-- ============================================================ -->

---
## 1. Decision: Tuxemon, not Pokémon Void

**Use Tuxemon as the content source. Do not pull assets or data from Pokémon Void.**

Both candidate sources were reviewed hands-on (both repos cloned and inspected file-by-file).

### Why Tuxemon wins

| Criterion | Tuxemon | Pokémon Void |
|---|---|---|
| **License — code** | GPL-3.0 (`LICENSE` at repo root) | **No license file anywhere in the repo** → default "all rights reserved" |
| **License — art** | Per-asset CC licenses (CC BY-SA 4.0/3.0, CC BY 3.0/4.0, some Public Domain), tracked in `ATTRIBUTIONS.md` (2,267 lines) + wiki pages | Unknown provenance for all 900+ sprites; no attribution anywhere |
| **Nintendo IP exposure** | None — fully original creatures, moves, items | **Severe** — official Pokémon move names *with official flavor text* (e.g. Megahorn's in-game description verbatim), official item sprites (Ultra Ball, Premier Ball, MooMoo Milk, TMs…), official trainer-class sprites (Bug Catcher, Lass, Fisherman), the Pokémon name/branding itself |
| **Data usable as game data** | Yes — 411 creatures, 274 moves, 225 items as clean, individually-parseable YAML files with a consistent schema | Partially — one 172 KB JS blob (`data-dex.js`, self-labeled "placeholder content") built for a wiki webapp, entangled with Nintendo move/item data |
| **Breadth beyond creatures** | Tilesets, overworld NPC/player sprites, technique animations, monster sound effects, music, fonts, maps, translations | Creature/trainer sprites and wiki data only |
| **Already integrated in our repo** | Yes — sprites vendored, `CREDITS.md` pinned to commit `c34a9c72`, all 15 creatures in `DESIGN.md` mapped to Tuxemon | No |

### The dealbreaker on Pokémon Void

Fakeamon Spark is **publicly deployed** on GitHub Pages. Pokémon Void is a fan
project built on Nintendo/Game Freak/The Pokémon Company IP: its move list
copies official move names and copyrighted description text, its `items/`
folder is full of ripped official item sprites, and its trainer art uses
official trainer classes. Nintendo actively enforces against fan projects.
Copying any of that into a public repo risks a DMCA takedown of the whole
project — and it's the wrong lesson for a project that's partly about teaching
Lewis how software gets built and shared. Even Void's ~110 original "fakemon"
(Tamatoo, Flaret, Terradua, …) carry **no license**, so we have no permission
to reuse their art or stats either.

### What Pokémon Void IS still good for

**Inspiration only — ideas, not files.** Lewis can browse
`pokemonvoid.github.io/#/pokedex` for naming vibes, stat-spread ideas, or
"what makes a cool dex page" UI ideas. Nothing gets copied into this repo:
no sprites, no data files, no text. If Lewis loves a *concept* from Void
("a creature that's a living meteor"), we redesign it from scratch with
Tuxemon art or original art.

---

## 2. Tuxemon: how to fetch content

- **Repo:** `https://github.com/Tuxemon/Tuxemon`, branch `development`
- **Pinned commit:** `c34a9c7` — record this (or the SHA at pull time) in `CREDITS.md` for every asset pulled
- **Everything useful lives under one folder:** `mods/tuxemon/`

**Raw-file URL pattern** (for `curl`/`wget` of a single file):

```
https://raw.githubusercontent.com/Tuxemon/Tuxemon/development/mods/tuxemon/<path>
# example:
https://raw.githubusercontent.com/Tuxemon/Tuxemon/development/mods/tuxemon/gfx/sprites/battle/frondly-sheet.png
```

**Bulk grab** (recommended when pulling many files — pin the commit):

```bash
git clone --depth 1 --branch development https://github.com/Tuxemon/Tuxemon.git
cd Tuxemon && git rev-parse --short HEAD   # record this SHA in CREDITS.md
```

**Wiki** (per-creature artist credits, design lore, evolution charts):
`https://wiki.tuxemon.org/<Name>` — e.g. `https://wiki.tuxemon.org/Bigfin`.
Wiki text content is CC BY-SA 3.0 (site-wide footer license).

---

## 3. Repo map — `mods/tuxemon/` (verified contents & counts)

```
mods/tuxemon/
├── db/                      ← ALL game data, one YAML file per thing
│   ├── monster/             411 creatures (slug.yaml)
│   ├── technique/           274 moves
│   ├── item/                225 items (incl. 29 tuxeball_*.yaml capture balls)
│   ├── element/             13 types incl. cosmic.yaml (!)
│   ├── shape/               shapes.yaml — base-stat archetypes (blob, brute, serpent…)
│   ├── npc/                 125 NPC definitions
│   ├── encounter/           wild-encounter tables per map area
│   ├── economy/             shop inventories/prices
│   ├── dialogue/            dialogue.yaml
│   ├── animation/, music/, sounds/, status/, environment/, weather/, …
├── gfx/
│   ├── sprites/battle/      412 monster battle sheets: <slug>-sheet.png (128×88, 2×2 grid)
│   ├── sprites/player/      playable-character walk sheets (many palette variants)
│   ├── sprites/flairs/      cosmetic monster variants
│   ├── items/               177 item icons (balls, potions, berries, apps…)
│   ├── tilesets/            96 overworld tileset PNGs (16×16, artist named in filename)
│   ├── ui/                  menus, borders, HP-bar chrome, element type icons
│   └── borders/, bubbles/   dialog boxes, emote bubbles
├── sprites/                 208 overworld NPC walk-cycle sheets (goth.png, childactor.png, boss.png…)
├── animations/
│   ├── technique/           193 frame-by-frame attack-effect PNG sequences
│   ├── item/                capture-ball animations
│   └── intro/, tileset/
├── sounds/
│   ├── monster/             ~150 creature cries (each with a reverse_* faint variant)
│   ├── technique/           29 attack SFX (flamethrower, zap, bite, freeze…)
│   ├── interface/           click/confirm/menu-select
│   ├── player/              step, jump, climb, throw
│   └── combat/, setting/
├── music/                   34 looping OGG tracks (chiptune/JRPG style)
├── font/                    PressStart2P.ttf, Pizel.ttf, Minimal3x5.ttf
├── maps/                    332 Tiled .tmx maps (reference for map structure)
└── l18n/en_US/LC_MESSAGES/base.po   ← ALL text: creature blurbs, move names, dialog
```

Repo root also has: `LICENSE` (GPL-3.0, applies to Tuxemon's *code*, which we
are NOT using) and `ATTRIBUTIONS.md` (per-asset artist + license, 2,267 lines —
**the first place to check before pulling any file**).

---

## 4. Creature data — `db/monster/<slug>.yaml`

One file per creature. Fields (verified against `bigfin.yaml`):

| Field | What it is | Useful to us? |
|---|---|---|
| `slug` | ID, matches sprite/sheet filenames | yes — the join key for everything |
| `types` | list of element slugs | yes — cross-check our type mapping |
| `shape` | stat archetype (see §5) | yes — free, balanced base stats |
| `moveset` | `technique` + `level_learned` list | yes — real level-up move progressions to borrow |
| `evolutions` / `history` | full evolution chains | yes — matches DESIGN.md §3 chains |
| `catch_rate`, `lower/upper_catch_resistance` | capture tuning | yes — real starting numbers for M2's capture formula |
| `txmn_id` | dex number | optional |
| `terrains`, `tags` | habitat/flavor tags | optional — encounter-table flavor for M3 |
| `sounds.combat_call` / `faint_call` | cry SFX slug | yes — maps into `sounds/monster/` |
| `height`, `weight`, `gender_weights` | flavor | optional |

Example — real catch rates we can seed M2 with: Hissiorite 100, Frondly 70,
Bigfin 70, Djinnbo 100 (we'd obviously override Artemis to uncatchable).

**Creature description blurbs** live in `l18n/en_US/LC_MESSAGES/base.po` as
`msgid "<slug>_description"` — e.g. Hissiorite's blurb describes super-heated
gas around its body; Frondly's describes its prehensile tail. Free Fakédex
flavor text for every creature we use (CC-licensed, credit the project).

## 5. Base stats — `db/shape/shapes.yaml`

Tuxemon doesn't store per-creature stats; each creature's `shape` maps to an
archetype stat block (`hp / melee / ranged / armour / dodge / speed`, roughly
"HP / Attack / Sp.Atk / Defense / Evasion / Speed"). One file, all shapes.
Our starters' shapes: Hissiorite = `serpent`, Frondly = `sprite`,
Bigfin = `leviathan`, Djinnbo = `humanoid`. We can either use the shape
blocks as ratio guides for our own 4-stat system or ignore them — DESIGN.md §5
already defines our stat blocks.

## 6. Moves — `db/technique/<slug>.yaml` (274 files)

Fields: `power`, `accuracy` (0–1), `types`, `range` (melee/ranged/touch),
`recharge` (their PP-less cooldown system — we skip it), `effects`
(damage/splash/status), `sort` (damage vs. status), `target` flags,
`visuals.animation` (→ §9 animation folder name), `sound.sfx` (→ §10).

Useful for us as a **catalog of real balanced numbers and names**. Notably:
`starfall.yaml` exists (Tobishimi's signature — DESIGN.md already references
it), and full elemental families (fire_ball, flamethrower, water_blast,
geyser, flood…). Our simple `power/accuracy/type` schema is a strict subset
of theirs, so any Tuxemon move converts trivially.

## 7. Types — `db/element/` (13 elements)

`normal, fire, water, wood, earth, metal, frost, lightning, sky, shadow, venom, heroic,` **`cosmic`**.

Each YAML has an icon path (`gfx/ui/icons/element/<slug>_type.png` — free type
badges for our UI) and a complete multiplier table vs. every other type.

**Important find for DESIGN.md §4:** Tuxemon already has a real **Cosmic**
element with its own icon and type chart. Our "Cosmic is a custom type we're
inventing for Artemis" note can be upgraded: the name, icon, and a reference
matchup table already exist. (Tuxemon's cosmic is 2× vs. heroic/venom only —
Lewis's "2× vs everything" rule stays our own house rule for Artemis.)

## 8. Items & capture balls — `db/item/` (225 files) + `gfx/items/` (177 icons)

- **29 ball variants** (`tuxeball*.yaml`): base ball costs 100, and there are
  themed balls (fire/water/wood/metal element balls, `tuxeball_grand`,
  `tuxeball_majestic`, gender balls, `tuxeball_ancient`…). Great structural
  reference for Lewis's 4-tier Fakeaball design (Fakeaball / Great / Ultra /
  Cosmic), and `gfx/items/tuxeball*.png` gives us distinct ball icons to
  recolor per tier.
- **Potions, berries, food** items + icons — direct art source for M4/M5
  (Tall Tower shop, Cooking Cabin dishes). `db/dialogue`, `db/economy` show
  shop price structures.
- Ball YAML includes capture `conditions`/`effects` and a `throwable` flag —
  conceptual reference for the M2 capture flow.

## 9. Graphics inventory

| Asset class | Path | Count | Notes |
|---|---|---|---|
| Monster battle sheets | `gfx/sprites/battle/<slug>-sheet.png` | 412 | 128×88 px, 2×2 grid: front + back pose, 2-frame idle each (~64×44/cell). Slice, then scale 3–4× nearest-neighbor. Already documented in DESIGN.md §12. |
| Monster cosmetic variants | `gfx/sprites/flairs/` | — | optional shiny-style variants |
| Player walk sheets | `gfx/sprites/player/` | many | multiple outfits + palette swaps — **M3 player character source** |
| Overworld NPC sheets | `sprites/` (top level, NOT gfx/) | 208 | walk cycles; our gym leaders map here: `goth.png`, `childactor.png`, `boss.png` archetype for Enforcer Boss |
| Item icons | `gfx/items/` | 177 | balls, potions, berries, phone apps |
| Tilesets | `gfx/tilesets/` | 96 | 16×16 overworld/interior tiles; artist in filename (e.g. `Cave_Tiles_by_ArMM1998…`, `Interiors by Redshrike.png`) — **M3 map source** |
| UI chrome | `gfx/ui/`, `gfx/borders/`, `gfx/menu-*.png` | — | menu frames, HP bars, element type icons, emote bubbles |
| Technique animations | `animations/technique/` | 193 sequences | numbered PNG frames per effect (flame, water shot, zap…); a move's `visuals.animation` names its folder — **M5 battle-effect polish** |
| Capture animations | `animations/item/` | 2 | ball throw/capture |

## 10. Audio inventory

| Asset class | Path | Count | Notes |
|---|---|---|---|
| Monster cries | `sounds/monster/` | ~150 (75 + reverse_* faint versions) | each creature's YAML names its cry; e.g. Bigfin → `sound_burble_02` |
| Attack SFX | `sounds/technique/` | 29 | flamethrower, zap, bite, freeze, bubble… |
| UI sounds | `sounds/interface/` | 4 | click, confirm, menu-select |
| Player sounds | `sounds/player/` | 6 | step, jump, climb, throw |
| Music | `music/` | 34 OGG loops | chiptune/JRPG: battle-ish (HHavok, Enter_the_Emperor), town-ish (All of Us, Come and Find Me)… listen and pick per scene. Check ATTRIBUTIONS.md per track (several are well-known CC artists, e.g. Eric Skiff's Resistor Anthems set) |

## 11. Maps (reference only)

332 Tiled `.tmx` maps in `maps/` + encounter tables in `db/encounter/`.
We're building our own overworld, but these are worked examples of
tile-layer structure, collision layers, and encounter-zone data if we adopt
Tiled/Phaser at M3.

---

## 12. Our creature roster → exact source paths

All battle sheets confirmed present at `mods/tuxemon/gfx/sprites/battle/`:

| Ours | Tuxemon slug | Battle sheet | Data file | Cry (per data file) |
|---|---|---|---|---|
| Growler | hissiorite | `battle/hissiorite-sheet.png` | `db/monster/hissiorite.yaml` | see yaml |
| → evo art | cobarett, pythonova | `battle/cobarett-sheet.png`, `battle/pythonova-sheet.png` | same pattern | |
| Whaley | bigfin | `battle/bigfin-sheet.png` | `db/monster/bigfin.yaml` | `sound_burble_02` |
| Leafick | frondly | `battle/frondly-sheet.png` | `db/monster/frondly.yaml` | see yaml |
| → pre-evo art | budaye | `battle/budaye-sheet.png` | | |
| Artemis | djinnbo | `battle/djinnbo-sheet.png` | `db/monster/djinnbo.yaml` | |
| Banvengeance | banvengeance | `battle/banvengeance-sheet.png` | `db/monster/banvengeance.yaml` | |
| Saurchin | saurchin | `battle/saurchin-sheet.png` | `db/monster/saurchin.yaml` | |
| Sharpfin | sharpfin | `battle/sharpfin-sheet.png` | `db/monster/sharpfin.yaml` | |
| Gastronium | gastronium | `battle/gastronium-sheet.png` | `db/monster/gastronium.yaml` | |
| Tobishimi | tobishimi | `battle/tobishimi-sheet.png` | `db/monster/tobishimi.yaml` | |
| Allagon | allagon | `battle/allagon-sheet.png` | `db/monster/allagon.yaml` | |
| AV8R | av8r | `battle/av8r-sheet.png` | `db/monster/av8r.yaml` | |
| Agnite | agnite | `battle/agnite-sheet.png` | `db/monster/agnite.yaml` | |
| Windeye | windeye | `battle/windeye-sheet.png` | `db/monster/windeye.yaml` | |
| Spectera | spectera | `battle/spectera-sheet.png` | `db/monster/spectera.yaml` | |
| Eaglace | eaglace | `battle/eaglace-sheet.png` | `db/monster/eaglace.yaml` | |
| Gym leaders (NPC art) | goth / childactor / boss | `mods/tuxemon/sprites/goth.png`, `childactor.png`, `boss.png` (+ color variants) | `db/npc/` | n/a |

Plus 390+ more creatures available in `db/monster/` whenever Lewis wants to
expand the roster — every one comes with a sheet, moveset, evolution chain,
catch rate, and (usually) a description blurb, ready to rename.

---

## 13. ✅ RESOLVED: the Hissiorite & Frondly attribution gap

`DESIGN.md` §12 and `CREDITS.md` flagged that Hissiorite and Frondly are
missing from Tuxemon's `ATTRIBUTIONS.md` and that the wiki needed a manual
check. **That check has now been done (2026-07-05, wiki pages fetched and
read):**

- **Hissiorite** (`wiki.tuxemon.org/Hissiorite`): *"Art and sprites by
  princess-phoenix."* First appeared via the artist's DeviantArt
  (`princess-phoenix/art/Hissiorite-892197800`). Wiki content is published
  under **CC BY-SA 3.0** (site-wide license on the page).
- **Frondly** (`wiki.tuxemon.org/Frondly`): *"Original design by Leo. Other
  art by ReallyDarkandWindie. Sprites by Levaine. Back sprite by
  Sanglorian."* Same wiki CC BY-SA 3.0 context.

**Action for next session:** update `CREDITS.md` — replace both ⚠️ warnings
with: Growler/Hissiorite → princess-phoenix, CC BY-SA 3.0 (per wiki);
Leafick/Frondly → Leo (design), ReallyDarkandWindie (art), Levaine (sprites),
Sanglorian (back sprite), CC BY-SA 3.0 (per wiki). Public distribution is
unblocked once that lands.

---

## 14. Licensing & attribution rules (the short version)

1. **Check `ATTRIBUTIONS.md` first** for any file pulled; if absent there,
   check the creature's/asset's `wiki.tuxemon.org` page. Never assume a
   blanket license — the repo genuinely mixes CC BY-SA 4.0, CC BY-SA 3.0,
   CC BY 3.0/4.0, and Public Domain per asset.
2. **Every pulled file gets a `CREDITS.md` row:** our name, our path, source
   path, Tuxemon name, artist(s), license, commit SHA pulled from.
3. **CC BY-SA is share-alike:** our *edited versions of those images* must
   remain under the same CC BY-SA license. Our **code is unaffected** — the
   obligation rides with the art only. Renaming a creature (Bigfin→Whaley)
   is fine; the art credit still points at the original.
4. **Tuxemon's GPL-3.0 covers its Python code.** We are using Tuxemon as an
   *asset and data library*, not forking its engine, so GPL doesn't touch our
   JS. Keep it that way: don't copy code out of the Tuxemon engine.
5. Music/sounds have their own per-file credits in `ATTRIBUTIONS.md`
   (several third-party CC artists) — same row-in-CREDITS.md rule applies.

---

## 15. What to pull, by milestone

| Milestone | Pull from Tuxemon |
|---|---|
| **M2 — Catching & Team** | `gfx/items/tuxeball*.png` (recolor into our 4 ball tiers); `catch_rate` values from our creatures' YAMLs to seed the capture formula; `animations/item/` capture animation (optional) |
| **M3 — Overworld** | `gfx/tilesets/` (start with Buch/George/ArMM1998 exterior+interior sets); `gfx/sprites/player/` hero walk sheet; slice the vendored battle sheets per DESIGN.md §12; `maps/*.tmx` as Tiled structure reference |
| **M4 — World Systems** | `sprites/goth.png`, `childactor.png`, `boss.png` (gym leaders); shop item icons from `gfx/items/`; `sounds/interface/` UI sounds; a town + battle track from `music/` |
| **M5 — Depth & Story** | evolution-stage sheets (cobarett, pythonova, budaye); berry/food icons from `gfx/items/`; `animations/technique/` battle effects; monster cries from `sounds/monster/`; description blurbs from `l18n/en_US/LC_MESSAGES/base.po` |

---

## 16. Wild encounter roster — 200 Tuxemon selected (~50% of the dex)

For the overworld (M3+), **200 of Tuxemon's 411 monsters** are approved as
the wild-encounter candidate pool. They were selected programmatically from
the pinned clone using these criteria:

1. **Roster exclusion** — the 17 creatures already cast in `DESIGN.md`
   (starters, evolutions, Artemis, mini-bosses, gym monsters) *and every
   member of their evolution families* are excluded (42 monsters total), so
   no wild encounter ever re-uses a sprite the player knows as a named
   character. (This generalizes Lewis's Dollfin decision in `DESIGN.md` §3.)
2. **Complete evolution lines only** — families are selected whole, never
   partially, so every wild catch can evolve fully. The result: 92 lines —
   28 three-stage, 52 two-stage, 12 standalone.
3. **Complete data** — every selected monster has a battle sprite sheet, a
   full moveset, a catch rate, and an English description blurb in
   `l18n/en_US/LC_MESSAGES/base.po` (200/200 verified).
4. **Type balance** — every Fire-family monster available was taken (Fire is
   Tuxemon's scarcest core type after exclusions); the other types were
   sampled proportionally to reach 200.

### Type remapping for wild monsters (proposed — needs Jeff/Lewis sign-off)

`DESIGN.md` §4 maps Fire/Water/Wood/Metal directly and says other Tuxemon
elements are "flavor only." For monsters whose *primary* type is one of
those unmapped elements, this roster uses the following fallback:

| Tuxemon primary element | → Our type | Logic |
|---|---|---|
| earth | Grass | ground/nature theme |
| frost | Water | ice ≈ frozen water |
| lightning | Metal | tech/energy theme |
| venom | Grass | plants & poisons |
| sky, shadow, heroic, cosmic | Normal | no clean fit; **cosmic stays Artemis-exclusive** per `DESIGN.md`, so cosmic-typed wild monsters are re-flavored |

A monster with *any* directly-mapped type (fire/water/wood/metal/normal)
uses that type first; the fallback applies only when none is present.
**[TO CONFIRM: this table, with Lewis — it changes which monsters count as
which type in the wild.]**

### How to use this roster

- Each line below lists **Tuxemon slugs** in evolution order (basic → final).
  Sprite: `gfx/sprites/battle/<slug>-sheet.png`. Data:
  `db/monster/<slug>.yaml`. Blurb: `msgid "<slug>_description"` in the po file.
- **Lewis names them.** Slugs are working IDs; player-facing Fakeamon names
  come from Lewis's rename pass (can happen gradually, area by area).
- Encounter tables (which lines appear in which map area, and at what rate)
  are an M3 design task — `db/encounter/*.yaml` in Tuxemon shows a good
  data shape to imitate.
- When a line is actually wired into the game, pull its sheets, add
  `CREDITS.md` rows per §14, and check `ATTRIBUTIONS.md`/wiki for artists.

### The 200 — grouped by our (proposed) type

### Fire — 34 monsters, 18 evolution lines

| Evolution line (Tuxemon slugs, basic → final) | Tuxemon type(s) | Blurbs |
|---|---|---|
| `cardiling` → `cardiwing` → `cardinale` | fire, sky | ✅ |
| `devidin` → `devidra` → `deviraptor` | earth, fire | ✅ |
| `furnursus` → `statursus` → `coaldiak` | cosmic, fire, normal | ✅ |
| `ignibus` → `embazook` → `eruptibus` | earth, fire, metal | ✅ |
| `bursa` → `flambear` | cosmic, fire | ✅ |
| `embra` → `ruption` | fire | ✅ |
| `flounce` → `knindling` | fire | ✅ |
| `forturtle` → `prophetoise` | cosmic, fire | ✅ |
| `foxfire` → `vulpyre` | fire | ✅ |
| `metesaur` → `qetzlrokilus` | earth, fire | ✅ |
| `pantherafira` → `criniotherme` | fire, normal | ✅ |
| `thumpurn` → `volconey` | fire, normal | ✅ |
| `agnsher` | fire, water | ✅ |
| `drokoro` | fire | ✅ |
| `foxko` | fire, wood | ✅ |
| `mingdyn` | fire, sky | ✅ |
| `primordia` | fire, frost | ✅ |
| `solight` | cosmic, fire | ✅ |

### Water — 29 monsters, 12 evolution lines

| Evolution line (Tuxemon slugs, basic → final) | Tuxemon type(s) | Blurbs |
|---|---|---|
| `fluoresfin` → `incandesfin` → `lightmare` | lightning, water | ✅ |
| `gupphish` → `gupphire` → `golnagi` | fire, water | ✅ |
| `kroki` → `krokivip` → `leviadile` | venom, water | ✅ |
| `lesmagu` → `shelagu` → `crustagu` | earth, venom, water | ✅ |
| `nebufin` → `galasces` → `novaquarius` | venom, water | ✅ |
| `axolightl` → `ampystoma` | lightning, water | ✅ |
| `chillimp` → `snowrilla` | frost, heroic | ✅ |
| `eskipup` → `houndice` | frost | ✅ |
| `jelillow` → `bedoo` | water | ✅ |
| `nostray` → `shnark` | water | ✅ |
| `nudiflot_female` → `nudimind` | cosmic, water | ✅ |
| `nudiflot_male` → `nudikill` | venom, water | ✅ |

### Grass — 55 monsters, 22 evolution lines

| Evolution line (Tuxemon slugs, basic → final) | Tuxemon type(s) | Blurbs |
|---|---|---|
| `anoleaf` → `gectile` → `velocitile` | wood | ✅ |
| `chloragon` → `sapragon` → `dragarbor` | cosmic, wood | ✅ |
| `cohldrabi` → `lettice` → `frostuce` | frost, wood | ✅ |
| `fordin` → `stegofor` → `brachifor` | wood | ✅ |
| `helipi` → `coppi` → `parappi` | sky, wood | ✅ |
| `hoarse` → `equill` → `hoarseshoo` | normal, shadow, venom | ✅ |
| `imbrickcile` → `bricgard` → `brickhemoth` | earth, heroic | ✅ |
| `lambert` → `legko` → `moloch` | heroic, wood | ✅ |
| `rockitten` → `rockat` → `jemuar` | cosmic, earth | ✅ |
| `rosarin` → `toxiris` → `ninjasmine` | venom, wood | ✅ |
| `scarlant` → `shull` → `myrmison` | earth, heroic | ✅ |
| `babysnitch` → `baddrscratch` | earth, normal, shadow | ✅ |
| `baoby` → `baobaraffe` | wood | ✅ |
| `burrlock` → `cacaburr` | wood | ✅ |
| `claymorior` → `regalance` | earth, heroic | ✅ |
| `dandicub` → `dandylion` | wood | ✅ |
| `duggot` → `breem` | venom, wood | ✅ |
| `hoodoll` → `wolololl` | venom, wood | ✅ |
| `potturmeist` → `potturney` | earth, shadow | ✅ |
| `selket` → `selmatek` | earth, venom | ✅ |
| `shybulb` → `narcileaf` | wood | ✅ |
| `tumbleworm` → `tumblebee` | venom | ✅ |

### Metal — 34 monsters, 18 evolution lines

| Evolution line (Tuxemon slugs, basic → final) | Tuxemon type(s) | Blurbs |
|---|---|---|
| `cataspike` → `puparmor` → `weavifly` | metal, sky, venom | ✅ |
| `grintot` → `grinflare` → `grintrock` | earth, fire, lightning | ✅ |
| `nut` → `bolt` → `arthrobolt` | lightning, metal | ✅ |
| `pythwire` → `ouroboutlet` → `sockeserp` | lightning, metal | ✅ |
| `boltnu` → `exclawvate` | metal | ✅ |
| `bumbulus` → `nimbulex` | lightning, sky | ✅ |
| `grimachin` → `tigrock` | metal | ✅ |
| `merlicun` → `firomenis` | cosmic, metal, normal | ✅ |
| `sprorm` → `sphake` | metal | ✅ |
| `tetrchimp` → `apeoro` | cosmic, lightning | ✅ |
| `virware` → `trojerror` | cosmic, metal | ✅ |
| `woodoor` → `blasdoor` | metal, wood | ✅ |
| `bearloch` | metal, wood | ✅ |
| `chrome_robo` | metal | ✅ |
| `dark_robo` | metal | ✅ |
| `hydrone` | metal, water | ✅ |
| `pigabyte` | metal, normal | ✅ |
| `xeon` | metal | ✅ |

### Normal — 48 monsters, 22 evolution lines

| Evolution line (Tuxemon slugs, basic → final) | Tuxemon type(s) | Blurbs |
|---|---|---|
| `cackleen` → `brumi` → `bewhich` | cosmic, shadow | ✅ |
| `elofly` → `elowind` → `elostorm` | normal, sky | ✅ |
| `flacono` → `corvix` → `gryfix` | sky | ✅ |
| `vamporm` → `dracune` → `fluttaflap` | shadow, sky, venom | ✅ |
| `aardorn` → `aardart` | normal | ✅ |
| `cairfrey` → `possessun` | normal, shadow | ✅ |
| `caper` → `crankus` | frost, normal | ✅ |
| `capiti` → `capinyah` | heroic, normal | ✅ |
| `chenipode` → `exapode` | normal | ✅ |
| `chickadee` → `birdee` | normal, sky | ✅ |
| `eyenemy` → `eyesore` | cosmic | ✅ |
| `flummby` → `flummack` | cosmic | ✅ |
| `fuzzlet` → `fuzzina` | cosmic, normal | ✅ |
| `hatchling` → `birdling` | sky | ✅ |
| `komodraw` → `komoduel` | normal | ✅ |
| `marvillar` → `marvantis` | normal, sky | ✅ |
| `noctula` → `noctalo` | shadow, sky | ✅ |
| `pairagrin` → `pairagrim` | sky | ✅ |
| `pickoon` → `raccscal` | normal | ✅ |
| `pipis` → `strella` | normal, sky | ✅ |
| `skwib` → `octabode` | earth, normal | ✅ |
| `snaki` → `snokari` | normal | ✅ |

---

## Appendix — Pokémon Void inspection notes (for the record)

Cloned `github.com/pokemonvoid/pokemonvoid.github.io` and inspected:
- `wiki/data-dex.js` (172 KB): ~110 custom creatures, 20 types (18 official
  Pokémon types + LIGHT + COSMIC), 6-stat blocks. Header comment self-labels
  it "placeholder content."
- `wiki/data-game.js` (280 KB): moves/abilities/items — official Pokémon
  move names with official flavor text (confirmed: Megahorn, Attack Order…);
  `scripts/parse_moves.py` shows they were parsed in from game data.
- `items/` — official Pokémon item sprites (ULTRABALL, MOOMOOMILK,
  PREMIERBALL, TM discs…). `trainers/` — official trainer classes.
- `sprites/` — 912 files, 160×160 px, front/back/shiny/icon variants for the
  custom dex. No artist credits.
- **No LICENSE, README, CREDITS, or ATTRIBUTIONS file anywhere.**

Conclusion: creatively interesting, legally unusable. Inspiration only.
