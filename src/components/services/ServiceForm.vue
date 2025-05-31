<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-header">
        <h3>{{ service ? 'Редактировать' : 'Добавить' }} услугу</h3>
        <button @click="close" class="close-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="submit">
          <div class="form-grid">
            <div class="form-group">
              <label for="name">Название услуги*</label>
              <input
                type="text"
                id="name"
                v-model="formData.name"
                required
                placeholder="Введите название"
              />
            </div>

            <div class="form-group">
              <label for="specialization_id">Специализация*</label>
              <select
                id="specialization_id"
                v-model="formData.specialization_id"
                required
              >
                <option value="" disabled>Выберите специализацию</option>
                <option
                  v-for="spec in specializations"
                  :key="spec.id"
                  :value="spec.id"
                >
                  {{ spec.name }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label for="duration">Длительность (мин)*</label>
              <input
                type="number"
                id="duration"
                v-model="formData.duration"
                required
                min="1"
                placeholder="Введите длительность"
              />
            </div>

            <div class="form-group">
              <label for="price">Цена (₽)*</label>
              <input
                type="number"
                id="price"
                v-model="formData.price"
                required
                min="0"
                step="0.01"
                placeholder="Введите цену"
              />
            </div>
          </div>

          <div class="form-actions">
            <button type="button" @click="close" class="cancel-button">Отмена</button>
            <button type="submit" :disabled="isSubmitting" class="submit-button">
              {{ isSubmitting ? 'Сохранение...' : 'Сохранить' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useSpecializationsStore } from '@/stores/specializations'
import type { Service } from '@/types'

const specializationsStore = useSpecializationsStore()
const specializations = computed(() => specializationsStore.specializations)

const props = defineProps<{
  service?: Service | null
}>()

const emit = defineEmits(['submit', 'close'])

const formData = ref({
  name: '',
  specialization_id: '',
  duration: 30,
  price: 0,
  masterId: 1 // По умолчанию, можно сделать выбор мастера
})

const isSubmitting = ref(false)

onMounted(async () => {
  await specializationsStore.fetchSpecializations()
})

watch(() => props.service, (newService) => {
  if (newService) {
    formData.value = {
      name: newService.name,
      specialization_id: newService.specialization_id,
      duration: newService.duration,
      price: newService.price,
      masterId: newService.masterId || 1
    }
  } else {
    formData.value = {
      name: '',
      specialization_id: '',
      duration: 30,
      price: 0,
      masterId: 1
    }
  }
}, { immediate: true })

const submit = () => {
  isSubmitting.value = true
  emit('submit', formData.value)
  isSubmitting.value = false
}

const close = () => {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #eee;
  color: #4a6baf;
  font-weight: bold;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 0.25rem;
}

.close-button:hover {
  color: #333;
}

.modal-body {
  padding: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #4a6baf;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #4a6baf;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.cancel-button {
  padding: 0.75rem 1.25rem;
  background-color: #f5f7fa;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.cancel-button:hover {
  background-color: #e9ecef;
}

.submit-button {
  padding: 0.75rem 1.25rem;
  background-color: #4a6baf;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button:hover:not(:disabled) {
  background-color: #3a5a9f;
}

.submit-button:disabled {
  background-color: #a0a0a0;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .modal-content {
    max-width: 95%;
    margin: 0 1rem;
  }
}

@media (max-width: 576px) {
  .form-actions {
    flex-direction: column;
  }

  .cancel-button,
  .submit-button {
    width: 100%;
  }
}
</style>
