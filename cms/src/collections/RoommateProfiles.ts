import type { CollectionConfig } from 'payload'

export const RoommateProfiles: CollectionConfig = {
  slug: 'roommate-profiles',
  labels: { singular: 'Анкета співмешканця', plural: 'Анкети співмешканців' },
  access: {
    read: ({ req }) => (req.user ? true : { published: { equals: true } }),
  },
  admin: { useAsTitle: 'name', defaultColumns: ['name', 'age', 'city', 'budget', 'published'] },
  fields: [
    { name: 'name', type: 'text', label: "Ім'я", required: true },
    { name: 'age', type: 'number', label: 'Вік', required: true, min: 18, max: 99 },
    { name: 'city', type: 'text', label: 'Місто', required: true, index: true },
    { name: 'budget', type: 'number', label: 'Бюджет, грн/міс', required: true, min: 0 },
    { name: 'bio', type: 'textarea', label: 'Про себе', required: true },
    {
      name: 'cleanliness',
      type: 'select',
      label: 'Чистота',
      required: true,
      defaultValue: 'normal',
      options: [
        { label: 'Невимушено', value: 'relaxed' },
        { label: 'Помірно', value: 'normal' },
        { label: 'Дуже охайно', value: 'tidy' },
      ],
    },
    {
      name: 'schedule',
      type: 'select',
      label: 'Режим дня',
      required: true,
      defaultValue: 'flexible',
      options: [
        { label: 'Жайворонок', value: 'early' },
        { label: 'Гнучкий', value: 'flexible' },
        { label: 'Сова', value: 'night' },
      ],
    },
    {
      name: 'pets',
      type: 'select',
      label: 'Домашні тварини',
      required: true,
      defaultValue: 'ok',
      options: [
        { label: 'Маю тварину', value: 'have' },
        { label: 'Не проти', value: 'ok' },
        { label: 'Не хочу тварин', value: 'no' },
      ],
    },
    {
      name: 'smoking',
      type: 'select',
      label: 'Куріння',
      required: true,
      defaultValue: 'nonsmoker',
      options: [
        { label: 'Курю', value: 'smoker' },
        { label: 'Толерантно ставлюся', value: 'tolerant' },
        { label: 'Не курю, проти куріння', value: 'nonsmoker' },
      ],
    },
    { name: 'listing', type: 'relationship', relationTo: 'housing-listings', label: 'Цікавить оголошення' },
    { name: 'published', type: 'checkbox', label: 'Опублікована', defaultValue: true },
  ],
}
