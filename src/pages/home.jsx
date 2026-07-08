import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import Balance from '@/components/balance'
import DateSelection from '@/components/date-selection'
import Header from '@/components/header'
import TransactionTable from '@/components/transaction-tables'
import TrasactionDialog from '@/components/trasaction-dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useAuthContext } from '@/context/auth'

const HomePage = () => {
  const navigate = useNavigate()
  const { user, isInitializing } = useAuthContext()

  useEffect(() => {
    if (!isInitializing && !user) {
      navigate('/login')
    }
  }, [isInitializing, user, navigate])

  if (isInitializing) return null
  if (!user) return null

  return (
    <div className="bg-background">
      <Header />
      <div className="space-y-6 p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="flex items-center gap-2">
            <DateSelection />
            <TrasactionDialog />
          </div>
        </div>
        <div className="grid grid-cols-[2fr,1fr]">
          <Balance />
        </div>
        <div className="overflow-hidden rounded-md border bg-card">
          <div className="p-6">
            <h3 className="text-base font-bold">Transações</h3>
          </div>
          <ScrollArea className="h-max-[450px] h-[450px]">
            <TransactionTable />
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

export default HomePage
