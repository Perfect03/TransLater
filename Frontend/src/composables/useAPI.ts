import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

export function useAPI() {
  const auth = useAuthStore()
  const loading = ref(false)

  async function request<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    loading.value = true
    try {
      const headers: {[key: string]: string}|HeadersInit = {
        ...(options.headers || {}),
        'Content-Type': 'application/json'
      }

      if (auth.token) {
        headers['Authorization'] = `Bearer ${auth.token}`
      }

      const res = await fetch('/api' + url, {
        ...options,
        headers,
        credentials: 'include'
      })

      if (res.status === 401) {
        auth.logout()
        throw new Error('Unauthorized')
      }

      if (!res.ok) {
        const errText = await res.text()
        throw new Error(`API error ${res.status}: ${errText}`)
      }

      const data = await res.json()
      return data as T
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    get: <T>(url: string) => request<T>(url),
    post: <T>(url: string, body?: any) =>
      request<T>(url, {
        method: 'POST',
        body: body ? JSON.stringify(body) : undefined
      }),
    put: <T>(url: string, body?: any) =>
      request<T>(url, {
        method: 'PUT',
        body: body ? JSON.stringify(body) : undefined
      }),
    del: <T>(url: string) =>
      request<T>(url, { method: 'DELETE' }),
    raw: request
  }
}