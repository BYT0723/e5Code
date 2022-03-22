<template>
  <div class="login">
    <h2 class="title"><i class="el-icon-cloudy"></i>e5Code</h2>
    <el-form :label-position="labelPosition" label-width="40px" ref="loginForm" :model="formLogin" size="medium" :rules="rules">
      <el-form-item label="帐号">
        <el-input v-model="formLogin.name" placeholder="email"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formLogin.passwd" placeholder="password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login" style="width:100%">Login</el-button>
      </el-form-item>
      <el-form-item class="link">
        <el-link type="primary" href="/registry" style="float:left; margin-left:30px;">注册?</el-link>
        <el-link type="primary" href="/forgetPasswd" style="float:right; margin-right:30px;">忘记密码?</el-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import cookie from '../util/cookie'
import { login } from '../util/api.js'

export default {
  name: "LOGIN",
  data() {
    return {
      labelPosition: "right",
      formLogin: {
        name: '',
        passwd: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入账户', trigger: 'blur'},
          { type: 'email', message: '请输入正确的邮箱', trigger: ['blur','change']}
        ],
        passwd: [
          { required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    login() {
      let param = {email: this.formLogin.name,password: this.formLogin.passwd}
      login(param).then(res => {
        // 验证是否返回CodeError
        if(res.data['code']==null) {
          let userID = res.data['id']
          let token = res.data['access_token'];
          let expire = res.data['access_expire'];
          cookie.setCookie("token",token,expire)
          cookie.setCookie("userid",userID,expire)
          this.$router.push("/")
        }else{
          this.$message.error(res.data['msg'])
        }
      }).catch(err => {
        this.$message.error(err)
      })
    }
  },
}
</script>

<style>
.title {
  text-align: center;
  margin-bottom: 50px;
}
.login {
  border: 1px solid #ccc;
  border-radius: 10px;
  height: 30vh;
  padding: 80px;
  margin: 20vh auto;
  width: 350px;
  background-color: white;
}
</style>
