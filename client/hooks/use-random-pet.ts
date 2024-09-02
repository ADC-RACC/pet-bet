import { useQuery } from '@tanstack/react-query'
import { getRandomPet } from '@/apis/pets'

export default function useRandomPet(count: number) {
  return useQuery({
    queryKey: ['pets', 'random'],
    queryFn: () => getRandomPet(count),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  })
}
