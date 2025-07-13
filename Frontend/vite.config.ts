import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite';
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
//import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
          }),
        ],
      }),
      //vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      proxy: {
        '/api/': {
          target: env.API, // адрес твоего бэкенда
          changeOrigin: true,
          rewrite: path => path.replace('/api', '')
        }
      }
    }
  }
})
