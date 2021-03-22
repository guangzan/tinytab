import { createApp } from 'vue'
import router from './router'
import { store } from './store'
import ElementPlus from 'element-plus'
import './style/common.scss'
import App from './App.vue'

const app = createApp(App)
const ElementPlusOptions = {
    size: 'small',
}

app.use(ElementPlus, ElementPlusOptions)
    .use(store)
    .use(router)
    .mount('body')
