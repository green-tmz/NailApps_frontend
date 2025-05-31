<template>
  <div class="specializations-list">
    <div v-if="specializations.length === 0" class="empty-state">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <p>Нет добавленных специализаций</p>
    </div>

    <div v-else class="list-container">
      <div class="list-header">
        <div class="header-item name">Название</div>
        <div class="header-item actions">Действия</div>
      </div>

      <div v-for="spec in specializations" :key="spec.id" class="specialization-item">
        <div class="spec-name">{{ spec.name }}</div>
        <div class="spec-actions">
          <button @click="$emit('edit', spec)" class="icon-button edit">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button @click="$emit('delete', spec.id)" class="icon-button delete">
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
</template>

<script setup lang="ts">
import type { Specialization } from '@/types'

defineProps<{
  specializations: Specialization[]
}>()

defineEmits(['edit', 'delete'])
</script>

<style scoped>
.specializations-list {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
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

.list-container {
  border: 1px solid #eee;
  border-radius: 6px;
  overflow: hidden;
}

.list-header {
  display: grid;
  grid-template-columns: 1fr auto;
  background-color: #f5f7fa;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #eee;
  color: #4a6baf;
  font-weight: bold;
}

.header-item {
  padding: 0.5rem;
}

.specialization-item {
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
}

.specialization-item:hover {
  background-color: #f9f9f9;
}

.spec-name {
  padding: 0.5rem;
  display: flex;
  align-items: center;
  color: #4a6baf;
}

.spec-actions {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
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
</style>
