import { PlusIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { Button } from '@/components/ui/button'
import DateSelection from '@/components/ui/date-selection'
import Header from '@/components/ui/header'
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
    <div>
      <Header />
      <div className="p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <div className="flex items-center gap-2">
            <DateSelection />
            <Button>
              <PlusIcon />
              Nova transação
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
