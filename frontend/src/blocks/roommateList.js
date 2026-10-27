import { getRoommates } from '../api.js';
import { esc, errorHtml } from '../utils.js';
import { profileCard } from '../components/cards.js';
import { loadPrefs, savePrefs, prefsForm, readPrefs } from '../components/prefs.js';

export function roommateList({ anchor, title, showCompatibility, limit }) {
  return `
    <section class="catalog" ${anchor ? `id="${esc(anchor)}"` : ''} data-block="roommateList" data-limit="${limit || 12}" data-compat="${showCompatibility ? '1' : ''}">
      <h2 class="section-title">${esc(title)}</h2>
      ${showCompatibility ? prefsForm(loadPrefs()) : ''}
      <div class="grid" data-results><p class="notice">Завантаження…</p></div>
    </section>`;
}

export function mountRoommateList(el) {
  const out = el.querySelector('[data-results]');
  const form = el.querySelector('[data-prefs]');
  const showScore = el.dataset.compat === '1';

  async function load() {
    const prefs = form ? readPrefs(form) : null;
    if (prefs) savePrefs(prefs);
    try {
      const { docs } = await getRoommates({ ...(prefs || {}), limit: el.dataset.limit });
      out.innerHTML = docs.length ? docs.map((p) => profileCard(p, showScore)).join('') : '<p class="notice">Анкет поки немає.</p>';
    } catch (e) {
      out.innerHTML = errorHtml(e);
    }
  }

  if (form) form.addEventListener('change', load);
  load();
}
