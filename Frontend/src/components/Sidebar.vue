<script setup lang="ts">
import { ref, watch, VueElement, type VNode } from 'vue'
import { Menu } from 'ant-design-vue'
import { useDataStore } from '@/stores/data'
import Sidebar from '@/components/Sidebar.vue'
import type { MenuProps, ItemType } from 'ant-design-vue'

const props = defineProps({
  depth: {
    type: Number,
    default: 0,
  },
})

const selectedKeys = ref<string[]>(['1'])
const openKeys = ref<string[]>(['sub1'])

const collapsed = ref(true)

function getItem(
  label: VueElement | string,
  key: string,
  icon?: any,
  children?: ItemType[],
  type?: 'group',
): ItemType {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as ItemType
}

// const itt = computed(() => {
//   return Object.entries(props.items).map((entrie) => {
//     return getItem(entrie[0], entrie[0], null)
//   })
// })

type MyTuple = [string, string, (VNode | null)?, ItemType[]?]

const formBranch = (data: Record<string, any>): ItemType[] => {
  const result: ItemType[] = []

  for (const [key, val] of Object.entries(data)) {
    const isObject = val && typeof val === 'object' && !Array.isArray(val)

    if (!isObject) continue

    const children = formBranch(val)
    const branch: MyTuple = [key, key]
    if (children.length) branch.push(null, children)
    result.push(getItem(...branch))
  }

  return result
}

const items: ItemType[] = formBranch({ 'ОЛИМП': useDataStore().data })

const handleClick: MenuProps['onClick'] = (e) => {
  console.log('click', e)
}

watch(openKeys, (val) => {
  console.log('openKeys', val)
})
</script>

<template>
  <Menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" style="width: 256px" mode="inline"
    :items="items" @click="handleClick" class="el-menu" default-active="2" :inline-collapsed="collapsed">
    <template v-for="[key, val] in Object.entries(items)" :key="key">
      <Sidebar v-if="typeof val === 'object' && !Array.isArray(val)" :items="val" :depth="depth + 1" />
      <div v-else :style="{ background: `rgba(0,0,0,${0.025 * depth})` }">
        {{ key.charAt(0).toUpperCase() + key.slice(1) }}
      </div>
    </template>
  </Menu>
</template>

<style scoped lang="scss">

</style>
