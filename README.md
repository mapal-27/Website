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
