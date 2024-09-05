//@vitest-environment jsdom
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'

import { Pet } from '@models/pets'
import nock from 'nock'
import { renderRoute } from '@/test/setup'

// Mock out hooks

beforeAll(() => {
  nock.disableNetConnect()
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  vi.clearAllMocks()
  // nock.cleanAll()
})

const petsByOwnerId: Pet[] = [
  {
    id: 1,
    name: 'Sir Whiskers',
    bio: 'A cat who loves to chase laser pointers and naps on keyboards.',
    wins: 5,
    losses: 85,
    imgUrl: '/images/SirWhiskers.png',
    ownerId: '1',
  },
]

describe('Owner page', () => {
  it('shows loading state', async () => {
    // ARRANGE
    const ownerId = '1'
    nock('http://localhost')
      .get(`/api/v1/owners/${ownerId}/pets`)
      .reply(200, petsByOwnerId)

    // ACT
    const screen = renderRoute(`/owners/${ownerId}`)
    const loadingText = await screen.findByText('Loading...')
    // ASSERT
    expect(loadingText).toBeInTheDocument()
  })

  it('shows error message when request fails', async () => {
    // ARRANGE
    const ownerId = '1'
    nock('http://localhost').get(`/api/v1/owners/${ownerId}/pets`).reply(500)

    // ACT
    const screen = renderRoute(`/owners/${ownerId}`)
    const errorText = await screen.findByText(/Error: Internal Server Error/)
    // ASSERT
    expect(errorText).toBeInTheDocument()
  })

  it('shows no pets found message when response is empty', async () => {
    // ARRANGE
    const ownerId = '1'
    nock('http://localhost')
      .get(`/api/v1/owners/${ownerId}/pets`)
      .reply(200, [])

    // ACT
    const screen = renderRoute(`/owners/${ownerId}`)
    const noPetsText = await screen.findByText(/No pets found for this owner./)
    // ASSERT
    expect(noPetsText).toBeInTheDocument()
  })

  it('shows list of pets by owner Id', async () => {
    // ARRANGE
    const ownerId = '1'
    nock('http://localhost')
      .get(`/api/v1/owners/${ownerId}/pets`)
      .reply(200, petsByOwnerId)

    // ACT
    const screen = renderRoute(`/owners/${ownerId}`)
    const petBio = await screen.findByText(
      /A cat who loves to chase laser pointers and naps on keyboards./,
    )
    // ASSERT
    expect(petBio).toBeInTheDocument()
  })
})
