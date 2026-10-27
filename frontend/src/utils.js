export const esc = (v) =>
  String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const money = (n) => `${Number(n).toLocaleString('uk-UA')} грн/міс`;

export const LABELS = {
  cleanliness: { relaxed: 'Невимушено', normal: 'Помірно', tidy: 'Дуже охайно' },
  schedule: { early: 'Жайворонок', flexible: 'Гнучкий', night: 'Сова' },
  pets: { have: 'Маю тварину', ok: 'Не проти тварин', no: 'Без тварин' },
  smoking: { smoker: 'Курю', tolerant: 'Толерантно до куріння', nonsmoker: 'Не курю' },
};

export const PREF_TITLES = { cleanliness: 'Чистота', schedule: 'Режим дня', pets: 'Тварини', smoking: 'Куріння' };

export const errorHtml = (e) => `<p class="notice notice--error">Помилка: ${esc(e.message)}</p>`;
