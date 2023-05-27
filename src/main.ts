import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import App from './App.vue'
import router from './router'
import 'virtual:uno.css'

const app = createApp(App)

const pinia = createPinia()
const messages = Object.fromEntries(
  Object.entries(import.meta.globEager('./locales/*.y(a)?ml')).map(([key, value]) => {
    const yaml = key.endsWith('.yaml')
    return [key.slice(10, yaml ? -5 : -4), value.default]
  }),
)
const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
  messages,
})

app.use(router)
app.use(pinia)
app.use(i18n)
app.use(ArcoVueIcon)
app.mount('#app')
