import { defineStore } from 'pinia'
import {
  fetchServices,
  createService,
  removeService,
  updateService
} from '@/api/services.ts'
import type { Service } from '@/types'

export const useServicesStore = defineStore('services', {
  state: () =>({
    services: [] as Service[],
    isLoading: false,
    error: null as string | null
  }),
  getters: {

  },
  actions: {
    async fetchServices() {
      try {
        this.isLoading = true
        this.services = await fetchServices()
        this.error = null
      } catch (error: any) {
        this.error = error.response?.data?.message || error.message
        console.error('Ошибка при загрузке услуг:', error)
      } finally {
        this.isLoading = false
      }
    },
    async createService(data: []) {
      try {
        this.isLoading = true
        const newService = await createService(data)
        this.services.push(newService)
        this.error = null
      } catch (error: any) {
        this.error = error.response?.data?.message || error.message
        console.error('Ошибка при создании услуги:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },
    async removeService(id: number) {
      try {
        this.isLoading = true
        await removeService(id)
        this.services = this.services.filter(service => service.id !== id)
        this.error = null
      } catch (error: any) {
        this.error = error.response?.data?.message || error.message
        console.error('Ошибка при удалении услуги:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },
    async updateService(id: number, data: []) {
      try {
        this.isLoading = true
        const updService = await updateService(id, data)
        const index = this.services.findIndex(service => service.id === id)
        if (index !== -1) {
          this.services.splice(index, 1, updService)
        }
        this.error = null
        return updService
      } catch (error: any) {
        this.error = error.response?.data?.message || error.message
        console.error('Ошибка при обновлении услуги:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    }
  }
})
