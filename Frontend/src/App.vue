<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Layout, LayoutSider, LayoutContent } from 'ant-design-vue'
import Sidebar from '@/components/Sidebar.vue'
import LangSwitcher from '@/components/LangSwitcher.vue'
import { useRoute } from 'vue-router'

</script>

<template>
  <RouterView v-if="['/login', '/projects'].includes(useRoute().path)" />
  <Layout v-else>
    <LayoutSider width="260px" class="side">
      <div class="logo">
        <img src="/src/assets/logo.svg" style="width: 100%" />
      </div>
      <Sidebar />
    </LayoutSider>
    <LayoutContent>
      <RouterView />
    </LayoutContent>
  </Layout>
  <LangSwitcher />
</template>

<style scoped>
.logo {
  padding: 1rem;
}

.side {
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow: auto;
  position: sticky;
  top: 0;
  bottom: 0;
  left: 0;
  box-shadow: '0px 4px 8px rgba(57, 73, 86, 0.05)';
  background: white;
  height: 100vh
}
.side::-webkit-scrollbar {
  display: none;
}
</style>
