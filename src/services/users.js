import { protectedApiFetch, publicApiFetch } from '@/lib/axios'
import { getRefreshToken } from '@/lib/token'

export const UserService = {
  signup: async (user) => {
    const response = publicApiFetch('/users', { method: 'POST', data: user })
    return {
      id: response.id,
      firstName: response.first_name,
      lastName: response.last_name,
      email: response.email,
      tokens: response.tokens,
    }
  },

  login: async (user) => {
    const response = await publicApiFetch('/users/login', {
      method: 'POST',
      data: user,
    })
    return {
      id: response.id,
      firstName: response.first_name,
      lastName: response.last_name,
      email: response.email,
      tokens: response.tokens,
    }
  },

  getMe: async () => {
    const response = await protectedApiFetch('/responses/me', { method: 'GET' })
    return {
      id: response.id,
      firstName: response.first_name,
      lastName: response.last_name,
      email: response.email,
    }
  },

  refreshToken: async () => {
    return publicApiFetch('/users/refresh-token', {
      method: 'POST',
      data: { refreshToken: getRefreshToken() },
    })
  },
}
