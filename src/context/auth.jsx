import { createContext, useContext, useEffect, useState } from 'react'

import { storageKeys } from '@/constants/storage-keys'
import useCreateUser from '@/hooks/use-add-user'
import { useAuthUser } from '@/hooks/use-auth-user'
import { getAccessToken, getRefreshToken, logout } from '@/lib/token'
import { getAuthUser } from '@/services/users'

export const AuthContext = createContext({
  user: null,
  login: () => {},
  signup: () => {},
  isSigningUp: false,
  isLoggingIn: false,
})

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const { mutate: createUserMutation, isPending: isSigningUp } = useCreateUser()
  const { mutate: authUserMutation, isPending: isLoggingIn } = useAuthUser()

  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = getAccessToken(storageKeys.accessToken)
        const refreshToken = getRefreshToken(storageKeys.refreshToken)
        if (!accessToken && !refreshToken) return

        const user = await getAuthUser()
        setUser(user)
      } catch (error) {
        console.log(error)
        logout()
      }
    }
    init()
  }, [])

  const signup = (data) => {
    const newUser = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
    }

    createUserMutation(newUser, {
      onSuccess: (createdUser) => {
        setUser(createdUser.user)
      },
    })
  }

  const login = (data) => {
    authUserMutation(data, {
      onSuccess: (loggedUser) => {
        setUser(loggedUser.user)
      },
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        isLoggingIn,
        signup,
        isSigningUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
