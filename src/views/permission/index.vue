<template>
  <app-view>
    <app-block>
      <simple-table :columns="columns" :data="data">
        <div slot="table-header" class="table-header-operate">
          <el-button v-for="operate in headerOperates" :key="operate.code" :type="operate.type||'primary'" size="small" @click="handeHeaderOperate(operate.code)">
            {{operate.label}}
          </el-button>
        </div>
        <template slot="operate" slot-scope="{row}">
          <table-operate :operates="tableOperates" @click="handleOperate(row,$event)"/>
        </template>
      </simple-table>
    </app-block>
  </app-view>
</template>
<script>
import { getAllPermission, deletePermission } from './api'
import base from '@/components/mixin/base'
export default {
  name: 'Permission',
  mixins: [base],
  data () {
    return {
      data: [],
      columns: [
        { label: '权限名', prop: 'name' },
        { label: '权限Code', prop: 'code' },
        { label: '父级权限', prop: 'parentCode' },
        { label: '操作项', prop: 'operate', columnSlot: true }
      ]
    }
  },
  created () {
    this.getData()
    this.eventBus.on('refresh', this.getData)
  },
  methods: {
    getData () {
      getAllPermission().then((data) => {
        this.data = data
      })
    },
    handleOperate (row, action) {
      switch (action.code) {
        case 'permission_delete':
          deletePermission(row).then(({ message }) => {
            this.$notify.success({
              title: message
            })
            this.getData()
          })
          break
        case 'permission_edit':
          this.$router.push({ name: 'permission_edit', params: { code: row.code } })
      }
    },
    handeHeaderOperate (code) {
      this.$router.push({ name: 'permission_add' })
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
