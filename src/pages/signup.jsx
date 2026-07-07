import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
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
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthContext } from '@/context/auth'
import { signupSchema } from '@/schemas/signup-schema'

const SignupPage = () => {
  const { signup, isSigningUp, user, isInitializing } = useAuthContext()
  const navigate = useNavigate()

  // const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
  })

  const onSubmit = async (data) => {
    await signup(data)
    navigate('/')
  }

  if (isInitializing) return null

  if (user) {
    navigate('/')
  }
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Card className="max-h-[85vh] w-[500px] overflow-y-auto">
        <CardHeader className="items-center">
          <CardTitle>Crie a sua conta</CardTitle>
          <CardDescription>Insira seus dados abaixo.</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-signup" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="gap-2">
              <Controller
                name="firstName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="gap-2">
                    <FieldLabel
                      htmlFor="form-signup-firstName"
                      className="text-foreground"
                    >
                      Nome
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-signup-firstName"
                      placeholder="Digite seu nome"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="lastName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="gap-2">
                    <FieldLabel
                      htmlFor="form-signup-lastName"
                      className="text-foreground"
                    >
                      Sobrenome
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-signup-lastName"
                      placeholder="Digite seu sobrenome"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="gap-2">
                    <FieldLabel
                      htmlFor="form-signup-email"
                      className="text-foreground"
                    >
                      E-mail
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-signup-email"
                      placeholder="Digite seu e-mail"
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
                    <FieldLabel
                      htmlFor="form-signup-password"
                      className="text-foreground"
                    >
                      Senha
                    </FieldLabel>
                    <PasswordInput
                      {...field}
                      id="form-signup-password"
                      placeholder="Digite sua senha"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="gap-2">
                    <FieldLabel
                      htmlFor="form-signup-confirmPassword"
                      className="text-foreground"
                    >
                      Confirme a Senha
                    </FieldLabel>
                    <PasswordInput
                      {...field}
                      id="form-signup-confirmPassword"
                      placeholder="Digite sua senha novamente"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="terms"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <div className="mt-2 flex items-start gap-2">
                      <Checkbox
                        id="terms-checkbox"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label
                        htmlFor="terms-checkbox"
                        className="text-xs text-muted-foreground"
                      >
                        <span className="opacity-75">
                          Ao clicar em “Criar conta”, você aceita{' '}
                        </span>
                        <a href="#" className="text-white underline">
                          nosso termo de uso e política de privacidade
                        </a>
                      </Label>
                    </div>
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
            form="form-signup"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <Loader className="animate-spin text-white" />
            ) : (
              'Criar conta'
            )}
          </Button>
        </CardFooter>
      </Card>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Já possui uma conta?</p>
        <Button variant="link" asChild>
          <Link to="/login" className="underline">
            Faça login
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default SignupPage
