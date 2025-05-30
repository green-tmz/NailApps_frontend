// stores/notification.ts
import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    isOpen: false,
    notifications: [] as Notification[], // Замените на ваш тип уведомлений
    unreadCount: 0
  }),
  actions: {
    toggle() {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.markAllAsRead()
      }
    },
    markAllAsRead() {
      this.unreadCount = 0
      // Дополнительная логика пометки как прочитанных
    },
    fetchNotifications() {
      // Логика загрузки уведомлений
    }
  }
})
