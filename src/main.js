import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入axios
import axios from "axios"
// 配置axios
axios.defaults.baseURL = '/api'
Vue.prototype.axios=axios
// 引入swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
import 'swiper/swiper-bundle.css'
// 引入normalize通用样式;
import 'normalize.css/normalize.css'
// 引入Vue-bus；
Vue.prototype.$bus=new Vue();
// 引入Element-UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')

