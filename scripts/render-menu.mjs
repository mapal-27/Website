import { readFileSync, writeFileSync } from 'node:fs';
const data = JSON.parse(readFileSync(new URL('../data/menu.json', import.meta.url), 'utf8'));
const base = 'https://mapal-27.github.io/Website/kwao-thai/';
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const money = price => '$' + Number(price).toFixed(2);
const menu = { '@type': 'Menu', '@id': base + 'menu.html#menu', name: 'Kwao Thai Menu', url: base + 'menu.html', hasMenuSection: [] };
const buttons = data.categories.map(c => `<button type="button" class="filter-button" data-menu-filter="${c.id}" aria-pressed="false">${escape(c.name)}</button>`).join('');
let html = `<div class="menu-browser" data-menu-controls hidden><div class="menu-search"><label for="menu-search">Find a dish</label><div><i data-lucide="search" aria-hidden="true"></i><input type="search" id="menu-search" placeholder="Try Pad Thai, curry, or #17" autocomplete="off"><button type="button" class="search-clear" data-clear-search aria-label="Clear search" hidden><i data-lucide="x" aria-hidden="true"></i></button></div></div><div class="menu-filters" role="group" aria-label="Filter menu by category"><button type="button" class="filter-button active" data-menu-filter="all" aria-pressed="true">All</button>${buttons}</div><p class="menu-result-count" role="status" aria-live="polite" data-menu-status></p></div>\n<div class="menu-empty" data-menu-empty hidden><h2>No dishes found.</h2><p>Try another search or category.</p><button type="button" class="btn btn-primary" data-menu-reset>Show full menu</button></div>\n`;
for (const category of data.categories) {
  const section = { '@type': 'MenuSection', name: category.name, hasMenuItem: [] };
  html += `<section class="menu-category" id="${category.id}" data-menu-category="${category.id}" aria-labelledby="${category.id}-title"><h2 id="${category.id}-title">${escape(category.name)}</h2>${category.note ? `<p class="category-note">${escape(category.note)}</p>` : ''}<div class="menu-list">\n`;
  for (const item of category.items) {
    const label = item.price === undefined ? 'Call to confirm' : (item.options?.length > 1 ? 'From ' : '') + money(item.price);
    const options = item.options ? `<ul class="menu-options">${item.options.map(o => `<li><span>${escape(o.label)}</span><span>${o.price == null ? 'Call to confirm' : money(o.price)}</span></li>`).join('')}</ul>` : '';
    html += `<article class="menu-entry" id="dish-${item.id}" data-menu-item><div class="menu-entry-heading"><h3>${item.number ? `<span class="dish-number">#${item.number}</span> ` : ''}${escape(item.name)}</h3><span class="entry-price${item.price === undefined ? ' price-pending' : ''}">${label}</span></div>${item.description ? `<p class="entry-description">${escape(item.description)}</p>` : ''}${options}${item.note ? `<p class="price-note">${escape(item.note)}</p>` : ''}</article>\n`;
    const schemaItem = { '@type': 'MenuItem', '@id': base + 'menu.html#dish-' + item.id, name: item.name, description: [item.description, item.note].filter(Boolean).join(' '), url: base + 'menu.html#dish-' + item.id };
    // Variant offers retain actual portion/protein prices; conflicting source prices are omitted.
    const offers = item.options ? item.options.filter(o => o.price != null).map(o => ({ '@type': 'Offer', name: o.label, price: Number(o.price).toFixed(2), priceCurrency: data.currency })) : item.price === undefined ? [] : [{ '@type': 'Offer', price: Number(item.price).toFixed(2), priceCurrency: data.currency }];
    if (offers.length) schemaItem.offers = offers;
    section.hasMenuItem.push(schemaItem);
  }
  html += '</div></section>\n';
  menu.hasMenuSection.push(section);
}
for (const file of ['index.html', 'menu.html']) {
  const path = new URL('../' + file, import.meta.url);
  let page = readFileSync(path, 'utf8');
  if (file === 'menu.html') {
    const pattern = /<!-- MENU:START -->[\s\S]*?<!-- MENU:END -->/;
    if (!pattern.test(page)) throw new Error('Menu output markers are missing');
    page = page.replace(pattern, () => `<!-- MENU:START -->\n${html}<!-- MENU:END -->`);
  }
  const schemaPattern = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/;
  const match = page.match(schemaPattern);
  const schema = JSON.parse(match[1]);
  schema['@graph'] = schema['@graph'].filter(entity => entity['@type'] !== 'Menu');
  const webPage = schema['@graph'].find(entity => entity['@type'] === 'WebPage');
  if (webPage) webPage.description = page.match(/<meta name="description" content="([^"]*)"/)[1];
  schema['@graph'].find(entity => entity['@type'] === 'Restaurant').hasMenu = { '@id': menu['@id'] };
  if (file === 'menu.html') schema['@graph'].push(menu);
  page = page.replace(schemaPattern, () => `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`);
  writeFileSync(path, page);
}
console.log(`Rendered ${data.categories.reduce((count, c) => count + c.items.length, 0)} dishes in ${data.categories.length} categories.`);
