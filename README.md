# Sushi Inn

A casual, minimal restaurant website with a scrolling homepage and a separate menu page. Built by adapting the layout and responsive grid from [Bootstrap 5.3.3's Album example](https://github.com/twbs/bootstrap/blob/v5.3.3/site/content/docs/5.3/examples/album/index.html), with Bootstrap and Lucide icons. The original template and MIT license are retained in `template/`.

## Develop

Requires Node.js 20.19+ or 22.12+.

```sh
npm ci
npm run dev
```

## Build and check

```sh
npm run build
npm run preview
```

Vite builds both `index.html` and `menu.html` to `dist/`. Relative asset paths support hosting in a GitHub Pages repository subdirectory. Upload the contents of `dist/` to any static host. Connecting the Git repository alone does not publish the website.

## Browser tests

```sh
npx playwright install chromium
npm test
```

If Chromium is already installed, use `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm test` instead of downloading a browser.

Tests start their own local development server and verify menu navigation, filters, mobile navigation, section layout, keyboard access, and local links/assets. Screenshots are captured in the test results directory.

## Replace sample content before publishing

- Confirm dishes, ingredients, prices, and availability in `menu.html` and favorites in `index.html`.
- Add the restaurant address, phone, and hours in `index.html`.
- Replace the honest reviews placeholder with real customer reviews used with permission.
- Confirm the suggested Why Us copy with the restaurant.
- Photography is AI-generated and illustrative, not photography of this restaurant's actual food. Replace `assets/images/sushi-sheet.png` with real food photographs when available. CSS displays its four quadrants; side dishes currently use Lucide icons.

No reservation, ordering, payment, analytics, or contact-form backend is included. The main action is browsing the menu.

## Files

- `index.html`: homepage, independent Why Us, Reviews, and Visit sections.
- `menu.html`: sample full-menu page.
- `styles.css`: restaurant styling and responsive layout.
- `main.js`: accessible mobile navigation, menu filters, and icons.
- `template/`: upstream template and license, retained for provenance; not served in production.

All fonts, styles, icons, and food imagery are local. Visitors do not need a third-party CDN.

## Search and AI discovery

Both pages include distinct titles and descriptions, canonical URLs, Open Graph/Twitter previews, and JSON-LD linking the Restaurant, WebSite, and WebPage entities. The menu also includes breadcrumbs. `public/sitemap.xml` lists both pages. `public/robots.txt` permits crawling, and `public/llms.txt` provides an optional, experimental summary for AI tools; support and visibility are not guaranteed. Content is rendered in HTML, so reading the menu does not require JavaScript.

URLs currently target `https://mapal-27.github.io/Website/`. Update canonical, social, JSON-LD, sitemap, robots, and llms URLs if hosting or the domain changes. GitHub Pages project sites cannot place a robots.txt at the account domain root; the sitemap can still be submitted directly in Search Console. `llms.txt` is also under the project path.

Local SEO still needs the verified city, street address, phone, opening hours, and Google Business Profile URL. Do not invent them or add unverified aggregate ratings, prices, or location coordinates. Basic metadata does not guarantee indexing, rankings, rich results, or AI citations.

## View the actual website on GitHub Pages

The prepared `gh-pages` branch contains the built website. In the GitHub repository, open **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, select **gh-pages** and **/(root)**, and Save. GitHub will show the published URL once deployment succeeds. The expected URL is `https://mapal-27.github.io/Website/`.

After later source changes, run `npm ci && npm run build` and publish the contents of `dist/` to `gh-pages` again. Source code lives on `main`; do not point Pages at unbuilt Vite source on `main`.
