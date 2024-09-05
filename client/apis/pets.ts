import request from 'superagent'

import { Pet, UpdatedData } from '@models/pets'

import { Leaderboard } from '@models/leaderboard'

const baseUrl = '/api/v1/pets'

export async function getRandomPet(count: number) {
  const url = `${baseUrl}/random`
  const res = await request.get(url).query({ count })
  return res.body as Pet[]
}

export async function getLeaderboard() {
  const url = `${baseUrl}/leaderboard`
  const res = await request.get(url)
  return res.body as Leaderboard
}

export async function getPetById(id: number) {
  const res = await request.get(`/api/v1/pets/${id}/votes`)
  return res.body as Pet
}

export async function addVotes(votes: UpdatedData, id: number) {
  const response = await request.patch(`/api/v1/pets/${id}/votes`).send(votes)
  return response
}
