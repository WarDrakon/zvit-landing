import './features.css';
import { esc } from '../utils.js';

export function features({ anchor, title, items = [] }) {
  return `
    <section class="features" ${anchor ? `id="${esc(anchor)}"` : ''}>
      <h2 class="section-title">${esc(title)}</h2>
      <div class="features__grid">
        ${items.map(({ icon, title, text }) => `
          <article class="feature">
            <span class="feature__icon">${esc(icon)}</span>
            <h3 class="feature__title">${esc(title)}</h3>
            <p class="feature__text">${esc(text)}</p>
          </article>`).join('')}
      </div>
    </section>`;
}
