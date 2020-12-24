import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import './assets/style/element-variables.scss'

createApp(App)
    .use(ElementPlus)
    .use(store)
    .use(router)
    .mount('#app')
