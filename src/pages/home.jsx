import { useEffect } from 'react'
import { useNavigate } from 'react-router'

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

  return <h1>Ola, {user.first_name}</h1>
}

export default HomePage
