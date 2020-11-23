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
    createMenus (h, menus) {
      const menusNodes = menus.map(item => {
        if (Array.isArray(item.children) && item.children.length > 0) {
          return h(
            'el-submenu',
            {
              props: {
                index: item.id
              },
              key: item.id
            },
            [
              h('span', { slot: 'title' }, item.title),
              ...this.createMenus(h, item.children)
            ]
          )
        }
        return h(
          'el-menu-item',
          {
            props: {
              index: item.id
            },
            key: item.id
          },
          item.title
        )
      })
      console.log(menusNodes)
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
        this.createMenus(h, this.menus)
      )
    )
  }
}
