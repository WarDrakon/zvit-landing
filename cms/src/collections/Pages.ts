import type { CollectionConfig } from 'payload'
import { Hero } from '../blocks/Hero'
import { Features } from '../blocks/Features'
import { HousingList } from '../blocks/HousingList'
import { RoommateList } from '../blocks/RoommateList'
import { TextSection } from '../blocks/TextSection'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { plural: 'Сторінки', singular: 'Сторінка' },
  access: { read: () => true },
  admin: { useAsTitle: 'title' },
  fields: [
    {
      name: 'path',
      type: 'text',
      label: 'Урл сторінки',
      required: true,
      unique: true,
      defaultValue: '/',
      validate: (v: string | null | undefined) =>
        typeof v === 'string' && v.startsWith('/') ? true : 'Шлях має починатися з "/"',
    },
    { name: 'title', type: 'text', label: 'Назва сторінки', required: true },
    { name: 'blocks', type: 'blocks', label: 'Блоки', blocks: [Hero, Features, HousingList, RoommateList, TextSection] },
  ],
}
