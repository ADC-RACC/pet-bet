import { addVotes } from '@/apis/pets'
import { UpdatedData } from '@models/pets'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'

interface Votes {
  votes: UpdatedData
  id: number
}

export default function useUpdatePetVotes() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ votes, id }: Votes) => addVotes(votes, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['vote'],
      })
    },
  })
  return mutation
}
