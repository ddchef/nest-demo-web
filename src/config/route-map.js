export default [
  {
    path: 'setting',
    id: 'setting',
    title: '系统管理',
    isMenu: true,
    children: [
      {
        path: 'user',
        id: 'user',
        title: '用户管理',
        isMenu: true,
        component: '/user/index.vue',
        children: [
          {
            path: 'add',
            id: 'user_add',
            title: '用户新增',
            component: '/user/update.vue'
          },
          {
            path: 'edit/:id',
            id: 'user_edit',
            title: '用户编辑',
            component: '/user/update.vue'
          }
        ]
      },
      {
        path: 'role',
        id: 'role',
        title: '角色管理',
        isMenu: true,
        component: '/role/index.vue',
        children: [
          {
            path: 'add',
            id: 'role_add',
            title: '角色新增',
            component: '/role/update.vue'
          },
          {
            path: 'edit/:id',
            id: 'role_edit',
            title: '角色编辑',
            component: '/role/update.vue'
          }
        ]
      },
      {
        path: 'permission',
        id: 'permission',
        title: '权限管理',
        isMenu: true,
        component: '/permission/index.vue',
        children: [
          {
            path: 'add',
            id: 'permission_add',
            title: '权限新增',
            component: '/permission/update.vue'
          },
          {
            path: 'edit/:code',
            id: 'permission_edit',
            title: '权限编辑',
            component: '/permission/update.vue'
          }
        ]
      }
    ]
  }
]
