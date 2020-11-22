<template>
  <app-view>
    <app-block>
      <div class="table-header-operate">
        <el-button v-for="operate in headerOperates" :key="operate.code" :type="operate.type||'primary'" size="small" @click="handeHeaderOperate(operate.code)">
          {{operate.label}}
        </el-button>
      </div>
      <el-table border :data="data" height="500">
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
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
import { getRoles, deleteRole } from './api'
import base from '@/components/mixin/base'
export default {
  name: 'Role',
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
      getRoles().then((data) => {
        this.data = data
      })
    },
    handleOperate (row, action) {
      switch (action.code) {
        case 'role_delete':
          deleteRole(row).then(({ message }) => {
            this.$notify.success({
              title: message
            })
            this.getData()
          })
          break
        case 'role_edit':
          this.$router.push({ name: 'role_edit', params: { id: row.id } })
      }
    },
    handeHeaderOperate (code) {
      this.$router.push({ name: 'role_add' })
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
