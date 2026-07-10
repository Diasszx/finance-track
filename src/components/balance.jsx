import { PiggyBank, TrendingDown, TrendingUp, WalletIcon } from 'lucide-react'
import { useSearchParams } from 'react-router'

import { useGetBalance } from '@/hooks/use-get-balance'

import BalanceItem from './balance-item'

const Balance = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')

  const { data: balance, isLoading } = useGetBalance({ from, to })

  if (isLoading) return <p>Carregando....</p>

  return (
    <div className="flex w-full flex-wrap gap-6 md:grid md:grid-cols-2 md:grid-rows-2">
      <BalanceItem
        label="Saldo"
        icon={<WalletIcon size={16} />}
        amount={balance?.balance}
      ></BalanceItem>
      <BalanceItem
        label="Ganhos"
        icon={<TrendingUp className="text-primary-green" size={16} />}
        amount={balance?.earnings}
      ></BalanceItem>
      <BalanceItem
        label="Gastos"
        icon={<TrendingDown className="text-primary-red" size={16} />}
        amount={balance?.expenses}
      ></BalanceItem>
      <BalanceItem
        label="Investimentos"
        icon={<PiggyBank className="text-primary-blue" size={16} />}
        amount={balance?.investments}
      ></BalanceItem>
    </div>
  )
}

export default Balance
