import { test, expect } from '@playwright/test';

test('homepage sections are separate, navigation and local assets work', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page).toHaveTitle('Sushi Den Vancouver | Sushi & Takeout on Abbott St');
  await expect(page.locator('h1')).toHaveText('Your sushispot.');
  const why = await page.locator('#why-us').boundingBox();
  const reviews = await page.locator('#reviews').boundingBox();
  expect(reviews.y).toBeGreaterThanOrEqual(why.y + why.height - 1);
  expect(Math.abs(why.width - 1440)).toBeLessThan(1);
  await expect(page.locator('#reviews')).toContainText('Read reviews on Google');
  const links = await page.locator('a[href]').evaluateAll(nodes => nodes.map(node => node.href));
  for (const link of new Set(links)) {
    const url = new URL(link);
    if (url.origin !== new URL(page.url()).origin) continue;
    const response = await page.request.get(url.origin + url.pathname);
    expect(response.ok(), link).toBeTruthy();
    if (url.hash) {
      const body = await response.text();
      expect(body).toContain(`id="${url.hash.slice(1)}"`);
    }
  }
  const asset = await page.request.get('/images/sushi-sheet.png');
  expect(asset.ok()).toBeTruthy();
  expect(asset.headers()['content-type']).toContain('image/png');
  expect(await page.locator('.hero-image').evaluate(el => getComputedStyle(el).backgroundImage)).toContain('sushi-sheet.png');
  await page.screenshot({ path: 'test-results/home-desktop.png', fullPage: true });
  await page.getByRole('link', { name: 'View the menu', exact: true }).click();
  await expect(page).toHaveTitle('Sushi Den Menu | Rolls & Combos in Vancouver');
  await expect(page.locator('.menu-item:visible')).toHaveCount(8);
  for (const [label, count] of [['Rolls', 4], ['Combos', 2], ['House specials', 2], ['All', 8]]) {
    await page.getByRole('button', { name: label, exact: true }).click();
    await expect(page.locator('.menu-item:visible')).toHaveCount(count);
    await expect(page.getByRole('button', { name: label, exact: true })).toHaveAttribute('aria-pressed', 'true');
  }
  await page.screenshot({ path: 'test-results/menu-desktop.png', fullPage: true });
  await page.goto('/menu.html?category=combos');
  await expect(page.locator('.menu-item:visible')).toHaveCount(2);
  await page.goto('/menu.html?category=invalid');
  await expect(page.locator('.menu-item:visible')).toHaveCount(8);
  expect(errors).toEqual([]);
});

test('mobile navigation, keyboard, favorites, and narrow layouts work', async ({ page }) => {
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
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Reviews', exact: true }).click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page).toHaveURL(/#reviews$/);
  await page.getByRole('link', { name: 'Sashimi and roll combo', exact: true }).click();
  await expect(page).toHaveURL(/menu.html\?category=combos$/);
  await expect(page.locator('.menu-item:visible')).toHaveCount(2);
  await page.screenshot({ path: 'test-results/menu-mobile.png', fullPage: true });
  for (const width of [320, 390, 768, 1024]) {
    await page.setViewportSize({ width, height: 844 });
    for (const path of ['/', '/menu.html']) {
      await page.goto(path);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${path} at ${width}px`).toBeTruthy();
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.screenshot({ path: 'test-results/home-mobile.png', fullPage: true });
});

test('search metadata is consistent and avoids unverified business facts', async ({ page }) => {
  const base = 'https://mapal-27.github.io/Website/';
  const titles = new Set();
  for (const [path, canonical] of [['/', base], ['/menu.html', base + 'menu.html']]) {
    await page.goto(path);
    titles.add(await page.title());
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', canonical);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Sushi Den/);
    const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
    const restaurant = schema['@graph'].find(entity => entity['@type'] === 'Restaurant');
    expect(restaurant.name).toBe('Sushi Den');
    expect(restaurant.hasMenu).toBe(base + 'menu.html');
    expect(restaurant).not.toHaveProperty('aggregateRating');
    expect(restaurant.address.streetAddress).toBe('609 Abbott St');
    expect(restaurant.address.addressLocality).toBe('Vancouver');
    expect(restaurant.telephone).toBe('+1-604-687-4422');
    expect(restaurant.openingHoursSpecification[0].opens).toBe('11:00');
    expect(restaurant.openingHoursSpecification[1].opens).toBe('12:00');
    await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Call to order takeout' })).toHaveAttribute('href', 'tel:+16046874422');
    const socialImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    const image = await page.request.get(new URL(socialImage).pathname.replace('/Website', ''));
    expect(image.headers()['content-type']).toContain('image/png');
  }
  expect(titles.size).toBe(2);
  const sitemap = await page.request.get('/sitemap.xml');
  expect(sitemap.ok()).toBeTruthy();
  const xml = await sitemap.text();
  expect(xml).toContain(`<loc>${base}</loc>`);
  expect(xml).toContain(`<loc>${base}menu.html</loc>`);
  const robots = await page.request.get('/robots.txt');
  expect(await robots.text()).toContain('Sitemap: ' + base + 'sitemap.xml');
  const llms = await page.request.get('/llms.txt');
  expect(await llms.text()).toContain('Sample prices in CAD, not live quotes');
});


test('Vancouver contact details and mobile takeout controls are actionable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const actions = page.getByRole('navigation', { name: 'Quick actions' });
  await expect(actions).toBeVisible();
  await expect(actions.getByRole('link', { name: 'Call for takeout' })).toHaveAttribute('href', 'tel:+16046874422');
  await expect(page.locator('#visit')).toContainText('609 Abbott St');
  await expect(page.locator('#visit')).toContainText('V6B 0J4');
  await expect(page.locator('#visit')).toContainText('Sundays & holidays');
  await expect(page.getByRole('link', { name: /Read reviews on Google/ })).toHaveAttribute('href', 'https://share.google/jNB8fL5ygfavLDCf1');
  await expect(page.getByRole('link', { name: /Get directions/ })).toHaveAttribute('href', /destination=Sushi\+Den\+609\+Abbott/);
  await expect(page.locator('iframe')).toHaveCount(0);
  await page.route('https://www.google.com/maps**', route => route.fulfill({ body: '<html><body>Map provider test response</body></html>', contentType: 'text/html' }));
  await page.getByRole('button', { name: 'Show location on map' }).click();
  await expect(page.locator('iframe')).toHaveAttribute('src', /Sushi\+Den\+609\+Abbott/);
  await expect(page.locator('iframe')).toHaveAttribute('title', 'Sushi Den at 609 Abbott St, Vancouver');
  await actions.getByRole('link', { name: 'Menu', exact: true }).click();
  await expect(page.locator('.menu-note')).toContainText('sample CAD prices');
  await expect(page.locator('.menu-item').filter({ hasText: 'California roll' })).toContainText('$4.50');
  await expect(page.locator('.menu-item').filter({ hasText: 'Red Dragon roll' })).toContainText('Call for price');
  await page.screenshot({ path: 'test-results/menu-vancouver-mobile.png', fullPage: true });
});


test('the menu is browsable directly without PDF links', async ({ page }) => {
  for (const path of ['/', '/menu.html']) {
    await page.goto(path);
    await expect(page.locator('a[href*=".pdf"]')).toHaveCount(0);
  }
  await expect(page.locator('.menu-note')).toContainText('sample CAD prices');
  await expect(page.locator('.menu-item:visible')).toHaveCount(8);
});
