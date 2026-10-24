import { test, expect } from '@playwright/test';

const base = 'https://mapal-27.github.io/Website/kwao-thai/';
const official = 'https://www.kwaothai.com';
const phone = 'tel:+12503891845';

test('homepage uses Kwao Thai content with independent sections and correct local links', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page).toHaveTitle('Kwao Thai Restaurant | Thai Food on Esquimalt Road');
  await expect(page.locator('h1')).toHaveText('A little spice.A lot of comfort.');
  await expect(page.locator('body')).not.toContainText('Sushi Den');
  await expect(page.locator('body')).not.toContainText('Abbott');
  const why = await page.locator('#why-us').boundingBox();
  const reviews = await page.locator('#reviews').boundingBox();
  expect(reviews.y).toBeGreaterThanOrEqual(why.y + why.height - 1);
  await expect(page.locator('#visit')).toContainText('1207 A Esquimalt Road');
  await expect(page.locator('#visit')).toContainText('V9A 3P2');
  await expect(page.locator('#visit')).toContainText('11 AM–2:30 PM');
  await expect(page.locator('#visit')).toContainText('4:30–9 PM');
  await expect(page.locator('#visit')).toContainText('Closed Mondays & statutory holidays');
  await expect(page.locator('.pickup-note')).toContainText('30–35 minutes');
  const links = await page.locator('a[href]').evaluateAll(nodes => nodes.map(node => node.href));
  for (const link of new Set(links)) {
    const url = new URL(link);
    if (url.origin !== new URL(page.url()).origin) continue;
    const response = await page.request.get(url.origin + url.pathname);
    expect(response.ok(), link).toBeTruthy();
    if (url.hash) expect(await response.text()).toContain(`id="${url.hash.slice(1)}"`);
  }
  const image = await page.request.get('/images/thai-sheet.png');
  expect(image.headers()['content-type']).toContain('image/png');
  await expect(page.locator('.site-footer')).toContainText('Not the official site');
  await page.screenshot({ path: 'test-results/kwao-home-desktop.png', fullPage: true });
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Menu & ordering' }).click();
  await expect(page).toHaveURL(/menu.html$/);
  await expect(page.locator('.spice-list li')).toHaveText(['Mild', 'Mild–Med', 'Med', 'Hot', 'Thai Hot / Extra Hot']);
  await expect(page.locator('#delivery')).toContainText('DoorDash and Localpass');
  await expect(page.locator('#dietary-title')).toBeVisible();
  await expect(page.locator('[data-menu-item]')).toHaveCount(52);
  await expect(page.locator('a[href*=".pdf"]')).toHaveCount(0);
  expect(errors).toEqual([]);
  await page.screenshot({ path: 'test-results/kwao-menu-desktop.png', fullPage: true });
});

test('mobile navigation, keyboard, takeout, and responsive layouts work', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  const toggle = page.locator('.nav-toggle');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Visit', exact: true }).click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page).toHaveURL(/#visit$/);
  const actions = page.getByRole('navigation', { name: 'Quick actions' });
  await expect(actions).toBeVisible();
  await expect(actions.getByRole('link', { name: 'Call to order' })).toHaveAttribute('href', phone);
  await actions.getByRole('link', { name: 'Menu', exact: true }).click();
  await expect(page).toHaveURL(/menu.html$/);
  for (const width of [320, 390, 768, 1024]) {
    await page.setViewportSize({ width, height: 844 });
    for (const path of ['/', '/menu.html']) {
      await page.goto(path);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${path} at ${width}px`).toBeTruthy();
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/menu.html');
  await page.screenshot({ path: 'test-results/kwao-menu-mobile.png', fullPage: true });
  await page.goto('/');
  await page.screenshot({ path: 'test-results/kwao-home-mobile.png', fullPage: true });
});

test('SEO identifies the correct restaurant, preserves split hours, and treats the concept as a preview', async ({ page }) => {
  const titles = new Set();
  for (const [path, canonical] of [['/', base], ['/menu.html', base + 'menu.html']]) {
    await page.goto(path);
    titles.add(await page.title());
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', canonical);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, follow');
    const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
    const restaurant = schema['@graph'].find(entity => entity['@type'] === 'Restaurant');
    expect(restaurant.name).toBe('Kwao Thai Restaurant');
    expect(restaurant.url).toBe(official);
    expect(restaurant.servesCuisine).toBe('Thai');
    expect(restaurant.telephone).toBe('+1-250-389-1845');
    expect(restaurant.address.streetAddress).toBe('1207 A Esquimalt Road');
    expect(restaurant.openingHoursSpecification).toHaveLength(2);
    expect(restaurant.openingHoursSpecification[0].opens).toBe('11:00');
    expect(restaurant.openingHoursSpecification[0].closes).toBe('14:30');
    expect(restaurant.openingHoursSpecification[1].opens).toBe('16:30');
    expect(restaurant.openingHoursSpecification[0].dayOfWeek).not.toContain('Monday');
    expect(restaurant).not.toHaveProperty('aggregateRating');
    expect(restaurant.hasMenu['@id']).toBe(base + 'menu.html#menu');
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', base + 'images/thai-sheet.png');
    await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Call to order' })).toHaveAttribute('href', phone);
  }
  expect(titles.size).toBe(2);
  const sitemap = await page.request.get('/sitemap.xml');
  expect(await sitemap.text()).toContain(`<loc>${base}</loc>`);
  const llms = await page.request.get('/llms.txt');
  expect(await llms.text()).toContain('all 52 supplied items');
  expect(await llms.text()).not.toContain('Sushi Den');
});

test('map only loads on request and points to Kwao Thai', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('iframe')).toHaveCount(0);
  await page.route('https://www.google.com/maps**', route => route.fulfill({ body: '<html><body>Map provider test response</body></html>', contentType: 'text/html' }));
  await page.getByRole('button', { name: 'Show location on map' }).click();
  await expect(page.locator('iframe')).toHaveAttribute('src', /Kwao\+Thai\+1207\+A\+Esquimalt/);
  await expect(page.locator('iframe')).toHaveAttribute('title', 'Kwao Thai at 1207 A Esquimalt Road, Victoria');
});


test('menu filters, search, direct links, prices, and source ambiguities work', async ({ page }) => {
  await page.goto('/menu.html');
  const visibleItems = page.locator('[data-menu-item]:visible');
  await expect(visibleItems).toHaveCount(52);
  for (const [label, count] of [['Appetizers & salads', 10], ['Soups', 5], ['Noodles', 6], ['Fried rice', 5], ['Curries', 5], ['Stir-fries', 10], ['Chef specials', 3], ['Sides', 8], ['All', 52]]) {
    await page.getByRole('button', { name: label, exact: true }).click();
    await expect(visibleItems).toHaveCount(count);
    await expect(page.getByRole('button', { name: label, exact: true })).toHaveAttribute('aria-pressed', 'true');
  }
  await page.getByLabel('Find a dish', { exact: true }).fill('Pad Thai');
  await expect(visibleItems).toHaveCount(2);
  await expect(page.locator('#dish-17')).toContainText('$19.00');
  await expect(page.locator('#dish-17')).toContainText('$21.00');
  await page.getByLabel('Clear search', { exact: true }).click();
  await expect(visibleItems).toHaveCount(52);
  await page.getByLabel('Find a dish', { exact: true }).fill('no-such-dish');
  await expect(visibleItems).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'No dishes found.' })).toBeVisible();
  await page.getByRole('button', { name: 'Show full menu' }).click();
  await expect(visibleItems).toHaveCount(52);
  await expect(page.locator('#dish-24 .entry-price')).toHaveText('Call to confirm');
  await expect(page.locator('#dish-24')).toContainText('$21.00');
  for (const id of ['50', '51']) {
    await expect(page.locator('#dish-' + id + ' .entry-price')).toHaveText('Call to confirm');
    await expect(page.locator('#dish-' + id)).not.toContainText('$21.50');
    await expect(page.locator('#dish-' + id)).not.toContainText('$22.50');
  }
  await expect(page.locator('#dish-53')).toContainText('Small');
  await expect(page.locator('#dish-53')).toContainText('$6.00');
  await expect(page.locator('#dish-53')).toContainText('$9.00');
  const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
  const menu = schema['@graph'].find(entity => entity['@type'] === 'Menu');
  const dishes = menu.hasMenuSection.flatMap(section => section.hasMenuItem);
  expect(dishes).toHaveLength(52);
  expect(dishes.find(dish => dish.name === 'Lamb Pad King')).not.toHaveProperty('offers');
  await page.goto('/');
  await page.getByRole('link', { name: 'Pad Thai', exact: true }).click();
  await expect(page).toHaveURL(/category=noodles#dish-17$/);
  await expect(visibleItems).toHaveCount(6);
  await expect(page.locator('#dish-17')).toBeVisible();
  await page.goto('/menu.html?category=invalid&q=Panang');
  await expect(visibleItems).toHaveCount(1);
});

test('all menu items and prices remain available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4173/menu.html');
  await expect(page.locator('[data-menu-item]:visible')).toHaveCount(52);
  await expect(page.locator('#dish-17')).toContainText('$19.00');
  await expect(page.getByRole('navigation', { name: 'Quick actions' }).getByRole('link', { name: 'Call to order' })).toHaveAttribute('href', phone);
  await expect(page.locator('[data-menu-controls]')).toBeHidden();
  await context.close();
});
