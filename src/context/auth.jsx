import { createContext, useContext, useEffect, useState } from 'react'

import { storageKeys } from '@/constants/storage-keys'
import useCreateUser from '@/hooks/use-add-user'
import { useAuthUser } from '@/hooks/use-auth-user'
import { useGetMe } from '@/hooks/use-get-me'
import { getAccessToken, getRefreshToken, removeTokens } from '@/lib/token'

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

  const { refetch: refetchMe } = useGetMe()

  useEffect(() => {
    const init = async () => {
      try {
        setIsInitializing(true)

        const accessToken = getAccessToken(storageKeys.accessToken)
        const refreshToken = getRefreshToken(storageKeys.refreshToken)

        if (!accessToken && !refreshToken) {
          setUser(null)
          return
        }

        const { data: authUser } = await refetchMe()

        setUser(authUser)
      } catch (error) {
        console.log(error)
        setUser(null)
        removeTokens()
      } finally {
        setIsInitializing(false)
      }
    }

    init()
  }, [refetchMe])

  const signup = async (data) => {
    const newUser = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
    }

    await createUserMutation(newUser)
    const { data: createdUser } = await refetchMe()
    setUser(createdUser)
    return createdUser
  }

  const login = async (data) => {
    await authUserMutation(data)
    const { data: authUser } = await refetchMe()
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
