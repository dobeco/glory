import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/iconfont/iconfont.css'
import './assets/scss/style.scss'

import http from './http'
Vue.prototype.$http = http

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

// 自定义卡片组件
import Card from './components/Card.vue'
Vue.component('m-card', Card)

//列表卡片组件
import ListCard from './components/ListCard.vue'
Vue.component('m-list-card', ListCard)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
