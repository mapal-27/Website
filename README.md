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

Uses the business text and screenshot supplied by the user. See `CONTENT-SOURCES.md`. No current menu/prices were supplied; the menu page offers spice levels, dietary information, takeout guidance, and an official-website link for the actual menu and online ordering. No backend, order submission, live countdown, review feed, or live opening-status service is included. The optional Google Maps iframe loads only on visitor request.

## Git and previews

- `sushi-den`: saved source for the previous business.
- `kwao-thai`: this concept's source. Do not push it over `main` or replace the root of `gh-pages`.
- `gh-pages` root: retained Sushi Den website.
- `gh-pages/kwao-thai/`: Kwao Thai built files.

Expected preview: https://mapal-27.github.io/Website/kwao-thai/

Deploy by building and copying `dist/` into `kwao-thai/` on `gh-pages`, preserving all files outside that directory. Relative assets support this subdirectory. Canonical, social, sitemap, and llms links use the preview URL. Robots metadata marks the concept noindex pending business review. Update the production URL and indexing policy only when approved for launch.
