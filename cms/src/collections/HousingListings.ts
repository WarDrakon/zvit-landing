import type { CollectionConfig } from 'payload'

export const HousingListings: CollectionConfig = {
  slug: 'housing-listings',
  labels: { singular: 'Оголошення житла', plural: 'Оголошення житла' },
  access: { read: () => true },
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'city', 'price', 'freeSpots', 'status'] },
  fields: [
    { name: 'title', type: 'text', label: 'Заголовок', required: true },
    { name: 'city', type: 'text', label: 'Місто', required: true, index: true },
    { name: 'address', type: 'text', label: 'Адреса / район' },
    { name: 'price', type: 'number', label: 'Ціна за місце, грн/міс', required: true, min: 0 },
    { name: 'rooms', type: 'number', label: 'Кількість кімнат', required: true, min: 1 },
    { name: 'area', type: 'number', label: 'Площа, м²', min: 1 },
    { name: 'totalSpots', type: 'number', label: 'Всього місць', required: true, min: 1, defaultValue: 2 },
    {
      name: 'freeSpots',
      type: 'number',
      label: 'Вільних місць',
      required: true,
      min: 0,
      defaultValue: 1,
      validate: (value: number | null | undefined, { siblingData }: { siblingData: Record<string, any> }) => {
        const total = Number(siblingData?.totalSpots)
        if (typeof value === 'number' && total && value > total) return 'Вільних місць не може бути більше, ніж усього місць'
        return true
      },
    },
    { name: 'description', type: 'textarea', label: 'Опис', required: true },
    { name: 'photoUrl', type: 'text', label: 'Посилання на фото' },
    { name: 'petsAllowed', type: 'checkbox', label: 'Можна з тваринами', defaultValue: false },
    { name: 'smokingAllowed', type: 'checkbox', label: 'Можна палити', defaultValue: false },
    {
      name: 'status',
      type: 'select',
      label: 'Статус',
      required: true,
      defaultValue: 'open',
      options: [
        { label: 'Відкрите', value: 'open' },
        { label: 'Закрите', value: 'closed' },
      ],
    },
    { name: 'contactName', type: 'text', label: 'Контактна особа', required: true },
    { name: 'contactPhone', type: 'text', label: 'Телефон' },
  ],
}
