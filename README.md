# Fakeamon 🔥🌊🌿

A turn-based, monster-collecting RPG — built together by **Jeff & Lewis** as
a father-and-son coding project. You explore an overworld, catch creatures
called **Fakeamon**, battle them turn-by-turn, and (eventually) stop a
legendary Fakeamon named **Artemis** from dropping a meteor on the world.

## 🎮 Play it

**[jhester599.github.io/fakeamon_spark](https://jhester599.github.io/fakeamon_spark/)**

Live and auto-updating — every push to `main` redeploys it automatically
(see **Deployment** below).

Other pages from the same site:
- **[Quest map](https://jhester599.github.io/fakeamon_spark/roadmap.html)** — our step-by-step build plan, with progress tracked live
- **[Homework](https://jhester599.github.io/fakeamon_spark/homework.html)** — open questions for Lewis & Jeff to answer between sessions

## Status

**Milestone M3 — Overworld: just started (Step S1 done).** M1 (a full
turn-based battle) is complete 🎉, and **M2 is fully done** — catching, a
team of 4 with Boxes overflow, switching fighters, **and now saving**: the
game autosaves and opens on a **Continue / New Game** title screen, with
**Export / Import Save** so you can carry your adventure between browsers.
**M3 Step S1** brings in **Phaser** (the game engine for the map): the top
of the page shows a little overworld canvas (an empty grass screen for now —
the real meadow map is Step S2), with a temporary "Battle test" button to
jump into the battle. See `ROADMAP.md` for the full plan and
`PLANS/M3_OVERWORLD_PLAN.md` for the overworld architecture.

## Saving

The game **autosaves to your browser** (localStorage) after every catch,
battle, and switch — there's no Save button, and progress is never lost by
forgetting. A few things worth knowing:

- Saves are **per site**: your save at `http://localhost` is a *different*
  save from the one on the live site or a double-clicked file. (That's on
  purpose — dev saves don't touch the real game — but it surprises people, so
  a "vanished" save usually means a different address.)
- **Incognito / Private** windows throw the save away when you close them.
- Use **Export Save** (title screen) to download `fakeamon-save.json` as a
  backup, and **Import Save** to load it on another browser or computer.

## Run it locally

No build step — it's plain HTML/CSS/JS, and Phaser is vendored (kept in the
repo), so nothing needs the network.

```bash
python3 -m http.server
# then open http://localhost:8000
```

Or just double-click `index.html` — it still works offline.

## Project docs

| File | What it's for |
|---|---|
| `DESIGN.md` | Full game design spec — the source of truth |
| `CLAUDE.md` | Working brief and current milestone status |
| `ROADMAP.md` | Stepwise build plan (M1–M5), what's done and what's next |
| `DECISIONS.md` | Log of decisions made, and how new ones get folded in |
| `MODELS.md` | Which Claude model/effort to use per roadmap step, and the pre-step Model Huddle |
| `PLANS/` | Architecture plans from high-end planning sessions — the M3 overworld (Phaser ↔ battle) and the state/save system |
| `HOMEWORK.md` | Open questions waiting on Lewis (creative director) and Jeff |
| `HOMEWORK_BACKLOG.md` | The full question bank (B1–B36) that `HOMEWORK.md` gets served from |
| `CREDITS.md` | Art attribution — what's borrowed, from where, under what license |
| `CONTENT_REFERENCE.md` | Where our Tuxemon-sourced art, data, and roster ideas come from, and the licensing rules for using them |

## Credits

Starting art is based on sprites from the **[Tuxemon](https://github.com/Tuxemon/Tuxemon)**
project, used under Creative Commons licenses (mostly CC BY-SA 4.0 — see
`CREDITS.md` for exact per-file license and artist credit). The overworld
map (M3+) runs on **[Phaser](https://phaser.io)** 4.2.1, vendored under the
MIT license. Fakeamon is inspired by Pokémon in spirit only — no Nintendo
names, sprites, or music.

## Deployment

A GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) deploys
`index.html`, `roadmap.html`, `homework.html`, and `assets/` to GitHub Pages
automatically on every push to `main` — no build step, nothing to run by
hand. Check progress anytime under the repo's **Actions** tab.

**If you ever fork this repo or set it up somewhere new,** two one-time
manual steps are required before the workflow can succeed (GitHub
deliberately blocks a workflow from doing these itself, even with full
`pages: write` permission):

1. The repo must be **public** (private-repo Pages needs a paid GitHub plan,
   and even then stays access-restricted to collaborators).
2. **Settings → Pages** → under "Build and deployment," set
   **Source: GitHub Actions**. Skipping this makes the first deploy fail
   with *"Resource not accessible by integration"* — that error means this
   step hasn't been done yet, not that anything is broken.
