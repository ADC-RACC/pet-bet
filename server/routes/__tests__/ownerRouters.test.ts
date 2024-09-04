import { describe, it, expect, beforeAll, beforeEach, afterAll } from 'vitest'
import connection from '../../db/connection.ts'
import server from '../../server.ts'
import request from 'supertest'
import { StatusCodes } from 'http-status-codes'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

describe('Getting Pet with their owner Id', () => {
  it('responds with all the data', async () => {
    const ownerId = '1'
    const res = await request(server).get(
      `/api/v1/owners/${ownerId}/pets?include=true`,
    )

    expect(res.status).toBe(StatusCodes.OK)
    expect(res.body).toStrictEqual([
      {
        id: 1,
        name: 'Sir Whiskers',
        bio: 'A cat who loves to chase laser pointers and naps on keyboards.',
        wins: 5,
        losses: 85,
        imgUrl: '/images/SirWhiskers.png',
      },
    ])
  })
})
