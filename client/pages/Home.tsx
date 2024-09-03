// import PageTitle from '@/components/PageTitle'
// import { getPetById } from '@/apis/pets'
import { getRandomPet } from '@/apis/pets'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/Button'
import { useState } from 'react'
// import Card from '@/components/Card'

function Home(count: number) {
  const [clicked, setClicked] = useState(false)
  const handleClick = () => {
    setClicked(clicked)
  }

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['vote'],
    queryFn: () => getRandomPet(count),
  })

  if (isPending) {
    return <p>Loading ...</p>
  }
  if (isError) {
    console.error(error.message)
    return <p>Error!</p>
  }

  return (
    // <PageTitle title="Home" />
    <>
      <ul>
        {data.slice(0, 2).map((vote) => (
          <li key={vote.id}>
            <img src={vote.imgUrl} alt={vote.name} />
            {vote.name}
            {vote.bio}
            <Button onClick={handleClick}>Vote</Button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Home
