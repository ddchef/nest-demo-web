<template>
  <app-view>
    <app-block>
      <div class="table-header-operate">
        <el-button v-for="operate in headerOperates" :key="operate.code" :type="operate.type||'primary'" size="small" @click="handeHeaderOperate(operate.code)">
          {{operate.label}}
        </el-button>
      </div>
      <el-table border :data="data">
        <el-table-column label="权限名" prop="name"></el-table-column>
        <el-table-column label="权限Code" prop="code"></el-table-column>
        <el-table-column label="父级权限" prop="parentCode"></el-table-column>
        <el-table-column label="操作项" prop="operate" width="200">
          <template slot-scope="{row}">
            <table-operate :operates="tableOperates" @click="handleOperate(row,$event)"/>
          </template>
        </el-table-column>
      </el-table>
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
      data: []
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
