<template>
  <div class="lang-toggle">
    <button
      v-for="lng in ['ru', 'en']"
      :key="lng"
      :class="{ active: currentLang === lng }"
      @click="switchLang(lng)"
    >
      {{ lng.toUpperCase() }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const currentLang = ref(locale.value)

function switchLang(lng: string) {
  currentLang.value = lng
  locale.value = lng
  localStorage.setItem('lang', lng)
}
</script>

<style scoped>
.lang-toggle {
  position: absolute;
  top: 16px;
  right: 24px;
  z-index: 999;
  display: flex;
  gap: 8px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  padding: 6px 10px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.lang-toggle button {
  background: transparent;
  border: none;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  color: #333;
  transition: background 0.2s;
}

.lang-toggle button.active {
  background: #1890ff;
  color: white;
}
</style>