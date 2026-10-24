import { createIcons, ArrowUpRight, ArrowRight, ArrowLeft, Menu, Flame, Utensils, MessageSquare, MapPin, Clock3, Phone, Sprout, ShoppingBag, Search, X } from 'lucide';
createIcons({ icons: { ArrowUpRight, ArrowRight, ArrowLeft, Menu, Flame, Utensils, MessageSquare, MapPin, Clock3, Phone, Sprout, ShoppingBag, Search, X } });
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
function closeNav() {
  toggle?.setAttribute('aria-expanded', 'false');
  toggle?.setAttribute('aria-label', 'Open navigation');
  nav?.classList.remove('is-open');
}
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  nav.classList.toggle('is-open', open);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') { closeNav(); toggle.focus(); } });
const mapButton = document.querySelector('[data-load-map]');
mapButton?.addEventListener('click', () => {
  const frame = document.createElement('iframe');
  frame.title = 'Kwao Thai at 1207 A Esquimalt Road, Victoria';
  frame.src = 'https://www.google.com/maps?q=Kwao+Thai+1207+A+Esquimalt+Road+Victoria+BC&output=embed';
  frame.referrerPolicy = 'no-referrer-when-downgrade';
  frame.allowFullscreen = true;
  frame.tabIndex = 0;
  document.querySelector('[data-map-panel]').replaceChildren(frame);
  frame.focus();
});

const menuControls = document.querySelector('[data-menu-controls]');
if (menuControls) {
  menuControls.hidden = false;
  const input = document.querySelector('#menu-search');
  const clear = document.querySelector('[data-clear-search]');
  const filters = [...document.querySelectorAll('[data-menu-filter]')];
  const groups = [...document.querySelectorAll('[data-menu-category]')];
  const items = [...document.querySelectorAll('[data-menu-item]')];
  const status = document.querySelector('[data-menu-status]');
  const empty = document.querySelector('[data-menu-empty]');
  const params = new URLSearchParams(location.search);
  let category = filters.some(button => button.dataset.menuFilter === params.get('category')) ? params.get('category') : 'all';
  input.value = params.get('q') || '';
  const searchable = new Map(items.map(item => [item, item.textContent.toLowerCase()]));
  function applyFilters(updateURL = true) {
    const query = input.value.toLowerCase().trim();
    let count = 0;
    groups.forEach(group => {
      let visible = 0;
      group.querySelectorAll('[data-menu-item]').forEach(item => {
        item.hidden = (category !== 'all' && group.dataset.menuCategory !== category) || !searchable.get(item).includes(query);
        if (!item.hidden) visible++;
      });
      group.hidden = visible === 0;
      count += visible;
    });
    filters.forEach(button => {
      const active = button.dataset.menuFilter === category;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    clear.hidden = input.value.length === 0;
    empty.hidden = count !== 0;
    status.textContent = `${count} ${count === 1 ? 'dish' : 'dishes'} shown`;
    if (updateURL) {
      const url = new URL(location.href);
      if (category === 'all') url.searchParams.delete('category'); else url.searchParams.set('category', category);
      if (input.value.trim()) url.searchParams.set('q', input.value.trim()); else url.searchParams.delete('q');
      url.hash = '';
      history.replaceState(null, '', url);
    }
  }
  filters.forEach(button => button.addEventListener('click', () => { category = button.dataset.menuFilter; applyFilters(); }));
  input.addEventListener('input', () => applyFilters());
  clear.addEventListener('click', () => { input.value = ''; applyFilters(); input.focus(); });
  document.querySelector('[data-menu-reset]').addEventListener('click', () => { category = 'all'; input.value = ''; applyFilters(); input.focus(); });
  applyFilters(false);
  if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ behavior: 'instant' });
}
