import { zodResolver } from '@hookform/resolvers/zod'
import {
  ExternalLink,
  PiggyBank,
  Trash2,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

import { editTransactionSchema } from '@/schemas/transaction-schema'

import { Button } from './ui/button'
import { DatePicker } from './ui/date-picker'
import { Field, FieldError, FieldGroup, FieldLabel } from './ui/field'
import { Input } from './ui/input'
import { Separator } from './ui/separator'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from './ui/sheet'

const EditTransactionButton = ({ transaction }) => {
  const form = useForm({
    resolver: zodResolver(editTransactionSchema),
    defaultValues: {
      name: transaction.name,
      amount: transaction.amount,
      date: transaction.date,
      type: transaction.type,
      id: transaction.id,
    },
  })

  const onSubmit = async () => {}
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          {<ExternalLink />}
        </Button>
      </SheetTrigger>
      <SheetContent className="space-y-6">
        <SheetHeader className="">Transação</SheetHeader>
        <Separator />
        <form
          id="form-update-transaction"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup className="gap-2">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-2">
                  <FieldLabel
                    htmlFor="form-update-transaction-title"
                    className="text-foreground"
                  >
                    Título
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-update-transaction-title"
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
              name="amount"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="form-transaction-amount">
                    Valor
                  </FieldLabel>
                  <NumericFormat
                    placeholder="Digite o valor da transação"
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix="R$"
                    allowNegative={false}
                    customInput={Input}
                    value={field.value}
                    onChange={() => {}}
                    onValueChange={(values) =>
                      field.onChange(values.floatValue)
                    }
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="form-transaction-date">Data</FieldLabel>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    id="form-transaction-date"
                    type="date"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="type"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="mt-6">
                  <div className="flex gap-5">
                    <Button
                      type="button"
                      variant="outline"
                      className={`rounded-lg text-muted-foreground ${
                        field.value === 'EARNING'
                          ? 'border-primary-green text-white'
                          : ''
                      }`}
                      onClick={() => field.onChange('EARNING')}
                    >
                      <TrendingUp className="text-primary-green" />
                      <p>Ganho</p>
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className={`rounded-lg text-muted-foreground ${
                        field.value === 'EXPENSE'
                          ? 'border-primary-green text-white'
                          : ''
                      }`}
                      onClick={() => field.onChange('EXPENSE')}
                    >
                      <TrendingDown className="text-primary-red" />
                      <p>Gasto</p>
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className={`rounded-lg text-muted-foreground ${
                        field.value === 'INVESTMENT'
                          ? 'border-primary-green text-white'
                          : ''
                      }`}
                      onClick={() => field.onChange('INVESTMENT')}
                    >
                      <PiggyBank className="text-primary-blue" />
                      <p>Invest.</p>
                    </Button>
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <div className="flex justify-end">
          <div className="flex items-center gap-1 text-primary-red">
            <Button
              variant="ghost"
              className="px-1 text-xs font-bold text-primary-red"
            >
              Deletar Transação
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default EditTransactionButton
