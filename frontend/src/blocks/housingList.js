import { getListings } from '../api.js';
import { esc, errorHtml } from '../utils.js';
import { listingCard } from '../components/cards.js';

export function housingList({ anchor, title, showFilters, limit }) {
  const filters = showFilters ? `
    <form class="filters" data-filters>
      <label>Місто <input name="city" placeholder="Львів"></label>
      <label>Ціна від <input name="minPrice" type="number" min="0"></label>
      <label>Ціна до <input name="maxPrice" type="number" min="0"></label>
      <label>Кімнат від
        <select name="rooms"><option value="">—</option><option>1</option><option>2</option><option>3</option><option>4</option></select>
      </label>
      <label class="check"><input name="freeOnly" type="checkbox" value="true"> Лише з вільними місцями</label>
      <label class="check"><input name="pets" type="checkbox" value="true"> З тваринами</label>
      <label class="check"><input name="smoking" type="checkbox" value="true"> Можна палити</label>
      <button class="btn btn--primary" type="reset">Скинути</button>
    </form>` : '';
  return `
    <section class="catalog" ${anchor ? `id="${esc(anchor)}"` : ''} data-block="housingList" data-limit="${limit || 12}">
      <h2 class="section-title">${esc(title)}</h2>
      ${filters}
      <div class="grid" data-results><p class="notice">Завантаження…</p></div>
    </section>`;
}

export function mountHousingList(el) {
  const out = el.querySelector('[data-results]');
  const form = el.querySelector('[data-filters]');
  const limit = el.dataset.limit;
  let seq = 0;

  async function load() {
    const my = ++seq;
    const params = form ? Object.fromEntries(new FormData(form)) : {};
    try {
      const { docs } = await getListings({ ...params, limit });
      if (my !== seq) return;
      out.innerHTML = docs.length ? docs.map(listingCard).join('') : '<p class="notice">За вашим запитом житла не знайдено.</p>';
    } catch (e) {
      if (my === seq) out.innerHTML = errorHtml(e);
    }
  }

  if (form) {
    form.addEventListener('input', load);
    form.addEventListener('reset', () => setTimeout(load));
  }
  load();
}
