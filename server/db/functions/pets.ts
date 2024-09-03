import db from '../connection'

import { Pet } from '@models/pets'

export async function getRandomPets(count: number): Promise<Pet[]> {
  const tips = await db('pets')
    .orderByRaw('RANDOM()')
    .limit(count)
    .select('id', 'name', 'bio', 'wins', 'losses', 'img_url as imgUrl')
  return tips
}

export async function getPetsByOwnerId(ownerId: string): Promise<Pet[]> {
  return db('pets')
    .where({ owner_id: ownerId })
    .select('id', 'name', 'bio', 'wins', 'losses', 'img_url as imgUrl')
}
