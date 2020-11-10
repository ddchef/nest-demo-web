import AppView from './app-view.vue'
import AppBlock from './app-block.vue'

function install (Vue) {
  Vue.component(AppBlock.name, AppBlock)
  Vue.component(AppView.name, AppView)
}

export default {
  install
}
