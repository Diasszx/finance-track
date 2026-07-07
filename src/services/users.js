import { protectedApiFetch, publicApiFetch } from '@/lib/axios'
import { getRefreshToken } from '@/lib/token'

export const UserService = {
  /**
   * Cria um novo usuário
   * @param {object} input - Usuário a ser criado.
   * @param {string} input.firstName - Primeiro nome de usuário.
   * @param {string} input.lastName - Sobrenome do usuário.
   * @param {string} input.email - Email do usuário.
   * @param {string} input.password - Senha do usuário.
   * @returns {object} Usuário criado.
   * @returns {string} response.tokens - Tokens de autenticação.

   */
  signup: async (user) => {
    const response = await publicApiFetch('/users', {
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
  /**
   * Cria um novo usuário
   * @param {object} input - Usuário a ser autenticado.
   * @param {string} input.email - Email do usuário.
   * @param {string} input.password - Senha do usuário.
   * @returns {Object} Usuário autenticado.
   * @returns {string} response.tokens - Tokens de autenticação.

   */
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
  /**
   * Retorna usuário autenticado.
   * @returns {Object} Usuário autenticado.
   */
  getMe: async () => {
    const response = await protectedApiFetch('/users/me')
    return {
      id: response.id,
      firstName: response.first_name,
      lastName: response.last_name,
      email: response.email,
    }
  },
  /**
   * Retorna o balanço autenticado
   * @param {object} input - Balanço a ser carregado
   * @param {string} input.from - Data inicial (YYYY-MM-DD)
   * @param {string} input.to - Data final (YYYY-MM-DD)
   */
  getBalance: async (input) => {
    const queryParams = new URLSearchParams()

    queryParams.set('from', input.from)
    queryParams.set('to', input.to)

    return await protectedApiFetch(
      `/users/me/balance?${queryParams.toString()}`
    )
  },

  refreshToken: async () => {
    return publicApiFetch('/users/refresh-token', {
      method: 'POST',
      data: { refreshToken: getRefreshToken() },
    })
  },
}
