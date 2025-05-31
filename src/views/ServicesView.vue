<template>
  <div class="services-view">
    <div class="actions">
      <button @click="showAddServiceModal = true">Добавить услугу</button>
    </div>

    <ServicesList
      :services="services"
      @edit="handleEditService"
      @delete="handleDeleteService"
    />

    <ServiceForm
      v-if="showAddServiceModal || editingService"
      :service="editingService"
      @submit="handleSubmitService"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useServicesStore } from '@/stores/services'
import ServicesList from '@/components/services/ServicesList.vue'
import ServiceForm from '@/components/services/ServiceForm.vue'
import type { Service } from '@/types'

const servicesStore = useServicesStore()
const services = computed(() => servicesStore.services)

const showAddServiceModal = ref(false)
const editingService = ref<Service | null>(null)

onMounted(async () => {
  await servicesStore.fetchServices()
})

const handleEditService = (service: Service) => {
  editingService.value = { ...service }
}

const handleDeleteService = async (id: number) => {
  if (confirm('Вы уверены, что хотите удалить эту услугу?')) {
    await servicesStore.removeService(id)
  }
}

const handleSubmitService = async (serviceData: any) => {
  if (editingService.value) {
    await servicesStore.updateService(editingService.value.id, serviceData)
  } else {
    await servicesStore.createService(serviceData)
  }
  closeModal()
}

const closeModal = () => {
  showAddServiceModal.value = false
  editingService.value = null
}
</script>

<style scoped>
.services-view {
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
  transition: background-color 0.2s;
}

button:hover {
  background-color: #3a5a9f;
}
</style>
