<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Layout, LayoutSider, LayoutContent } from 'ant-design-vue'
import Sidebar from '@/components/Sidebar.vue'

</script>

<template>
  <Layout>
      <LayoutSider width="260px" style="box-shadow: 0px 4px 8px rgba(57, 73, 86, 0.05); background: white;">
        <div class="logo">
          <img src="/src/assets/logo.svg" style="width: 100%" />
        </div>
        <Sidebar />
      </LayoutSider>
      <LayoutContent>Main</LayoutContent>
  </Layout>
</template>

<style scoped lang="scss">

.logo {
  padding: 1rem;
}
</style>
