import { protectedApiFetch, publicApiFetch } from '@/lib/axios'
import { getRefreshToken } from '@/lib/token'

export const createUser = async (user) => {
  return publicApiFetch('/users', { method: 'POST', data: user })
}

export const authUser = async (user) => {
  return publicApiFetch('/users/login', { method: 'POST', data: user })
}

export const getAuthUser = async () => {
  return protectedApiFetch('/users/me', { method: 'GET' })
}

export const refreshAuth = async () => {
  return publicApiFetch('/users/refresh-token', {
    method: 'POST',
    data: { refreshToken: getRefreshToken() },
  })
}
