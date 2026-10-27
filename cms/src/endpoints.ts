import type { Endpoint, PayloadRequest, Where } from 'payload'
import { compatibility, isPrefs, type Prefs } from './lib/compat'

const json = (data: unknown, status = 200) => Response.json(data, { status })
const q = (req: PayloadRequest, key: string): string | undefined => {
  const v = (req.query as Record<string, unknown>)[key]
  return typeof v === 'string' && v.trim() !== '' ? v.trim() : undefined
}
const num = (v: string | undefined) => (v !== undefined && !Number.isNaN(Number(v)) ? Number(v) : undefined)

const safe = (fn: (req: PayloadRequest) => Promise<Response>) => async (req: PayloadRequest) => {
  try {
    return await fn(req)
  } catch (e) {
    req.payload.logger.error(e)
    return json({ error: 'Внутрішня помилка сервера' }, 500)
  }
}

function toBlock(block: Record<string, any>) {
  const { id, blockName, blockType, image, imageUrl, ...rest } = block
  const clean: Record<string, any> = { type: blockType, ...rest }
  if (blockType === 'hero') {
    const src = imageUrl || (image && typeof image === 'object' ? image.url : '')
    clean.image = { src: src || '', alt: (image && typeof image === 'object' && image.alt) || block.title || '' }
    clean.buttons = (block.buttons ?? []).map(({ text, link, variant }: any) => ({ text, link, variant }))
  }
  if (Array.isArray(block.items)) clean.items = block.items.map(({ id: _id, ...i }: any) => i)
  return clean
}

const toListing = (d: any) => ({
  id: d.id,
  title: d.title,
  city: d.city,
  address: d.address ?? '',
  price: d.price,
  rooms: d.rooms,
  area: d.area ?? null,
  totalSpots: d.totalSpots,
  freeSpots: d.freeSpots,
  description: d.description,
  photo: d.photoUrl ?? '',
  petsAllowed: !!d.petsAllowed,
  smokingAllowed: !!d.smokingAllowed,
  contact: { name: d.contactName, phone: d.contactPhone ?? '' },
})

const toProfile = (d: any, score?: number) => ({
  id: d.id,
  name: d.name,
  age: d.age,
  city: d.city,
  budget: d.budget,
  bio: d.bio,
  preferences: { cleanliness: d.cleanliness, schedule: d.schedule, pets: d.pets, smoking: d.smoking },
  listingId: typeof d.listing === 'object' && d.listing ? d.listing.id : (d.listing ?? null),
  ...(score !== undefined ? { compatibility: score } : {}),
})

export const commonEndpoint: Endpoint = {
  path: '/common',
  method: 'get',
  handler: safe(async (req) => {
    const [settings, header, footer, nav] = await Promise.all([
      req.payload.findGlobal({ slug: 'site-settings' }),
      req.payload.findGlobal({ slug: 'header' }),
      req.payload.findGlobal({ slug: 'footer' }),
      req.payload.findGlobal({ slug: 'navigation' }),
    ])
    return json({
      siteName: settings.siteName || 'Співмешканці',
      tagline: settings.tagline ?? '',
      contactEmail: settings.contactEmail ?? '',
      header: { ctaText: header.ctaText ?? '', ctaLink: header.ctaLink ?? '' },
      menu: (nav.items ?? []).map(({ label, link }: any) => ({ label, link })),
      footer: {
        text: footer.text ?? '',
        links: (footer.links ?? []).map(({ label, link }: any) => ({ label, link })),
      },
    })
  }),
}

export const pageEndpoint: Endpoint = {
  path: '/page',
  method: 'get',
  handler: safe(async (req) => {
    const path = q(req, 'path') ?? '/'
    const result = await req.payload.find({
      collection: 'pages',
      where: { path: { equals: path } },
      depth: 1,
      limit: 1,
    })
    const page = result.docs[0]
    if (!page) return json({ error: 'Сторінку не знайдено' }, 404)
    return json({ path: page.path, title: page.title, blocks: (page.blocks ?? []).map(toBlock) })
  }),
}

export const listingsEndpoint: Endpoint = {
  path: '/listings',
  method: 'get',
  handler: safe(async (req) => {
    const and: Where[] = [{ status: { equals: 'open' } }]
    const city = q(req, 'city')
    const minPrice = num(q(req, 'minPrice'))
    const maxPrice = num(q(req, 'maxPrice'))
    const rooms = num(q(req, 'rooms'))
    if (city) and.push({ city: { like: city } })
    if (minPrice !== undefined) and.push({ price: { greater_than_equal: minPrice } })
    if (maxPrice !== undefined) and.push({ price: { less_than_equal: maxPrice } })
    if (rooms !== undefined) and.push({ rooms: { greater_than_equal: rooms } })
    if (q(req, 'freeOnly') === 'true') and.push({ freeSpots: { greater_than: 0 } })
    if (q(req, 'pets') === 'true') and.push({ petsAllowed: { equals: true } })
    if (q(req, 'smoking') === 'true') and.push({ smokingAllowed: { equals: true } })
    const limit = Math.min(num(q(req, 'limit')) ?? 50, 50)
    const result = await req.payload.find({
      collection: 'housing-listings',
      where: { and },
      sort: 'price',
      limit,
      depth: 0,
    })
    return json({ total: result.totalDocs, docs: result.docs.map(toListing) })
  }),
}

export const listingEndpoint: Endpoint = {
  path: '/listing',
  method: 'get',
  handler: safe(async (req) => {
    const id = q(req, 'id')
    if (!id) return json({ error: 'Потрібен параметр id' }, 400)
    try {
      const doc = await req.payload.findByID({ collection: 'housing-listings', id, depth: 0 })
      return json(toListing(doc))
    } catch {
      return json({ error: 'Оголошення не знайдено' }, 404)
    }
  }),
}

export const roommatesEndpoint: Endpoint = {
  path: '/roommates',
  method: 'get',
  handler: safe(async (req) => {
    const and: Where[] = [{ published: { equals: true } }]
    const city = q(req, 'city')
    if (city) and.push({ city: { like: city } })
    const limit = Math.min(num(q(req, 'limit')) ?? 50, 50)
    const result = await req.payload.find({
      collection: 'roommate-profiles',
      where: { and },
      limit,
      depth: 0,
    })
    const mine = {
      cleanliness: q(req, 'cleanliness'),
      schedule: q(req, 'schedule'),
      pets: q(req, 'pets'),
      smoking: q(req, 'smoking'),
    }
    if (!isPrefs(mine as Partial<Prefs>)) return json({ total: result.totalDocs, docs: result.docs.map((d) => toProfile(d)) })
    const me = mine as Prefs
    const docs = result.docs
      .map((d) => toProfile(d, compatibility(me, d as unknown as Prefs)))
      .sort((a, b) => (b.compatibility ?? 0) - (a.compatibility ?? 0))
    return json({ total: result.totalDocs, docs })
  }),
}
