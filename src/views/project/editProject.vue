<template>
  <div class="editProject">
    <h2 class="title">项目信息</h2>
    <hr style="margin-bottom: 20px">
    <el-form :label-position="labelPosition" label-width="80px" ref="editProjectForm" :model="formEditProject" size="medium">
      <el-form-item label="名称" class="input">
        <el-input v-model="formEditProject.name" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="描述"  class="input">
        <el-input type="textarea" :rows="3" v-model="formEditProject.desc" placeholder="描述一下"></el-input>
      </el-form-item>
      <el-form-item label="地址" class="input">
        <el-input v-model="formEditProject.url" placeholder="url" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveProject">保存</el-button>
        <el-button type="danger" @click="removeProject">删除项目</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<style>
.editProject{
  min-height: 80vh;
  overflow: hidden;
  margin: 20px 50px;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 20px;
}
.input {
  width: 80vh;
}
</style>

<script>
import { getProject,updateProject,deleteProject } from '../../util/api.js'
export default {
  name: "EDITPROJECT",
  data() {
    return {
      labelPosition: "left",
      formEditProject: {
        name: '',
        desc: '',
        url: '',
      },
    }
  },
  methods: {
    saveProject(){
      let param = {id: this.$route.query.id,name: this.formEditProject.name, desc: this.formEditProject.desc}
      updateProject(param).then(res => {
        if(res.data['code']==null) {
          this.$message.success("保存成功")
          this.$router.back(-1)
        }else{
          this.$message.error(res.data['msg'])
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    removeProject(){
      let param = {id: this.$route.query.id}
      deleteProject(param).then(res => {
        if(res.data['code']==null) {
          this.$message.success("删除成功")
          this.$router.back(-1)
        }else{
          this.$message.error(res.data['msg'])
        }
      }).catch(err => {
        this.$message.error(err)
      })

    }
  },
  mounted() {
    let param = { id: this.$route.query.id }
    getProject(param).then(res =>{
      if(res.data['code']==null) {
        this.formEditProject.name = res.data['name']
        this.formEditProject.desc = res.data['desc']
        this.formEditProject.url = res.data['url']
      }else{
        this.$message.error(res.data['msg'])
      }
    }).catch(err => {
      this.$message.error(err)
    })

    if(this.$route.params.projectName){
      document.title = this.$route.params.projectName +' - e5Code'
    }
  }
}
</script>
