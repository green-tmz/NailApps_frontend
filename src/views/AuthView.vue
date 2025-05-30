<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>{{ isLogin ? 'Вход в систему' : 'Регистрация' }}</h2>

      <LoginForm v-if="isLogin" @submit="handleLogin" />
      <RegisterForm v-else @submit="handleRegister" />

      <p class="toggle-mode">
        {{ isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?' }}
        <button @click="toggleMode">{{ isLogin ? 'Зарегистрироваться' : 'Войти' }}</button>
      </p>

      <div v-if="error" class="error-message">{{ error }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const isLogin = ref(route.name === 'login')
const error = ref<string | null>(null)

const toggleMode = () => {
  isLogin.value = !isLogin.value
  router.push({ name: isLogin.value ? 'login' : 'register' })
}

const handleLogin = async (credentials: any) => {
  try {
    await authStore.login(credentials)
    router.push({ name: 'dashboard' })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    error.value = authStore.error || 'Ошибка входа'
  }
}

const handleRegister = async (userData: any) => {
  try {
    await authStore.register(userData)
    router.push({ name: 'dashboard' })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    error.value = authStore.error || 'Ошибка регистрации'
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.auth-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 80%;
  margin: 2rem 0;
}

h2 {
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
}

.toggle-mode {
  text-align: center;
  margin-top: 1rem;
  color: #666;
}

button {
  background: none;
  border: none;
  color: #4a6baf;
  cursor: pointer;
  text-decoration: underline;
}

.error-message {
  color: #e74c3c;
  margin-top: 1rem;
  text-align: center;
}
</style>
