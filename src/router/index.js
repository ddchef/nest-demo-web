import Vue from 'vue'
import VueRouter from 'vue-router'
import { hasToken, delToken } from '@/utils/auth'
import routeMap from '@/config/route-map'
import decorateRoutes from './decorate-route'
import store from '@/store'
import { isEmpty } from 'lodash'

Vue.use(VueRouter)
const whiteList = ['/login', '/401', '/404']
const defalutRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
  },
  {
    path: '/401',
    name: '401',
    component: () => import(/* webpackChunkName: "401" */ '@/views/error/401.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/error/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: defalutRoutes
})

router.beforeEach(async (to, from, next) => {
  console.log(to, hasToken())
  // 判断是否有token
  if (hasToken()) {
    console.log('permissions', isEmpty(store.state.permissions))
    // 判断state中是否初始化过权限
    if (isEmpty(store.state.permissions)) {
      await store.dispatch('getPremissions')
      const [filterRoutes, menus] = decorateRoutes(routeMap, store.state.permissions)
      if (filterRoutes.length === 0) {
        // 可进入页面为0，删除token，跳转401
        delToken()
        return next({ path: '401', replace: true })
      }
      store.commit('setRoutes', filterRoutes)
      store.commit('setMenus', menus)
      router.addRoutes([
        {
          path: '/',
          component: () => import(/* webpackChunkName: "layout" */ '@/views/layout/index.vue'),
          children: filterRoutes
        },
        {
          path: '*',
          redirect: { name: '404' }
        }
      ])
      if (to.path === '/') {
        return next({ name: filterRoutes[0].name, replace: true })
      }
      next({ ...to, replace: true })
    }
    // 禁止进入login页面
    if (to.path === '/login') {
      return next({ path: '/', replace: true })
    }
    if (to.path === '/') {
      return next({ name: store.state.routes[0].name, replace: true })
    }
    // 允许进入
    return next()
  } else {
    console.log(to.path, whiteList.includes(to.path))
    if (whiteList.includes(to.path)) {
      return next()
    }
    if (to.path === '/') {
      return next({ path: '/login', replace: true })
    }
    next({ path: '/401' })
  }
})

export default router
