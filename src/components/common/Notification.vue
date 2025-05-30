<template>
  <div class="notification-container" v-if="isOpen">
    <div class="notification-header">
      <h3>Уведомления</h3>
      <button @click="close" class="close-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>

    <div class="notification-list">
      <div v-for="notification in notifications" :key="notification.id" class="notification-item">
        <div class="notification-content">
          {{ notification.message }}
        </div>
        <div class="notification-time">
          {{ formatTime(notification.time) }}
        </div>
      </div>

      <div v-if="notifications.length === 0" class="empty-state">
        Нет новых уведомлений
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNotificationStore } from '@/stores/notification'

const notificationStore = useNotificationStore()

const isOpen = computed(() => notificationStore.isOpen)
const notifications = computed(() => notificationStore.notifications)

const close = () => {
  notificationStore.toggle()
}

const formatTime = (date: Date) => {
  // Форматирование времени уведомления
  return date.toLocaleTimeString()
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 70px;
  right: 20px;
  width: 350px;
  max-height: 500px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.notification-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 0.25rem;
}

.notification-list {
  overflow-y: auto;
  flex: 1;
}

.notification-item {
  padding: 1rem;
  border-bottom: 1px solid #f5f5f5;
  transition: background-color 0.2s;
}

.notification-item:hover {
  background-color: #f9f9f9;
}

.notification-content {
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.notification-time {
  font-size: 0.75rem;
  color: #666;
}

.empty-state {
  padding: 2rem 1rem;
  text-align: center;
  color: #666;
}
</style>
