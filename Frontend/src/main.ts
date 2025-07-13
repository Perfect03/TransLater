import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'ant-design-vue/dist/reset.css';

import App from './App.vue'
import router from './router'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackWarn: false,
  missingWarn: false,
  messages: {
    en: {
      login: {
        h2: 'Login to TransLater',
        form: {
          email: {
            label: ''
          }
        },
        submit: 'Sign in'
      },
      projects: {
        h2: 'Select a project'
      }
    },
    ru: {
      login: {
        h2: 'Вход в TransLater',
        form: {
          email: {
            label: ''
          }
        },
        submit: 'Войти'
      },
      projects: {
        h2: 'Выберите проект'
      }
    }
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)

app.mount('#app')
