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
        meta: {
          title: '用户管理'
        },
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/index.vue'),
        children: [
          {
            path: 'add',
            name: 'user-add',
            meta: {
              title: '用户新增'
            },
            component: () => import(/* webpackChunkName: "user-add" */ '@/views/user/update.vue')
          },
          {
            path: 'edit/:id',
            name: 'user-edit',
            meta: {
              title: '用户编辑'
            },
            component: () => import(/* webpackChunkName: "user-edit" */ '@/views/user/update.vue')
          }
        ]
      },
      {
        path: 'role',
        name: 'role',
        meta: {
          title: '角色管理'
        },
        component: () => import(/* webpackChunkName: "role" */ '@/views/role/index.vue'),
        children: [
          {
            path: 'add',
            name: 'role-add',
            meta: {
              title: '角色新增'
            },
            component: () => import(/* webpackChunkName: "role-add" */ '@/views/role/update.vue')
          },
          {
            path: 'edit/:id',
            name: 'role-edit',
            meta: {
              title: '角色编辑'
            },
            component: () => import(/* webpackChunkName: "role-edit" */ '@/views/role/update.vue')
          }
        ]
      },
      {
        path: 'permission',
        name: 'permission',
        meta: {
          title: '权限管理'
        },
        component: () => import(/* webpackChunkName: "permission" */ '@/views/permission/index.vue'),
        children: [
          {
            path: 'add',
            name: 'permission-add',
            meta: {
              title: '权限新增'
            },
            component: () => import(/* webpackChunkName: "permission-add" */ '@/views/permission/update.vue')
          },
          {
            path: 'edit/:code',
            name: 'permission-edit',
            meta: {
              title: '权限编辑'
            },
            component: () => import(/* webpackChunkName: "permission-edit" */ '@/views/permission/update.vue')
          }
        ]
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
