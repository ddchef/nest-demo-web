<template>
  <div class="login">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <div class="login-optrate">
          <el-button type="text" size="mini">注 册</el-button>
          <el-button type="primary" size="mini" @click="login">登 录</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { postLogin } from './api'
import { required } from '@/utils/rules'
import { setToken } from '@/utils/auth'
export default {
  name: 'Login',
  data () {
    return {
      form: {},
      rules: {
        username: [required],
        password: [required]
      }
    }
  },
  methods: {
    login () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          postLogin(this.form).then((data) => {
            setToken(data.token)
            this.$router.push({ name: 'user' })
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  max-width: 400px;
  .login-optrate{
    text-align: right;
  }
}
</style>
