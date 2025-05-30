<template>
  <aside class="app-sidebar" :class="{
    'collapsed': isCollapsed,
    'mobile-hidden': !isSidebarVisible
  }">
    <div class="sidebar-content">
      <nav class="sidebar-nav">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          active-class="active"
        >
          <div class="nav-icon">
            <component :is="item.icon" />
          </div>
          <span class="nav-text">{{ item.text }}</span>
        </router-link>
      </nav>

      <div class="user-info">
        <div class="user-avatar">{{ userInitials }}</div>
        <div class="user-details">
          <div class="user-name">{{ userName }}</div>
          <div class="user-email">{{ userEmail }}</div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useSidebarStore } from '@/stores/sidebar'
import { useRoute } from 'vue-router'
import {
  HomeIcon,
  UsersIcon,
  CalendarIcon,
  ServicesIcon,
  SpecializationsIcon,
  DollarSignIcon,
  SettingsIcon
} from '@/components/icons'

const authStore = useAuthStore()
const sidebarStore = useSidebarStore()
const route = useRoute()

// Состояние sidebar
const isCollapsed = computed(() => sidebarStore.isCollapsed)
const isSidebarVisible = computed(() => !sidebarStore.isMobileHidden)
const isMobile = ref(false)

// Навигационные пункты
const navItems = [
  { path: '/', text: 'Главная', icon: HomeIcon },
  { path: '/clients', text: 'Клиенты', icon: UsersIcon },
  { path: '/schedule', text: 'Расписание', icon: CalendarIcon },
  { path: '/services', text: 'Услуги', icon: ServicesIcon },
  { path: '/specializations', text: 'Специализации', icon: SpecializationsIcon },
  { path: '/finance', text: 'Финансы', icon: DollarSignIcon },
  { path: '/settings', text: 'Настройки', icon: SettingsIcon }
]

// Данные пользователя
const userName = computed(() => authStore.user?.first_name || 'Пользователь')
const userEmail = computed(() => authStore.user?.email || '')
const userInitials = computed(() => {
  const user = authStore.user
  if (!user) return '??'
  return `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase()
})

// Проверка размера экрана
const checkScreenSize = () => {
  const isMobile = window.innerWidth < 768
  sidebarStore.setMobileView(isMobile)
}

// Обработчик изменения маршрута (скрываем sidebar на мобильных)
watch(() => route.path, () => {
  if (isMobile.value) {
    isSidebarVisible.value = false
  }
})

// Инициализация
onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize)
})

// Метод для переключения видимости (будет вызываться из AppHeader)
const toggleSidebar = () => {
  if (isMobile.value) {
    isSidebarVisible.value = !isSidebarVisible.value
  } else {
    isCollapsed.value = !isCollapsed.value
  }
}

// Экспортируем метод для использования в AppHeader
defineExpose({ toggleSidebar })
</script>

<style scoped>
.app-sidebar {
  transition: transform 0.3s ease, width 0.3s ease;
  /* остальные стили */
}

.app-sidebar.collapsed {
  width: 70px;
}

.app-sidebar.mobile-hidden {
  transform: translateX(-100%);
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem 0;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: rgb(74 107 175);
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s;
  border: 1px solid #4a6baf;
}

.nav-item:hover {
  background-color: #4a6baf;
  color: white;
}

.nav-item.active {
  background-color: #4a6baf;
  color: white;
}

.nav-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-text {
  margin-left: 0.75rem;
  white-space: nowrap;
}

.collapsed .nav-text {
  display: none;
}

.user-info {
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #4a6baf;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.user-details {
  margin-left: 0.75rem;
  overflow: hidden;
}

.user-name {
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #4a6baf;
}

.user-email {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #4a6baf;
}

.collapsed .user-details {
  display: none;
}

@media (min-width: 768px) {
  .app-sidebar.mobile-hidden {
    transform: translateX(0);
  }
}
</style>
