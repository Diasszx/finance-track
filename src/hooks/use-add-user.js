import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { userMutations } from '@/keys/mutations'
import { createUser } from '@/services/users'

export const useCreateUser = () => {
  return useMutation({
    mutationKey: userMutations.create(),
    mutationFn: (newUser) => createUser(newUser),
    onSuccess: (createdUser) => {
      const accessToken = createdUser.tokens.accessToken
      const refreshToken = createdUser.tokens.refreshToken
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      toast.success('Usuário criado com sucesso!')
    },
    onError: (error) => {
      toast.error(
        error.message || 'Erro ao criar usuário. Por favor, Tente novamente.'
      )
    },
  })
}

export default useCreateUser
