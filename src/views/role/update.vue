<template>
  <app-view back-btn>
    <app-block>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="角色名称" prop="roleName">
              <el-input v-model="form.roleName" placeholder="请输入角色名称"></el-input>
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
import { postRole, getRole, putRole } from './api'
export default {
  name: 'RoleUpdate',
  inject: ['eventBus'],
  data () {
    return {
      form: {},
      roles: [],
      rules: {
        roleName: [required]
      }
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    api () {
      return this.id ? putRole : postRole
    }
  },
  created () {
    if (this.id) {
      getRole({ id: this.id }).then((data) => {
        this.form = data
      })
    }
  },
  methods: {
    handlerSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.api(this.form, { id: this.id }).then(data => {
            this.$message.success(data.message)
            this.$router.go(-1)
          }).catch(err => {
            console.log(err)
            this.$message.error('操作失败')
          })
        }
      })
    }
  }
}
</script>
