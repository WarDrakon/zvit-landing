import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { HousingListings } from './collections/HousingListings'
import { RoommateProfiles } from './collections/RoommateProfiles'
import { Header, Footer, Navigation, SiteSettings } from './globals'
import { commonEndpoint, pageEndpoint, listingsEndpoint, listingEndpoint, roommatesEndpoint } from './endpoints'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Дозволені origin-и frontend: локальний Vite + домени з FRONTEND_URL (через кому)
const origins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  ...(process.env.FRONTEND_URL ?? '')
    .split(',')
    .map((s) => s.trim().replace(/\/$/, ''))
    .filter(Boolean),
]

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections: [Users, Media, Pages, HousingListings, RoommateProfiles],
  globals: [SiteSettings, Header, Navigation, Footer],
  endpoints: [commonEndpoint, pageEndpoint, listingsEndpoint, listingEndpoint, roommatesEndpoint],
  cors: origins,
  csrf: [...origins, ...(process.env.CMS_URL ? [process.env.CMS_URL] : [])],
  serverURL: process.env.CMS_URL || undefined,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  // Vercel Blob активується лише коли задано токен BLOB_READ_WRITE_TOKEN.
  // Інакше Media використовує локальне сховище файлів Payload (dev / без токена).
  ...(process.env.BLOB_READ_WRITE_TOKEN
    ? {
        plugins: [
  vercelBlobStorage({
    enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    collections: {
      media: true,
    },
    token: process.env.BLOB_READ_WRITE_TOKEN,
  }),
],
      }
    : {}),
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    // dev: схема синхронізується автоматично (push); production: лише міграції (npm run migrate)
    push: process.env.NODE_ENV !== 'production',
    migrationDir: path.resolve(dirname, 'migrations'),
  }),
  sharp,
})
