import { mapGetters } from 'vuex'
import EventBus from '@/utils/eventBus'
import * as permissions from './permission-map'
import TableOperate from '@/components/table-operate'
const eventBus = new EventBus()
export default {
  components: {
    TableOperate
  },
  provide: {
    eventBus
  },
  data () {
    return {
      eventBus
    }
  },
  computed: {
    ...mapGetters(['permissions']),
    tableOperates () {
      if (!this.$options.name) throw new Error('component name is null')
      const tableOperates = permissions[this.$options.name].tableOperates
      return tableOperates.filter(item => this.permissions[item.code])
    },
    headerOperates () {
      if (!this.$options.name) throw new Error('component name is null')
      const headerOperates = permissions[this.$options.name].headerOperates
      return headerOperates.filter(item => this.permissions[item.code])
    }
  }
}
