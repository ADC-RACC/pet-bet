//@vitest-environment jsdom
import { describe, it, expect, beforeAll, vi, afterEach } from 'vitest'
import { renderRoute } from '../../test/setup.tsx'
import nock from 'nock'

beforeAll(() => {
  nock.disableNetConnect()
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  vi.clearAllMocks()
})

const mockLeaderboard = {
  wins: [{ id: 1, name: 'okiedokie', wins: 30 }],
  losses: [{ id: 2, name: 'Captain Fluffy', losses: 20 }],
  winsAndLossesRatio: [{ ratio: 0.022222222, name: 'Lady Barkalot', id: 3 }],
}

describe('Leaderboard rendering tests', () => {
  it('renders pet name on leaderboard losses column', async () => {
    // ARRANGE

    const scope = nock('http://localhost')
      .get(`/api/v1/pets/leaderboard`)
      .reply(200, mockLeaderboard)

    // ACT
    const screen = renderRoute(`/leaderboard`)

    // ASSERT
    const lossName = await screen.findByText(mockLeaderboard.losses[0].name)
    expect(lossName).toBeInTheDocument()
    expect(scope.isDone()).toBe(true)
  })

  it('renders pet name on leaderboard wins column', async () => {
    // ARRANGE
    const scope = nock('http://localhost')
      .get(`/api/v1/pets/leaderboard`)
      .reply(200, mockLeaderboard)

    // ACT
    const screen = renderRoute(`/leaderboard`)

    // ASSERT
    const winName = await screen.findByText(mockLeaderboard.wins[0].name)
    expect(winName).toBeInTheDocument()
    expect(scope.isDone()).toBe(true)
  })

  it('renders pet name on leaderboard wins/losses column', async () => {
    // ARRANGE
    const scope = nock('http://localhost')
      .get(`/api/v1/pets/leaderboard`)
      .reply(200, mockLeaderboard)

    // ACT
    const screen = renderRoute(`/leaderboard`)

    // ASSERT
    const winsLossesRatio = await screen.findByText(
      mockLeaderboard.winsAndLossesRatio[0].name,
    )
    expect(winsLossesRatio).toBeInTheDocument()
    expect(scope.isDone()).toBe(true)
  })

  it('renders ratio on leaderboard wins/losses column', async () => {
    // ARRANGE
    const scope = nock('http://localhost')
      .get(`/api/v1/pets/leaderboard`)
      .reply(200, mockLeaderboard)

    // ACT
    const screen = renderRoute(`/leaderboard`)

    // ASSERT
    const winsLossesRatio = await screen.findByText(
      mockLeaderboard.winsAndLossesRatio[0].ratio.toFixed(3) + ' win/loss',
    )
    expect(winsLossesRatio).toBeInTheDocument()
    expect(scope.isDone()).toBe(true)
  })

  it('renders href attribute based on the pet id', async () => {
    // ARRANGE
    const scope = nock('http://localhost')
      .get(`/api/v1/pets/leaderboard`)
      .reply(200, mockLeaderboard)

    // ACT
    const screen = renderRoute(`/leaderboard`)

    // ASSERT
    const links = await screen.findAllByTestId('link-for-testing-1')
    expect(links[0]).toHaveProperty('href', 'http://localhost:3000/pets/1')
    expect(scope.isDone()).toBe(true)
  })
})
