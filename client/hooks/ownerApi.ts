import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { Owner } from '../../models/owner'

export function useOwnerId(auth0_id: string) {
  return useQuery<Owner>({
    queryKey: ['owner', auth0_id],
    queryFn: async () => {},
  })
}
