import { defineStore } from 'pinia'
import {

} from '@/api/clients.ts'
import type { Client } from '@/types'

export const  useClientsStore = defineStore('clients', {
  state: () =>({
    clients: [] as Client[]
  }),
  getters: {

  },
  actions: {

  }
})
