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
    mutationKey: transactionMutations.delete({ userId: user?.id }),
    mutationFn: (deletedTransaction) =>
      TransactionService.delete(deletedTransaction),
    onSuccess: () => {
      queryCliente.invalidateQueries({
        queryKey: usersQueryKeys.getBalanceRoot(user?.id),
      })
      queryCliente.invalidateQueries({
        queryKey: transactionsQueryKeys.getTransactions({
          userId: user.id,
        }),
      })
      toast.success('Transação deletada com sucesso!')
    },
    onError: (error) => {
      toast.error(
        error.message ||
          'Erro ao deletar transação. Por favor, Tente novamente.'
      )
    },
  })
}
