import { Link } from 'react-router'

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
import { Field } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PasswordInput from '@/components/ui/password-input'

const SignupPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-[500px]">
        <CardHeader className="items-center">
          <CardTitle>Crie a sua conta</CardTitle>
          <CardDescription>Insira seus dados abaixo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Digite seu nome" />
          <Input placeholder="Digite seu sobrenome" />
          <Input placeholder="Digite seu e-mail" />
          <PasswordInput />
          <PasswordInput placeholder="Digite sua senha novamente" />
        </CardContent>
        <Field orientation="horizontal" className="mb-6 ml-6 w-[330px]">
          <Checkbox id="terms-checkbox" name="terms-checkbox" />
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
        </Field>
        <CardFooter>
          <Button className="w-full">Fazer login</Button>
        </CardFooter>
      </Card>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Ainda não possui uma conta?</p>
        <Button variant="link" asChild>
          <Link to="/login">Faça login</Link>
        </Button>
      </div>
    </div>
  )
}

export default SignupPage
