import { createContext, useContext, useEffect, useState } from 'react'

import { storageKeys } from '@/constants/storage-keys'
import useCreateUser from '@/hooks/use-add-user'
import { useAuthUser } from '@/hooks/use-auth-user'
import { getAccessToken, getRefreshToken, removeTokens } from '@/lib/token'
import { getAuthUser } from '@/services/users'

export const AuthContext = createContext({
  user: null,
  login: () => {},
  signup: () => {},
  isSigningUp: false,
  isLoggingIn: false,
  isInitializing: true,
  signOut: () => {},
})

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isInitializing, setIsInitializing] = useState(true)
  const { mutateAsync: createUserMutation, isPending: isSigningUp } =
    useCreateUser()
  const { mutateAsync: authUserMutation, isPending: isLoggingIn } =
    useAuthUser()

  useEffect(() => {
    const init = async () => {
      try {
        setIsInitializing(true)
        const accessToken = getAccessToken(storageKeys.accessToken)
        const refreshToken = getRefreshToken(storageKeys.refreshToken)
        if (!accessToken && !refreshToken) return

        const user = await getAuthUser()
        setUser(user)
      } catch (error) {
        console.log(error)
        setUser(null)
      } finally {
        setIsInitializing(false)
      }
    }
    init()
  }, [])

  const signup = async (data) => {
    const newUser = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
    }

    await createUserMutation(newUser)
    const createdUser = await getAuthUser()
    setUser(createdUser)
    return createdUser
  }

  const login = async (data) => {
    await authUserMutation(data)
    const authUser = await getAuthUser()
    setUser(authUser)
    return authUser
  }

  const signOut = () => {
    setUser(null)
    removeTokens()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        isLoggingIn,
        signup,
        isSigningUp,
        isInitializing,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
