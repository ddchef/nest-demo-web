import Vue from 'vue'
import VueRouter from 'vue-router'
import { hasToken } from '@/utils/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "layout" */ '@/views/layout/index.vue'),
    redirect: { name: 'user' },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!hasToken() && to.path !== '/login') {
    next('/login')
  }
  if (hasToken() && to.path === '/login') {
    next('/')
  }
  next()
})

export default router
