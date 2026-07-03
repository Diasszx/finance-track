import { protectedApiFetch, publicApi } from '@/lib/axios'

export const createUser = async (user) => {
  return publicApi('/users', { method: 'POST', data: user })
}

export const authUser = async (user) => {
  return publicApi('/users/login', { method: 'POST', data: user })
}

export const getAuthUser = async () => {
  return protectedApiFetch('/users/me', { method: 'GET' })
}
