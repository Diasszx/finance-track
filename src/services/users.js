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
   * @returns {Object} Usuário criado.
   * @returns {string} response.tokens - Tokens de autenticação.

   */
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
