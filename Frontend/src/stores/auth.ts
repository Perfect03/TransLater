import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAPI } from '@/composables/useAPI'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '')

  async function login(email: string, password: string) {
    try {
      const res = await useAPI().post<{token: string}>('/api/login', { email, password })
      token.value = res?.token
      localStorage.setItem('token', token.value)
    } catch (e: unknown) { return e }
  }

  function logout() {
    token.value = ''
    localStorage.removeItem('token')
    useRouter().push('/login')
  }

  return { token, login, logout }
})
