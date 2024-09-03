import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { PetData } from '../../models/pets'

export function useOwnerId(ownerId: string) {
  return useQuery<PetData>({
    queryKey: ['pet', ownerId],
    queryFn: async () => {
      const res = await request.get(`/api/v1/owners/${ownerId}/pets`)
      if (!res.body.pet) {
        throw new Error('Pet not found')
      }
      return res.body as PetData
    },
    staleTime: 5000,
  })
}
