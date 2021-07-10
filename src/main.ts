import { createApp } from 'vue'
import { store } from './store'
import router from './router'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import 'virtual:windi.css'

const messages = Object.fromEntries(
    Object.entries(import.meta.globEager('../locales/*.y(a)?ml')).map(
        ([key, value]) => {
            const yaml = key.endsWith('.yaml')
            return [key.slice(11, yaml ? -5 : -4), value.default]
        }
    )
)

const i18n = createI18n({
    legacy: false,
    locale: 'zh-CN',
    messages,
})

createApp(App).use(store).use(router).use(i18n).mount('#app')
