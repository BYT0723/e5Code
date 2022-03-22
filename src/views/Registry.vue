<template>
  <div class="registry">
    <h2 class="title"><i class="el-icon-cloudy"></i>e5Code</h2>
    <el-form :label-position="labelPosition" label-width="80px" ref="loginForm" :model="formRegister" size="medium">
      <el-form-item label="帐号">
        <el-input v-model="formRegister.email" placeholder="email"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="formRegister.account" placeholder="account"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="formRegister.name" placeholder="your name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="formRegister.passwd" placeholder="password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input type="password" v-model="formRegister.repasswd" placeholder="re-password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { register } from '../util/api.js'

export default {
  name: "REGISTRY",
  data() {
    return {
      labelPosition: "right",
      formRegister: {
        email: "",
        account: "",
        name: "",
        passwd: "",
        repasswd: "",
      }
    }
  },
  methods: {
    register(){
      let param = {
        email: this.formRegister.email,
        account: this.formRegister.account,
        name: this.formRegister.name,
        password: this.formRegister.passwd,
      }
      register(param).then(res => {
        // 验证是否返回CodeError
        if(res.data['code']==null) {
          this.$message({
            message: '注册成功',
            type: 'success'
          })
          this.$router.push("/login")
        }else{
          alert(res.data['msg'])
        }
      }).catch(err => {
        alert(err);
      })
    }
  }
}
</script>

<style>
.title {
  text-align: center;
  margin-bottom: 50px;
}
.registry {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 40px 80px;
  margin: 20vh auto;
  width: 350px;
  background-color: white;
}
</style>
