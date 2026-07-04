import { useQuery } from '@tanstack/react-query'

import { usersQueryKeys } from '@/keys/queries'
import { UserService } from '@/services/users'

export const useGetMe = () => {
  return useQuery({
    queryKey: usersQueryKeys.getMe(),
    queryFn: UserService.getMe,
    enabled: false,
    retry: false,
  })
}
