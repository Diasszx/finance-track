import { storageKeys } from '@/constants/storage-keys'

export const getAccessToken = () =>
  localStorage.getItem(storageKeys.accessToken)
export const setAcessToken = (accessToken) =>
  localStorage.setItem(storageKeys.accessToken, accessToken)

export const getRefreshToken = () =>
  localStorage.getItem(storageKeys.refreshToken)
export const setRefreshToken = (refreshToken) =>
  localStorage.setItem(storageKeys.refreshToken, refreshToken)

export const removeTokens = () => {
  localStorage.removeItem(storageKeys.accessToken)
  localStorage.removeItem(storageKeys.refreshToken)
}
