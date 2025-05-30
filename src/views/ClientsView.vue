<template>
  <div class="clients-view">
    <div class="actions">
      <button @click="showAddClientModal = true">Добавить клиента</button>
    </div>

    <ClientsList :clients="clients" @edit="handleEditClient" @delete="handleDeleteClient" />

    <ClientForm
      v-if="showAddClientModal || editingClient"
      :client="editingClient"
      @submit="handleSubmitClient"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useClientsStore } from '@/stores/clients'
import ClientsList from '@/components/clients/ClientsList.vue'
import ClientForm from '@/components/clients/ClientForm.vue'
import type { Client } from '@/types'

const clientsStore = useClientsStore()
const clients = computed(() => clientsStore.clients)

const showAddClientModal = ref(false)
const editingClient = ref<Client | null>(null)

onMounted(async () => {
  await clientsStore.fetchClients()
})

const handleEditClient = (client: any) => {
  editingClient.value = { ...client }
}

const handleDeleteClient = async (id: number) => {
  if (confirm('Вы уверены, что хотите удалить этого клиента?')) {
    await clientsStore.deleteClient(id)
  }
}

const handleSubmitClient = async (clientData: any) => {
  if (editingClient.value) {
    await clientsStore.updateClient(editingClient.value.id, clientData)
  } else {
    await clientsStore.createClient(clientData)
  }
  closeModal()
}

const closeModal = () => {
  showAddClientModal.value = false
  editingClient.value = null
}
</script>

<style scoped>
.clients-view {
  padding: 1rem;
}

.actions {
  margin-bottom: 1rem;
  display: flex;
  justify-content: flex-end;
}

button {
  padding: 0.5rem 1rem;
  background-color: #4a6baf;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
