import { createIcons, ArrowUpRight, ArrowRight, ArrowLeft, Menu, Fish, Utensils, UsersRound, MessageSquare, MapPin, Clock3, Phone, Sprout, Soup, Info, TrainFront } from 'lucide';

createIcons({ icons: { ArrowUpRight, ArrowRight, ArrowLeft, Menu, Fish, Utensils, UsersRound, MessageSquare, MapPin, Clock3, Phone, Sprout, Soup, Info, TrainFront } });

document.querySelectorAll('[data-year]').forEach(el => { el.textContent = String(new Date().getFullYear()); });
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

const filters = [...document.querySelectorAll('[data-filter]')];
const items = [...document.querySelectorAll('[data-category]')];
const allowed = filters.map(button => button.dataset.filter);
function filterMenu(category, updateURL = false) {
  const selected = allowed.includes(category) ? category : 'all';
  let count = 0;
  items.forEach(item => { item.hidden = selected !== 'all' && item.dataset.category !== selected; if (!item.hidden) count++; });
  filters.forEach(button => { const active = button.dataset.filter === selected; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
  const status = document.querySelector('#menu-status');
  if (status) status.textContent = `${count} ${selected === 'all' ? 'menu' : selected} items shown.`;
  if (updateURL) {
    const url = new URL(location.href);
    if (selected === 'all') url.searchParams.delete('category'); else url.searchParams.set('category', selected);
    history.replaceState(null, '', url);
  }
}
filters.forEach(button => button.addEventListener('click', () => filterMenu(button.dataset.filter, true)));
if (filters.length) filterMenu(new URLSearchParams(location.search).get('category'));

const mapButton = document.querySelector('[data-load-map]');
mapButton?.addEventListener('click', () => {
  const frame = document.createElement('iframe');
  frame.title = 'Sushi Den at 609 Abbott St, Vancouver';
  frame.src = 'https://www.google.com/maps?q=Sushi+Den+609+Abbott+St+Vancouver+BC&output=embed';
  frame.referrerPolicy = 'no-referrer-when-downgrade';
  frame.allowFullscreen = true;
  frame.tabIndex = 0;
  document.querySelector('[data-map-panel]').replaceChildren(frame);
  frame.focus();
});
