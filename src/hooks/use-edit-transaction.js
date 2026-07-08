import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useAuthContext } from '@/context/auth'
import { transactionMutations } from '@/keys/mutations'
import { transactionsQueryKeys, usersQueryKeys } from '@/keys/queries'
import { TransactionService } from '@/services/transactions'

export const useEditTransaction = () => {
  const { user } = useAuthContext()
  const queryCliente = useQueryClient()
  return useMutation({
    mutationKey: transactionMutations.update({ userId: user?.id }),
    mutationFn: (updatedTransaction) =>
      TransactionService.update(updatedTransaction),
    onSuccess: () => {
      queryCliente.invalidateQueries({
        queryKey: usersQueryKeys.getBalanceRoot(user?.id),
      })
      queryCliente.invalidateQueries({
        queryKey: transactionsQueryKeys.getTransactionsRoot({
          userId: user.id,
        }),
      })
      toast.success('Transação atualizada com sucesso!')
    },
    onError: (error) => {
      toast.error(
        error.message || 'Erro ao editar transação. Por favor, Tente novamente.'
      )
    },
  })
}
