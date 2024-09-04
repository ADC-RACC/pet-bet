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
// the randomisation of pets
// the voting system works/ mutation/ query

//Check component
// 1. nock out initial scope
// 2. renderRoute
// 3. wait for loading to go away
// 4. Make sure our request has been made by expecting the intial scope to be done
// 5. Check for header

//Check mutation
// 1. nock out initial scope
// 2. renderRoute
// 3. wait for loading to go away
// 4. Make sure our request has been made by expecting the intial scope to be done
// 5. Check for header
// 6. Mock out the user clicking the vote

//Nock List
// nock get request from random route
// const count = 2
//     const scope = nock('http://localhost')
//       .get(`/api/v1/pets/random`)
//       .query({ count })
//       .reply(200, [mockPet])

// nock patch route 1
// nock patch route 2

// check scope is done
// check mutliple scope is done

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
    //ARRANGE

    const count = 2
    const scope = nock('http://localhost')
      .get(`/api/v1/pets/random`)
      .query({ count })
      .reply(200, mockPets)

    //ACT
    const screen = renderRoute(`/`)

    // // ASSERT
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

    //ACT
    const { user, ...screen } = renderRoute(`/`)

    // // ASSERT
    const pet1 = await screen.findByText(mockPets[0].name)
    const pet2 = await screen.findByText(mockPets[1].name)
    expect(pet1).toBeInTheDocument()
    expect(pet2).toBeInTheDocument()
    //find the pet card and do a click event on the pet card
    // findallbyrole button - find specific button / button[1] => user click
    const buttons = await screen.findAllByRole('button')
    await user.click(buttons[1])
    expect(scope.isDone()).toBe(true)
    expect(scope1.isDone()).toBe(true)
    expect(scope2.isDone()).toBe(true)
  })
})
