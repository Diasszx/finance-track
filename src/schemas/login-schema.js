import z from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Insira seu e-mail' })
    .email({ message: 'E-mail inválido.' }),
  password: z.string().min(1, {
    message: 'Insira sua senha.',
  }),
})
