export const CLEANLINESS = ['relaxed', 'normal', 'tidy'] as const
export const SCHEDULES = ['early', 'flexible', 'night'] as const
export const PETS = ['have', 'ok', 'no'] as const
export const SMOKING = ['smoker', 'tolerant', 'nonsmoker'] as const

export type Prefs = {
  cleanliness: (typeof CLEANLINESS)[number]
  schedule: (typeof SCHEDULES)[number]
  pets: (typeof PETS)[number]
  smoking: (typeof SMOKING)[number]
}

/** Сумісність 0–100: чотири критерії по 25 балів. */
export function compatibility(a: Prefs, b: Prefs): number {
  const diff = Math.abs(CLEANLINESS.indexOf(a.cleanliness) - CLEANLINESS.indexOf(b.cleanliness))
  const cleanliness = diff === 0 ? 25 : diff === 1 ? 12 : 0

  const schedule =
    a.schedule === b.schedule ? 25 : a.schedule === 'flexible' || b.schedule === 'flexible' ? 18 : 0

  const pair = (x: string, y: string, bad: string, mid: string) =>
    (x === bad && y === mid) || (y === bad && x === mid)
  let pets = 25
  if ((a.pets === 'no' && b.pets === 'have') || (b.pets === 'no' && a.pets === 'have')) pets = 0
  else if (pair(a.pets, b.pets, 'no', 'ok')) pets = 15

  let smoking = 25
  if ((a.smoking === 'nonsmoker' && b.smoking === 'smoker') || (b.smoking === 'nonsmoker' && a.smoking === 'smoker'))
    smoking = 0
  else if (pair(a.smoking, b.smoking, 'nonsmoker', 'tolerant')) smoking = 15

  return cleanliness + schedule + pets + smoking
}

export function isPrefs(p: Partial<Record<keyof Prefs, unknown>>): p is Prefs {
  return (
    CLEANLINESS.includes(p.cleanliness as never) &&
    SCHEDULES.includes(p.schedule as never) &&
    PETS.includes(p.pets as never) &&
    SMOKING.includes(p.smoking as never)
  )
}
