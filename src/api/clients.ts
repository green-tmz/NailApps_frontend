import api from './index'
import type { Client } from '@/types'

export const fetchClients = async (): Promise<Client[]> => {
  const response = await api.get('/clients')
  return response.data.data
}

export const createClients = async (data: []): Promise<Client> => {
  const response = await api.post('/clients', data)
  return response.data.data
}

export const removeClient = async (id: number): Promise<void> => {
  await api.delete('/clients/'+id)
}

export const updateClients = async (id: number, data: []): Promise<Client> => {
  const response = await api.put('/clients/'+id, data)
  return response.data.data
}
