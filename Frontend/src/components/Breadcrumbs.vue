<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Breadcrumb } from 'ant-design-vue'

const props = defineProps<{
  path: string[]
}>()

const emit = defineEmits(['navigate'])

function handleClick(index: number) {
  const partialPath = props.path.slice(0, index + 1)
  emit('navigate', partialPath)
}
</script>

<template>
  <Breadcrumb>
    <Breadcrumb.Item
      v-for="(segment, index) in path"
      :key="index"
      @click="handleClick(index)"
      style="cursor: pointer"
    >
      {{ segment }}
    </Breadcrumb.Item>
  </Breadcrumb>
</template>
