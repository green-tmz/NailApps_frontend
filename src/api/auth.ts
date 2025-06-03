import api from './index'
import type { LoginData, RegisterData, User } from '@/types'

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('na_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const login = async (data: LoginData) => {
  try {
    const response = await api.post('/auth/login', data)
    return {
      token: response.data.data.token,
      user: response.data.data.user
    }
  } catch (error) {
    // Можно добавить кастомную обработку ошибок аутентификации
    throw error
  }
}

export const register = async (data: RegisterData) => {
  try {
    const response = await api.post('/auth/register', data)
    return {
      token: response.data.data.token,
      user: response.data.data.user
    }
  } catch (error) {
    // Можно добавить кастомную обработку ошибок аутентификации
    throw error
  }
}

export const logout = async () => {
  await api.post('/auth/logout')
}

export const getMe = async (): Promise<User> => {
  try {
    const response = await api.get('/auth/me')
    return response.data.data
  } catch (error) {
    throw error
  }
}
