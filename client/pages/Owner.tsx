import React from 'react'
import { useOwnerId } from '@/hooks/ownerApi'
import { PetData } from '@models/pets'
import PageTitle from '@/components/PageTitle'
import { useParams } from 'react-router-dom'
import PetCard from '../components/PetCard'

const OwnerPage: React.FC = () => {
  const { ownerId } = useParams()
  const { data, error, isLoading } = useOwnerId(ownerId as string)

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
      <ul>
        {data.map((pet: PetData) => (
          <li key={pet.ownerId}>
            <PetCard pet={pet} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default OwnerPage
