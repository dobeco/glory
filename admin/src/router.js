import Vue from 'vue'
import Router from 'vue-router'


import Home from './views/Home.vue'
const Main = () => import( /* webpackChunkName: "main" */ './views/Main.vue')
const Login = () => import( /* webpackChunkName: "login" */ './views/Login.vue')
const CategoryEdit = () => import( /* webpackChunkName: "category-edit" */ './views/CategoryEdit.vue')
const CategoryList = () => import( /* webpackChunkName: "category-list" */ './views/CategoryList.vue')

const ItemEdit = () => import( /* webpackChunkName: "item-edit" */ './views/itemEdit.vue')
const ItemList = () => import( /* webpackChunkName: "item-list" */ './views/ItemList.vue')

const HeroEdit = () => import( /* webpackChunkName: "hero-edit" */ './views/HeroEdit.vue')
const HeroList = () => import( /* webpackChunkName: "hero-list" */ './views/HeroList.vue')

const ArticleEdit = () => import( /* webpackChunkName: "article-edit" */ './views/ArticleEdit.vue')
const ArticleList = () => import( /* webpackChunkName: "article-list" */ './views/ArticleList.vue')

const AdEdit = () => import( /* webpackChunkName: "ad-edit" */ './views/AdEdit.vue')
const AdList = () => import( /* webpackChunkName: "ad-list" */ './views/AdList.vue')

const AdminUserEdit = () => import( /* webpackChunkName: "user" */ './views/AdminUserEdit.vue')
const AdminUserList = () => import( /* webpackChunkName: "user-edit" */ './views/AdminUserList.vue')

Vue.use(Router)


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      meta: {
        title: '王者荣耀后台管理系统',
      },
      component: Main,
      redirect: '/items/list',
      children: [
        { path: '/categories/create', component: CategoryEdit, meta: { title: '新建分类' } },
        { path: '/categories/edit/:id', component: CategoryEdit, meta: { title: '编辑列表' }, props: true }, //props把id注入到这个页面
        { path: '/categories/list', component: CategoryList, meta: { title: '分类列表' } },

        { path: '/items/create', component: ItemEdit, meta: { title: '新建物品' } },
        { path: '/items/edit/:id', component: ItemEdit, meta: { title: '编辑物品' }, props: true },
        { path: '/items/list', component: ItemList, meta: { title: '物品列表' } },

        { path: '/heroes/create', component: HeroEdit, meta: { title: '新建英雄' } },
        { path: '/heroes/edit/:id', component: HeroEdit, meta: { title: '编辑英雄' }, props: true },
        { path: '/heroes/list', component: HeroList, meta: { title: '英雄列表' } },

        { path: '/articles/create', component: ArticleEdit, meta: { title: '新建文章' } },
        { path: '/articles/edit/:id', component: ArticleEdit, meta: { title: '编辑文章' }, props: true },
        { path: '/articles/list', component: ArticleList, meta: { title: '文章列表' } },

        { path: '/ads/create', component: AdEdit, meta: { title: '新建广告' } },
        { path: '/ads/edit/:id', component: AdEdit, meta: { title: '编辑广告' }, props: true },
        { path: '/ads/list', component: AdList, meta: { title: '广告列表' } },

        { path: '/admin_users/create', component: AdminUserEdit },
        { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
        { path: '/admin_users/list', component: AdminUserList },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      meta: { titel: '登录', isPublic: true },
      component: Login
    },
    {
      path: '/404',
      component: () => import('@/views/404'),
    },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404' }
  ]
})


// 骚操作,切换路由title跟着改变
/* router.beforeEach((to, from, next) => {
 
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
 */
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.gloryToken) {
    return next('/login')
  }
  next()
})
export default router