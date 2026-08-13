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
| Allagon (Gym 1 standard) (front/back/idle sprites) | `assets/sprites/{front,back,idle}/allagon.png` | `mods/tuxemon/gfx/sprites/battle/allagon-sheet.png` | Allagon | Spalding004, Chickenshowman | CC BY-SA 4.0 (per Tuxemon ATTRIBUTIONS.md) |
| Meadow terrain tiles | `assets/tilesets/terrain_george.png` | `mods/tuxemon/gfx/tilesets/Terrain_by_George.png` | "Terrain" | George_ (per Tuxemon `ATTRIBUTIONS.md`) | CC BY 3.0 |
| Meadow vegetation tiles | `assets/tilesets/vegetation_george.png` | `mods/tuxemon/gfx/tilesets/Vegetation_and_Outdoor_Fittings_by_George.png` | "Vegetation and outdoor fittings" | George_ (per Tuxemon `ATTRIBUTIONS.md`) | CC BY 3.0 |
| The Meadows tileset (composed) | `assets/tilesets/meadow.png` | derived from the two George tilesets above; its nine WATER tiles are added by `tools/add-meadow-water-tiles.mjs` | — | tiles by George_; selection/composition ours | CC BY 3.0 (derived work, credit George_) |
| The Lagoon tileset (composed + recoloured) | `assets/tilesets/lagoon.png` | derived from the two George tilesets above — built by `tools/make-lagoon-tileset.mjs`, whose RECIPE list names every source tile and whose MOOD block darkens the result to blue/black | — | tiles by George_; selection, composition and recolour ours | CC BY 3.0 (derived work, credit George_) |
| Hero (walk sheet) | `assets/sprites/player/hero.png` | `mods/tuxemon/sprites/adventurer.png` | Adventurer (overworld walk sheet) | Overland sprites by Catch Challenger, adapted by Sanglorian (full sheet also credits front sprite & art by Leo, small back sprite by tamashihoshi) — per `wiki.tuxemon.org/Adventurer` | CC BY-SA 3.0 (per `wiki.tuxemon.org/Adventurer`). ⚠️ Overland frames trace back to the Catch Challenger project — confirm its share-alike terms before a public deploy that features hero art. |
| Aardorn *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/aardorn.png` | `mods/tuxemon/gfx/sprites/battle/aardorn-sheet.png` | Aardorn | Magic-Purple-Hermit | CC BY-SA 3.0 (per Tuxemon ATTRIBUTIONS.md) |
| Baoby *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/baoby.png` | `mods/tuxemon/gfx/sprites/battle/baoby-sheet.png` | Baoby | Name, art, sprites and blurb by princess-phoenix | CC BY-SA 3.0 (per wiki.tuxemon.org/Baoby) |
| Capiti *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/capiti.png` | `mods/tuxemon/gfx/sprites/battle/capiti-sheet.png` | Capiti | Catch Challenger | CC BY-SA 4.0 (per Tuxemon ATTRIBUTIONS.md) |
| Chenipode *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/chenipode.png` | `mods/tuxemon/gfx/sprites/battle/chenipode-sheet.png` | Chenipode | Original design and sprites by Catch Challenger; Face sprites tweaked by Sanglorian | CC BY-SA 3.0 (per wiki.tuxemon.org/Chenipode) |
| Chickadee *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/chickadee.png` | `mods/tuxemon/gfx/sprites/battle/chickadee-sheet.png` | Chickadee | Front sprite by Isaiah658; Back and face sprites by Jaskrendix; Alternative sprites by Isaiah658 | CC BY-SA 3.0 (per wiki.tuxemon.org/Chickadee) |
| Dandicub *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/dandicub.png` | `mods/tuxemon/gfx/sprites/battle/dandicub-sheet.png` | Dandicub | Original design and sprites by Sanglorian; Art by slickedbackArtisan | CC BY-SA 3.0 (per wiki.tuxemon.org/Dandicub) |
| Hatchling *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/hatchling.png` | `mods/tuxemon/gfx/sprites/battle/hatchling-sheet.png` | Hatchling | Original design and sprites by tamashihoshi | CC BY-SA 3.0 (per wiki.tuxemon.org/Hatchling) |
| Lambert *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/lambert.png` | `mods/tuxemon/gfx/sprites/battle/lambert-sheet.png` | Lambert | Sanglorian | CC BY-SA 4.0 (per Tuxemon ATTRIBUTIONS.md) |
| Marvillar *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/marvillar.png` | `mods/tuxemon/gfx/sprites/battle/marvillar-sheet.png` | Marvillar | Original design and sprite by Georg Eckert; Front, back and face sprites by HippasusTwo | CC BY-SA 3.0 (per wiki.tuxemon.org/Marvillar) |
| Pairagrin *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/pairagrin.png` | `mods/tuxemon/gfx/sprites/battle/pairagrin-sheet.png` | Pairagrin | Art by tamashihoshi | CC BY-SA 3.0 (per wiki.tuxemon.org/Pairagrin) |
| Pantherafira *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/pantherafira.png` | `mods/tuxemon/gfx/sprites/battle/pantherafira-sheet.png` | Pantherafira | Original design and sprites by Catch Challenger; Face sprites tweaked by Sanglorian; Alternative sprites by HippasusTwo | CC BY-SA 3.0 (per wiki.tuxemon.org/Pantherafira) |
| Shybulb *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/shybulb.png` | `mods/tuxemon/gfx/sprites/battle/shybulb-sheet.png` | Shybulb | Original design and sprites by Spalding004; Back sprites by Sanglorian; Face sprites tweaked by Sanglorian | CC BY-SA 3.0 (per wiki.tuxemon.org/Shybulb) |
| Snaki *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/snaki.png` | `mods/tuxemon/gfx/sprites/battle/snaki-sheet.png` | Snaki | Original design and front and back sprites by Catch Challenger; Face sprites tweaked from back sprite by Sanglorian | CC BY-SA 3.0 (per wiki.tuxemon.org/Snaki) |
| Tumbleworm *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/tumbleworm.png` | `mods/tuxemon/gfx/sprites/battle/tumbleworm-sheet.png` | Tumbleworm | tamashihoshi | CC BY-SA 4.0 (per Tuxemon ATTRIBUTIONS.md) |
| Axolightl *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/axolightl.png` | `mods/tuxemon/gfx/sprites/battle/axolightl-sheet.png` | axolightl | Cavalcadeur, josepharaoh99 | CC BY-SA 4.0 (per Tuxemon ATTRIBUTIONS.md) |
| Claymorior *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/claymorior.png` | `mods/tuxemon/gfx/sprites/battle/claymorior-sheet.png` | claymorior | Design and original sprite by JustinNuggets and Piacarrot | CC BY-SA 3.0 (per wiki.tuxemon.org/Claymorior) |
| Fluoresfin *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/fluoresfin.png` | `mods/tuxemon/gfx/sprites/battle/fluoresfin-sheet.png` | fluoresfin | Original design and sprites by Serpexnessie | CC BY-SA 3.0 (per wiki.tuxemon.org/Fluoresfin) |
| Gupphish *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/gupphish.png` | `mods/tuxemon/gfx/sprites/battle/gupphish-sheet.png` | gupphish | Design and original sprite by JustinNuggets and Piacarrot; Face sprites by Jaskrendix | CC BY-SA 3.0 (per wiki.tuxemon.org/Gupphish) |
| Jelillow *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/jelillow.png` | `mods/tuxemon/gfx/sprites/battle/jelillow-sheet.png` | jelillow | Art and design by TheBritanniaRegion; Sprites by Lejun | CC BY-SA 3.0 (per wiki.tuxemon.org/Jelillow) |
| Kroki *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/kroki.png` | `mods/tuxemon/gfx/sprites/battle/kroki-sheet.png` | kroki | Designed and sprited by Georg Eckert; Face sprites by Jaskrendix; Backsprite by HippasusTwo | CC BY-SA 3.0 (per wiki.tuxemon.org/Kroki) |
| Lesmagu *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/lesmagu.png` | `mods/tuxemon/gfx/sprites/battle/lesmagu-sheet.png` | lesmagu | Art by BrasioPkmn; Sprites by Jaskrendix | CC BY-SA 3.0 (per wiki.tuxemon.org/Lesmagu) |
| Nebufin *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/nebufin.png` | `mods/tuxemon/gfx/sprites/battle/nebufin-sheet.png` | nebufin | Design and front sprite by Serpexnessie; Back and face sprites adapted by Jaskrendix | CC BY-SA 3.0 (per wiki.tuxemon.org/Nebufin) |
| Nostray *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/nostray.png` | `mods/tuxemon/gfx/sprites/battle/nostray-sheet.png` | nostray | Sanglorian | CC BY-SA 4.0 (per Tuxemon ATTRIBUTIONS.md) |
| Nudiflot (dreamy) *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/nudiflot_female.png` | `mods/tuxemon/gfx/sprites/battle/nudiflot_female-sheet.png` | nudiflot_female | Sanglorian | CC BY-SA 4.0 (per Tuxemon ATTRIBUTIONS.md) |
| Nudiflot (fierce) *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/nudiflot_male.png` | `mods/tuxemon/gfx/sprites/battle/nudiflot_male-sheet.png` | nudiflot_male | Sanglorian | CC BY-SA 4.0 (per Tuxemon ATTRIBUTIONS.md) |
| Skwib *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/skwib.png` | `mods/tuxemon/gfx/sprites/battle/skwib-sheet.png` | skwib | Designed and illustrated by fauxlens; Sprites by Sanglorian | CC BY-SA 3.0 (per wiki.tuxemon.org/Skwib) |
| AV8R (front/back/idle sprites) — Gym 1 ace | `assets/sprites/{front,back,idle}/av8r.png` | `mods/tuxemon/gfx/sprites/battle/av8r-sheet.png` | av8r | Leo (design), Sanglorian (sprite) | CC BY-SA 4.0 — ⚠️ assumed consistent with the rest of the Tuxemon battle set. `av8r` has **no** monster entry in Tuxemon's `ATTRIBUTIONS.md`, and `wiki.tuxemon.org` was down (HTTP 500) on 2026-07-25. Artists inferred from the "Aviator" *trainer* entry in `ATTRIBUTIONS.md` ("Front sprite by Sanglorian from the AV8R design by Leo"), which is a different asset. Recheck the wiki page before a public deploy. |
| Anoleaf *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/anoleaf.png` | `mods/tuxemon/gfx/sprites/battle/anoleaf-sheet.png` | Anoleaf | Spalding004 | CC BY-SA 4.0 |
| Gectile *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/gectile.png` | `mods/tuxemon/gfx/sprites/battle/gectile-sheet.png` | Gectile | Spalding004 | CC BY-SA 4.0 |
| Babysnitch *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/babysnitch.png` | `mods/tuxemon/gfx/sprites/battle/babysnitch-sheet.png` | Babysnitch | Art by DarkMilkyWay1701 | CC BY-SA 3.0 |
| Baddrscratch *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/baddrscratch.png` | `mods/tuxemon/gfx/sprites/battle/baddrscratch-sheet.png` | Baddrscratch | Art by DarkMilkyWay1701 | CC BY-SA 3.0 |
| Burrlock *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/burrlock.png` | `mods/tuxemon/gfx/sprites/battle/burrlock-sheet.png` | Burrlock | Front sprite by Isaiah658; Back and face sprites by Jaskrendix; Alternative sprites by Isaiah658 | CC BY-SA 3.0 |
| Cacaburr *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/cacaburr.png` | `mods/tuxemon/gfx/sprites/battle/cacaburr-sheet.png` | Cacaburr | Front sprite by Isaiah658; Back and face sprites by Jaskrendix; Alternative sprites by Isaiah658 | CC BY-SA 3.0 |
| Chloragon *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/chloragon.png` | `mods/tuxemon/gfx/sprites/battle/chloragon-sheet.png` | Chloragon | Spalding004 | CC BY-SA 4.0 |
| Sapragon *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/sapragon.png` | `mods/tuxemon/gfx/sprites/battle/sapragon-sheet.png` | Sapragon | Spalding004 | CC BY-SA 4.0 |
| Duggot *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/duggot.png` | `mods/tuxemon/gfx/sprites/battle/duggot-sheet.png` | Duggot | Designed and sprited by Georg Eckert | CC BY-SA 3.0 |
| Breem *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/breem.png` | `mods/tuxemon/gfx/sprites/battle/breem-sheet.png` | Breem | Designed and sprited by Georg Eckert; Design Origin=Inspired by parasitic worms, to explain why the original creator had a worm evolving into a bee | CC BY-SA 3.0 |
| Flounce *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/flounce.png` | `mods/tuxemon/gfx/sprites/battle/flounce-sheet.png` | Flounce | Back sprite by HippasusTwo; Face sprites by Jaskrendix | CC BY-SA 3.0 |
| Knindling *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/knindling.png` | `mods/tuxemon/gfx/sprites/battle/knindling-sheet.png` | Knindling | Back sprite by HappisusTwo; Face sprites by Jaskrendix | CC BY-SA 3.0 |
| Foxfire *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/foxfire.png` | `mods/tuxemon/gfx/sprites/battle/foxfire-sheet.png` | Foxfire | Sanglorian | CC BY-SA 4.0 |
| Vulpyre *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/vulpyre.png` | `mods/tuxemon/gfx/sprites/battle/vulpyre-sheet.png` | Vulpyre | Design by Leo; Sprites by HippasusTwo | CC BY-SA 3.0 |
| Scarlant *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/scarlant.png` | `mods/tuxemon/gfx/sprites/battle/scarlant-sheet.png` | Scarlant | Design and front and back sprites by WDFA-Final; Front, back and face sprites by HippasusTwo | CC BY-SA 3.0 |
| Shull *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/shull.png` | `mods/tuxemon/gfx/sprites/battle/shull-sheet.png` | Shull | Design and front and back sprites by WDFA-Final; Front, back and face sprites by HippasusTwo | CC BY-SA 3.0 |
| Boltnu *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/boltnu.png` | `mods/tuxemon/gfx/sprites/battle/boltnu-sheet.png` | Boltnu | Design and art by TheBritanniaRegion; Sprites by Involuntary Twitch | CC BY-SA 3.0 |
| Exclawvate *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/exclawvate.png` | `mods/tuxemon/gfx/sprites/battle/exclawvate-sheet.png` | Exclawvate | Design and art by TheBritanniaRegion; Sprites by Involuntary Twitch | CC BY-SA 3.0 |
| Cataspike *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/cataspike.png` | `mods/tuxemon/gfx/sprites/battle/cataspike-sheet.png` | Cataspike | Original design and sprites by Spalding004; Face sprites tweaked by Sanglorian | CC BY-SA 3.0 |
| Puparmor *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/puparmor.png` | `mods/tuxemon/gfx/sprites/battle/puparmor-sheet.png` | Puparmor | Original design and sprites by Spalding004; Face sprites by Sanglorian | CC BY-SA 3.0 |
| Pythwire *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/pythwire.png` | `mods/tuxemon/gfx/sprites/battle/pythwire-sheet.png` | Pythwire | Original design and sprites by Serpexnessie | CC BY-SA 3.0 |
| Ouroboutlet *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/ouroboutlet.png` | `mods/tuxemon/gfx/sprites/battle/ouroboutlet-sheet.png` | Ouroboutlet | Original design and sprites by Serpexnessie | CC BY-SA 3.0 |
| Embra *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/embra.png` | `mods/tuxemon/gfx/sprites/battle/embra-sheet.png` | Embra | Original design and sprites by Spalding004; Back sprite by Sanglorian | CC BY-SA 3.0 |
| Ruption *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/ruption.png` | `mods/tuxemon/gfx/sprites/battle/ruption-sheet.png` | Ruption | Original design and sprites by Spalding004; Back sprite by Sanglorian; Face sprites tweaked by Sanglorian | CC BY-SA 3.0 |
| Grimachin *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/grimachin.png` | `mods/tuxemon/gfx/sprites/battle/grimachin-sheet.png` | Grimachin | Design and artwork by Leo; Sprites by Sanglorian | CC BY-SA 3.0 |
| Tigrock *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/tigrock.png` | `mods/tuxemon/gfx/sprites/battle/tigrock-sheet.png` | Tigrock | Original design and sprites by Leo | CC BY-SA 3.0 |
| Virware *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/virware.png` | `mods/tuxemon/gfx/sprites/battle/virware-sheet.png` | Virware | Design and front sprite by Serpexnessie; Back and face sprites adapted by Jaskrendix | CC BY-SA 3.0 |
| Trojerror *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/trojerror.png` | `mods/tuxemon/gfx/sprites/battle/trojerror-sheet.png` | Trojerror | Design and front sprite by Serpexnessie; Face sprites adapted by Jaskrendix | CC BY-SA 3.0 |
| Ignibus *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/ignibus.png` | `mods/tuxemon/gfx/sprites/battle/ignibus-sheet.png` | Ignibus | Originally design by Cavalcadeur; Other art by Leo; Front sprite by Leo; Back and face sprites by Sanglorian | CC BY-SA 3.0 |
| Embazook *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/embazook.png` | `mods/tuxemon/gfx/sprites/battle/embazook-sheet.png` | Embazook | Original design by Leo; Front sprite by josepharaoh99; Other sprites by Sanglorian | CC BY-SA 3.0 |
| Nut *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/nut.png` | `mods/tuxemon/gfx/sprites/battle/nut-sheet.png` | Nut | TacoBot | Public Domain |
| Bolt *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/bolt.png` | `mods/tuxemon/gfx/sprites/battle/bolt-sheet.png` | Bolt | TacoBot | Public Domain |
| Sharpfin (mini-boss) (front/back/idle sprites) | `assets/sprites/{front,back,idle}/sharpfin.png` | `mods/tuxemon/gfx/sprites/battle/sharpfin-sheet.png` | Sharpfin | not recorded upstream — Tuxemon's `ATTRIBUTIONS.md` lists the artist as "N/A"; credit the Tuxemon project | CC BY-SA 4.0 (per Tuxemon ATTRIBUTIONS.md) |
| Artemis (final boss) (front/back/idle sprites) | `assets/sprites/{front,back,idle}/djinnbo.png` | `mods/tuxemon/gfx/sprites/battle/djinnbo-sheet.png` | Djinnbo | Cavalcadeur, rsg167 | CC BY-SA 4.0 (per Tuxemon ATTRIBUTIONS.md) |
| The Forest tileset (composed + recoloured) | `assets/tilesets/forest.png` | derived from the two George tilesets — built by `tools/make-area-tilesets.mjs`, whose RECIPE names every source tile and whose "forest" MOOD dial darkens it to deep green | — | tiles by George_; selection, composition and recolour ours | CC BY 3.0 (derived work, credit George_) |
| The Factory tileset (composed + recoloured) | `assets/tilesets/factory.png` | derived from the two George tilesets — same script, "factory" MOOD dial (rust and dead ground) | — | tiles by George_; selection, composition and recolour ours | CC BY 3.0 (derived work, credit George_) |
| Deviraptor *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/deviraptor.png` | `mods/tuxemon/gfx/sprites/battle/deviraptor-sheet.png` | Deviraptor | Designed and sprited by Georg Eckert; Front and back by HippasusTwo, face sprites by Jaskrendix | CC BY-SA 3.0 (per wiki.tuxemon.org/Deviraptor) |
| Leviadile *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/leviadile.png` | `mods/tuxemon/gfx/sprites/battle/leviadile-sheet.png` | Leviadile | Designed and sprited by Georg Eckert | CC BY-SA 3.0 (per wiki.tuxemon.org/Leviadile) |
| Dragarbor *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/dragarbor.png` | `mods/tuxemon/gfx/sprites/battle/dragarbor-sheet.png` | Dragarbor | Spalding004 | CC BY-SA 4.0 (per Tuxemon ATTRIBUTIONS.md) |
| Aardart *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/aardart.png` | `mods/tuxemon/gfx/sprites/battle/aardart-sheet.png` | Aardart | Magic-Purple-Hermit | CC BY-SA 3.0 (per Tuxemon ATTRIBUTIONS.md) |
| Capinyah *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/capinyah.png` | `mods/tuxemon/gfx/sprites/battle/capinyah-sheet.png` | Capinyah | Original design and sprites by Catch Challenger; Back and face sprites by Jaskrendix | CC BY-SA 3.0 (per wiki.tuxemon.org/Capinyah) |
| Birdee *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/birdee.png` | `mods/tuxemon/gfx/sprites/battle/birdee-sheet.png` | Birdee | Front sprite by Isaiah658; Face sprites by Jaskrendix; Alternative sprites by Isaiah658 | CC BY-SA 3.0 (per wiki.tuxemon.org/Birdee) |
| Birdling *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/birdling.png` | `mods/tuxemon/gfx/sprites/battle/birdling-sheet.png` | Birdling | Design and front sprite by tamashihoshi; Back and face sprites by Chickenshowman; Face sprites tweaked by Sanglorian | CC BY-SA 3.0 (per wiki.tuxemon.org/Birdling) |
| Pairagrim *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/pairagrim.png` | `mods/tuxemon/gfx/sprites/battle/pairagrim-sheet.png` | Pairagrim | Designed by xirsoi; Art by thadeusart | CC BY-SA 3.0 (per wiki.tuxemon.org/Pairagrim) |
| Exapode *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/exapode.png` | `mods/tuxemon/gfx/sprites/battle/exapode-sheet.png` | Exapode | Original design and sprites by Catch Challenger; Face sprites by Sanglorian | CC BY-SA 3.0 (per wiki.tuxemon.org/Exapode) |
| Snokari *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/snokari.png` | `mods/tuxemon/gfx/sprites/battle/snokari-sheet.png` | Snokari | Original design and front and back sprites by Catch Challenger; Face sprites tweaked from back sprite by Sanglorian | CC BY-SA 3.0 (per wiki.tuxemon.org/Snokari) |
| Marvantis *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/marvantis.png` | `mods/tuxemon/gfx/sprites/battle/marvantis-sheet.png` | Marvantis | Designed and sprited by Georg Eckert; Front and back sprites by HippasusTwo; Face sprites by Jaskrendix | CC BY-SA 3.0 (per wiki.tuxemon.org/Marvantis) |
| Baobaraffe *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/baobaraffe.png` | `mods/tuxemon/gfx/sprites/battle/baobaraffe-sheet.png` | Baobaraffe | Name, art, sprites and blurb by princess-phoenix | CC BY-SA 3.0 (per wiki.tuxemon.org/Baobaraffe) |
| Dandylion *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/dandylion.png` | `mods/tuxemon/gfx/sprites/battle/dandylion-sheet.png` | Dandylion | Leo, ProfessorGreen, josepharaoh99 | CC BY-SA 4.0 (per Tuxemon ATTRIBUTIONS.md) |
| Legko *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/legko.png` | `mods/tuxemon/gfx/sprites/battle/legko-sheet.png` | Legko | Sanglorian | CC BY-SA 4.0 (per Tuxemon ATTRIBUTIONS.md) |
| Narcileaf *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/narcileaf.png` | `mods/tuxemon/gfx/sprites/battle/narcileaf-sheet.png` | Narcileaf | Original design and sprites by Spalding004; Face sprites tweaked by Sanglorian | CC BY-SA 3.0 (per wiki.tuxemon.org/Narcileaf) |
| Tumblebee *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/tumblebee.png` | `mods/tuxemon/gfx/sprites/battle/tumblebee-sheet.png` | Tumblebee | Design by josepharaoh99; Sprites by Cavalcadeur; Back sprite by Sanglorian | CC BY-SA 3.0 (per wiki.tuxemon.org/Tumblebee) |
| Criniotherme *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/criniotherme.png` | `mods/tuxemon/gfx/sprites/battle/criniotherme-sheet.png` | Criniotherme | Original design and sprites by Catch Challenger; Sprites tweaked by Sanglorian | CC BY-SA 3.0 (per wiki.tuxemon.org/Criniotherme) |
| Ampystoma *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/ampystoma.png` | `mods/tuxemon/gfx/sprites/battle/ampystoma-sheet.png` | Ampystoma | Design and art by DevilDman; Sprites by JaskRendix and HippasusTwo | CC BY-SA 3.0 (per wiki.tuxemon.org/Ampystoma) |
| Regalance *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/regalance.png` | `mods/tuxemon/gfx/sprites/battle/regalance-sheet.png` | Regalance | Design and original sprite by JustinNuggets and Piacarrot; Back sprite and face sprites by Jaskrendix | CC BY-SA 3.0 (per wiki.tuxemon.org/Regalance) |
| Incandesfin *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/incandesfin.png` | `mods/tuxemon/gfx/sprites/battle/incandesfin-sheet.png` | Incandesfin | Original design and sprites by Serpexnessie | CC BY-SA 3.0 (per wiki.tuxemon.org/Incandesfin) |
| Gupphire *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/gupphire.png` | `mods/tuxemon/gfx/sprites/battle/gupphire-sheet.png` | Gupphire | Design and original sprite by JustinNuggets and Piacarrot; Face sprites by Jaskrendix | CC BY-SA 3.0 (per wiki.tuxemon.org/Gupphire) |
| Bedoo *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/bedoo.png` | `mods/tuxemon/gfx/sprites/battle/bedoo-sheet.png` | Bedoo | TheBritanniaRegion | CC BY-SA 3.0 (per wiki.tuxemon.org/Bedoo) |
| Krokivip *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/krokivip.png` | `mods/tuxemon/gfx/sprites/battle/krokivip-sheet.png` | Krokivip | Designed and sprited by Georg Eckert; Face sprites by Jaskrendix | CC BY-SA 3.0 (per wiki.tuxemon.org/Krokivip) |
| Shelagu *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/shelagu.png` | `mods/tuxemon/gfx/sprites/battle/shelagu-sheet.png` | Shelagu | Design and art by BrasioPkmn; Sprites by Lejun | CC BY-SA 3.0 (per wiki.tuxemon.org/Shelagu) |
| Galasces *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/galasces.png` | `mods/tuxemon/gfx/sprites/battle/galasces-sheet.png` | Galasces | Design and front sprite by Serpexnessie; Back and face sprites adapted by Jaskrendix | CC BY-SA 3.0 (per wiki.tuxemon.org/Galasces) |
| Shnark *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/shnark.png` | `mods/tuxemon/gfx/sprites/battle/shnark-sheet.png` | Shnark | Design and front and face sprites by Sanglorian; Back sprite by Impossible Realms | CC BY-SA 3.0 (per wiki.tuxemon.org/Shnark) |
| Nudimind *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/nudimind.png` | `mods/tuxemon/gfx/sprites/battle/nudimind-sheet.png` | Nudimind | Original design by DevilDman; Sprites by Levaine; Back sprite by Sanglorian; Face sprites tweaked by Sanglorian | CC BY-SA 3.0 (per wiki.tuxemon.org/Nudimind) |
| Nudikill *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/nudikill.png` | `mods/tuxemon/gfx/sprites/battle/nudikill-sheet.png` | Nudikill | Original design by Sanglorian and DevilDman; Sprites by Levaine; Back sprite by Sanglorian; Face sprites tweaked by Sanglorian | CC BY-SA 3.0 (per wiki.tuxemon.org/Nudikill) |
| Octabode *(placeholder name)* (front/back/idle sprites) | `assets/sprites/{front,back,idle}/octabode.png` | `mods/tuxemon/gfx/sprites/battle/octabode-sheet.png` | Octabode | Designed and illustrated by fauxlens; Sprites by Sanglorian | CC BY-SA 3.0 (per wiki.tuxemon.org/Octabode) |
| PWA app icon *(placeholder — Growler's sprite on a white square, made by `tools/make-icon.mjs`)* | `assets/icons/icon-192.png`, `icon-512.png` | derived from `assets/sprites/front/hissiorite.png` | Hissiorite | princess-phoenix (same credit as Growler's rows above) | CC BY-SA 3.0 (derived work, credit princess-phoenix) |
| Fakeaball (item icon, live on the "Throw Fakeaball" button) | `assets/sprites/items/fakeaball.png` | `mods/tuxemon/gfx/items/tuxeball_earth.png` | Tuxeball Earth | JaskRendix (adapted from a sprite by tamashihoshi) | CC BY-SA 4.0 (per Tuxemon ATTRIBUTIONS.md) |

**Fakeaball tiers — 1 of 4 wired in, 3 more staged (2026-07-24):** `DESIGN.md`
§6 decided a 4-tier ball design (Fakeaball / Great / Ultra / Cosmic); only the
basic **Fakeaball** is a real feature so far (the row above). Jeff & Lewis
sourced real Tuxemon icons for the next two tiers, verified against
`ATTRIBUTIONS.md` and pulled from the same pinned commit (`c34a9c72`) as
everything else here — vendored now so the art is ready, but **not yet wired
into any screen**, since the tier mechanics themselves (catch-rate bonuses, a
shop, separate inventory counts) are explicitly a later build (`CLAUDE.md`'s
scope guardrails; `PLANS/M4_WORLD_SYSTEMS_PLAN.md` §10 lists Great/Ultra/Cosmic
acquisition as deferred).

| Our name | File in our repo | Source in Tuxemon repo | Tuxemon name | Artist(s) | License |
|---|---|---|---|---|---|
| Great Fakeaball (item icon, vendored, not yet wired) | `assets/sprites/items/greatfakeaball.png` | `mods/tuxemon/gfx/items/tuxeball_metal.png` | Tuxeball Metal | JaskRendix (adapted from a sprite by tamashihoshi) | CC BY-SA 4.0 (per Tuxemon ATTRIBUTIONS.md) |
| Ultra Fakeaball (item icon, vendored, not yet wired) | `assets/sprites/items/ultrafakeaball.png` | `mods/tuxemon/gfx/items/tuxeball_ancient.png` | Tuxeball Ancient | JaskRendix (adapted from a sprite by tamashihoshi) | CC BY-SA 4.0 (per Tuxemon ATTRIBUTIONS.md) |

The **Cosmic Fakeaball** (4th tier) isn't a Tuxemon asset — Jeff & Lewis made a
custom one with an AI image tool "to make it more dramatic" (their words): a
black, cracked ball wrapped in a purple lightning aura. Vendored and staged
the same way as Great/Ultra above — see its "Original art" row below.

The unmodified source sheets for the three starters are also vendored at
`assets/sprites/battle/<slug>-sheet.png` (inputs for `tools/slice-sheets.mjs`)
— same credits as their rows above. The slicer regenerates attribution rows
for everything it cuts into `tools/credits-fragment.md`, so new creatures'
rows are generated, not hand-typed.

**Wild-roster sheets:** the full wild-encounter pool (`CONTENT_REFERENCE.md`
§16 — now 198 monsters, after `bearloch`/`foxko` were dropped for having no
credit anywhere) lives in `assets/sprites/battle/`, with the *generated*
**`CREDITS_ROSTER.md`** as its attribution ledger — **198 staged, 0
pending**. **The Meadows' 14-line slice is now in the game (M3S11,
2026-07-12 — the 14 rows above)**, **The Lagoon's 12 followed at M4S6
(2026-08-10)**, and **29 more entered play at M5 Step 1 (2026-08-13) as
EVOLVED FORMS** — one per creature in the game, plus the three starters'
evolutions (Deviraptor / Leviadile / Dragarbor). Every one of those 29 was
already in the verified 198, so nothing new had to be licence-checked: they
moved from "staged" to "in use" with their existing attribution. The
remaining areas' slices land area-by-area in M5, per `VENTA_ROSTER_DRAFT.md`. Three of them
(coaldiak, ninjasmine, toxiris) are ⚠️ OPMon-derived — confirm that
project's terms before they appear in the game.

**How the portraits were made:** each source sheet is 128×88: a large front
pose (64×64), a large back pose (64×64), and a small 2-frame standing/idle
pose (24×24 each). For the portrait PNGs we cropped one idle frame, added a
little transparent padding, and scaled it 4× with nearest-neighbor (no blur)
to get a crisp pixel-art portrait.

---

## Original art (not from Tuxemon)

Assets made specifically for this project — no Tuxemon (or other) source to
credit; these don't fit the Tuxemon-sourced table above, so they get their own.

| Our name | File in our repo | Source | License |
|---|---|---|---|
| Fakeatent (building sprite) | `assets/sprites/buildings/fakeatent.png` | AI-generated by Jeff (own creation; background made transparent in GIMP, then cropped + scaled 4:1 with nearest-neighbor by Claude to fit the tile grid) | Original work — no attribution required |
| Berries — Fakeaberry, Greenberry, Raspberry, Greatberry, Cosmicberry (item icons + map pickups) | `assets/sprites/items/berries/<slug>.png` (32×32, for the Cooking Cabin / inventory) and `assets/sprites/items/berries/pickup/<slug>.png` (16×16, the one lying on a map tile) | AI-generated by Jeff & Lewis (own creation; uploaded at 1254×1254, then trimmed to content and scaled by Claude — padded to a square rather than stretched, since the five shapes range from tall-and-narrow to wide) | Original work — no attribution required |
| Cooking Cabin (building sprite) | `assets/sprites/buildings/cabin.png` | AI-generated by Jeff & Lewis (own creation; uploaded at 800×800, trimmed to content and scaled to 48×50 by Claude — 3 tiles wide, deliberately shorter than the Gym) | Original work — no attribution required |
| Tall Tower (building sprite) | `assets/sprites/buildings/talltower.png` | AI-generated by Jeff & Lewis (own creation; uploaded at 1254×1254, then trimmed to its content and scaled to 24×76 with a Lanczos filter by Claude to fit the 16px tile grid — nearest-neighbour was tried first and rejected, a ~13:1 reduction drops too many pixels) | Original work — no attribution required |
| Gym (building sprite) | `assets/sprites/buildings/gym.png` | AI-generated by Jeff & Lewis (own creation; same treatment as the Tall Tower — trimmed and scaled to 48×60) | Original work — no attribution required |
| Cosmic Fakeaball (item icon, vendored, not yet wired) | `assets/sprites/items/cosmicfakeaball.png` | AI-generated by Jeff & Lewis (own creation — "needed something more dramatic" for the top ball tier; cropped + scaled to 40×40 with nearest-neighbor by Claude) | Original work — no attribution required |

---

## Confirmed available, not yet pulled in

Everything below was checked against the actual repo (not just the wiki) and
exists at `mods/tuxemon/gfx/sprites/battle/<slug>-sheet.png` unless noted.
Full detail is in `DESIGN.md` §12.

**Legendary:** Artemis ← Djinnbo (Cavalcadeur, rsg167)

**Mini-bosses:** Banvengeance, Saurchin, Sharpfin, Gastronium, Tobishimi

**Gyms (standard/ace):** Allagon (Spalding004, Chickenshowman — CC BY-SA 4.0),
AV8R (Leo, Sanglorian — CC BY-SA 4.0 assumed, ⚠️ unverified, see "In use" table),
Agnite, Windeye, Spectera, Eaglace

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
