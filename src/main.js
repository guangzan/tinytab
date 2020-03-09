import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import VueCompositionApi from '@vue/composition-api'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueCompositionApi)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
