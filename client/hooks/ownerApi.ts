import { useQuery } from '@tanstack/react-query'
import request from 'superagent'
import { Pet } from '../../models/pets'

export function useOwnerId(ownerId: string) {
  return useQuery<Pet[]>({
    queryKey: ['pet', ownerId],
    queryFn: async () => {
      const res = await request.get(`/api/v1/owners/${ownerId}/pets`)
      if (!res.body) {
        throw new Error('Pet not found')
      }
      return res.body as Pet[]
    },
    staleTime: 5000,
  })
}
