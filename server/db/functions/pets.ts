import db from '../connection'

import { Pet } from '@models/pets'

export async function getRandomPets(count: number): Promise<Pet[]> {
  const tips = await db('pets')
    .orderByRaw('RANDOM()')
    .limit(count)
    .select('id', 'name', 'bio', 'wins', 'losses', 'img_url as imgUrl')
  return tips
}
