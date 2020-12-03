<template>
  <app-view>
    <app-block>
      <simple-table :data="data" :columns="columns">
      </simple-table>
    </app-block>
  </app-view>
</template>
<script>
import base from '@/components/mixin/base'
import { getBuilderLogs } from './api'
export default {
  name: 'BuilderTask',
  mixins: [base],
  data () {
    return {
      data: [],
      columns: [
        { label: '分支名称', prop: 'branch' },
        { label: '仓库名称', prop: 'repositoryName' },
        { label: '推送人', prop: 'pusherUserName' },
        { label: '提交信息', prop: 'commitMessage' },
        { label: '作者', prop: 'commitAuthorName' },
        { label: '状态', prop: 'state' },
        { label: '开始时间', prop: 'start_time' },
        { label: '结束时间', prop: 'end_time' },
        { label: '耗时', prop: 'building_time' },
        { label: '操作', prop: 'operate' }
      ]
    }
  },
  created () {
    this.getData()
    this.eventBus.on('refresh', this.getData)
  },
  methods: {
    handeHeaderOperate (code) {
      this.$router.push({ name: code })
    },
    getData () {
      getBuilderLogs().then(data => {
        this.data = data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.table-header-operate{
  text-align:left;
  margin-bottom: 8px;
}
</style>
