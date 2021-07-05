import { createApp } from 'vue'
import { store } from './store'
import router from './router'
import App from './App.vue'
import './style/index.scss'
import 'virtual:windi.css'

export const app = createApp(App)

app.use(store).use(router).mount('#app')
