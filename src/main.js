import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUi from 'element-ui'
import components from './components/index'
import 'element-ui/lib/theme-chalk/index.css'
import 'animate.css/animate.css'
import '@/assets/base.scss'
import 'normalize.css'

Vue.config.productionTip = false

Vue.use(ElementUi)
Vue.use(components)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
