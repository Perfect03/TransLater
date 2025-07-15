import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAPI } from '@/composables/useAPI'

export const useProjectsStore = defineStore('projects', () => {
  const { loading, get } = useAPI()

  const getAll = async () => {
    return get<IProject[]>('/projects')
  }

  const getProject = async (slug: string) => {
    return get<IProject[]>(`/project/${slug}`)
  }

  return { loading, getAll, getProject }
})

export interface IProject {
  id: number
  name: string
  description?: string
  logo?: string
  slug: string
}