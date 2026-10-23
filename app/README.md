# AM PARFUMS Atelier 4.0 (iOS app)

The Atelier rebuilt as an installable iPhone app (a Progressive Web App). It opens full screen from the Home Screen, works offline, and keeps every formula rule from Atelier 3.2.

## Install on iPhone

1. Open the app's URL in **Safari** (see *Hosting* below).
2. Tap **Share → Add to Home Screen**.
3. Launch **Atelier** from the Home Screen. It runs without Safari's toolbars, in light or dark mode to match the phone.

## What changed from 3.2

| 3.2 (single long page) | 4.0 |
| --- | --- |
| Brief, results, batches and library all on one scrolling page | Four tabs: **Atelier**, **Batches**, **Library**, **Studio** |
| Formula cards with a long wall of tables | Swipeable draft cards; tap one to open a sheet with **Recipe · Character · Label · Analysis** |
| Amounts shown as small text | **Bench mode**: tap each step off as you pour, and switch between drops, grams and mL |
| Label brief was text only | Live **30 × 30 mm label preview** in black and gold |
| 15 px inputs (iOS zooms in on focus) | 17 px inputs, native pickers, iOS switches and segmented controls |
| Disclaimer footer on every screen | Moved to **Studio → Method & safety notes** |

## Your existing data

Backups use the same format as 3.2. In the old page, tap **Export atelier backup**. In the app, go to **Studio → Import backup**. Saved formulas, batches, the scent library, custom materials and your names to avoid all come across.

## Claude

Opened on its own, the app composes **offline drafts** with the rule-based engine and can copy the full AI brief for you to paste into Claude. If the same files are published as a Claude artifact, it detects `window.claude` and has Claude compose formulas, draft the scent library, score test notes and sync batches to your account, the same way 3.2 did.

## Hosting

The included workflow (`.github/workflows/pages.yml`) publishes this folder to GitHub Pages on every push to `main`. Turn it on once in **Settings → Pages → Source: GitHub Actions**. Any static host works too: upload the `app/` folder as is. There is no build step.

## Files

- `index.html`: app shell and tab bar
- `css/app.css`: iOS design system, with light and dark themes
- `js/data.js`: inventory, reference pyramids and protected character names
- `js/engine.js`: formula engine (pairing rules, DPG advice, mass math, prompts)
- `js/app.js`: screens, sheets and interactions
- `sw.js`, `manifest.webmanifest`, `icons/`: offline support and the Home Screen icon

When you change a file, bump `VERSION` in `sw.js` so installed copies pick up the update.
