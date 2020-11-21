<template>
  <app-view>
    <app-block>
      <div class="table-header-operate">
        <el-button v-for="operate in headerOperates" :key="operate.code" :type="operate.type||'primary'" size="small" @click="handeHeaderOperate(operate.code)">
          {{operate.label}}
        </el-button>
      </div>
      <el-table border :data="data" height="500">
        <el-table-column label="用户名" prop="user"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="地址" prop="address"></el-table-column>
        <el-table-column label="更新时间" prop="update_time"></el-table-column>
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
import { getUsers, deleteUser } from './api'
import base from '@/components/mixin/base'
export default {
  name: 'User',
  mixins: [base],
  data () {
    return {
      data: []
    }
  },
  created () {
    this.getData()
    this.eventBus.on('refresh', () => { this.getData() })
  },
  methods: {
    getData () {
      getUsers().then((data) => {
        this.data = data
      })
    },
    handleOperate (row, action) {
      switch (action.code) {
        case 'user_delete':
          deleteUser(row).then(({ message }) => {
            this.$notify.success({
              title: message
            })
            this.getData()
          })
          break
        case 'user_edit':
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
