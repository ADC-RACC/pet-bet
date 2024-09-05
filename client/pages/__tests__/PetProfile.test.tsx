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

const mockPet = {
  id: 1,
  ownerId: 29284,
  name: 'okiedokie',
  wins: 200,
  losses: 100,
  imgUrl: 'www.image.png',
}

describe('profile component', () => {
  it('loads the pet correctly', async () => {
    const id = 1
    const scope = nock('http://localhost')
      .get(`/api/v1/pets/${id}`)
      .reply(200, mockPet)
    const screen = renderRoute(`/pets/${id}`)
    const pet1 = await screen.findByText(mockPet.name)
    expect(pet1).toBeInTheDocument()
    expect(scope.isDone()).toBe(true)
  })

  it('checking ratio', async () => {
    const id = 1
    const scope = nock('http://localhost')
      .get(`/api/v1/pets/${id}`)
      .reply(200, mockPet)
    const screen = renderRoute(`/pets/${id}`)
    const ratio = (mockPet.wins / mockPet.losses).toFixed(3)
    const pet1 = await screen.findByText(ratio)
    expect(pet1).toBeInTheDocument()
    expect(scope.isDone()).toBe(true)
  })
})
