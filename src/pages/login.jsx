import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'

import PasswordInput from '@/components/password-input'
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
import { useAuthContext } from '@/context/auth'
import { loginSchema } from '@/schemas/login-schema'

const LoginPage = () => {
  const { user, login, isLoggingIn, isInitializing } = useAuthContext()
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data) => {
    await login(data)
    navigate('/')
  }

  useEffect(() => {
    if (!isInitializing && user) {
      navigate('/')
    }
  }, [isInitializing, user, navigate])

  if (isInitializing) return null

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Card className="w-4/5 md:w-[500px]">
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
