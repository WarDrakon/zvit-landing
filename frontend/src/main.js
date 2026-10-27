import './styles/base.css';
import './styles/app.css';
import { getSettings, getPage } from './api.js';
import { header } from './layout/header.js';
import { footer } from './layout/footer.js';
import { renderBlocks, mountBlocks } from './renderBlocks.js';
import { listingDetail } from './pages/listingDetail.js';
import { esc } from './utils.js';

const app = document.querySelector('#app');

async function start() {
  app.textContent = 'Завантаження…';
  try {
    const path = location.pathname.replace(/(.)\/$/, '$1');
    const detail = path.match(/^\/housing\/(\d+)$/);
    const [settings, content] = await Promise.all([
      getSettings(),
      detail
        ? listingDetail(detail[1])
        : getPage(path).then((p) => ({ title: p.title, html: renderBlocks(p.blocks) })),
    ]);
    document.title = `${content.title} — ${settings.siteName}`;
    app.innerHTML = `${header(settings)}<main>${content.html}</main>${footer(settings)}`;
    mountBlocks(app);
  } catch (error) {
    console.error(error);
    app.innerHTML = `<p class="notice notice--error">Щось пішло не так: ${esc(error.message)}</p><p><a href="/">На головну</a></p>`;
  }
}

start();
