<template>
  <div class="space-y-5 sm:space-y-6">
    <ComponentCard title="Клиенты">
      <BasicTableOne :services="services" @edit="handleEditService" @delete="handleDeleteService" />
    </ComponentCard>
  </div>

  <Modal v-if="showEditServiceModal" @close="showEditServiceModal = false">
    <template #body>
      <div class="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <!-- close btn -->
        <button @click="showEditServiceModal = false" class="transition-color absolute right-5 top-5 z-999 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 dark:bg-gray-700 dark:bg-white/[0.05] dark:text-gray-400 dark:hover:bg-white/[0.07] dark:hover:text-gray-300">
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
            Редактировать услугу
          </h4>
        </div>
        <form class="flex flex-col" @submit.prevent="handleSubmitService">
          <div class="px-2 overflow-y-auto custom-scrollbar">
            <div class="grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <label for="first_name" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Название услуги<span class="text-error-500">*</span>
                </label>
                <input
                  type="text"
                  id="first_name"
                  v-model="formData.name"
                  required
                  placeholder="Введите название"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>

              <div>
                <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Специализация<span class="text-error-500">*</span>
                </label>
                <div class="relative z-20 bg-transparent">
                  <select
                    v-model="formData.specialization_id"
                    class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    :class="{ 'text-gray-800 dark:text-white/90': formData.specialization_id }"
                  >
                    <option v-for="spec in specializations"
                            :key="spec.id"
                            :value="spec.id"
                            class="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
                      {{ spec.name }}
                    </option>
                  </select>
                  <span
                    class="absolute z-30 text-gray-700 -translate-y-1/2 pointer-events-none right-4 top-1/2 dark:text-gray-400"
                  >
                    <svg
                      class="stroke-current"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
                        stroke=""
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <label for="duration" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Длительность (мин)<span class="text-error-500">*</span>
                </label>
                <input
                  type="number"
                  id="duration"
                  step="10"
                  min="0"
                  required
                  v-model="formData.duration"
                  placeholder="Введите длительность"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>

              <div>
                <label for="price" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Цена (₽)<span class="text-error-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  id="price"
                  @input="formatPrice"
                  step="0.01"
                  min="0"
                  v-model="formData.price"
                  placeholder="Введите цену"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            </div>
            <div class="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">
              <div>
                <label for="description" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Описание
                </label>
                <textarea
                  type="text"
                  id="description"
                  v-model="formData.description"
                  placeholder="Дополнительное описание услуги"
                  rows="30"
                  class="dark:bg-dark-900 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            </div>
          </div>
          <div class="flex items-center gap-3 mt-6 lg:justify-end">
            <button
              @click="showEditServiceModal = false"
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
import { ref } from 'vue'
import type { Service, Specialization } from '@/types'
import ComponentCard from "@/components/common/ComponentCard.vue";
import BasicTableOne from "./Table.vue";
import { useServicesStore } from '@/stores/services'
import Swal from 'sweetalert2';
import { useToast } from 'vue-toastification'
import Modal from '@/components/services/ServiceForm.vue'

const toast = useToast()

defineProps<{
  services: Service[]
  specializations: Specialization[]
}>()

const formData = ref<Service>({
  name: '',
  specialization_id: 0,
  master_id: 0,
  duration: 0,
  price: 0,
  description: ''
})

const showEditServiceModal = ref(false)

const servicesStore = useServicesStore()

const formatPrice = (e) => {
  let value = e.target.value;
  if (value.includes('.')) {
    e.target.value = value.substring(0, value.indexOf('.') + 3);
  }
  formData.value.price = parseFloat(e.target.value) || 0;
}

const handleEditService = (service: any) => {
  formData.value = {
    ...service,
    specialization_id: service.specialization.id
  }
  showEditServiceModal.value = true
}

const handleSubmitService = async () => {
  try {
    await servicesStore.updateService(formData.value.id, formData.value)
    formData.value = ""
    showEditServiceModal.value = false
    toast.success("Услуга успешно обновлена");
  } catch (e) {
    toast.error("Упс! Что-то пошло не так");
  }
}

const handleDeleteService = (id: number) => {
  Swal.fire({
    title: 'Удаление услуги',
    text: "Вы уверены, что хотите удалить эту услугу?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Да'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await servicesStore.removeService(id)
        toast.success("Услуга успешно удалена");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        toast.error("Упс! Что-то пошло не так");
      }
    }
  });
}
</script>
