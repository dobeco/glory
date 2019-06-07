import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
const Main = () => import( /* webpackChunkName: "main" */ './views/Main.vue')
const CategoryEdit = () => import( /* webpackChunkName: "main" */ './views/CategoryEdit.vue')
const CategoryList = () => import( /* webpackChunkName: "main" */ './views/CategoryList.vue')

const ItemEdit = () => import( /* webpackChunkName: "main" */ './views/itemEdit.vue')
const ItemList = () => import( /* webpackChunkName: "main" */ './views/ItemList.vue')


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
        { path: '/categories/create', component: CategoryEdit },
        { path: '/categories/edit/:id', component: CategoryEdit, props: true }, //props把id注入到这个页面
        { path: '/categories/list', component: CategoryList },
        
        { path: '/item/create', component: ItemEdit },
        { path: '/item/edit/:id', component: ItemEdit, props: true }, 
        { path: '/item/list', component: ItemList },
      ]
    }
  ]
})
