import { useQuery } from '@tanstack/react-query'
import { getLeaderboard } from '@/apis/pets'

export default function useLeaderboard() {
  return useQuery({
    queryKey: ['pets', 'leaderboard'],
    queryFn: () => getLeaderboard(),
    // refetchOnWindowFocus: false,
    // refetchOnMount: true,
  })
}
