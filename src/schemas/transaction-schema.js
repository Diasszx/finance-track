import z from 'zod'

export const transactionSchema = z.object({
  title: z.string().min(1, {
    message: 'O nome é obrigatório',
  }),
  amount: z.coerce.number().min(0.1, { message: 'O valor é obrigatório' }),
  date: z.date({ message: 'A data é obrigatória' }),
  type: z.enum(['EARNING', 'EXPENSE', 'INVESTMENT'], {
    message: 'O tipo é obrigatório',
  }),
})

export const editTransactionSchema = transactionSchema.extend({
  id: z.string().uuid(),
})
