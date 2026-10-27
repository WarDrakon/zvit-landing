import { hero } from './blocks/hero.js';
import { features } from './blocks/features.js';
import { textSection } from './blocks/textSection.js';
import { housingList, mountHousingList } from './blocks/housingList.js';
import { roommateList, mountRoommateList } from './blocks/roommateList.js';

const renderers = { hero, features, textSection, housingList, roommateList };
// Блоки, які самі завантажують дані після вставки в DOM
const mounters = { housingList: mountHousingList, roommateList: mountRoommateList };

export function renderBlocks(blocks) {
  return blocks.map((block) => {
    const render = renderers[block.type];
    if (!render) {
      console.warn(`no block ${block.type}`);
      return '';
    }
    return render(block);
  }).join('');
}

export function mountBlocks(root) {
  root.querySelectorAll('[data-block]').forEach((el) => mounters[el.dataset.block]?.(el));
}
