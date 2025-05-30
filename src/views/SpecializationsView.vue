<template>
  <div class="specializations-view">
    <div class="view-header">
      <h2>Специализации</h2>
      <button class="add-button" @click="openCreateModal">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        Добавить специализацию
      </button>
    </div>

    <div class="content-container">
      <div v-if="isLoading" class="loading-indicator">
        <div class="spinner"></div>
      </div>

      <div v-else-if="error" class="error-message">
        {{ error }}
        <button @click="fetchSpecializations" class="retry-button">Повторить попытку</button>
      </div>

      <div v-else-if="specializations.length === 0" class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <p>Нет добавленных специализаций</p>
        <button @click="openCreateModal" class="add-button">Добавить первую специализацию</button>
      </div>

      <div v-else class="specializations-list">
        <div class="list-header">
          <div class="header-item">Название</div>
          <div class="header-item actions">Действия</div>
        </div>

        <div v-for="spec in specializations" :key="spec.id" class="specialization-item">
          <div class="spec-name">{{ spec.name }}</div>
          <div class="spec-actions">
            <button @click="openEditModal(spec)" class="icon-button edit">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <button @click="confirmDelete(spec.id)" class="icon-button delete">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно создания/редактирования -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>{{ editingSpecialization ? 'Редактировать' : 'Добавить' }} специализацию</h3>
          <button @click="closeModal" class="close-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="name">Название специализации</label>
              <input
                type="text"
                id="name"
                v-model="formData.name"
                required
                placeholder="Введите название"
              />
            </div>
            <div class="form-actions">
              <button type="button" @click="closeModal" class="cancel-button">Отмена</button>
              <button type="submit" :disabled="isSubmitting" class="submit-button">
                {{ isSubmitting ? 'Сохранение...' : 'Сохранить' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Модальное окно подтверждения удаления -->
    <div v-if="showDeleteConfirm" class="modal-overlay" @click.self="cancelDelete">
      <div class="modal-content confirm-modal">
        <div class="modal-header">
          <h3>Подтверждение удаления</h3>
        </div>
        <div class="modal-body">
          <p>Вы уверены, что хотите удалить эту специализацию?</p>
          <div class="form-actions">
            <button @click="cancelDelete" class="cancel-button">Отмена</button>
            <button @click="confirmDeleteAction" :disabled="isDeleting" class="delete-button">
              {{ isDeleting ? 'Удаление...' : 'Удалить' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useSpecializationsStore } from '@/stores/specializations'
import type { Specialization } from '@/types'

const specializationsStore = useSpecializationsStore()

// Состояния для управления UI
const isLoading = ref(true)
const error = ref<string | null>(null)
const showModal = ref(false)
const showDeleteConfirm = ref(false)
const isSubmitting = ref(false)
const isDeleting = ref(false)

// Данные формы
const formData = ref({
  name: ''
})
const editingSpecialization = ref<Specialization | null>(null)
const specializationToDelete = ref<number | null>(null)

// Получаем специализации из хранилища
const specializations = computed(() => specializationsStore.specializations)

// Загрузка данных
const fetchSpecializations = async () => {
  try {
    isLoading.value = true
    error.value = null
    await specializationsStore.fetchSpecializations()
  } catch (err) {
    error.value = 'Не удалось загрузить специализации. Пожалуйста, попробуйте позже.'
    console.error('Ошибка при загрузке специализаций:', err)
  } finally {
    isLoading.value = false
  }
}

// Управление модальными окнами
const openCreateModal = () => {
  formData.value = { name: '' }
  editingSpecialization.value = null
  showModal.value = true
}

const openEditModal = (spec: Specialization) => {
  formData.value = { name: spec.name }
  editingSpecialization.value = spec
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

// Обработка формы
const handleSubmit = async () => {
  try {
    isSubmitting.value = true
    if (editingSpecialization.value) {
      await specializationsStore.updateSpecialization(editingSpecialization.value.id, formData.value)
    } else {
      await specializationsStore.createSpecialization(formData.value)
    }
    closeModal()
  } catch (err) {
    error.value = 'Произошла ошибка при сохранении. Пожалуйста, попробуйте снова.'
    console.error('Ошибка при сохранении специализации:', err)
  } finally {
    isSubmitting.value = false
  }
}

// Удаление специализации
const confirmDelete = (id: number) => {
  specializationToDelete.value = id
  showDeleteConfirm.value = true
}

const cancelDelete = () => {
  specializationToDelete.value = null
  showDeleteConfirm.value = false
}

const confirmDeleteAction = async () => {
  if (!specializationToDelete.value) return

  try {
    isDeleting.value = true
    await specializationsStore.removeSpecialization(specializationToDelete.value)
    showDeleteConfirm.value = false
  } catch (err) {
    error.value = 'Не удалось удалить специализацию. Пожалуйста, попробуйте позже.'
    console.error('Ошибка при удалении специализации:', err)
  } finally {
    isDeleting.value = false
  }
}

// Инициализация
onMounted(() => {
  fetchSpecializations()
})
</script>

<style scoped>
.specializations-view {
  padding: 1.5rem;
  height: 100%;
}

.view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.view-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.add-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #4a6baf;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-button:hover {
  background-color: #3a5a9f;
}

.content-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  min-height: 300px;
}

.loading-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #4a6baf;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-message {
  color: #e74c3c;
  text-align: center;
  padding: 2rem;
}

.retry-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #f5f7fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: #666;
  text-align: center;
}

.empty-state svg {
  margin-bottom: 1rem;
  color: #ccc;
}

.specializations-list {
  border: 1px solid #eee;
  border-radius: 6px;
  overflow: hidden;
}

.list-header {
  display: flex;
  background-color: #f5f7fa;
  padding: 0.75rem 1rem;
  font-weight: 500;
  border-bottom: 1px solid #eee;
}

.header-item {
  flex: 1;
}

.header-item.actions {
  flex: 0 0 100px;
  text-align: right;
}

.specialization-item {
  display: flex;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
}

.specialization-item:hover {
  background-color: #f9f9f9;
}

.spec-name {
  flex: 1;
  display: flex;
  align-items: center;
  color: #4a6baf;
}

.spec-actions {
  flex: 0 0 100px;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-button.edit {
  color: #4a6baf;
}

.icon-button.edit:hover {
  background-color: rgba(74, 107, 175, 0.1);
}

.icon-button.delete {
  color: #e74c3c;
}

.icon-button.delete:hover {
  background-color: rgba(231, 76, 60, 0.1);
}

/* Модальные окна */
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
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.confirm-modal {
  max-width: 400px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #eee;
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

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.form-group input:focus {
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

.delete-button {
  padding: 0.75rem 1.25rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.delete-button:hover:not(:disabled) {
  background-color: #c0392b;
}

.delete-button:disabled {
  background-color: #a0a0a0;
  cursor: not-allowed;
}
</style>
