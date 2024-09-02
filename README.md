### Pet Bet

---

Are you a lost in the everlasting struggle to find the best pet? Do you find it hard to win in your day to day? Never fear, this project provides a social platform for outsourcing all of the betwork to the most experienced petsperts, random users on the internet

## Setup

### 0. Cloning and installation

- [ ] Clone this repo, navigate to it, install packages, and start the server with `npm run dev`
  <details style="padding-left: 2em">
    <summary>Tip</summary>

    You may also want to start a new branch
    ```sh
    cd pet-bet
    npm i
    git checkout -b <branchname>
    npm run dev
    ```
  </details>

<details>
  <summary>More about using <code>npm</code> vs <code>npx</code></summary>

  - When running knex, run `npm run knex <command>`, e.g. `npm run knex migrate:latest` rather than using `npx`
</details>

---

## Building Blocks
---

### 1. Our user stories

#### MVP

1. As a user I want to see a page with two random pets and be able to click on a vote for which pet I think will win
2. As a user I want to see a page of a random individidual pet
3. As a user I want to see a page of an individidual pet when I select them
4. As a user I want to see a page all of the pets belonging to an owner
5. As a user I want to be able to sign in as an owner
6. As a user I want to see a page displaying all the top 5 most losses/ratio/wins for pets
7. As an owner I want to be able to add a new pet and input their name and bio

#### MVP +

1. As an owner I want to be able to delete my pets
2. As a user I want to see an interesting 404 page
3. As an owner I want to be able to upload an image of my pet as I create them
4. As an owner I want to be able to register with account details

#### Stretch

1. As an owner I want to be able to see comments and comment on pets
2. As a user I want to generate a pet with an AI and see it in the pet rotation
3. As an owner I want to be able to search for images from an image API with a search box
4. As an owner on the main page I want to earn bet points for betting on the more successful pet

### 2. Our tech stack

#### Core

- React, React Query, React Router
- Tailwind, PostCSS
- Express, SuperAgent
- Knex, SQLite3
- Vite, Typescript

#### Testing

- Vitest
- Testing Library 
- Supertest 
- Nock 

#### With extras from

- FontAwesome
- RadixUI, Headless UI React, Heroicons

#### Honorable Extension Mention

- Tailwind CSS IntelliSense

### 3. Our theme

![Noctis](https://github.com/liviuschera/noctis/raw/HEAD/images/noctis.png "Noctis")

Inspired by the soft coloured VSCode theme [Noctis](https://marketplace.visualstudio.com/items?itemName=liviuschera.noctis)

### 4. Our DB Schema (for now)

Note that the owners table is stretch

[db diagram](https://dbdiagram.io/d/Pet-Bet-66d6193deef7e08f0e7751e9)

<details>
<summary>ERD code</summary>

```php
Table pets {
  id int [pk, increment]
  owner_id string [ref: > O.auth0_id]
  name string
  bio text
  wins int
  losses int
  img_url string // default image at first
}

// Optional: auth0 stretch
Table owners as O {
  auth0_id string [pk]
  name string
  bet_points int // bet score
}
```

</details>

---

## Snippets 🗓️

These are small snippets of code that may help you out. Note that this is not an exhaustive list, and you may need to mix and match concepts.

### Component

#### Fetch from Component

<details>
  <summary>Code:</summary>

```ts
// component.tsx
const { data: fruits, isLoading, isError } = useQuery({
  queryKey: ['fruits'], 
  queryFn: getFruits
})

if (isError) {
  return (/* ... */)
}

if (isLoading) {
  return (/* ... */)
}

return (/* ... */)
```

</details>

---

### API Client

#### Get Request

<details>
  <summary>Code:</summary>

```ts
// apis/fruits.ts
async function getFruits() {
  const response = await request
    .get('/api/v1/fruits')

  return response.body.fruits
}
```

</details>

### Express Routes

#### Getting Data (server-side)

<details>
  <summary>Code:</summary>

```ts
// server/routes/fruits.ts
router.get('/', (req, res) => {
  try {
    const fruits = await db.getFruits(userId)
    if(!fruits){
      res.status(400)
      return
    }

    // ...
    res.status(200).json({fruits})
  } catch (error) {
    // ...
    console.log(error.message)
    res.status(500).json({ message: 'There was an error loading the data'})
  }
})
```

</details>

---

### Database/Knex

#### Database Join

<details>
  <summary>Code:</summary>

```ts
// server/db/fuctions/reviews.ts
async function getFruits(): Promise<FruitWithComment[]> {
  //         table 1
  return (
    db('fruits')
      //     table 2     column 1     column 2
      .join('comments', 'fruits.id', 'comments.fruit_id')
      .select(
        // make sure column names end up being unique
        'fruits.id',
        'fruits.name',
        'fruits.color',
        'fruits.taste',
        'comments.tasteRating',
        'comments.textureRating',
        'comments.content'
      )
  )
}
```

</details>