<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <div class="modal-header">
        <h3>{{ client ? 'Редактировать' : 'Добавить' }} клиента</h3>
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
            <!-- Первая колонка -->
            <div class="form-column">
              <div class="form-group">
                <label for="first_name">Имя*</label>
                <input
                  type="text"
                  id="first_name"
                  v-model="formData.first_name"
                  required
                  placeholder="Введите имя"
                />
              </div>

              <div class="form-group">
                <label for="last_name">Фамилия</label>
                <input
                  type="text"
                  id="last_name"
                  v-model="formData.last_name"
                  placeholder="Введите фамилию"
                />
              </div>

              <div class="form-group">
                <label for="second_name">Отчество</label>
                <input
                  type="text"
                  id="second_name"
                  v-model="formData.second_name"
                  placeholder="Введите отчество"
                />
              </div>
            </div>

            <!-- Вторая колонка -->
            <div class="form-column">
              <div class="form-group">
                <label for="phone">Телефон</label>
                <input
                  type="tel"
                  id="phone"
                  v-model="formData.phone"
                  placeholder="+7 (XXX) XXX-XX-XX"
                />
              </div>

              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  v-model="formData.email"
                  placeholder="example@mail.com"
                />
              </div>

              <div class="form-group">
                <label for="birth_date">Дата рождения</label>
                <input
                  type="date"
                  id="birth_date"
                  v-model="formData.birth_date"
                />
              </div>
            </div>
          </div>

          <!-- Полноширинные поля -->
          <div class="form-group full-width">
            <label for="notes">Примечания</label>
            <textarea
              id="notes"
              v-model="formData.notes"
              placeholder="Дополнительная информация"
              rows="3"
            ></textarea>
          </div>

<!--          <div class="form-group full-width">-->
<!--            <label for="preferences">Предпочтения</label>-->
<!--            <textarea-->
<!--              id="preferences"-->
<!--              v-model="formData.preferences"-->
<!--              placeholder="Предпочтения клиента"-->
<!--              rows="3"-->
<!--            ></textarea>-->
<!--          </div>-->

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
import { ref, watch } from 'vue'
import type { Client } from '@/types'

const props = defineProps<{
  client?: Client | null
}>()

const emit = defineEmits(['submit', 'close'])

const formData = ref({
  first_name: '',
  last_name: '',
  second_name: '',
  phone: '',
  birth_date: '',
  notes: '',
  // preferences: '',
  email: ''
})

const isSubmitting = ref(false)

// Заполняем форму при изменении props.client
watch(() => props.client, (newClient) => {
  if (newClient) {
    formData.value = {
      first_name: newClient.first_name,
      last_name: newClient.last_name || '',
      second_name: newClient.second_name || '',
      birth_date: newClient.birth_date || '',
      notes: newClient.notes || '',
      // preferences: newClient.preferences || '',
      phone: newClient.phone || '',
      email: newClient.email || ''
    }
  } else {
    formData.value = {
      first_name: '',
      last_name: '',
      second_name: '',
      phone: '',
      birth_date: '',
      notes: '',
      // preferences: '',
      email: ''
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
  max-width: 800px;
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
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  margin-bottom: 0;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #4a6baf;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4a6baf;
}

.form-group.full-width {
  width: 100%;
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
    flex-direction: column;
    gap: 1rem;
  }

  .modal-content {
    max-width: 95%;
    margin: 0 1rem;
  }
}

@media (max-width: 576px) {
  .modal-content {
    max-height: calc(100vh - 2rem);
  }

  .form-actions {
    flex-direction: column;
  }

  .cancel-button,
  .submit-button {
    width: 100%;
  }
}
</style>
