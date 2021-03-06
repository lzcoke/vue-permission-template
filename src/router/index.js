import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '数据概况', icon: 'el-icon-s-home' }
    }]
  }
]

// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRoutes = [
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    meta: { title: '用户信息', icon: 'el-icon-user', roles: ['editor'] },
    children: [
      {
        path: 'index',
        name: 'Option',
        component: () => import('@/views/user/list'),
        meta: { title: '用户列表' }
      },
      {
        path: 'create',
        name: 'UserCreate',
        component: () => import('@/views/user/create'),
        hidden: true,
        meta: { title: '编辑用户', active: '/user/index' }
      }
    ]
  },
  {
    path: '/option',
    component: Layout,
    redirect: '/option/index',
    meta: { title: '系统设置', icon: 'el-icon-setting', roles: ['editor'] },
    children: [
      {
        path: 'index',
        name: 'Option',
        component: () => import('@/views/option/index'),
        meta: { title: '账号信息' }
      },
      {
        path: 'log',
        name: 'Log',
        component: () => import('@/views/option/log'),
        meta: { title: '操作日志' }
      }

    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
