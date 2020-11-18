<template>
  <app-view back-btn>
    <app-block>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="权限名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入权限名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权限Code" prop="code">
              <el-input v-model="form.code" placeholder="请输入权限Code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="父级权限" prop="parentCode">
              <el-select v-model="form.parentCode" placeholder="请选择父级权限">
                <el-option v-for="opt in permissions" :key="opt.code" :label="opt.name" :value="opt.code"></el-option>
              </el-select>
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
import { postPermission, getPermission, putPermission, getAllPermission } from './api'
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
      return this.code ? putPermission : postPermission
    }
  },
  created () {
    getAllPermission().then(data => {
      this.permissions = data
    })
    if (this.code) {
      getPermission({ code: this.code }).then((data) => {
        this.form = data
      })
    }
  },
  methods: {
    handlerSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.api(this.form, { code: this.code }).then(data => {
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
