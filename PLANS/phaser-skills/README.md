# Phaser 4 skills — vendored reference for M3+ sessions 📚

**Read the relevant skill in this folder BEFORE writing any Phaser code.**
That's the rule from `PLANS/M3_OVERWORLD_PLAN.md` §2: Claude models have far
more Phaser 3 than Phaser 4 in their training data, and these official skill
files are the defense against v3 habits sneaking into v4 code. If a Phaser
API call errors anyway, check the current Phaser 4 docs — don't try v3
variants from memory.

## Where these came from

- **Source:** the `skills/` folder of the official Phaser repo,
  `github.com/phaserjs/phaser`, commit **`539e718`** (pulled 2026-07-06).
- **License:** MIT, same as Phaser itself.
- **Version note:** the newest stable Phaser at pull time was **4.2.0**
  (checked against the npm registry — the M3 plan's "4.2.1" guess doesn't
  exist; re-check and pin at S1, per the plan).

## What's here (chosen for M3's build steps)

| Skill | Matters for |
|---|---|
| `game-setup-and-config/` | S1 — the Phaser config, `pixelArt: true`, mounting into `#world` |
| `scenes/` | S1, S7 — BootScene/WorldScene, pause/resume around battles |
| `loading-assets/` | S2, S3 — loading the tileset and spritesheets |
| `tilemaps/` | S2 — drawing `src/data/maps.js` |
| `sprites-and-images/` | S3, S6 — the hero and encounter sprites |
| `input-keyboard-mouse-touch/` | S3, S7 — arrow keys, key capture, enable/disable across the battle handoff |
| `tweens/` | S3 — grid movement is tween-based (plan §6.2: no physics!) |
| `animations/` | S4, S6 — walk cycles and idle animations |
| `cameras/` | S1 zoom; camera-follow stays out of scope until a map outgrows the screen |
| `v3-to-v4-migration/` | everything — what changed from the Phaser the model "remembers" |

The source repo has ~17 more skills (physics, particles, audio, filters…).
We deliberately did **not** vendor those: M3 uses none of them (no physics —
grid movement is tweens). If a later milestone needs one (e.g. audio at
B32's chiptune step), pull it from the same repo and note the commit here.
