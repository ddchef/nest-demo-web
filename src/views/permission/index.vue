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
        <el-table-column label="权限名" prop="name"></el-table-column>
        <el-table-column label="权限Code" prop="code"></el-table-column>
        <el-table-column label="父级权限" prop="parentCode"></el-table-column>
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
import { getAllPermission, deletePermission } from './api'
import TableOperate from '@/components/table-operate'
import EventBus from '@/utils/eventBus'
const eventBus = new EventBus()
export default {
  name: 'Role',
  components: {
    TableOperate
  },
  provide: {
    eventBus
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
    eventBus.on('refresh', this.getData)
  },
  methods: {
    getData () {
      getAllPermission().then((data) => {
        this.data = data
      })
    },
    handleOperate (row, action) {
      switch (action.code) {
        case 'delete':
          deletePermission(row).then(({ message }) => {
            this.$notify.success({
              title: message
            })
            this.getData()
          })
          break
        case 'edit':
          this.$router.push({ name: 'permission-edit', params: { code: row.code } })
      }
    },
    handeHeaderOperate (code) {
      this.$router.push({ name: 'permission-add' })
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
