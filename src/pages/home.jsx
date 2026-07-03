import { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useAuthContext } from '@/context/auth'

const HomePage = () => {
  const navigate = useNavigate()
  const { user, isInitializing, signOut } = useAuthContext()

  useEffect(() => {
    if (!isInitializing && !user) {
      navigate('/login')
    }
  }, [isInitializing, user, navigate])

  if (isInitializing) return null
  if (!user) return null

  return (
    <div>
      <h1>Ola, {user.first_name}</h1>

      <button onClick={signOut}>sair</button>
    </div>
  )
}

export default HomePage
