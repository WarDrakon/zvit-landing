const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

async function getJson(path) {
  if (!API_URL) {
    throw new Error('Не задано VITE_API_URL (див. frontend/.env.example)');
  }
  let res;
  try {
    res = await fetch(`${API_URL}${path}`);
  } catch {
    throw new Error(`Не вдалося зʼєднатися з API (${API_URL}). Перевірте, чи запущено CMS і налаштовано CORS.`);
  }
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      msg = (await res.json()).error || msg;
    } catch { /* тіло не JSON */ }
    throw new Error(msg);
  }
  return res.json();
}

const qs = (params = {}) => {
  const p = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '' && v !== false) p.set(k, v);
  });
  const s = p.toString();
  return s ? `?${s}` : '';
};

export const getSettings = () => getJson('/api/common');
export const getPage = (path) => getJson(`/api/page?path=${encodeURIComponent(path)}`);
export const getListings = (params) => getJson(`/api/listings${qs(params)}`);
export const getListing = (id) => getJson(`/api/listing?id=${encodeURIComponent(id)}`);
export const getRoommates = (params) => getJson(`/api/roommates${qs(params)}`);
