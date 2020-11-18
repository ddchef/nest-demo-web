<template>
  <app-view>
    <app-block>
      <div class="table-header-operate">
        <el-button v-if="permissions['user_add']" type="primary" size="small" @click="handeHeaderOperate('add')">
          新增
        </el-button>
        <el-button v-if="permissions['user_delete']" type="danger" size="small">
          删除
        </el-button>
      </div>
      <el-table border :data="data" height="500">
        <el-table-column label="用户名" prop="user"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="地址" prop="address"></el-table-column>
        <el-table-column label="更新时间" prop="update_time"></el-table-column>
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
import { getUsers, deleteUser } from './api'
import TableOperate from '@/components/table-operate'
import EventBus from '@/utils/eventBus'
import { mapGetters } from 'vuex'
const eventBus = new EventBus()
const operates = [
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
export default {
  name: 'User',
  components: {
    TableOperate
  },
  provide: {
    eventBus
  },
  data () {
    return {
      data: []
    }
  },
  computed: {
    ...mapGetters(['permissions']),
    operates () {
      return operates.filter(item => this.permissions[item.code])
    }
  },
  created () {
    this.getData()
    eventBus.on('refresh', () => { this.getData() })
  },
  methods: {
    getData () {
      getUsers().then((data) => {
        this.data = data
      })
    },
    handleOperate (row, action) {
      switch (action.code) {
        case 'delete':
          deleteUser(row).then(({ message }) => {
            this.$notify.success({
              title: message
            })
            this.getData()
          })
          break
        case 'edit':
          this.$router.push({ name: 'user-edit', params: { id: row.id } })
      }
    },
    handeHeaderOperate (code) {
      this.$router.push({ name: 'user-add' })
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
