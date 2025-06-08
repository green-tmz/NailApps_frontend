<template>
  <div>
    <PageBreadcrumb :pageTitle="currentPageTitle" />
    <div class="actions">
      <button
        v-if="hasAddClientPermission"
        @click="showAddClientModal = true"
        class="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto">
        Добавить клиента
      </button>
    </div>
  </div>

  <ClientsList :clients="clients" />
  <Modal v-if="showAddClientModal" @close="showAddClientModal = false">
    <template #body>
      <div class="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <!-- close btn -->
        <button @click="showAddClientModal = false" class="transition-color absolute right-5 top-5 z-999 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:bg-gray-700 dark:bg-white/[0.05] dark:text-gray-400 dark:hover:bg-white/[0.07] dark:hover:text-gray-300">
          <svg
            class="fill-current"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z"
              fill=""
            />
          </svg>
        </button>
        <div class="px-2 pr-14">
          <h4 class="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Добавить клиента
          </h4>
        </div>
        <form class="flex flex-col" @submit.prevent="handleSubmitClient">
          <div class="px-2 overflow-y-auto custom-scrollbar">
            <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <label for="first_name" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Имя<span class="text-error-500">*</span>
                </label>
                <input
                  type="text"
                  id="first_name"
                  v-model="formData.first_name"
                  required
                  placeholder="Введите имя"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>

              <div>
                <label for="last_name" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Фамилия
                </label>
                <input
                  type="text"
                  id="last_name"
                  v-model="formData.last_name"
                  placeholder="Введите фамилию"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>

              <div>
                <label for="second_name" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Отчество
                </label>
                <input
                  type="text"
                  id="second_name"
                  v-model="formData.second_name"
                  placeholder="Введите отчество"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>

              <div>
                <label for="phone" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Телефон<span class="text-error-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  id="phone"
                  v-model="formData.phone"
                  v-mask="'+7(###)###-##-##'"
                  placeholder="+7(___)___-__-__"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>

              <div>
                <label for="email" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  v-model="formData.email"
                  placeholder="Введите email"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>

              <div>
                <label for="birth_date" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Дата рождения
                </label>
                <flat-pickr
                  v-model="formData.birth_date"
                  :config="flatpickrConfig"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  placeholder="Выберите дату"
                />
              </div>
            </div>
            <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">
              <div>
                <label for="notes" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Примечания
                </label>
                <textarea
                  type="text"
                  id="notes"
                  v-model="formData.notes"
                  rows="30"
                  placeholder="Примечания"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            </div>
          </div>
          <div class="flex items-center gap-3 mt-6 lg:justify-end">
            <button
              @click="showAddClientModal = false"
              type="button"
              class="flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] sm:w-auto"
            >
              Закрыть
            </button>
            <button
              type="submit"
              class="flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useClientsStore } from '@/stores/clients'
import { useAuthStore } from '@/stores/auth'
import ClientsList from '@/components/clients/ClientsList.vue'
import Modal from '@/components/clients/ClientForm.vue'
import type { Client } from '@/types'
import PageBreadcrumb from '@/components/common/PageBreadcrumb.vue'
import flatPickr from 'vue-flatpickr-component'
import { useToast } from 'vue-toastification';

import 'flatpickr/dist/flatpickr.css'

const clientsStore = useClientsStore()
const authStore = useAuthStore()
const toast = useToast()
const clients = computed(() => clientsStore.clients)

const showAddClientModal = ref(false)
const currentPageTitle = ref('Клиенты')

const hasAddClientPermission = computed(() => {
  return authStore.user?.permissions?.includes("add client") ?? false
})

const flatpickrConfig = {
  dateFormat: 'd.m.Y',
  altInput: true,
  altFormat: 'd.m.Y',
  wrap: true,
}

const formData = ref<Client>({
  first_name: '',
  last_name: '',
  second_name: '',
  phone: '',
  birth_date: '',
  notes: '',
  // preferences: '',
  email: ''
})

onMounted(async () => {
  await clientsStore.fetchClients()
})

const handleSubmitClient = async () => {
  try {
    await clientsStore.createClient(formData.value)
    showAddClientModal.value = false
    formData.value = ""
    toast.success("Клиент успешно добавлен");
  } catch (e) {
    toast.error("Упс! Что-то пошло не так");
  }
}
</script>

<style scoped>
.actions {
  margin-bottom: 1rem;
  display: flex;
  justify-content: flex-end;
}
</style>
