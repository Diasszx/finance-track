import { zodResolver } from '@hookform/resolvers/zod'
import { PiggyBank, PlusIcon, TrendingDown, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'

import { transactionSchema } from '@/schemas/transaction-schema'

import { Button } from './ui/button'
import { DatePicker } from './ui/date-picker'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { Field, FieldError, FieldGroup, FieldLabel } from './ui/field'
import { Input } from './ui/input'

const TrasactionDialog = () => {
  const [open, setOpen] = useState(false)
  const form = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      title: '',
      amount: '',
      date: new Date(),
      type: 'EARNING',
    },
  })

  const onSubmit = async (data) => {
    console.log(data)
    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Nova Transação
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-w-sm flex-col items-center justify-center">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Adicionar Transação
          </DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>
        <form id="form-transaction" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel htmlFor="form-transaction-title">
                    Título
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-transaction-title"
                    placeholder="Título"
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
                <Field>
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

          <DialogFooter className="mt-6 grid grid-cols-2 gap-3">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full rounded-md bg-card px-4 py-2"
              >
                Cancelar
              </Button>
            </DialogClose>

            <Button type="submit" className="w-full rounded-md px-4 py-2">
              Adicionar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default TrasactionDialog
