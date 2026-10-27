import { LABELS, PREF_TITLES } from '../utils.js';

const KEY = 'myPrefs';

export function loadPrefs() {
  try {
    const p = JSON.parse(localStorage.getItem(KEY));
    if (p && Object.keys(PREF_TITLES).every((k) => LABELS[k][p[k]])) return p;
  } catch { /* порожнє сховище */ }
  return null;
}

export function savePrefs(p) {
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* ігноруємо */ }
}

export function prefsForm(current) {
  return `
    <form class="prefs" data-prefs>
      <h3>Мої вподобання</h3>
      <div class="prefs__grid">
        ${Object.keys(PREF_TITLES).map((k) => `
          <label>${PREF_TITLES[k]}
            <select name="${k}">
              <option value="">—</option>
              ${Object.entries(LABELS[k]).map(([v, t]) => `<option value="${v}" ${current?.[k] === v ? 'selected' : ''}>${t}</option>`).join('')}
            </select>
          </label>`).join('')}
      </div>
      <p class="card__meta">Оберіть усі чотири пункти, щоб побачити сумісність.</p>
    </form>`;
}

export function readPrefs(form) {
  const data = Object.fromEntries(new FormData(form));
  return Object.keys(PREF_TITLES).every((k) => data[k]) ? data : null;
}
