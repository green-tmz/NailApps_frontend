import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/layouts/DefaultLayout.vue'),
      redirect: '/dashboard',
      meta: { requiresAuth: true },
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
        },
        {
          path: '/specializations',
          name: 'specializations',
          component: () => import('@/views/SpecializationsView.vue'),
        },
        {
          path: '/clients',
          name: 'clients',
          component: () => import('@/views/ClientsView.vue'),
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/AuthView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/AuthView.vue'),
      meta: { requiresGuest: true }
    },
    // {
    //   path: '/masters',
    //   name: 'masters',
    //   component: () => import('@/views/MastersView.vue'),
    //   meta: { requiresAuth: true }
    // },
    // {
    //   path: '/services',
    //   name: 'services',
    //   component: () => import('@/views/ServicesView.vue'),
    //   meta: { requiresAuth: true }
    // },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login' }
  }

  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return { name: 'dashboard' }
  }
})

export default router
