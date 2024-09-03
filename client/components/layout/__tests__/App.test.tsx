//@vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest'
import { renderRoute } from '@/test/setup'
import { within } from '@testing-library/react'
import { useAuth0 } from '@auth0/auth0-react'
import { vi } from 'vitest'

// Mock out auth0
vi.mock('@auth0/auth0-react')

const accessToken = 'fakeaccesstoken'

afterEach(() => {
  vi.clearAllMocks()
})

describe('authentication', () => {
  it('shows the login button', async () => {
    vi.mocked(useAuth0).mockReturnValue({
      isAuthenticated: false,
      user: undefined,
      getAccessTokenSilently: vi.fn().mockReturnValue(accessToken),
      loginWithRedirect: vi.fn(),
      logout: vi.fn(),
      // eslint-disable-next-line
    } as any)
    const screen = renderRoute('/')

    const loginButton = await screen.findByRole('button', { name: /Sign In/i })
    expect(loginButton).toBeInTheDocument()

    expect(
      screen.queryByRole('button', { name: /Sign Out/i }),
    ).not.toBeInTheDocument()
  })

  it('shows the logout button', async () => {
    vi.mocked(useAuth0).mockReturnValue({
      isAuthenticated: true,
      user: { sub: 'bear@example.com', nickname: 'bear' },
      getAccessTokenSilently: vi.fn().mockReturnValue(accessToken),
      loginWithRedirect: vi.fn(),
      logout: vi.fn(),
      // eslint-disable-next-line
    } as any)
    const screen = renderRoute('/')

    const loginButton = await screen.findByRole('button', { name: /Sign Out/i })
    expect(loginButton).toBeInTheDocument()

    expect(
      screen.queryByRole('button', { name: /Sign In/i }),
    ).not.toBeInTheDocument()
  })
})

describe('App renders', () => {
  it('shows the navbar content', async () => {
    const screen = renderRoute('/random')

    const nav = await screen.getByRole('navigation')

    const homeLink = await screen.findByRole('link', {
      name: /Pet Bet/i,
    })
    const navlinks = within(nav).getByRole('list')
    const randomLink = within(navlinks).getByText('Random')

    expect(homeLink).toBeInTheDocument()
    expect(navlinks.children).toHaveLength(3)
    expect(randomLink).toBeInTheDocument()
    expect(randomLink).toHaveAttribute('href', '/random')
  })

  it('shows the footer content', async () => {
    const screen = renderRoute('/')

    const copyright = await screen.getByText(/2024 Copyright/i)
    const aboutLink = await screen.getByRole('link', { name: 'PetBetInc' })

    expect(copyright).toHaveTextContent('© 2024 Copyright: PetBetInc')
    expect(aboutLink).toBeInTheDocument()
  })
})
