import { createApp } from 'vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import './assets/style/index.scss'

createApp(() => <router-view />)
    .use(ElementPlus)
    .use(store)
    .use(router)
    .mount('body')
