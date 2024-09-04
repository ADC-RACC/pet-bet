import { getRandomPet } from '@/apis/pets'
import { useQuery } from '@tanstack/react-query'
import useUpdatePetVotes from '@/hooks/use-vote'
import { Pet } from '@models/pets'
import Card from '@/components/Card'

function Home() {
  const mutation = useUpdatePetVotes()

  const handleVote = async (id: number) => {
    const winner = data?.find((pet: Pet) => id === pet.id) as Pet
    const notwinner = data?.find((pet: Pet) => id != pet.id) as Pet
    const winnervotes = { wins: winner?.wins + 1, losses: winner?.losses }
    const loservotes = { wins: notwinner?.wins, losses: notwinner?.losses + 1 }

    await mutation.mutate({ votes: winnervotes, id })
    await mutation.mutate({ votes: loservotes, id: notwinner.id })
  }

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['vote'],
    queryFn: () => getRandomPet(2),
  })

  if (isPending) {
    return <p>Loading ...</p>
  }
  if (isError) {
    console.error(error.message)
    return <p>Error!</p>
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-8">Vote!</h1>
      <div className="flex items-center justify-center gap-8 mb-8">
        {data.map((vote) => (
          <Card key={vote.id} pet={vote} onClick={() => handleVote(vote.id)} />
        ))}
      </div>
      <p className="text-center text-lg text-2xl font-bold mb-8">
        All bets final!
      </p>
    </div>
  )
}

export default Home
