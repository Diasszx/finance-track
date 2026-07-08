import queryString from 'query-string'

import { protectedApiFetch } from '@/lib/axios'

export const TransactionService = {
  /**
   * Cria uma nova transação
   * @param {object} input - Transação a ser criada.
   * @param {string} input.name - Nome da transação.
   * @param {string} input.type - Tipo da transação (EARNING/EXPENSE/INVESTMENT).
   * @param {string} input.date - Data da transação (YYY-MM-DD).
   * @param {number} input.amount - Valor da transação.
   * @returns {object} Transação criada.
   */
  create: async (input) => {
    const response = await protectedApiFetch('/transactions/me', {
      method: 'POST',
      data: input,
    })
    return response
  },
  /**
   * Retorna as transações do usuário autenticado
   * @param {object} input
   * @param {string} input.from - Data inicial (YYYY-MM-DD)
   * @param {string} input.to - Data final (YYYY-MM-DD)
   */
  getAll: async (input) => {
    const query = queryString.stringify({ from: input.from, to: input.to })
    const response = await protectedApiFetch(`/transactions/me?${query}`)
    return response
  },
}
