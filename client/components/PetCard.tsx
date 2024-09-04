import React from 'react'
import { PetData } from '@models/pets'

interface Props {
  pet: PetData
}

const PetCard: React.FC<Props> = ({ pet }) => {
  return (
    <div className="block max-w-[18rem] rounded-lg bg-white text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
      <ul className="w-full">
        <li className="w-full border-b-2 border-neutral-100 border-opacity-100 px-6 py-3 dark:border-white/10">
          <div className="relative overflow-hidden bg-cover bg-no-repeat">
            <img className="rounded-t-lg" src={pet.imgUrl} alt={pet.name} />
          </div>
          <div className="p-6">
            <strong>{pet.name}</strong>
            <p className="text-base">Bio: {pet.bio}</p>
            <p className="text-base">Losses: {pet.losses}</p>
            <p className="text-base">Wins: {pet.wins}</p>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default PetCard
