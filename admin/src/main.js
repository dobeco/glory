import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/common.css'
import http from './http'
Vue.prototype.$http = http
/* 
全局注册一个混入，影响注册之后所有创建的每个 Vue 实例。插件作者可以使用混入，向组件注入自定义的行为。不推荐在应用代码中使用。
 */
Vue.mixin({
  computed: {
    //el- upload组件使用
    uploadUrl() {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods : {
    // 为上传图片添加请求头，上传文件的登录校验
    getAuthHeaders() {
      return {
         Authorization: `Bearer ${localStorage.gloryToken || ''}`
      }
    }
  }
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
