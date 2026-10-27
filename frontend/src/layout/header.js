import { esc } from '../utils.js';

export function header({ siteName, menu = [], header: h }) {
  const path = location.pathname;
  const active = (link) => (link === '/' ? path === '/' : path === link || path.startsWith(`${link}/`));
  return `
    <header class="header">
      <a class="header__logo" href="/">${esc(siteName)}</a>
      <nav class="header__nav">
        ${menu.map(({ label, link }) => `<a class="header__link${active(link) ? ' is-active' : ''}" href="${esc(link)}">${esc(label)}</a>`).join('')}
        ${h?.ctaText ? `<a class="btn btn--primary header__cta" href="${esc(h.ctaLink || '/')}">${esc(h.ctaText)}</a>` : ''}
      </nav>
    </header>`;
}
