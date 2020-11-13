<template>
  <app-view back-btn>
    <app-block>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名" prop="user">
              <el-input v-model="form.user" placeholder="请输入用户名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色" prop="roleId">
              <el-select v-model="form.roleId" placeholder="请选择角色">
                <el-option v-for="role in roles" :key="role.id" :value="role.id" :label="role.roleName"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址" prop="address">
              <el-input v-model="form.address" placeholder="请输入地址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align:center">
        <el-button @click="$router.go(-1)">取消</el-button>
        <el-button type="primary" @click="handlerSubmit">确定</el-button>
      </div>
    </app-block>
  </app-view>
</template>
<script>
import { required } from '@/utils/rules'
import { getRoles, postUser, getUser, putUser } from './api'
export default {
  name: 'UserUpdate',
  data () {
    return {
      form: {},
      roles: [],
      rules: {
        user: [required]
      }
    }
  },
  inject: ['eventBus'],
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  created () {
    getRoles().then((data) => {
      this.roles = data
    })
    if (this.id) {
      getUser({ id: this.id }).then((data) => {
        this.form = data
      })
    }
  },
  methods: {
    handlerSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.id) {
            putUser({ id: this.id }, this.form).then(data => {
              this.$message.success('更新成功')
              this.eventBus.emit('refresh')
              this.$router.go(-1)
            }).catch(err => {
              console.log(err)
              this.$message.error('更新失败')
            })
          } else {
            postUser(this.form).then(data => {
              this.$message.success('新增成功')
              this.$router.go(-1)
            }).catch(err => {
              console.log(err)
              this.$message.error('新增失败')
            })
          }
        }
      })
    }
  }
}
</script>
