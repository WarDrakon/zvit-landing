import type { Block } from 'payload'

export const TextSection: Block = {
  slug: 'textSection',
  labels: { singular: 'Текстова секція', plural: 'Текстові секції' },
  fields: [
    { name: 'anchor', type: 'text', label: 'ID секції' },
    { name: 'title', type: 'text', label: 'Заголовок', required: true },
    { name: 'body', type: 'textarea', label: 'Текст', required: true },
  ],
}
