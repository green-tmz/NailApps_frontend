import api from './index'
import type { Specialization } from '@/types'

export const fetchSpecializations = async (): Promise<Specialization[]> => {
  const response = await api.get('/specializations')
  return response.data.data
}

export const createSpecialization = async (name: string): Promise<Specialization> => {
  const response = await api.post('/specializations', name)
  return response.data.data
}

export const updateSpecialization = async (id: number, name: string): Promise<Specialization> => {
  const response = await api.put('/specializations/'+id, name)
  return response.data.data
}

export const deleteSpecialization = async (id: number): Promise<void> => {
  await api.delete('/specializations/'+id)
}
