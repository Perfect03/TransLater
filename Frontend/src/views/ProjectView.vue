<script setup lang="ts">
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectsStore, type IProject } from '@/stores/projects'

const { loading, getProject } = useProjectsStore()

function handleBreadcrumbNav(newPath: string[]) {
  //currentPath.value = newPath
}

</script>

<template>
  <Breadcrumbs :path="[useRoute().path]" @navigate="handleBreadcrumbNav" />
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