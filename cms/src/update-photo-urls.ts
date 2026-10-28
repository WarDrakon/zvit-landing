import config from '@payload-config'
import { getPayload } from 'payload'

/**
 * Одноразовий скрипт: оновлює ТІЛЬКИ поле photoUrl у 6 існуючих оголошеннях житла.
 * Не створює нових записів, не змінює сторінку Home / Hero, не запускає повний seed.
 * Запуск: node --env-file=.env --import tsx src/update-photo-urls.ts
 */

const photoUrls: Record<string, string> = {
  'Світла кімната в центрі Львова': '/images/listing-1.jpg',
  'Місце у двокімнатній, Сихів': '/images/listing-2.jpg',
  'Студентська квартира біля університету': '/images/listing-3.jpg',
  'Кімната з балконом на Подолі': '/images/listing-4.jpg',
  'Простора трикімнатна, Одеса': '/images/listing-5.jpg',
  'Мінімалістична кімната, Харків': '/images/listing-6.jpg',
}

async function run() {
  console.log('1. Starting Payload')

  const payload: any = await getPayload({ config })

  console.log('2. Payload connected')

  let updated = 0
  let skipped = 0

  for (const [title, photoUrl] of Object.entries(photoUrls)) {
    const found = await payload.find({
      collection: 'housing-listings',
      where: { title: { equals: title } },
      limit: 1,
      depth: 0,
    })

    if (!found.docs[0]) {
      console.log(`Пропущено (не знайдено): ${title}`)
      skipped++
      continue
    }

    await payload.update({
      collection: 'housing-listings',
      id: found.docs[0].id,
      data: { photoUrl },
    })

    console.log(`Оновлено: ${title} → ${photoUrl}`)
    updated++
  }

  console.log(`Готово. Оновлено: ${updated}, пропущено: ${skipped}`)
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
