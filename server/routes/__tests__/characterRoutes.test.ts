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
