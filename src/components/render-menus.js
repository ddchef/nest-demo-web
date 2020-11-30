export default {
  name: 'Menus',
  props: {
    menus: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      activeIndex: ''
    }
  },
  methods: {
    createMenus (h, menus, parentPath = '') {
      const menusNodes = menus.map(item => {
        if (Array.isArray(item.children) && item.children.length > 0) {
          return h(
            'el-submenu',
            {
              props: {
                index: parentPath + '/' + item.path
              },
              key: item.id
            },
            [
              h('span', { slot: 'title' }, item.title),
              ...this.createMenus(h, item.children, parentPath + '/' + item.path)
            ]
          )
        }
        return h(
          'el-menu-item',
          {
            props: {
              index: parentPath + '/' + item.path
            },
            key: item.id
          },
          item.title
        )
      })
      return menusNodes
    }
  },
  render (h) {
    return (
      h(
        'el-menu',
        {
          class: 'header-el-menu',
          props: {
            defaultActive: this.activeIndex,
            mode: 'horizontal',
            router: true
          }
        },
        this.createMenus(h, this.menus, '')
      )
    )
  }
}
