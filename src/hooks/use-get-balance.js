import { useQuery } from '@tanstack/react-query'

import { useAuthContext } from '@/context/auth'
import { usersQueryKeys } from '@/keys/queries'
import { UserService } from '@/services/users'

export const useGetBalance = ({ from, to }) => {
  const { user } = useAuthContext()

  return useQuery({
    queryKey: usersQueryKeys.getBalance({
      userId: user?.id,
      from,
      to,
    }),
    queryFn: () => UserService.getBalance({ from, to }),
    enabled: !!user?.id && !!from && !!to,
  })
}
