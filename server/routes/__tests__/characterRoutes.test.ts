import {
  expect,
  it,
  describe,
  beforeAll,
  beforeEach,
  afterAll,
  vi,
  afterEach,
} from 'vitest'
import request from 'supertest'

import connection from '../../db/connection.ts'
import * as db from '../../db/functions/pets.ts'
import server from '../../server.ts'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterEach(async () => {
  vi.restoreAllMocks()
})

afterAll(async () => {
  await connection.destroy()
})

describe('/random?count=', () => {
  it('gets a random pet', async () => {
    const count = 1
    const res = await request(server)
      .get('/api/v1/pets/random')
      .query({ count })
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveLength(1)
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          bio: expect.any(String),
          wins: expect.any(Number),
          losses: expect.any(Number),
          imgUrl: expect.any(String),
        }),
      ]),
    )
  })

  it('gets two random pets', async () => {
    const count = 2
    const res = await request(server)
      .get('/api/v1/pets/random')
      .query({ count })
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveLength(2)
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          bio: expect.any(String),
          wins: expect.any(Number),
          losses: expect.any(Number),
          imgUrl: expect.any(String),
        }),
      ]),
    )
    expect(res.body[0]).not.toStrictEqual(res.body[1])
  })

  it('returns an error when the db fails', async () => {
    vi.spyOn(db, 'getRandomPets').mockImplementation(() => {
      throw new Error('random failed')
    })
    vi.spyOn(console, 'error')
    const count = 2
    const res = await request(server)
      .get('/api/v1/pets/random')
      .query({ count })
    expect(res.status).toBe(500)
    expect(res.body.error).toEqual('Something went wrong.')
    expect(db.getRandomPets).toHaveBeenCalledWith(count)
    expect(console.error).toHaveBeenCalledWith('random failed')
  })
})

// Testing the Patch for Pet's wins and losses
describe('update wins and losses', () => {
  it('should update pets wins and losses', async () => {
    const patchRes = await request(server)
      .patch('/api/v1/pets/2/votes')
      .send({ wins: 100, losses: 100 })
    expect(patchRes.statusCode).toBe(204)
    const getRes = await request(server).get('/api/v1/pets/2/votes')
    expect(getRes.body).toStrictEqual([
      {
        id: 2,
        ownerId: 'google-oauth2|107804123972815340859',
        name: 'Lady Barkalot',
        bio: "A dog whose bark is louder than its bite, but it's all in good fun.",
        wins: 100,
        losses: 100,
        imgUrl: '/images/LadyBarkalot.png',
      },
    ])
  })
  it('should be 404 when wrong route', async () => {
    const res = await request(server).patch('/api/v1/pets/not-a-pet/votes')
    expect(res.statusCode).toBe(404)
  })
})

describe('it should return leaderboard data', () => {
  it('returns wins, losses, and wins with losses', async () => {
    const getRes = await request(server).get('/api/v1/pets/leaderboard')
    expect(getRes.body).toEqual(
      expect.objectContaining({
        wins: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            wins: expect.any(Number),
          }),
        ]),
        losses: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            losses: expect.any(Number),
          }),
        ]),
        winsAndLossesRatio: expect.arrayContaining([
          expect.objectContaining({
            ratio: expect.any(Number),
            id: expect.any(Number),
            name: expect.any(String),
          }),
        ]),
      }),
    )
  })
  it('should be 404 when wrong route', async () => {
    const getRes = await request(server).get('/api/v1/pets/not-leaderboard')
    expect(getRes.statusCode).toBe(404)
  })
  it('should be 500 when wrong route', async () => {
    vi.spyOn(db, 'getLeaderBoardData').mockImplementation(() => {
      throw new Error('random failed')
    })
    vi.spyOn(console, 'error')
    const count = 2
    const res = await request(server)
      .get('/api/v1/pets/leaderboard')
      .query({ count })
    expect(res.status).toBe(500)
  })
})
