import { defineStore } from 'pinia'
import {
  fetchClients,
  createClients,
  removeClient,
  updateClients
} from '@/api/clients.ts'
import type { Client } from '@/types'

export const  useClientsStore = defineStore('clients', {
  state: () =>({
    clients: [] as Client[],
    isLoading: false,
    error: null as string | null
  }),
  getters: {

  },
  actions: {
    async fetchClients() {
      try {
        this.isLoading = true
        this.clients = await fetchClients()
        this.error = null
      } catch (error: any) {
        this.error = error.response?.data?.message || error.message
        console.error('Ошибка при загрузке специализаций:', error)
      } finally {
        this.isLoading = false
      }
    },
    async createClient(data: []) {
      try {
        this.isLoading = true
        const newClient = await createClients(data)
        this.clients.push(newClient)
        this.error = null
      } catch (error: any) {
        this.error = error.response?.data?.message || error.message
        console.error('Ошибка при создании клиента:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },
    async deleteClient(id: number) {
      try {
        this.isLoading = true
        await removeClient(id)
        this.clients = this.clients.filter(client => client.id !== id)
        this.error = null
      } catch (error: any) {
        this.error = error.response?.data?.message || error.message
        console.error('Ошибка при удалении специализации:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },
    async updateClient(id: number, data: []) {
      try {
        this.isLoading = true
        const updateClient = await updateClients(id, data)
        const index = this.clients.findIndex(client => client.id === id)
        if (index !== -1) {
          this.clients.splice(index, 1, updateClient)
        }
        this.error = null
        return updateClient
      } catch (error: any) {
        this.error = error.response?.data?.message || error.message
        console.error('Ошибка при обновлении клиента:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    }
  }
})
