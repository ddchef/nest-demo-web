<template>
  <app-view back-btn>
    <app-block>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="规则名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入规则名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目标仓库URL" prop="repository">
              <el-input v-model="form.repository" placeholder="请输入目标仓库URL"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="分支规则" prop="branch">
              <el-input v-model="form.branch" placeholder="请输入分支规则"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目标仓库用户名" prop="repository_user">
              <el-input v-model="form.repository_user" placeholder="请输入目标仓库用户名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目标仓库密码" prop="repository_password">
              <el-input v-model="form.repository_password" placeholder="请输入目标仓库密码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="提交仓库" prop="dist_repository">
              <el-input v-model="form.dist_repository" placeholder="请输入提交仓库"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="提交仓库用户名" prop="dist_repository_user">
              <el-input v-model="form.dist_repository_user" placeholder="请输入提交仓库用户名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="提交仓库密码" prop="dist_repository_password">
              <el-input v-model="form.dist_repository_password" placeholder="请输入提交仓库密码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="执行命令" prop="shell">
              <el-input v-model="form.shell" placeholder="请输入执行命令"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
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
import { postBuilderRule } from './api'
export default {
  name: 'RoleUpdate',
  inject: ['eventBus'],
  data () {
    return {
      form: {},
      permissions: [],
      modules: [],
      rules: {
        name: [required],
        code: [required]
      }
    }
  },
  computed: {
    code () {
      return this.$route.params.code
    },
    api () {
      return postBuilderRule
    }
  },
  created () {
  },
  methods: {
    handlerSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.api(this.form).then(data => {
            this.$notify.success({ title: data.message })
            this.eventBus.emit('refresh')
            this.$router.go(-1)
          }).catch(err => {
            this.$message.error(err.message)
          })
        }
      })
    }
  }
}
</script>
