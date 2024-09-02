export interface PetData {
  ownerId: string
  name: string
  bio: string
  wins: number
  losses: number
  imgUrl: string
}

export interface Pet extends PetData {
  id: number
}
