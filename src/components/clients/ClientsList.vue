<template>
  <div class="clients-list">
    <div v-if="clients.length == 0" class="empty-state">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
      <p>Нет добавленных клиентов</p>
    </div>

    <div v-else class="list-container">
      <div class="list-header">
        <div class="header-item name">Имя</div>
        <div class="header-item phone">Телефон</div>
        <div class="header-item email">Email</div>
        <div class="header-item actions">Действия</div>
      </div>

      <div v-for="client in clients" :key="client.id" class="client-item">
        <div class="client-name">{{ client.first_name }} {{ client.last_name }}</div>
        <div class="client-phone">{{ formatPhone(client.phone) }}</div>
        <div class="client-email">{{ client.email }}</div>
        <div class="client-actions">
          <button @click="$emit('edit', client)" class="icon-button edit">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button @click="$emit('delete', client.id)" class="icon-button delete">
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
import type { Client } from '@/types'

defineProps<{
  clients: Client[]
}>()

defineEmits(['edit', 'delete'])

const formatPhone = (phone: string) => {
  if (!phone) return ''
  // Простое форматирование телефона
  return phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5')
}
</script>

<style scoped>
.clients-list {
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
  grid-template-columns: 2fr 2fr 2fr 1fr;
  background-color: #f5f7fa;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #eee;
  color: #4a6baf;
  font-weight: bold;
}

.header-item {
  padding: 0.5rem;
}

.client-item {
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 1fr;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
  color: #4a6baf;
}

.client-item:hover {
  background-color: #f9f9f9;
}

.client-name,
.client-phone,
.client-email {
  padding: 0.5rem;
  display: flex;
  align-items: center;
}

.client-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
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

@media (max-width: 768px) {
  .list-header {
    grid-template-columns: 1fr 1fr;
  }

  .client-item {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "name phone"
      "email actions";
    gap: 0.5rem;
  }

  .client-name {
    grid-area: name;
  }

  .client-phone {
    grid-area: phone;
  }

  .client-email {
    grid-area: email;
  }

  .client-actions {
    grid-area: actions;
    justify-content: flex-start;
  }
}
</style>
