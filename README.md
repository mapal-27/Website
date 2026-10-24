# Kwao Thai restaurant concept

Reuses the existing restaurant template, originally adapted from Bootstrap 5.3.3's MIT-licensed Album example. Upstream source/license are in `template/`; icons are Lucide. Keeps a minimal casual layout with distinct Why Us and Reviews sections and a separate menu/ordering page.

## Run

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

## Test

```sh
npx playwright install chromium
npm test
```

With system Chromium: `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test`.

## Content

Uses the business text and screenshot supplied by the user. See `CONTENT-SOURCES.md`. The supplied website menu is transcribed into 52 items across eight categories, with protein/portion prices, search, category filters, spice levels, and ordering guidance. Conflicting source prices are marked for phone confirmation. The online-ordering link leads to the official restaurant website. No backend, order submission, live countdown, review feed, or live opening-status service is included. The optional Google Maps iframe loads only on visitor request.

## Git and previews

- `sushi-den`: saved source for the previous business.
- `kwao-thai`: this concept's source. Do not push it over `main` or replace the root of `gh-pages`.
- `gh-pages` root: retained Sushi Den website.
- `gh-pages/kwao-thai/`: Kwao Thai built files.

Expected preview: https://mapal-27.github.io/Website/kwao-thai/

Deploy by building and copying `dist/` into `kwao-thai/` on `gh-pages`, preserving all files outside that directory. Relative assets support this subdirectory. Canonical, social, sitemap, and llms links use the preview URL. Robots metadata marks the concept noindex pending business review. Update the production URL and indexing policy only when approved for launch.

## Edit the menu

Update `data/menu.json`, then run `npm run menu:generate` (also runs before `dev` and `build`). Static markup is written between the MENU markers in `menu.html`; structured data is updated in both pages. Keep unknown/conflicting prices unset; the generator omits unconfirmed offers. All menu information remains available when JavaScript is disabled.
