import request from 'superagent'

import { Pet } from '@models/pets'

const baseUrl = '/api/v1/pets'

export async function getRandomPet(count: number) {
  const url = `${baseUrl}/random`
  const res = await request.get(url).query({ count })
  return res.body as Pet[]
}
