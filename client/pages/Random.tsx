import { Button } from '@/components/Button'
import Card from '@/components/Card'
import PageTitle from '@/components/PageTitle'
import useRandomPet from '@/hooks/use-random-pet'
import { useNavigate } from 'react-router-dom'

function Random() {
  const count = 1
  const { data: characterArray, isError, isPending } = useRandomPet(count)
  const navigate = useNavigate()

  if (isPending) return <p>Loading...</p>
  if (isError) return <p>There was an error</p>

  const randomCharacter = characterArray[0]

  const clickHandler = () => {
    navigate(`/pets/${randomCharacter.id}`)
  }

  const refreshHandler = () => {
    navigate(0)
  }

  return (
    <>
      <PageTitle title="Random" />
      <div className="flex justify-center">
        <Card pet={randomCharacter} onClick={clickHandler} />
      </div>
      <div className="flex justify-center mt-8">
        <Button onClick={refreshHandler}>Refresh</Button>
      </div>
    </>
  )
}

export default Random
