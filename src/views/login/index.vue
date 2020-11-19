<template>
  <div class="login">
    <div v-show="!signUp" class="sign-in animate__animated" :class="signInClass">
      <div style="text-align:center">用户登录</div>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div class="login-optrate">
        <el-button type="text" size="mini" @click="signUp = true">注 册</el-button>
        <el-button type="primary" size="mini" @click="login">登 录</el-button>
      </div>
    </div>
    <div class="sign-up" v-show="signUp">
      <div style="text-align:center">用户注册</div>
      <el-form ref="signUp" :model="signUpForm" :rules="rules">
        <el-form-item label="用户名" prop="user">
          <el-input v-model="signUpForm.user" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="signUpForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="signUpForm.address" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="signUpForm.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="text" size="mini" @click="signUp = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="handleSignUp">注 册</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { postLogin, postUser } from './api'
import { required } from '@/utils/rules'
import { setToken } from '@/utils/auth'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      signUp: false,
      signUpForm: {},
      rules: {
        user: [required],
        username: [required],
        password: [required]
      },
      signInClass: {
        animate__bounce: false,
        animate__fadeOutUpBig: false
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
          }).catch(err => {
            this.$message.error(err.message)
          })
        }
      })
    },
    handleSignUp () {
      this.$refs.signUp.validate(valid => {
        if (valid) {
          postUser(this.signUpForm).then(data => {
            this.$message.success('注册成功')
            this.signUp = false
            this.form.username = this.signUpForm.user
            this.form.password = this.signUpForm.password
            this.signUpForm = {}
          }).catch(err => {
            this.$message.error(err.message)
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
  margin: 0px auto;
  .sign-in,.sign-up{
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.3);
  }
  .login-optrate{
    text-align: right;
  }
}
</style>
