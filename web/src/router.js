import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Main,
      children: [
        { path: '/', name: 'home', component: Home },
        {
          path: '/articles/:id',
          name: 'article',
          component: () => import(/* webpackChunkName: "article" */ './views/Article.vue'),
          props: true
        },

      ]
    },
    {
      path: '/heroes/:id',
      name: 'hero',
      component: () => import(/* webpackChunkName: "hero" */ './views/Hero.vue'),
      props: true
    },
    {
      path: '/about',
      name: 'about',

      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
