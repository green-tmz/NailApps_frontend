import { defineStore } from 'pinia'
import {
  fetchSpecializations,
  createSpecialization,
  updateSpecialization,
  deleteSpecialization
} from '@/api/specializations.ts'
import type { Specialization } from '@/types'

export const useSpecializationsStore = defineStore('specializations', {
  state: () => ({
    specializations: [] as Specialization[],
    isLoading: false,
    error: null as string | null
  }),
  getters: {
    getSpecializationById: (state) => (id: number) => {
      return state.specializations.find(spec => spec.id === id)
    },
    sortedSpecializations: (state) => {
      return [...state.specializations].sort((a, b) => a.name.localeCompare(b.name))
    }
  },
  actions: {
    async fetchSpecializations() {
      try {
        this.isLoading = true
        this.specializations = await fetchSpecializations()
        this.error = null
      } catch (error: any) {
        this.error = error.response?.data?.message || error.message
        console.error('Ошибка при загрузке специализаций:', error)
      } finally {
        this.isLoading = false
      }
    },
    async createSpecialization(name: string) {
      try {
        this.isLoading = true
        const newSpec = await createSpecialization(name)
        this.specializations.push(newSpec)
        this.error = null
        return newSpec
      } catch (error: any) {
        this.error = error.response?.data?.message || error.message
        console.error('Ошибка при создании специализации:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },
    async updateSpecialization(id: number, name: string) {
      try {
        this.isLoading = true
        const updatedSpec = await updateSpecialization(id, name)
        const index = this.specializations.findIndex(spec => spec.id === id)
        if (index !== -1) {
          this.specializations.splice(index, 1, updatedSpec)
        }
        this.error = null
        return updatedSpec
      } catch (error: any) {
        this.error = error.response?.data?.message || error.message
        console.error('Ошибка при обновлении специализации:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },
    async deleteSpecialization(id: number) {
      try {
        this.isLoading = true
        await deleteSpecialization(id)
        this.specializations = this.specializations.filter(spec => spec.id !== id)
        this.error = null
      } catch (error: any) {
        this.error = error.response?.data?.message || error.message
        console.error('Ошибка при удалении специализации:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    }
  }
})
