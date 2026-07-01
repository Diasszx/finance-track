import axios from 'axios'

const API_URL = 'https://fullstackclub-finance-dashboard-api.onrender.com/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const apiFetch = async (endpoint, options = {}) => {
  try {
    const response = await api({ url: endpoint, ...options })
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
