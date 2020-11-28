<template>
  <app-view>
    <app-block>
      <simple-table/>
    </app-block>
  </app-view>
</template>
<script>
import SimpleTable from '@/components/simple-table'
import base from '@/components/mixin/base'
export default {
  name: 'Permission',
  mixins: [base],
  components: { SimpleTable },
  data () {
    return {
      data: []
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.table-header-operate{
  text-align:left;
  margin-bottom: 8px;
}
</style>
