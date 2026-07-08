import { useQuery } from '@tanstack/react-query'

import { useAuthContext } from '@/context/auth'
import { transactionsQueryKeys } from '@/keys/queries'
import { TransactionService } from '@/services/transactions'

export const useGetTransactions = ({ from, to }) => {
  const { user } = useAuthContext()
  return useQuery({
    queryKey: transactionsQueryKeys.getTransactions({
      userId: user.id,
      from,
      to,
    }),
    queryFn: TransactionService.getAll({ from, to }),
  })
}
