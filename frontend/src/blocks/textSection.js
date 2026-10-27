import { esc } from '../utils.js';

export function textSection({ anchor, title, body }) {
  return `
    <section class="text-section" ${anchor ? `id="${esc(anchor)}"` : ''}>
      <h2 class="section-title">${esc(title)}</h2>
      ${String(body).split(/\n{2,}/).map((p) => `<p>${esc(p)}</p>`).join('')}
    </section>`;
}
