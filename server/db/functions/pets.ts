import db from '../connection'

import { Pet, UpdatedData } from '@models/pets'

export async function getRandomPets(count: number): Promise<Pet[]> {
  const tips = await db('pets')
    .orderByRaw('RANDOM()')
    .limit(count)
    .select('id', 'name', 'bio', 'wins', 'losses', 'img_url as imgUrl')
  return tips
}

export async function updatePetById(updatedPet: UpdatedData, id: number) {
  const result = await db('pets')
    .where({ id })
    .update({ wins: updatedPet.wins, losses: updatedPet.losses })
  return result
}

export async function getPetbyId(id: number) {
  const result = await db('pets')
    .where({ id })
    .select(
      'id',
      'name',
      'owner_id as ownerId',
      'bio',
      'wins',
      'losses',
      'img_url as imgUrl',
    )
  return result
}
