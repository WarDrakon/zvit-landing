import type { GlobalConfig } from 'payload'

const base = { access: { read: () => true } }

export const Header: GlobalConfig = {
  ...base,
  slug: 'header',
  label: 'Шапка',
  fields: [
    { name: 'ctaText', type: 'text', label: 'Текст кнопки' },
    { name: 'ctaLink', type: 'text', label: 'Посилання кнопки' },
  ],
}

export const Footer: GlobalConfig = {
  ...base,
  slug: 'footer',
  label: 'Футер',
  fields: [
    { name: 'text', type: 'text', label: 'Текст' },
    {
      name: 'links',
      type: 'array',
      label: 'Посилання',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'link', type: 'text', required: true },
      ],
    },
  ],
}

export const Navigation: GlobalConfig = {
  ...base,
  slug: 'navigation',
  label: 'Навігація',
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Пункти меню',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'link', type: 'text', required: true },
      ],
    },
  ],
}

export const SiteSettings: GlobalConfig = {
  ...base,
  slug: 'site-settings',
  label: 'Загальні налаштування',
  fields: [
    { name: 'siteName', type: 'text', label: 'Назва сайту', required: true, defaultValue: 'Співмешканці' },
    { name: 'tagline', type: 'text', label: 'Слоган' },
    { name: 'contactEmail', type: 'email', label: 'Контактний email' },
  ],
}
