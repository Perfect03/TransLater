<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const visible = ref(true)
const loading = ref(false)
const errorMessage = ref('')

const form = reactive({
  email: '',
  password: ''
})

const rules = {
  email: [
    { required: true, message: 'Введите email', trigger: 'blur' },
    { type: 'email', message: 'Некорректный email', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Введите пароль', trigger: 'blur' },
    { min: 4, message: 'Минимум 4 символа', trigger: 'blur' }
  ]
}

async function submit() {
  loading.value = true
  errorMessage.value = ''
  const login = await auth.login(form.email, form.password)
  try {
    await auth.login(form.email, form.password)
    visible.value = false
    router.push('/projects')
  } catch (e) {
    errorMessage.value = 'Неверный логин или пароль'
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <div class="auth-wrapper">
    <div class="auth-card">
      <!-- ЛОГОТИП -->
      <img src="/translate.svg" class="logo" />

      <!-- Заголовок -->
      <h2>{{ $t('login.h2') }}</h2>

      <a-form :model="form" :rules="rules" layout="vertical" @submit.prevent="submit">
        <a-form-item label="Email" name="email">
          <a-input v-model:value="form.email" placeholder="Введите email" />
        </a-form-item>

        <a-form-item label="Пароль" name="password">
          <a-input-password v-model:value="form.password" placeholder="Введите пароль" />
        </a-form-item>

        <div class="error-message" v-if="errorMessage">
          {{ errorMessage }}
        </div>

        <a-button type="primary" html-type="submit" block :loading="loading">
          {{ $t('login.submit') }}
        </a-button>
      </a-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #e0e0e0, #ffffff);
  padding: 2rem;
}

.auth-card {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  text-align: center;
}

.logo {
  width: 80px;
  height: auto;
  margin-bottom: 1rem;
  opacity: 0;
  animation: fadeUp 0.6s ease-out forwards;
  animation-delay: 0.2s;
}

h2 {
  margin-bottom: 24px;
  font-weight: 600;
  color: #333;
}

.error-message {
  color: #ff4d4f;
  text-align: center;
  margin-bottom: 16px;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>