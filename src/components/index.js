import AppView from './app-view.vue'
import AppBlock from './app-block.vue'
import SimpleTable from '@/components/simple-table'

function install (Vue) {
  Vue.component(AppBlock.name, AppBlock)
  Vue.component(AppView.name, AppView)
  Vue.component(SimpleTable.name, SimpleTable)
}

export default {
  install
}
