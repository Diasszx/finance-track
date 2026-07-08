import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ExternalLink } from 'lucide-react'
import { useSearchParams } from 'react-router'

import formatCurrency from '@/helper/currency'
import { useGetTransactions } from '@/hooks/use-get-transactions'

import TransactionTypesBadges from './transaction-types-badges'
import { Button } from './ui/button'
import { DataTable } from './ui/data-table'

const columns = [
  {
    accessorKey: 'name',
    header: 'Título',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row: { original: transaction } }) => {
      return TransactionTypesBadges(transaction.type.toLowerCase())
    },
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row: { original: transaction } }) => {
      return format(new Date(transaction.date), "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      })
    },
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({ row: { original: transaction } }) => {
      return formatCurrency(transaction.amount)
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: () => {
      return (
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          {<ExternalLink />}
        </Button>
      )
    },
  },
]

const TransactionTable = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const { data: transactions } = useGetTransactions({ from, to })
  if (!transactions) return null
  return <DataTable columns={columns} data={transactions} />
}

export default TransactionTable
