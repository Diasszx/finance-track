export const getAccessToken = () => localStorage.getItem('accessToken')
export const setAcessToken = (accessToken) =>
  localStorage.setItem('accessToken', accessToken)

export const getRefreshToken = () => localStorage.getItem('refreshToken')
export const setRefreshToken = (refreshToken) =>
  localStorage.setItem('refreshToken', refreshToken)

export const logout = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  window.location.href = '/login'
}
