<template>
  <div class="app-layout" :class="{ 'auth-layout': isAuthRoute }">
    <AppHeader v-if="!isAuthRoute" />

    <div class="main-content">
      <AppSidebar v-if="!isAuthRoute && isAuthenticated" />

      <div class="content-wrapper">
        <RouterView v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </div>

    <NotificationContainer />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AppHeader from '@/components/common/AppHeader.vue'
import AppSidebar from '@/components/common/AppSidebar.vue'
import NotificationContainer from '@/components/common/Notification.vue'

const route = useRoute()
const authStore = useAuthStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)
const isAuthRoute = computed(() => ['login', 'register'].includes(route.name as string))

onMounted(async () => {
  if (authStore.token) {
    await authStore.fetchUser()
  }
})
</script>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background-color: #f5f7fa;
}

.auth-layout {
  background-color: #e9ecef;
}

.main-content {
  display: flex;
  flex: 1;
  min-height: calc(100vh - var(--header-height, 60px)); /* Учитываем высоту хедера */
}

.content-wrapper {
  flex: 1;
  overflow-y: auto;
  background-color: white;
  margin: 0; /* Убираем отступы */
  border-radius: 0; /* Убираем скругления */
  box-shadow: none; /* Убираем тень */
}

/* Анимации переходов между страницами */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }

  .content-wrapper {
    padding: 1rem;
  }
}
</style>
