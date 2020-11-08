<template>
  <el-table :data="data">
    <el-table-column label="用户名" prop="user"></el-table-column>
    <el-table-column label="姓名" prop="name"></el-table-column>
    <el-table-column label="地址" prop="address"></el-table-column>
    <el-table-column label="更新时间" prop="update_time"></el-table-column>
  </el-table>
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
