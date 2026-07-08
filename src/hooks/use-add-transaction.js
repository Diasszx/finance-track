import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useAuthContext } from '@/context/auth'
import { transactionMutations } from '@/keys/mutations'
import { transactionsQueryKeys, usersQueryKeys } from '@/keys/queries'
import { TransactionService } from '@/services/transactions'

export const useCreateTransaction = () => {
  const { user } = useAuthContext()
  const queryCliente = useQueryClient()
  return useMutation({
    mutationKey: transactionMutations.create({ userId: user?.id }),
    mutationFn: (newTransaction) => TransactionService.create(newTransaction),
    onSuccess: () => {
      queryCliente.invalidateQueries({
        queryKey: usersQueryKeys.getBalanceRoot(user?.id),
      })
      queryCliente.invalidateQueries({
        queryKey: transactionsQueryKeys.getTransactions({
          userId: user.id,
        }),
      })
      toast.success('Transação criada com sucesso!')
    },
    onError: (error) => {
      toast.error(
        error.message || 'Erro ao criar transação. Por favor, Tente novamente.'
      )
    },
  })
}
