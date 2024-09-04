import request from 'superagent'

import { Pet } from '@models/pets'

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
