<template>
  <div class="app-block">
    <div class="table-header-operate">
      <el-button type="primary" size="small">
        新增
      </el-button>
      <el-button type="danger" size="small">
        删除
      </el-button>
    </div>
    <el-table border :data="data" height="500">
      <el-table-column label="用户名" prop="user"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="地址" prop="address"></el-table-column>
      <el-table-column label="更新时间" prop="update_time"></el-table-column>
      <el-table-column label="操作项" prop="operate">
        <el-button type="text" size="small">
          编辑
        </el-button>
        <el-button type="text" class="el-button_danger" size="small">
          删除
        </el-button>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getUsers } from './api'
export default {
  name: 'User',
  data () {
    return {
      data: []
    }
  },
  created () {
    getUsers().then((data) => {
      this.data = data
    })
  }
}
</script>
<style lang="scss" scoped>
.table-header-operate{
  text-align:left;
  margin-bottom: 8px;
}
</style>
