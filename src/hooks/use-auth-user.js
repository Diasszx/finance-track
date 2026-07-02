import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { userMutations } from '@/keys/mutations'
import { setAcessToken, setRefreshToken } from '@/lib/token'
import { authUser } from '@/services/users'

export const useAuthUser = () => {
  return useMutation({
    mutationKey: userMutations.auth(),
    mutationFn: (user) => authUser(user),
    onSuccess: (authUser) => {
      const accessToken = authUser.tokens.accessToken
      const refreshToken = authUser.tokens.refreshToken
      setAcessToken(accessToken)
      setRefreshToken(refreshToken)
      toast.success('Usuário logado com sucesso!')
    },
    onError: (error) => {
      toast.error(
        error.message || 'Erro ao criar usuário. Por favor, Tente novamente.'
      )
    },
  })
}
