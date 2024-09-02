//@vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { renderRoute } from '@/test/setup'
import { within } from '@testing-library/react'

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
