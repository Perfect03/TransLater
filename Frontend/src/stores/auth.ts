import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '')

  async function login(email: string, password: string) {
    const res = await axios.post('/api/login', { email, password })
    token.value = res.data.token
    localStorage.setItem('token', token.value)
  }

  function logout() {
    token.value = ''
    localStorage.removeItem('token')
  }

  return { token, login, logout }
})
