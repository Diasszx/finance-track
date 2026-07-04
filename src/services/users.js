import { protectedApiFetch, publicApiFetch } from '@/lib/axios'
import { getRefreshToken } from '@/lib/token'

export const UserService = {
  signup: async (user) => {
    return publicApiFetch('/users', { method: 'POST', data: user })
  },

  login: async (user) => {
    return publicApiFetch('/users/login', { method: 'POST', data: user })
  },

  getMe: async () => {
    return protectedApiFetch('/users/me', { method: 'GET' })
  },

  refreshToken: async () => {
    return publicApiFetch('/users/refresh-token', {
      method: 'POST',
      data: { refreshToken: getRefreshToken() },
    })
  },
}
