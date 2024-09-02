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

describe('Character rendering tests', () => {
  it('renders a character info', async () => {
    // ARRANGE
    const count = 1
    const scope = nock('http://localhost')
      .get(`/api/v1/pets/random`)
      .query({ count })
      .reply(200, [mockPet])

    // ACT
    const screen = renderRoute(`/random`)

    // ASSERT
    const name = await screen.findByRole('heading', { level: 3 })
    expect(name).toBeInTheDocument()
    expect(name).toHaveTextContent(mockPet.name)
    expect(scope.isDone()).toBe(true)
  })

  it('Renders loading message', async () => {
    // ARRANGE
    const count = 1
    const scope = nock('http://localhost')
      .get(`/api/v1/pets/random`)
      .query({ count })
      .reply(200, [mockPet])

    // ACT
    const screen = renderRoute(`/random`)

    // ASSERT
    const loading = await screen.findByText('Loading...')
    expect(loading).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })

  it('should render an error message when things go wrong', async () => {
    // ARRANGE
    const count = 1
    const scope = nock('http://localhost')
      .get(`/api/v1/pets/random`)
      .query({ count })
      .reply(500)

    // ACT
    const screen = renderRoute(`/random`)

    // ASSERT
    const error = await screen.findByText('There was an error')
    expect(error).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })
})
