import request from 'superagent'

import { Pet, UpdatedData } from '@models/pets'

const baseUrl = '/api/v1/pets'

export async function getRandomPet(count: number) {
  const url = `${baseUrl}/random`
  const res = await request.get(url).query({ count })
  console.log(res.body)
  return res.body as Pet[]
}

export async function getPetById(id: number) {
  const res = await request.get(`/api/v1/pets/${id}/votes`)
  return res.body as Pet
}

export async function addVotes(votes: UpdatedData, id: number) {
  const response = await request.patch(`/api/v1/pets/${id}/votes`).send(votes)
  return response
}
