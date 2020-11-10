<template>
  <app-view>
    <app-block>
      <div class="table-header-operate">
        <el-button type="primary" size="small" @click="handeHeaderOperate('add')">
          新增
        </el-button>
        <el-button type="danger" size="small">
          删除
        </el-button>
      </div>
      <el-table border :data="data" height="500">
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="操作项" prop="operate" width="200">
          <template slot-scope="{row}">
            <table-operate :operates="operates" @click="handleOperate(row,$event)"/>
          </template>
        </el-table-column>
      </el-table>
    </app-block>
  </app-view>
</template>
<script>
import { getRoles, deleteRole } from './api'
import TableOperate from '@/components/table-operate'
export default {
  name: 'Role',
  components: {
    TableOperate
  },
  data () {
    return {
      data: [],
      operates: [
        {
          code: 'edit',
          label: '编辑'
        },
        {
          code: 'delete',
          label: '删除',
          type: 'danger',
          popover: true,
          title: '确认删除？'
        }
      ]
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      getRoles().then((data) => {
        this.data = data
      })
    },
    handleOperate (row, action) {
      switch (action.code) {
        case 'delete':
          deleteRole(row).then(({ message }) => {
            this.$notify.success({
              title: message
            })
            this.getData()
          })
          break
        case 'edit':
          this.$router.push({ name: 'role-edit', params: { id: row.id } })
      }
    },
    handeHeaderOperate (code) {
      this.$router.push({ name: 'role-add' })
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
