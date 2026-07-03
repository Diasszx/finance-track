import { protectedApiFetch, publicApiFetch } from '@/lib/axios'

export const createUser = async (user) => {
  return publicApiFetch('/users', { method: 'POST', data: user })
}

export const authUser = async (user) => {
  return protectedApiFetch('/users/login', { method: 'POST', data: user })
}

export const getAuthUser = async () => {
  return publicApiFetch('/users/me', { method: 'GET' })
}
