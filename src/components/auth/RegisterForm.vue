<template>
  <div class="flex flex-col flex-1 w-full lg:w-1/2">
    <!-- Form -->
    <div class="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
      <div class="mb-5 sm:mb-8">
        <h1 class="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
          Регистрация
        </h1>
      </div>
      <div>
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
          <button class="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.7511 10.1944C18.7511 9.47495 18.6915 8.94995 18.5626 8.40552H10.1797V11.6527H15.1003C15.0011 12.4597 14.4654 13.675 13.2749 14.4916L13.2582 14.6003L15.9087 16.6126L16.0924 16.6305C17.7788 15.1041 18.7511 12.8583 18.7511 10.1944Z" fill="#4285F4"/>
              <path d="M10.1788 18.75C12.5895 18.75 14.6133 17.9722 16.0915 16.6305L13.274 14.4916C12.5201 15.0068 11.5081 15.3666 10.1788 15.3666C7.81773 15.3666 5.81379 13.8402 5.09944 11.7305L4.99473 11.7392L2.23868 13.8295L2.20264 13.9277C3.67087 16.786 6.68674 18.75 10.1788 18.75Z" fill="#34A853" />
              <path d="M5.10014 11.7305C4.91165 11.186 4.80257 10.6027 4.80257 9.99992C4.80257 9.3971 4.91165 8.81379 5.09022 8.26935L5.08523 8.1534L2.29464 6.02954L2.20333 6.0721C1.5982 7.25823 1.25098 8.5902 1.25098 9.99992C1.25098 11.4096 1.5982 12.7415 2.20333 13.9277L5.10014 11.7305Z" fill="#FBBC05" />
              <path d="M10.1789 4.63331C11.8554 4.63331 12.9864 5.34303 13.6312 5.93612L16.1511 3.525C14.6035 2.11528 12.5895 1.25 10.1789 1.25C6.68676 1.25 3.67088 3.21387 2.20264 6.07218L5.08953 8.26943C5.81381 6.15972 7.81776 4.63331 10.1789 4.63331Z" fill="#EB4335" />
            </svg>
            Войти через Google
          </button>
        </div>
        <div class="relative py-3 sm:py-5">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200 dark:border-gray-800"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">Или</span>
          </div>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="space-y-5">
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <!-- First Name -->
              <div class="sm:col-span-1">
                <label for="fname" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Имя<span class="text-error-500">*</span>
                </label>
                <input
                  v-model="formData.first_name"
                  type="text"
                  id="fname"
                  name="fname"
                  placeholder="Введите имя"
                  required
                  class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
              <!-- Last Name -->
              <div class="sm:col-span-1">
                <label for="lname" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Фамилия<span class="text-error-500">*</span>
                </label>
                <input
                  v-model="formData.last_name"
                  type="text"
                  id="lname"
                  name="lname"
                  required
                  placeholder="Введите фамилию"
                  class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            </div>
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <!-- Email -->
              <div>
                <label for="email" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Email
                </label>
                <input
                  v-model="formData.email"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Введите email"
                  class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
              <!-- Phone -->
              <div>
                <label for="phone" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Телефон<span class="text-error-500">*</span>
                </label>
                <input
                  v-model="formData.phone"
                  type="tel"
                  id="phone"
                  name="email"
                  required
                  v-mask="'+7(###)###-##-##'"
                  placeholder="+7(___)___-__-__"
                  class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                />
              </div>
            </div>
            <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <!-- Password -->
              <div>
                <label for="password" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Пароль<span class="text-error-500">*</span>
                </label>
                <div class="relative">
                  <input
                    v-model="formData.password"
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    placeholder="Не менее 6 символов"
                    minlength="6"
                    required
                    class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                  <span @click="togglePasswordVisibility" class="absolute z-30 text-gray-500 -translate-y-1/2 cursor-pointer right-4 top-1/2 dark:text-gray-400">
                  <svg
                    v-if="!showPassword"
                    class="fill-current"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.0002 13.8619C7.23361 13.8619 4.86803 12.1372 3.92328 9.70241C4.86804 7.26761 7.23361 5.54297 10.0002 5.54297C12.7667 5.54297 15.1323 7.26762 16.0771 9.70243C15.1323 12.1372 12.7667 13.8619 10.0002 13.8619ZM10.0002 4.04297C6.48191 4.04297 3.49489 6.30917 2.4155 9.4593C2.3615 9.61687 2.3615 9.78794 2.41549 9.94552C3.49488 13.0957 6.48191 15.3619 10.0002 15.3619C13.5184 15.3619 16.5055 13.0957 17.5849 9.94555C17.6389 9.78797 17.6389 9.6169 17.5849 9.45932C16.5055 6.30919 13.5184 4.04297 10.0002 4.04297ZM9.99151 7.84413C8.96527 7.84413 8.13333 8.67606 8.13333 9.70231C8.13333 10.7286 8.96527 11.5605 9.99151 11.5605H10.0064C11.0326 11.5605 11.8646 10.7286 11.8646 9.70231C11.8646 8.67606 11.0326 7.84413 10.0064 7.84413H9.99151Z"
                      fill="#98A2B3"
                    />
                  </svg>
                  <svg
                    v-else
                    class="fill-current"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.63803 3.57709C4.34513 3.2842 3.87026 3.2842 3.57737 3.57709C3.28447 3.86999 3.28447 4.34486 3.57737 4.63775L4.85323 5.91362C3.74609 6.84199 2.89363 8.06395 2.4155 9.45936C2.3615 9.61694 2.3615 9.78801 2.41549 9.94558C3.49488 13.0957 6.48191 15.3619 10.0002 15.3619C11.255 15.3619 12.4422 15.0737 13.4994 14.5598L15.3625 16.4229C15.6554 16.7158 16.1302 16.7158 16.4231 16.4229C16.716 16.13 16.716 15.6551 16.4231 15.3622L4.63803 3.57709ZM12.3608 13.4212L10.4475 11.5079C10.3061 11.5423 10.1584 11.5606 10.0064 11.5606H9.99151C8.96527 11.5606 8.13333 10.7286 8.13333 9.70237C8.13333 9.5461 8.15262 9.39434 8.18895 9.24933L5.91885 6.97923C5.03505 7.69015 4.34057 8.62704 3.92328 9.70247C4.86803 12.1373 7.23361 13.8619 10.0002 13.8619C10.8326 13.8619 11.6287 13.7058 12.3608 13.4212ZM16.0771 9.70249C15.7843 10.4569 15.3552 11.1432 14.8199 11.7311L15.8813 12.7925C16.6329 11.9813 17.2187 11.0143 17.5849 9.94561C17.6389 9.78803 17.6389 9.61696 17.5849 9.45938C16.5055 6.30925 13.5184 4.04303 10.0002 4.04303C9.13525 4.04303 8.30244 4.17999 7.52218 4.43338L8.75139 5.66259C9.1556 5.58413 9.57311 5.54303 10.0002 5.54303C12.7667 5.54303 15.1323 7.26768 16.0771 9.70249Z"
                      fill="#98A2B3"
                    />
                  </svg>
                </span>
                </div>
              </div>
              <!-- passwordConfirmation -->
              <div>
                <label for="passwordConfirmation" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Подтверждение пароля<span class="text-error-500">*</span>
                </label>
                <div class="relative">
                  <input
                    id="passwordConfirmation"
                    v-model="formData.password_confirmation"
                    :type="showPasswordConfirm ? 'text' : 'password'"
                    placeholder="Повторите пароль"
                    minlength="6"
                    required
                    class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-4 pr-11 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                  />
                  <span @click="togglePasswordConfirmVisibility" class="absolute z-30 text-gray-500 -translate-y-1/2 cursor-pointer right-4 top-1/2 dark:text-gray-400">
                  <svg
                    v-if="!showPassword"
                    class="fill-current"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.0002 13.8619C7.23361 13.8619 4.86803 12.1372 3.92328 9.70241C4.86804 7.26761 7.23361 5.54297 10.0002 5.54297C12.7667 5.54297 15.1323 7.26762 16.0771 9.70243C15.1323 12.1372 12.7667 13.8619 10.0002 13.8619ZM10.0002 4.04297C6.48191 4.04297 3.49489 6.30917 2.4155 9.4593C2.3615 9.61687 2.3615 9.78794 2.41549 9.94552C3.49488 13.0957 6.48191 15.3619 10.0002 15.3619C13.5184 15.3619 16.5055 13.0957 17.5849 9.94555C17.6389 9.78797 17.6389 9.6169 17.5849 9.45932C16.5055 6.30919 13.5184 4.04297 10.0002 4.04297ZM9.99151 7.84413C8.96527 7.84413 8.13333 8.67606 8.13333 9.70231C8.13333 10.7286 8.96527 11.5605 9.99151 11.5605H10.0064C11.0326 11.5605 11.8646 10.7286 11.8646 9.70231C11.8646 8.67606 11.0326 7.84413 10.0064 7.84413H9.99151Z"
                      fill="#98A2B3"
                    />
                  </svg>
                  <svg
                    v-else
                    class="fill-current"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.63803 3.57709C4.34513 3.2842 3.87026 3.2842 3.57737 3.57709C3.28447 3.86999 3.28447 4.34486 3.57737 4.63775L4.85323 5.91362C3.74609 6.84199 2.89363 8.06395 2.4155 9.45936C2.3615 9.61694 2.3615 9.78801 2.41549 9.94558C3.49488 13.0957 6.48191 15.3619 10.0002 15.3619C11.255 15.3619 12.4422 15.0737 13.4994 14.5598L15.3625 16.4229C15.6554 16.7158 16.1302 16.7158 16.4231 16.4229C16.716 16.13 16.716 15.6551 16.4231 15.3622L4.63803 3.57709ZM12.3608 13.4212L10.4475 11.5079C10.3061 11.5423 10.1584 11.5606 10.0064 11.5606H9.99151C8.96527 11.5606 8.13333 10.7286 8.13333 9.70237C8.13333 9.5461 8.15262 9.39434 8.18895 9.24933L5.91885 6.97923C5.03505 7.69015 4.34057 8.62704 3.92328 9.70247C4.86803 12.1373 7.23361 13.8619 10.0002 13.8619C10.8326 13.8619 11.6287 13.7058 12.3608 13.4212ZM16.0771 9.70249C15.7843 10.4569 15.3552 11.1432 14.8199 11.7311L15.8813 12.7925C16.6329 11.9813 17.2187 11.0143 17.5849 9.94561C17.6389 9.78803 17.6389 9.61696 17.5849 9.45938C16.5055 6.30925 13.5184 4.04303 10.0002 4.04303C9.13525 4.04303 8.30244 4.17999 7.52218 4.43338L8.75139 5.66259C9.1556 5.58413 9.57311 5.54303 10.0002 5.54303C12.7667 5.54303 15.1323 7.26768 16.0771 9.70249Z"
                      fill="#98A2B3"
                    />
                  </svg>
                </span>
                </div>
              </div>
            </div>

            <div class="form-group full-width">
              <label for="spec-list" class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                Специализации<span class="text-error-500">*</span>
              </label>
              <div class="relative specializations-list" id="spec-list">
                <div v-for="spec in availableSpecializations" :key="spec.id" class="specialization-item">
                  <input
                    type="checkbox"
                    :id="`spec-${spec.id}`"
                    :value="spec.id"
                    v-model="formData.specializationId"
                  />
                  <label :for="`spec-${spec.id}`">{{ spec.name }}</label>
                </div>
              </div>
            </div>

            <!-- Checkbox -->
            <div>
              <div>
                <label for="checkboxLabelOne" class="flex items-start text-sm font-normal text-gray-700 cursor-pointer select-none dark:text-gray-400">
                  <div class="relative">
                    <input
                      v-model="formData.agreeToTerms"
                      type="checkbox"
                      id="checkboxLabelOne"
                      class="sr-only"
                    />
                    <div :class="formData.agreeToTerms ? 'border-brand-500 bg-brand-500' : 'bg-transparent border-gray-300 dark:border-gray-700'"
                      class="mr-3 flex h-5 w-5 items-center justify-center rounded-md border-[1.25px]"
                    >
                      <span :class="formData.agreeToTerms ? '' : 'opacity-0'">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="white" stroke-width="1.94437"
                            stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <p class="inline-block font-normal text-gray-500 dark:text-gray-400">
                    Нажимая «Регистрация», вы принимаете
                    <span class="text-gray-800 dark:text-white/90"> пользовательское соглашение </span>
                    и
                    <span class="text-gray-800 dark:text-white">  политику конфиденциальности</span>
                  </p>
                </label>
              </div>
            </div>
            <!-- Button -->
            <div>
              <button type="submit" class="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                {{ isSubmitting ? 'Регистрация...' : 'Зарегистрироваться' }}
              </button>
            </div>
          </div>
        </form>
        <div class="mt-5">
          <p class="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
            Уже есть аккаунт?
            <router-link to="/login" class="text-brand-500 hover:text-brand-600 dark:text-brand-400">
              Войти
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useSpecializationsStore } from '@/stores/specializations'
import type { RegisterData } from '@/types'
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const specializationsStore = useSpecializationsStore()
const availableSpecializations = computed(() => specializationsStore.specializations)

const formData = ref<RegisterData>({
  first_name: '',
  last_name: '',
  second_name: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
  specializationId: [],
  agreeToTerms: false
})
const isSubmitting = ref(false)
const showPassword = ref(false)
const showPasswordConfirm = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const toast = useToast();

watch(() => formData.value.first_name, (newVal) => {
  formData.value.first_name = newVal.replace(/[^a-zA-Zа-яА-ЯёЁ\-]/g, '');
});

watch(() => formData.value.last_name, (newVal) => {
  formData.value.last_name = newVal.replace(/[^a-zA-Zа-яА-ЯёЁ\-]/g, '');
});

onMounted(async () => {
  await specializationsStore.fetchSpecializations()
})

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const togglePasswordConfirmVisibility = () => {
  showPasswordConfirm.value = !showPasswordConfirm.value
}

const handleSubmit = async () => {
  if (formData.value.password !== formData.value.password_confirmation) {
    toast.error("Пароли не совпадают");
    return
  }

  if (formData.value.specializationId.length === 0) {
    toast.error("Выберите хотя бы одну специализацию");
    return
  }

  if (formData.value.agreeToTerms == false) {
    toast.error("Необходимо принять соглашение");
    return
  }

  isSubmitting.value = true
  try {
    await authStore.register(formData.value)
    await router.push({ name: 'dashboard' })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    toast.error("Упс! Что-то пошло не так");
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group.full-width {
  width: 100%;
}

label {
  font-weight: 500;
  color: #333;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="password"] {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.specializations-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin-top: 0.5rem;
}

.specialization-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
