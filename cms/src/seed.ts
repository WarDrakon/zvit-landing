import config from '@payload-config'
import { getPayload } from 'payload'

const hero = {
  blockType: 'hero',
  anchor: 'top',
  badge: 'Навчальний проєкт',
  title: 'Знайдіть житло та співмешканців, з якими комфортно',
  subtitle: 'Каталог оголошень, анкети людей і проста оцінка сумісності за побутовими вподобаннями.',
  imageUrl: '/hero.svg',
  buttons: [
    { text: 'Переглянути житло', link: '/housing', variant: 'primary' },
    { text: 'Знайти співмешканця', link: '/roommates', variant: 'secondary' },
  ],
}

const pages = [
  {
    path: '/',
    title: 'Головна',
    blocks: [
      hero,
      {
        blockType: 'features',
        anchor: 'features',
        title: 'Як це працює',
        items: [
          { icon: '🏠', title: 'Каталог житла', text: 'Фільтруйте оголошення за містом, ціною, кількістю кімнат і вільними місцями.' },
          { icon: '👥', title: 'Анкети співмешканців', text: 'Переглядайте анкети людей, які шукають спільну оренду.' },
          { icon: '🤝', title: 'Сумісність', text: 'Вкажіть свої вподобання — і побачите відсоток сумісності з кожним.' },
          { icon: '🧹', title: 'Побутові звички', text: 'Чистота, режим дня, домашні тварини та куріння — ключові критерії.' },
        ],
      },
      { blockType: 'housingList', anchor: 'housing', title: 'Нові оголошення', limit: 6, showFilters: false },
      { blockType: 'roommateList', anchor: 'roommates', title: 'Співмешканці', limit: 5, showCompatibility: false },
      {
        blockType: 'textSection',
        anchor: 'about',
        title: 'Про сервіс',
        body: 'Інформаційна система пошуку співмешканців та спільної оренди житла — навчальний вебзастосунок. Сумісність обчислюється за чотирма критеріями по 25 балів кожен.',
      },
    ],
  },
  {
    path: '/housing',
    title: 'Житло',
    blocks: [{ blockType: 'housingList', anchor: 'catalog', title: 'Каталог оголошень', limit: 50, showFilters: true }],
  },
  {
    path: '/roommates',
    title: 'Співмешканці',
    blocks: [{ blockType: 'roommateList', anchor: 'profiles', title: 'Анкети співмешканців', limit: 50, showCompatibility: true }],
  },
  {
    path: '/about',
    title: 'Про проєкт',
    blocks: [
      {
        blockType: 'textSection',
        title: 'Про проєкт',
        body: 'Стек: Vite + Vanilla JS (frontend), Payload CMS 3 (CMS та API), PostgreSQL на Neon, хостинг Vercel.',
      },
    ],
  },
]

const listings = [
  { title: 'Світла кімната в центрі Львова', city: 'Львів', address: 'вул. Городоцька', price: 6500, rooms: 3, area: 78, totalSpots: 3, freeSpots: 1, photoUrl: '/images/listing-1.svg', description: 'Тривімнатна квартира біля центру, ремонт, вся техніка. Двоє охайних сусідів.', petsAllowed: false, smokingAllowed: false, contactName: 'Олена', contactPhone: '+380 00 000 00 00' },
  { title: 'Місце у двокімнатній, Сихів', city: 'Львів', address: 'пр. Червоної Калини', price: 4200, rooms: 2, area: 56, totalSpots: 2, freeSpots: 1, photoUrl: '/images/listing-2.svg', description: 'Тихий район, поруч транспорт і супермаркет. Можна з котом.', petsAllowed: true, smokingAllowed: false, contactName: 'Андрій', contactPhone: '+380 00 000 00 01' },
  { title: 'Студентська квартира біля університету', city: 'Київ', address: 'Голосіївський район', price: 5500, rooms: 3, area: 70, totalSpots: 4, freeSpots: 2, photoUrl: '/images/listing-3.svg', description: 'Пʼять хвилин до метро. Є робоче місце та швидкий інтернет.', petsAllowed: false, smokingAllowed: true, contactName: 'Марія', contactPhone: '+380 00 000 00 02' },
  { title: 'Кімната з балконом на Подолі', city: 'Київ', address: 'Поділ', price: 7800, rooms: 2, area: 62, totalSpots: 2, freeSpots: 1, photoUrl: '/images/listing-4.svg', description: 'Затишна кімната з великим балконом, сусід працює віддалено.', petsAllowed: true, smokingAllowed: false, contactName: 'Ігор', contactPhone: '+380 00 000 00 03' },
  { title: 'Простора трикімнатна, Одеса', city: 'Одеса', address: 'Приморський район', price: 4800, rooms: 3, area: 85, totalSpots: 3, freeSpots: 2, photoUrl: '/images/listing-5.svg', description: 'За 15 хвилин до моря. Дружня атмосфера, спільна кухня.', petsAllowed: true, smokingAllowed: true, contactName: 'Софія', contactPhone: '+380 00 000 00 04' },
  { title: 'Мінімалістична кімната, Харків', city: 'Харків', address: 'Салтівка', price: 3500, rooms: 2, area: 48, totalSpots: 2, freeSpots: 0, photoUrl: '/images/listing-6.svg', description: 'Усі місця зайняті — оголошення для прикладу заповненого житла.', petsAllowed: false, smokingAllowed: false, contactName: 'Дмитро', contactPhone: '+380 00 000 00 05' },
]

const profiles = [
  { name: 'Катерина', age: 22, city: 'Львів', budget: 6000, bio: 'Студентка-дизайнерка, люблю порядок і тишу вечорами.', cleanliness: 'tidy', schedule: 'early', pets: 'ok', smoking: 'nonsmoker' },
  { name: 'Максим', age: 25, city: 'Львів', budget: 5000, bio: 'Програміст, працюю вдома, маю кота.', cleanliness: 'normal', schedule: 'night', pets: 'have', smoking: 'tolerant' },
  { name: 'Анастасія', age: 24, city: 'Київ', budget: 7000, bio: 'Маркетолог, часто у відрядженнях, комунікабельна.', cleanliness: 'normal', schedule: 'flexible', pets: 'ok', smoking: 'nonsmoker' },
  { name: 'Олег', age: 28, city: 'Київ', budget: 5500, bio: 'Інженер, спокійний, інколи курю на балконі.', cleanliness: 'relaxed', schedule: 'night', pets: 'no', smoking: 'smoker' },
  { name: 'Вікторія', age: 21, city: 'Одеса', budget: 4500, bio: 'Студентка-медик, рано встаю, люблю готувати.', cleanliness: 'tidy', schedule: 'early', pets: 'have', smoking: 'nonsmoker' },
]

const globals = {
  'site-settings': { siteName: 'Співмешканці', tagline: 'Пошук житла та співмешканців', contactEmail: 'info@example.com' },
  header: { ctaText: 'Знайти співмешканця', ctaLink: '/roommates' },
  navigation: {
    items: [
      { label: 'Головна', link: '/' },
      { label: 'Житло', link: '/housing' },
      { label: 'Співмешканці', link: '/roommates' },
      { label: 'Про проєкт', link: '/about' },
    ],
  },
  footer: { text: 'Навчальний проєкт: пошук співмешканців та спільної оренди житла.', links: [{ label: 'Про проєкт', link: '/about' }] },
} as const

async function upsert(payload: any, collection: string, where: any, data: any) {
  const found = await payload.find({ collection, where, limit: 1, depth: 0 })
  if (found.docs[0]) {
    await payload.update({ collection, id: found.docs[0].id, data })
    return found.docs[0]
  }
  return payload.create({ collection, data })
}

// Створити лише якщо ще не існує — не перезаписуємо вручну налаштоване
async function createIfNotExists(payload: any, collection: string, where: any, data: any) {
  const found = await payload.find({ collection, where, limit: 1, depth: 0 })
  if (found.docs[0]) return found.docs[0]
  return payload.create({ collection, data })
}

async function createGlobalIfNotExists(payload: any, slug: string, data: any) {
  try {
    await payload.findGlobal({ slug })
    return // вже існує — не перезаписуємо
  } catch {
    return payload.updateGlobal({ slug, data })
  }
}

async function run() {
  console.log('1. Starting Payload')

  const payload: any = await getPayload({ config })

  console.log('2. Payload connected')

  console.log('3. Starting database seed')

  for (const [slug, data] of Object.entries(globals)) await createGlobalIfNotExists(payload, slug, data)

  // Оновлюємо лише потрібні блоки існуючої сторінки Home, не торкаючись Hero, його фото та інших блоків
  const homePage = await payload.find({ collection: 'pages', where: { path: { equals: '/' } }, limit: 1, depth: 0 })
  if (homePage.docs[0]) {
    const existingBlocks = homePage.docs[0].blocks ?? []
    let blocks = existingBlocks.map((b: any) => {
      if (b.blockType === 'housingList' && b.anchor === 'housing') {
        return { ...b, limit: 6 }
      }
      if (b.blockType === 'roommateList') {
        return { ...b, anchor: 'profiles', limit: 5 }
      }
      return b
    })
    if (!blocks.some((b: any) => b.blockType === 'roommateList')) {
      blocks.push({
        blockType: 'roommateList',
        anchor: 'profiles',
        title: 'Співмешканці',
        limit: 5,
        showCompatibility: false,
      })
    }
    await payload.update({ collection: 'pages', id: homePage.docs[0].id, data: { blocks } })
  } else {
    const home = pages.find((p) => p.path === '/')
    if (home) await payload.create({ collection: 'pages', data: home })
  }


  for (const l of listings) await upsert(payload, 'housing-listings', { title: { equals: l.title } }, { ...l, status: 'open' })

  for (const p of profiles)
    await upsert(payload, 'roommate-profiles', { and: [{ name: { equals: p.name } }, { city: { equals: p.city } }] }, { ...p, published: true })

  // Адміністратора створюємо лише якщо задано змінні оточення
  const email = process.env.SEED_ADMIN_EMAIL
  const password = process.env.SEED_ADMIN_PASSWORD
  if (email && password) {
    const found = await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1 })
    if (!found.docs[0]) await payload.create({ collection: 'users', data: { email, password } })
  }

  payload.logger.info('Seed завершено')
  process.exit(0)
}

console.log('SEED FILE STARTED')

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
