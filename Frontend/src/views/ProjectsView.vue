<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectsStore } from '@/stores/projects'

const { loading, getAll } = useProjectsStore()
const projects = await getAll()
const router = useRouter()

function selectProject(id: number|string) {
  router.push(`/projects/${id}`)
}
</script>

<template>
  <div class="project-wrapper">
    <div class="project-card">
      <h2>{{ $t('projects.h2') }}</h2>

      <!-- Loader -->
      <div v-if="loading" class="loader-container">
        <a-spin size="large" />
      </div>

      <!-- Grid -->
      <div v-else class="project-grid">
        <a-card v-for="project in projects" :key="project.id" hoverable class="project-tile"
          @click="selectProject(project.id)">
          <template #cover>
            <img :src="project.logo" class="project-logo" />
          </template>
          <a-card-meta :title="project.name" />
        </a-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.project-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f0f0f0, #ffffff);
  padding: 2rem;
}

.project-card {
  width: 100%;
  max-width: 720px;
  padding: 2rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.65);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  text-align: center;
}

h2 {
  margin-bottom: 24px;
  font-weight: 600;
  color: #333;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.5rem;
}

.project-tile {
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s;
}

.project-tile:hover {
  transform: translateY(-4px);
}

.project-logo {
  height: 120px;
  object-fit: contain;
  padding: 1rem;
}
</style>