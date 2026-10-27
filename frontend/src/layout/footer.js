import { esc } from '../utils.js';

export function footer({ siteName, footer: f = {} }) {
  const year = new Date().getFullYear();
  const links = (f.links || []).map(({ label, link }) => `<a href="${esc(link)}">${esc(label)}</a>`).join(' · ');
  return `<footer class="footer">© ${year} ${esc(siteName)}. ${esc(f.text)} ${links}</footer>`;
}
