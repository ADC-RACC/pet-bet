//@vitest-environment jsdom
import { describe, it, expect, beforeAll, vi, afterEach } from 'vitest'
import nock from 'nock'

import { renderRoute } from '../../test/setup.tsx'

beforeAll(() => {
  nock.disableNetConnect()
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  vi.clearAllMocks()
})
const mockPets = [
  {
    id: 1,
    ownerId: 29284,
    name: 'okiedokie',
    wins: 200,
    losses: 100,
    imgUrl: 'www.image.png',
  },
  {
    id: 2,
    ownerId: 20,
    name: 'Ted',
    wins: 50,
    losses: 100,
    imgUrl: 'www.image1.png',
  },
]

describe('home component', () => {
  it('loads the pets correctly', async () => {
    const count = 2
    const scope = nock('http://localhost')
      .get(`/api/v1/pets/random`)
      .query({ count })
      .reply(200, mockPets)
    const screen = renderRoute(`/`)
    const pet1 = await screen.findByText(mockPets[0].name)
    const pet2 = await screen.findByText(mockPets[1].name)
    expect(pet1).toBeInTheDocument()
    expect(pet2).toBeInTheDocument()
    expect(scope.isDone()).toBe(true)
  })

  it('sends a vote when pet is clicked', async () => {
    const count = 2
    const scope = nock('http://localhost')
      .get(`/api/v1/pets/random`)
      .query({ count })
      .reply(200, mockPets)

    const wins1 = mockPets[0].wins + 1
    const losses1 = mockPets[0].losses
    const votes1 = { wins: wins1, losses: losses1 }
    const id = mockPets[0].id

    const scope1 = nock('http://localhost')
      .patch(`/api/v1/pets/${id}/votes`, votes1)
      .reply(200)

    const wins = mockPets[1].wins
    const losses = mockPets[1].losses + 1
    const votes = { wins, losses }
    const id1 = mockPets[1].id

    const scope2 = nock('http://localhost')
      .patch(`/api/v1/pets/${id1}/votes`, votes)
      .reply(200)

    const { user, ...screen } = renderRoute(`/`)
    const pet1 = await screen.findByText(mockPets[0].name)
    const pet2 = await screen.findByText(mockPets[1].name)
    expect(pet1).toBeInTheDocument()
    expect(pet2).toBeInTheDocument()
    const buttons = await screen.findAllByRole('button')
    await user.click(buttons[2])
    expect(scope.isDone()).toBe(true)
    expect(scope1.isDone()).toBe(true)
    expect(scope2.isDone()).toBe(true)
  })
})
