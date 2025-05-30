<template>
  <form @submit.prevent="handleSubmit" class="register-form">
    <div class="form-group">
      <label for="firstName">Имя*</label>
      <input
        type="text"
        id="firstName"
        v-model="formData.first_name"
        required
        placeholder="Введите имя"
      />
    </div>

    <div class="form-group">
      <label for="lastName">Фамилия*</label>
      <input
        type="text"
        id="lastName"
        v-model="formData.last_name"
        required
        placeholder="Введите фамилию"
      />
    </div>

    <div class="form-group">
      <label for="secondName">Отчество</label>
      <input
        type="text"
        id="secondName"
        v-model="formData.second_name"
        placeholder="Введите отчество (если есть)"
      />
    </div>

    <div class="form-group">
      <label for="email">Email*</label>
      <input
        type="email"
        id="email"
        v-model="formData.email"
        required
        placeholder="example@mail.com"
      />
    </div>

    <div class="form-group">
      <label for="phone">Телефон*</label>
      <input
        type="tel"
        id="phone"
        v-model="formData.phone"
        required
        placeholder="+7 (XXX) XXX-XX-XX"
      />
    </div>

    <div class="form-group">
      <label for="password">Пароль*</label>
      <input
        type="password"
        id="password"
        v-model="formData.password"
        required
        placeholder="Не менее 6 символов"
        minlength="6"
      />
    </div>

    <div class="form-group">
      <label for="passwordConfirmation">Подтверждение пароля*</label>
      <input
        type="password"
        id="passwordConfirmation"
        v-model="formData.password_confirmation"
        required
        placeholder="Повторите пароль"
        minlength="6"
      />
    </div>

    <div class="form-group">
      <label>Специализации*</label>
      <div class="specializations-list">
        <div
          v-for="spec in availableSpecializations.data"
          :key="spec.id"
          class="specialization-item"
        >
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

    <button type="submit" :disabled="isSubmitting" class="submit-btn">
      {{ isSubmitting ? 'Регистрация...' : 'Зарегистрироваться' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useSpecializationsStore } from '@/stores/specializations'
import type { RegisterData } from '@/types'

const emit = defineEmits(['submit'])

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
  specializationId: []
})

const isSubmitting = ref(false)

onMounted(async () => {
  await specializationsStore.fetchSpecializations()
})

const handleSubmit = async () => {
  if (formData.value.password !== formData.value.password_confirmation) {
    alert('Пароли не совпадают')
    return
  }

  if (formData.value.specializationId.length === 0) {
    alert('Выберите хотя бы одну специализацию')
    return
  }

  isSubmitting.value = true
  try {
    emit('submit', formData.value)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.register-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

.submit-btn {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #4a6baf;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover {
  background-color: #3a5a9f;
}

.submit-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
