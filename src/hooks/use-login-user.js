import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { userMutations } from '@/keys/mutations'
import { loginUser } from '@/services/users'

export const useLoginUser = () => {
  return useMutation({
    mutationKey: userMutations.login(),
    mutationFn: (user) => loginUser(user),
    onSuccess: () => {
      toast.success('Usuário logado com sucesso!')
    },
    onError: (error) => {
      toast.error(
        error.message || 'Erro ao criar usuário. Por favor, Tente novamente.'
      )
    },
  })
}
