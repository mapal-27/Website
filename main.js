import { createIcons, ArrowUpRight, ArrowRight, ArrowLeft, Menu, Flame, Utensils, MessageSquare, MapPin, Clock3, Phone, Sprout, ShoppingBag } from 'lucide';
createIcons({ icons: { ArrowUpRight, ArrowRight, ArrowLeft, Menu, Flame, Utensils, MessageSquare, MapPin, Clock3, Phone, Sprout, ShoppingBag } });
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
