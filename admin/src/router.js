import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
const Main = () => import( /* webpackChunkName: "main" */ './views/Main.vue')
const CategoryEdit = () => import( /* webpackChunkName: "main" */ './views/CategoryEdit.vue')
const CategoryList = () => import( /* webpackChunkName: "main" */ './views/CategoryList.vue')



Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        { path: '/categories/create', component: CategoryEdit},
        { path: '/categories/edit/:id', component: CategoryEdit, props: true}, //props把id注入到这个页面
        { path: '/categories/list', component: CategoryList},
      ]
    }
  ]
})
