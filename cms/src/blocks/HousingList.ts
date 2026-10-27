import type { Block } from 'payload'

export const HousingList: Block = {
  slug: 'housingList',
  labels: { singular: 'Каталог житла', plural: 'Каталог житла' },
  fields: [
    { name: 'anchor', type: 'text', label: 'ID секції' },
    { name: 'title', type: 'text', label: 'Заголовок', required: true },
    { name: 'limit', type: 'number', label: 'Максимум карток', defaultValue: 12, min: 1, max: 50 },
    { name: 'showFilters', type: 'checkbox', label: 'Показувати фільтри', defaultValue: true },
  ],
}
