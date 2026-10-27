import './hero.css';
import { esc } from '../utils.js';

export function hero({ anchor, badge, title, subtitle, image, buttons = [] }) {
  const src = image?.src || '';
  return `
    <section class="hero" ${anchor ? `id="${esc(anchor)}"` : ''}>
      <div class="hero__content">
        ${badge ? `<span class="hero__badge">${esc(badge)}</span>` : ''}
        <h1 class="hero__title">${esc(title)}</h1>
        <p class="hero__subtitle">${esc(subtitle)}</p>
        <div class="hero__actions">
          ${buttons.map(({ text, link, variant }) => `<a class="btn btn--${esc(variant)}" href="${esc(link)}">${esc(text)}</a>`).join('')}
        </div>
      </div>
      ${src ? `<img class="hero__image" src="${esc(src)}" alt="${esc(image.alt)}">` : ''}
    </section>`;
}
