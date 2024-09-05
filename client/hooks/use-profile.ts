import { getPetById } from '@/apis/pets'
import { useQuery } from '@tanstack/react-query'

export default function useProfile(id: number) {
  return useQuery({
    queryKey: ['pets', id],
    queryFn: async () => getPetById(id),
  })
}
