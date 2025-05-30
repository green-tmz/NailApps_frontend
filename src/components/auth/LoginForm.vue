<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <div class="form-group">
      <label for="login">Email или телефон</label>
      <input
        type="text"
        id="login"
        v-model="credentials.login"
        required
        placeholder="Введите email или телефон"
        autocomplete="username"
      />
    </div>

    <div class="form-group">
      <label for="password">Пароль</label>
      <div class="password-input-wrapper">
        <input
          :type="showPassword ? 'text' : 'password'"
          id="password"
          v-model="credentials.password"
          required
          placeholder="Введите пароль"
          autocomplete="current-password"
          minlength="6"
        />
        <button
          type="button"
          class="toggle-password"
          @click="showPassword = !showPassword"
          :aria-label="showPassword ? 'Скрыть пароль' : 'Показать пароль'"
        >
          <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </button>
      </div>
    </div>

    <div class="form-footer">
      <button type="submit" :disabled="isSubmitting" class="submit-btn">
        <span v-if="isSubmitting">
          <svg class="spinner" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
          </svg>
          Вход...
        </span>
        <span v-else>Войти</span>
      </button>

      <router-link to="/forgot-password" class="forgot-password">
        Забыли пароль?
      </router-link>
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { LoginData } from '@/types'

const emit = defineEmits(['submit'])

const credentials = ref<LoginData>({
  login: '',
  password: ''
})

const showPassword = ref(false)
const isSubmitting = ref(false)
const error = ref<string | null>(null)

const handleSubmit = async () => {
  if (!credentials.value.login || !credentials.value.password) {
    error.value = 'Заполните все поля'
    return
  }

  isSubmitting.value = true
  error.value = null

  try {
    emit('submit', {
      login: credentials.value.login.trim(),
      password: credentials.value.password
    })
  } catch (err) {
    error.value = 'Неверные учетные данные'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 500;
  color: #333;
  font-size: 0.9rem;
}

input {
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #4a6baf;
}

.password-input-wrapper {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 5px;
}

.form-footer {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #4a6baf;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

.submit-btn:hover {
  background-color: #3a5a9f;
}

.submit-btn:disabled {
  background-color: #a0a0a0;
  cursor: not-allowed;
}

.forgot-password {
  color: #4a6baf;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s;
}

.forgot-password:hover {
  text-decoration: underline;
}

.error-message {
  color: #e74c3c;
  text-align: center;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

.spinner {
  animation: rotate 1s linear infinite;
  width: 20px;
  height: 20px;
}

.spinner circle {
  stroke: white;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style>
