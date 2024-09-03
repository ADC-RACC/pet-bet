import React from 'react'
import { useOwnerId } from '@/hooks/ownerApi'
import { PetData } from '@models/pets'
import PageTitle from '@/components/PageTitle'

const PageOwner: React.FC = ({ ownerId }) => {
  const { data, error, isLoading } = useOwnerId(ownerId)

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }
  if (!data) {
    return <div>No pets found for this owner.</div>
  }

  return (
    <>
      <PageTitle title="Manager" />
      <h1>Pets for Owner {ownerId}</h1>
      <ul>
        {data.pets.map((pet: PetData) => (
          <li key={pet.ownerId}>
            <img src={pet.imgUrl} alt={pet.name} />
            <div>
              <strong>{pet.name}</strong>
              <p>{pet.bio}</p>
              <p>{pet.losses}</p>
              <p>{pet.wins}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default PageOwner
