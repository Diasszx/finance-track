import { apiFetch } from '@/lib/axios'

export const createUser = async (user) => {
  return apiFetch('/users', { method: 'POST', data: user })
}

export const authUser = async (user) => {
  return apiFetch('/users/login', { method: 'POST', data: user })
}

export const getAuthUser = async () => {
  return apiFetch('/users/me', { method: 'GET' })
}
