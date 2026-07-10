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
  //  /main*px-4 py-6 sm:px-6 lg:px-8*/

  return (
    <div className="min-h-screen overflow-x-hidden bg-background">
      <Header />

      <main className="mx-auto w-full space-y-6 p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <DateSelection />
            <TrasactionDialog />
          </div>
        </div>
        <div className="">
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
      </main>
    </div>
  )
}

export default HomePage
