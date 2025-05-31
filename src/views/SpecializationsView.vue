<template>
  <div class="specializations-view">
    <div class="actions">
      <button @click="showAddModal = true">Добавить специализацию</button>
    </div>

    <SpecializationsList
      :specializations="specializations"
      @edit="handleEditSpecialization"
      @delete="handleDeleteSpecialization"
    />

    <SpecializationForm
      v-if="showAddModal || editingSpecialization"
      :specialization="editingSpecialization"
      @submit="handleSubmitSpecialization"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useSpecializationsStore } from '@/stores/specializations'
import SpecializationsList from '@/components/specializations/SpecializationsList.vue'
import SpecializationForm from '@/components/specializations/SpecializationForm.vue'
import type { Specialization } from '@/types'

const specializationsStore = useSpecializationsStore()
const specializations = computed(() => specializationsStore.specializations)

const showAddModal = ref(false)
const editingSpecialization = ref<Specialization | null>(null)

onMounted(async () => {
  await specializationsStore.fetchSpecializations()
})

const handleEditSpecialization = (spec: Specialization) => {
  editingSpecialization.value = { ...spec }
}

const handleDeleteSpecialization = async (id: number) => {
  if (confirm('Вы уверены, что хотите удалить эту специализацию?')) {
    await specializationsStore.removeSpecialization(id)
  }
}

const handleSubmitSpecialization = async (specData: any) => {
  if (editingSpecialization.value) {
    await specializationsStore.updateSpecialization(editingSpecialization.value.id, specData)
  } else {
    await specializationsStore.createSpecialization(specData)
  }
  closeModal()
}

const closeModal = () => {
  showAddModal.value = false
  editingSpecialization.value = null
}
</script>

<style scoped>
.specializations-view {
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
