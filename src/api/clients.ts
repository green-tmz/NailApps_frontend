import api from './index'
import type { Client } from '@/types'

export const fetchClients = async (): Promise<Client[]> => {
  const response = await api.get('/clients')
  return response.data
}
