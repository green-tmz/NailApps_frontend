import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/DefaultLayout.vue'),
      redirect: '/dashboard',
      meta: { requiresAuth: true },
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
          meta: {
            requiredRoles: ['master', 'admin'],
            requiredPermission: 'view dashboard'
          }
        },
        {
          path: '/calendar',
          name: 'Calendar',
          component: () => import('@/views/CalendarView.vue'),
          meta: {
            requiredRoles: ['master', 'admin'],
            requiredPermission: 'view calendar'
          }
        },
        {
          path: '/specializations',
          name: 'specializations',
          component: () => import('@/views/SpecializationsView.vue'),
          meta: {
            requiredRoles: ['master', 'admin'],
            requiredPermission: 'view specializations'
          }
        },
        {
          path: '/clients',
          name: 'clients',
          component: () => import('@/views/ClientsView.vue'),
          meta: {
            requiredRoles: ['master', 'admin'],
            requiredPermission: 'view clients'
          }
        },
        {
          path: '/services',
          name: 'services',
          component: () => import('@/views/ServicesView.vue'),
          meta: {
            requiredRoles: ['master', 'admin'],
            requiredPermission: 'view services'
          }
        },
        {
          path: '/forbidden',
          name: 'forbidden',
          component: () => import('@/views/ForbiddenView.vue'),
        }
      ]
    },
    {
      path: '/',
      component: () => import('@/layouts/AuthLayout.vue'),
      redirect: '/login',
      meta: { requiresGuest: true },
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('@/components/auth/LoginForm.vue'),
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('@/components/auth/RegisterForm.vue'),
        },
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    }
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
  ]
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login' }
  }

  if (to.meta.requiredRoles) {
    await authStore.fetchUser()
    const user = JSON.parse(localStorage.getItem("na_user") || "{}");
    if (!user || !to.meta.requiredRoles.includes(user.role)) {
      return { name: 'forbidden' };
    }
  }

  if (to.meta.requiredPermission) {
    await authStore.fetchUser();
    const user = JSON.parse(localStorage.getItem("na_user") || "{}");
    if (!user?.permissions?.includes(to.meta.requiredPermission)) {
      return { name: 'forbidden' };
    }
  }

  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return { name: 'dashboard' }
  }
})

export default router
