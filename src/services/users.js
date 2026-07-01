import { apiFetch } from '@/lib/axios'

export const createUser = async (user) => {
  return apiFetch('/users', { method: 'POST', data: user })
}

export const loginUser = async (user) => {
  return apiFetch('/users/login', { method: 'POST', data: user })
}
