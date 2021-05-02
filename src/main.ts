import { createApp } from 'vue'
import router from './router'
import { store } from './store'
import App from './App.vue'
import element from './plugins/element'
import './style/index.scss'

export const app = createApp(App)

element()

app.use(store)
    .use(router)
    .mount('#app')
