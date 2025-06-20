<script setup lang="ts">
import { reactive, ref, watch, VueElement, h, computed, type VNode } from 'vue'
import { Menu } from 'ant-design-vue'
import { useDataStore } from '@/stores/data'
import Sidebar from '@/components/Sidebar.vue'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue'
import type { MenuProps, ItemType } from 'ant-design-vue'

const props = defineProps({
  depth: {
    type: Number,
    default: 0,
  },
})

const levels = ['white', 'blue', 'yellow', 'orange']
const selectedKeys = ref<string[]>(['1'])
const openKeys = ref<string[]>(['sub1'])

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

const items: ItemType[] = formBranch({'ОЛИМП': useDataStore().data})

const handleClick: MenuProps['onClick'] = (e) => {
  console.log('click', e)
}

watch(openKeys, (val) => {
  console.log('openKeys', val)
})
</script>

<template>
  <Menu
    id="dddddd"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    style="width: 256px"
    mode="inline"
    :items="items"
    @click="handleClick"
    class="el-menu"
    default-active="2"
    @open="handleOpen"
    @close="handleClose"
  >
    <template v-for="[key, val] in Object.entries(items)" :key="key">
      <el-sub-menu
        v-if="typeof val === 'object' && !Array.isArray(val)"
        :index="depth + '-' + key"
        :style="{
          background: `rgba(0,0,0,${0.025 * depth})`,
          boxShadow: 'rgb(59 90 115 / 22%) 0px 4px 2 28px',
        }"
      >
        <template #title>
          <span>{{ key.charAt(0).toUpperCase() + key.slice(1) }}</span>
        </template>
        <Sidebar :items="val" :depth="depth + 1" />
      </el-sub-menu>
      <el-menu-item v-else :index="key" :style="{ background: `rgba(0,0,0,${0.025 * depth})` }">
        {{ key.charAt(0).toUpperCase() + key.slice(1) }}
      </el-menu-item>
    </template>
  </Menu>
</template>

<style scoped lang="scss">
:root {
  --el-menu-border-color: transparent;
  //--el-menu-active-color: var(--el-color-primary);
  //--el-menu-hover-text-color: var(--el-color-primary);
  --el-menu-horizontal-height: 1330px;
}
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.el-menu {
}
:deep(.el-menu-item):hover {
  color: var(--el-color-primary);
}
</style>
