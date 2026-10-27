import type { Block } from 'payload'

export const RoommateList: Block = {
  slug: 'roommateList',
  labels: { singular: 'Анкети співмешканців', plural: 'Анкети співмешканців' },
  fields: [
    { name: 'anchor', type: 'text', label: 'ID секції' },
    { name: 'title', type: 'text', label: 'Заголовок', required: true },
    { name: 'limit', type: 'number', label: 'Максимум анкет', defaultValue: 12, min: 1, max: 50 },
    { name: 'showCompatibility', type: 'checkbox', label: 'Показувати сумісність', defaultValue: true },
  ],
}
