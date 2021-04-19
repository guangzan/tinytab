import { createApp } from 'vue'
import router from './router'
import { store } from './store'
import ElementPlus from 'element-plus'
import App from './App.vue'
import './style/index.scss'

const app = createApp(App)

app.use(ElementPlus, { size: 'small' })
    .use(store)
    .use(router)
    .mount('body')
