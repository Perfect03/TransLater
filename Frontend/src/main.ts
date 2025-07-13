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
        h2: 'Вход в TransLater',
        form: {
          email: {
            label: ''
          }
        },
        submit: 'Войти'
      },

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
      
    }
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(i18n)
app.use(router)

app.mount('#app')
