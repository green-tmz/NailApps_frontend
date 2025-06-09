<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
    <div class="max-w-full overflow-x-auto custom-scrollbar">
      <table class="min-w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
          <th class="px-5 py-3 text-left w-3/11 sm:px-6">
            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Название</p>
          </th>
          <th class="px-5 py-3 text-left w-2/11 sm:px-6">
            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Специализация</p>
          </th>
          <th class="px-5 py-3 text-left w-2/11 sm:px-6">
            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Длительность (мин)</p>
          </th>
          <th class="px-5 py-3 text-left w-2/11 sm:px-6">
            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Цена (₽)</p>
          </th>
          <th class="px-5 py-3 text-left w-2/11 sm:px-6">
            <p class="font-medium text-gray-500 text-theme-xs dark:text-gray-400">Действия</p>
          </th>
        </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          <template v-if="services.length > 0">
            <tr v-for="service in services" :key="service.id" class="border-t border-gray-100 dark:border-gray-800">
              <td class="px-5 py-4 sm:px-6">
                <div class="flex items-center gap-3">
                  <div>
                    <span class="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {{ service.name }}
                    </span>
                  </div>
                </div>
              </td>
              <td class="px-5 py-4 sm:px-6">
                <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ service.specialization.name }}</p>
              </td>
              <td class="px-5 py-4 sm:px-6">
                <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ service.duration }}</p>
              </td>
              <td class="px-5 py-4 sm:px-6">
                <p class="text-gray-500 text-theme-sm dark:text-gray-400">{{ service.price }}</p>
              </td>
              <td class="px-5 py-4 sm:px-6">
                <button
                  v-if="hasEditServicePermission"
                  @click="$emit('edit', service)"
                  class="icon-button edit">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 30 30" fill="none" stroke="#4a6baf" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
                <button
                  v-if="hasDeleteServicePermission"
                  @click="$emit('delete', service.id)"
                  class="icon-button delete">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 30 30" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                </button>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr class="border-t border-gray-100 dark:border-gray-800">
              <td class="px-5 py-4 sm:px-6" colspan="4">
                <p class="text-gray-500 text-theme-sm dark:text-gray-400" style="text-align: center">Услуги не найдены</p>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Service } from '@/types'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'

defineProps<{
  services: Service[]
}>()

defineEmits(['edit', 'delete'])

const authStore = useAuthStore()

const hasEditServicePermission = computed(() => {
  return authStore.user?.permissions?.includes("edit service") ?? false
})

const hasDeleteServicePermission = computed(() => {
  return authStore.user?.permissions?.includes("delete service") ?? false
})
</script>
