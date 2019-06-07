import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
const Main = () => import( /* webpackChunkName: "main" */ './views/Main.vue')
const CategoryEdit = () => import( /* webpackChunkName: "main" */ './views/CategoryEdit.vue')
const CategoryList = () => import( /* webpackChunkName: "main" */ './views/CategoryList.vue')

const ItemEdit = () => import( /* webpackChunkName: "main" */ './views/itemEdit.vue')
const ItemList = () => import( /* webpackChunkName: "main" */ './views/ItemList.vue')

const HeroEdit = () => import( /* webpackChunkName: "main" */ './views/HeroEdit.vue')
const HeroList = () => import( /* webpackChunkName: "main" */ './views/HeroList.vue')

Vue.use(Router)


const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      meta: {
        title: '王者荣耀后台管理系统',
      },
      component: Main,
      children: [
        { path: '/categories/create', component: CategoryEdit, meta: { title: '新建分类' } },
        { path: '/categories/edit/:id', component: CategoryEdit, meta: { title: '编辑列表' }, props: true }, //props把id注入到这个页面
        { path: '/categories/list', component: CategoryList, meta: { title: '分类列表' } },

        { path: '/item/create', component: ItemEdit, meta: { title: '新建物品' } },
        { path: '/item/edit/:id', component: ItemEdit, meta: { title: '编辑物品' }, props: true },
        { path: '/item/list', component: ItemList, meta: { title: '物品列表' }},

        { path: '/heroes/create', component: HeroEdit, meta: { title: '新建英雄' } },
        { path: '/heroes/edit/:id', component: HeroEdit, meta: { title: '编辑英雄' }, props: true },
        { path: '/heroes/list', component: HeroList, meta: { title: '英雄列表' } },
      ]
    }
  ]
})

// 骚操作,切换路由title跟着改变
/* router.beforeEach((to, from, next) => {
 
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
}) */


export default router