<template>
  <el-row class="home" :gutter="24">
    <el-card shadow="hover" class="user">
      <img class="Img" :src="userImg">
      <div class="userinfo" v-show="!isEditInfo">
          <h2 class="username">{{user.name}}</h2>
          <p class="account">{{user.account}}</p>
          <el-button type="primary" plain class="editButton" @click="editUser" style="width:100%">edit</el-button>
      </div>
      <div class="userInfoForm" v-show="isEditInfo">
        <el-form :label-position="labelPosition" :model="formEditUserInfo" size="medium">
          <el-form-item label="Account">
            <el-input v-model="formEditUserInfo.account" placeholder="account" disabled></el-input>
          </el-form-item>
          <el-form-item label="Name">
            <el-input v-model="formEditUserInfo.name" placeholder="name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="saveInfo">保存</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-col :span="12" style="border:1px solid #ccc;border-radius: 10px;padding-bottom:40px;background-color: #eee;">
        <p style="font-weight: bold; font-size: 30px;">Projects</p>
        <hr>
        <div class="projects">
          <el-card shadow="hover" class="project" v-for="item in projects" :index="item.name" :key="item.name">
            <div class="projectInfo">
              <el-link :underline="false" class="name" @click="projectDetail(item)">{{item.name}}</el-link>
              <p class="owner"><i class="el-icon-user-solid"></i> {{item.owner.account}}</p>
              <p class="desc">{{item.desc}}</p>
            </div>
          </el-card>
          <el-button @click="addProject" icon="el-icon-circle-plus" class="project"></el-button>
        </div>
    </el-col>
  </el-row>
</template>

<script>
import cookie from '../../util/cookie';
import { userInfo,projectList,updateUser } from '../../util/api.js'

export default {
  name: "INDEX",
  data() {
    return {
      userImg: require("../../assets/images/avatar.jpg"),
      user: {},
      projects: [],
      isEditInfo: false,
      labelPosition: 'left',
      formEditUserInfo: {
        account: '',
        email: '',
        name: '',
      }
    }
  },

  methods: {
    addProject(){
      this.$router.push('/project/add')
    },
    projectDetail(item){
      this.$router.push('/project/list/'+item.name)
    },
    editUser(){
      this.isEditInfo = true
    },
    saveInfo(){
      let param = { id: cookie.getCookie('userid'), name: this.formEditUserInfo.name }
      updateUser(param).then(res => {
        if(res.data['code']==null) {
          this.$message.success("修改成功")
          this.user.name = this.formEditUserInfo.name
          this.cancel()
        }else{
          this.$message.error(res.data['msg'])
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    cancel(){
      this.isEditInfo = false
    }
  },
  mounted(){
    let userParam = { id: cookie.getCookie('userid') };
    userInfo(userParam).then(res => {
      // 验证是否返回CodeError
      if(res.data['code']==null) {
        this.user = res.data
        this.formEditUserInfo.account = res.data['account'];
        this.formEditUserInfo.name = res.data['name'];
      }else{
        this.$message.error(res.data['msg'])
      }
    }).catch(err => {
      this.$message.error(err);
    })

    let projectParam = { filter: "user_id = '" + cookie.getCookie('userid')+ "'"}
    projectList(projectParam).then(res => {
      // 验证是否返回CodeError
      if(res.data['code']==null) {
        this.projects = res.data['result']
      }else{
        this.$message.error(res.data['msg'])
      }
    }).catch(err => {
      this.$message.error(err);
    })
  }
}
</script>


<style lang="less" scoped>
.home {
  display: flex;
}
.user {
  margin-top: 100px;
  margin-left: 15%;
  margin-right: 3%;
  height: 100%;
  border-radius: 20px;
}
.Img {
  width: 250px;
  height: 250px;
  border-radius: 50%;
}
.projects {
  margin-left: 5vh;
  height: 65vh;
  overflow-y: scroll;
}
.project {
  float:left;
  height: 200px;
  width: 45%;
  margin-top: 15px;
  margin-right: 2%;
  border-radius: 10px;
}
.name {
  font-size: 25px;
  text-decoration: none;
}
.owner {
  font-size: 20px;
}
.desc {
  font-size: 10px;
}
</style>
