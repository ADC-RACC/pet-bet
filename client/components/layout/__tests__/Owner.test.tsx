import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'
import { useParams } from 'react-router-dom'
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
})

const mockPets: Pet[] = [
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
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows loading state', async () => {
    // ARRANGE
    const ownerId = '1'
    vi.mocked(useParams).mockReturnValue({ ownerId })
    const result = nock('http://localhost')
      .get(`/api/v1/owners/${ownerId}/pets`)
      .reply(200, [])

    // ACT
    const screen = renderRoute(`/owners/1`)

    // ASSERT
    expect(await screen.findByText('Loading...')).toBeInTheDocument()
    expect(result.isDone()).toBe(true)
  })

  it('shows error message', async () => {
    // ARRANGE
    const ownerId = '1'
    vi.mocked(useParams).mockReturnValue({ ownerId })
    const result = nock('http://localhost')
      .get(`/api/v1/owners/${ownerId}/pets`)
      .reply(500)

    // ACT
    const screen = renderRoute(`/owners/1`)

    // ASSERT
    expect(
      await screen.findByText('Error: Request failed with status code 500'),
    ).toBeInTheDocument()
    expect(result.isDone()).toBe(true)
  })

  it('shows no pets found message', async () => {
    // ARRANGE
    const ownerId = '1'
    vi.mocked(useParams).mockReturnValue({ ownerId })
    const result = nock('http://localhost')
      .get(`/api/v1/owners/${ownerId}/pets`)
      .reply(200, [])

    // ACT
    const screen = renderRoute(`/owners/1`)

    // ASSERT
    expect(
      await screen.findByText('No pets found for this owner.'),
    ).toBeInTheDocument()
    expect(result.isDone()).toBe(true)
  })

  it('shows list of pets by owner Id', async () => {
    // ARRANGE
    const ownerId = '1'
    vi.mocked(useParams).mockReturnValue({ ownerId })
    const result = nock('http://localhost')
      .get(`/api/v1/owners/${ownerId}/pets`)
      .reply(200, mockPets)

    // ACT
    const screen = renderRoute(`/owners/1`)

    // ASSERT
    expect(await screen.findByText('Sir Whiskers')).toBeInTheDocument()
    expect(
      screen.getByText(
        'A cat who loves to chase laser pointers and naps on keyboards.',
      ),
    ).toBeInTheDocument()
    expect(result.isDone()).toBe(true)
  })
})
