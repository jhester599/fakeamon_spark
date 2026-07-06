# Fakeamon 🔥🌊🌿

A turn-based, monster-collecting RPG — built together by **Jeff & Lewis** as
a father-and-son coding project. You explore an overworld, catch creatures
called **Fakeamon**, battle them turn-by-turn, and (eventually) stop a
legendary Fakeamon named **Artemis** from dropping a meteor on the world.

## 🎮 Play it

**[jhester599.github.io/fakeamon_spark](https://jhester599.github.io/fakeamon_spark/)**

That link goes live automatically once the one-time setup below is done —
see **Publishing this site**.

Other pages from the same site:
- **[Quest map](https://jhester599.github.io/fakeamon_spark/roadmap.html)** — our step-by-step build plan, with progress tracked live
- **[Homework](https://jhester599.github.io/fakeamon_spark/homework.html)** — open questions for Lewis & Jeff to answer between sessions

## Status

**Milestone M1 — Battle Slice: complete! 🎉** A full turn-based battle
between Growler and Whaley — moves, damage, type advantage, misses, HP
bars, fainting, and a win/lose screen. **M2 — Catching & Team** is next.
See `ROADMAP.md` for the full plan.

## Run it locally

No build step — it's plain HTML/CSS/JS.

```bash
python3 -m http.server
# then open http://localhost:8000
```

Or just double-click `index.html`.

## Project docs

| File | What it's for |
|---|---|
| `DESIGN.md` | Full game design spec — the source of truth |
| `CLAUDE.md` | Working brief and current milestone status |
| `ROADMAP.md` | Stepwise build plan (M1–M5), what's done and what's next |
| `DECISIONS.md` | Log of decisions made, and how new ones get folded in |
| `HOMEWORK.md` | Open questions waiting on Lewis (creative director) and Jeff |
| `CREDITS.md` | Art attribution — what's borrowed, from where, under what license |

## Credits

Starting art is based on sprites from the **[Tuxemon](https://github.com/Tuxemon/Tuxemon)**
project, used under Creative Commons licenses (mostly CC BY-SA 4.0 — see
`CREDITS.md` for exact per-file license and artist credit). Fakeamon is
inspired by Pokémon in spirit only — no Nintendo names, sprites, or music.

## Publishing this site (one-time setup)

This repo is currently **private**, and GitHub Pages needs a repo to be
**public** to serve a truly public link (private-repo Pages requires a paid
GitHub plan, and even then stays access-restricted to collaborators). A
GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) is already
set up to deploy `index.html`, `roadmap.html`, `homework.html`, and
`assets/` to GitHub Pages automatically on every push to `main` — it just
needs the repo to be public to actually go live:

1. Go to **Settings → General → Danger Zone → Change repository visibility → Public**.
2. That's it — the next push to `main` will deploy automatically. Check
   progress under the repo's **Actions** tab.
