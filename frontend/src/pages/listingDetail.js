import { getListing, getRoommates } from '../api.js';
import { esc, money, errorHtml } from '../utils.js';
import { profileCard } from '../components/cards.js';
import { loadPrefs } from '../components/prefs.js';

export async function listingDetail(id) {
  const l = await getListing(id);
  const prefs = loadPrefs();
  let people = [];
  try {
    people = (await getRoommates({ ...(prefs || {}), city: l.city, limit: 6 })).docs;
  } catch (e) {
    people = null;
    var err = errorHtml(e);
  }
  const photo = l.photo ? `<img class="detail__img" src="${esc(l.photo)}" alt="${esc(l.title)}">` : `<div class="detail__img card__img--placeholder">🏠</div>`;
  return {
    title: l.title,
    html: `
      <article class="detail">
        <a href="/housing">← До каталогу</a>
        ${photo}
        <span class="tag">${esc(l.city)}${l.address ? `, ${esc(l.address)}` : ''}</span>
        <h1>${esc(l.title)}</h1>
        <p class="card__price">${money(l.price)}</p>
        <dl class="facts">
          <div><dt>Кімнат</dt><dd>${l.rooms}</dd></div>
          <div><dt>Площа</dt><dd>${l.area ? `${l.area} м²` : '—'}</dd></div>
          <div><dt>Вільних місць</dt><dd>${l.freeSpots} з ${l.totalSpots}</dd></div>
          <div><dt>Тварини</dt><dd>${l.petsAllowed ? 'Можна' : 'Не можна'}</dd></div>
          <div><dt>Куріння</dt><dd>${l.smokingAllowed ? 'Можна' : 'Не можна'}</dd></div>
        </dl>
        <p>${esc(l.description)}</p>
        <p><strong>Контакт:</strong> ${esc(l.contact.name)} ${esc(l.contact.phone)}</p>
        <h2 class="section-title">Потенційні співмешканці в місті ${esc(l.city)}</h2>
        ${prefs ? '' : '<p class="notice">Вкажіть вподобання на сторінці <a href="/roommates">«Співмешканці»</a>, щоб побачити сумісність.</p>'}
        <div class="grid">${people ? (people.map((p) => profileCard(p, !!prefs)).join('') || '<p class="notice">Анкет у цьому місті поки немає.</p>') : err}</div>
      </article>`,
  };
}
