import axios from 'axios'

import { UserService } from '@/services/users'

import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
  setAcessToken,
  setRefreshToken,
} from './token'

const API_URL = 'https://fullstackclub-finance-dashboard-api.onrender.com/api'

const publicApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const protectedApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

protectedApi.interceptors.request.use((config) => {
  const accessToken = getAccessToken()

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

protectedApi.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const request = error.config

    const refreshToken = getRefreshToken()
    if (!refreshToken) {
      return Promise.reject(error)
    }

    if (
      error.response.status === 401 &&
      !request._rety &&
      !request.url.includes('/users/refresh-token')
    ) {
      request._rety = true
      try {
        const response = await UserService.refreshToken()
        const accessToken = response.accessToken
        const refreshToken = response.refreshToken
        setAcessToken(accessToken)
        setRefreshToken(refreshToken)
        request.headers.Authorization = `Bearer ${accessToken}`
        return protectedApi(request)
      } catch (refreshError) {
        console.log(refreshError)
        removeTokens()
      }
    }
    return Promise.reject(error)
  }
)

export const publicApiFetch = async (endpoint, options = {}) => {
  const response = await publicApi({ url: endpoint, ...options })
  return response.data
}

export const protectedApiFetch = async (endpoint, options = {}) => {
  try {
    const response = await protectedApi({ url: endpoint, ...options })
    return response.data
  } catch (error) {
    if (import.meta.env.DEV) {
      console.log('API_URL:', API_URL)
      console.log('Endpoint:', endpoint)
      console.log('Erro completo:', error)
      console.log('Status:', error.response?.status)
      console.log('Data:', error.response?.data)
    }

    throw new Error(error.response?.data?.message || 'Erro na requisição')
  }
}
