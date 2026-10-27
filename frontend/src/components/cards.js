import { esc, money, LABELS } from '../utils.js';

export function listingCard(l) {
  const photo = l.photo
    ? `<img class="card__img" src="${esc(l.photo)}" alt="${esc(l.title)}" loading="lazy">`
    : `<div class="card__img card__img--placeholder" aria-hidden="true">🏠</div>`;
  return `
    <article class="card">
      ${photo}
      <div class="card__body">
        <span class="tag">${esc(l.city)}</span>
        <h3 class="card__title"><a href="/housing/${l.id}">${esc(l.title)}</a></h3>
        <p class="card__price">${money(l.price)}</p>
        <p class="card__meta">Кімнат: ${l.rooms} · Вільних місць: ${l.freeSpots} з ${l.totalSpots}</p>
        <a class="btn btn--secondary" href="/housing/${l.id}">Детальніше</a>
      </div>
    </article>`;
}

export function profileCard(p, showScore) {
  const score = showScore && typeof p.compatibility === 'number'
    ? `<p class="score score--${p.compatibility >= 75 ? 'high' : p.compatibility >= 50 ? 'mid' : 'low'}">Сумісність: ${p.compatibility}%</p>`
    : '';
  const pr = p.preferences;
  return `
    <article class="card card--profile">
      <div class="card__body">
        <span class="tag">${esc(p.city)}</span>
        <h3 class="card__title">${esc(p.name)}, ${p.age}</h3>
        ${score}
        <p class="card__meta">Бюджет: ${money(p.budget)}</p>
        <p>${esc(p.bio)}</p>
        <ul class="chips">
          <li>🧹 ${LABELS.cleanliness[pr.cleanliness]}</li>
          <li>🕐 ${LABELS.schedule[pr.schedule]}</li>
          <li>🐾 ${LABELS.pets[pr.pets]}</li>
          <li>🚬 ${LABELS.smoking[pr.smoking]}</li>
        </ul>
      </div>
    </article>`;
}
