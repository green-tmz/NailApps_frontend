import api from './index'
import type { Service } from '@/types'

export const fetchServices = async (): Promise<Service[]> => {
  const response = await api.get('/services')
  return response.data.data
}

export const createService = async (data: []): Promise<Service> => {
  const response = await api.post('/services', data)
  return response.data.data
}

export const removeService = async (id: number): Promise<void> => {
  await api.delete('/services/'+id)
}

export const updateService = async (id: number, data: []): Promise<Service> => {
  const response = await api.put('/services/'+id, data)
  return response.data.data
}
