import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import PasswordInput from '@/components/ui/password-input'
import { useAuthUser } from '@/hooks/use-auth-user'

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Insira seu e-mail' })
    .email({ message: 'E-mail inválido.' }),
  password: z.string().min(1, {
    message: 'Insira sua senha.',
  }),
})

const LoginPage = () => {
  const navigate = useNavigate()
  const { mutate: authUserMutation, isPending: isLoggingIn } = useAuthUser()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (data) => {
    authUserMutation(data, {
      onSuccess: () => {
        form.reset()
        navigate('/home')
      },
    })
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Card className="w-[500px]">
        <CardHeader className="items-center">
          <CardTitle>Entre na sua conta</CardTitle>
          <CardDescription>Insira seus dados abaixo. </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-2">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="gap-2">
                    <FieldLabel htmlFor="form-login-email">E-mail</FieldLabel>
                    <Input
                      {...field}
                      id="form-login-email"
                      placeholder="Insira seu e-mail"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="gap-2">
                    <FieldLabel htmlFor="form-login-password">Senha</FieldLabel>
                    <PasswordInput
                      {...field}
                      id="form-login-password"
                      placeholder="Insira sua senha"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            form="form-login"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <Loader className="animate-spin text-white" />
            ) : (
              'Fazer Login'
            )}
          </Button>
        </CardFooter>
      </Card>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Ainda não possui uma conta?</p>
        <Button variant="link" asChild>
          <Link to="/signup" className="underline">
            Crie agora
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default LoginPage
