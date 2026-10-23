import { test, expect } from '@playwright/test';

test('homepage sections are separate, navigation and local assets work', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page).toHaveTitle('Sushi Den Japanese Restaurant | Sushi & Menu');
  await expect(page.locator('h1')).toHaveText('Your sushispot.');
  const why = await page.locator('#why-us').boundingBox();
  const reviews = await page.locator('#reviews').boundingBox();
  expect(reviews.y).toBeGreaterThanOrEqual(why.y + why.height - 1);
  expect(Math.abs(why.width - 1440)).toBeLessThan(1);
  await expect(page.locator('#reviews')).toContainText('Guest reviews coming soon.');
  const links = await page.locator('a[href]').evaluateAll(nodes => nodes.map(node => node.href));
  for (const link of new Set(links)) {
    const url = new URL(link);
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
  await expect(page).toHaveTitle('Sushi Menu | Sushi Den Japanese Restaurant');
  await expect(page.locator('.menu-item:visible')).toHaveCount(8);
  for (const [label, count] of [['Rolls', 3], ['Nigiri', 2], ['Sashimi', 1], ['Sides', 2], ['All', 8]]) {
    await page.getByRole('button', { name: label, exact: true }).click();
    await expect(page.locator('.menu-item:visible')).toHaveCount(count);
    await expect(page.getByRole('button', { name: label, exact: true })).toHaveAttribute('aria-pressed', 'true');
  }
  await page.screenshot({ path: 'test-results/menu-desktop.png', fullPage: true });
  await page.goto('/menu.html?category=nigiri');
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
  await page.getByRole('link', { name: 'Salmon nigiri', exact: true }).click();
  await expect(page).toHaveURL(/menu.html\?category=nigiri$/);
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
    expect(restaurant.name).toBe('Sushi Den Japanese Restaurant');
    expect(restaurant.hasMenu).toBe(base + 'menu.html');
    expect(restaurant).not.toHaveProperty('aggregateRating');
    expect(restaurant).not.toHaveProperty('address');
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
  expect(await llms.text()).toContain('Menu items, ingredients, availability, and prices have not been confirmed.');
});
