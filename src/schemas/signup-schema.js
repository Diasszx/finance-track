import z from 'zod'

export const signupSchema = z
  .object({
    firstName: z.string().trim().min(1, {
      message: 'O nome é obrigatório.',
    }),
    lastName: z.string().trim().min(1, {
      message: 'O sobrenome é obrigatório.',
    }),
    email: z
      .string()
      .email({
        message: 'O email é inválido.',
      })
      .trim()
      .min(1, {
        message: 'O email é obrigatório.',
      }),
    password: z.string().min(6, {
      message: 'A senha deve ter pelo menos 6 caracteres',
    }),
    confirmPassword: z.string().min(1, { message: 'Confirme sua senha.' }),
    terms: z.boolean().refine((isCheck) => isCheck === true, {
      message: 'Você precisa aceitar os termos.',
    }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })
