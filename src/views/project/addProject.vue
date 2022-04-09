<template>
  <div class="addProject">
    <h2 class="title">添加项目</h2>
    <hr style="margin-bottom: 20px">
    <el-form :label-position="labelPosition" label-width="80px" ref="addProjectForm" :model="formAddProject" size="medium">
      <el-form-item label="名称" class="input">
        <el-input v-model="formAddProject.name" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="描述" class="input">
        <el-input type="textarea" :rows="3" v-model="formAddProject.desc" placeholder="描述一下"></el-input>
      </el-form-item>
      <el-form-item label="外部仓库">
        <el-switch v-model="formAddProject.isExternal"></el-switch>
      </el-form-item>
      <el-form-item label="地址" v-show="formAddProject.isExternal" class="input">
        <el-input v-model="formAddProject.url" placeholder="url"></el-input>
      </el-form-item>
      <p>账户验证</p>
      <el-form-item label="账户" class="input">
        <el-input v-model="formAddProject.authAccount" placeholder="account"></el-input>
      </el-form-item>
      <el-form-item label="密码" class="input">
        <el-input v-model="formAddProject.authPassword" placeholder="passwrod" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addProject">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addProject } from '../../util/api.js'
export default {
  name: "ADDPROJECT",
  data() {
    return {
      labelPosition: "left",
      formAddProject: {
        name: '',
        desc: '',
        isExternal: false,
        url: '',
        authAccount: '',
        authPassword: '',
      },
    }
  },
  methods: {
    addProject(){
      if (!this.formAddProject.isExternal){
        this.formAddProject.url = ''
      }
      let param = {name: this.formAddProject.name, desc: this.formAddProject.desc,url: this.formAddProject.url,username: this.formAddProject.authAccount, password: this.formAddProject.authPassword}
      addProject(param).then(res => {
        // 验证是否返回CodeError
        if(res.data['code']==null) {
          this.$message.success("添加成功")
          this.$router.back(-1)
        }else{
          this.$message.error(res.data['msg'])
        }
      }).catch(err => {
        this.$message.error(err)
      })

    }
  }
}
</script>

<style>
.addProject{
  overflow: hidden;
  min-height: 80vh;
  border: 1px solid #ccc;
  margin: 20px 50px;
  padding: 20px;
  border-radius: 20px;
  background-color: white;
}
.input {
  width: 80vh;
}
</style>
