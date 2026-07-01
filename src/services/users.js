import { apiFetch } from '@/lib/axios'

export const createUser = async (user) => {
  return apiFetch('/users', { method: 'POST', data: user })
}
