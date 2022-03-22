<template>
  <div class="userInfo">
    <el-card :body-style="{ padding: '0px' }" class="infoCard">
      <img src="../../assets/images/avatar.jpg" class="image">
      <div class="line"></div>
      <el-tabs :tab-position="tabPosition" style="height: 50vh;">
        <el-tab-pane label="个人信息" >
          <el-form :label-position="labelPosition" label-width="60px" :model="formEditUserInfo" size="medium" class="editUserForm">
            <el-form-item label="Email">
              <el-input v-model="formEditUserInfo.email" placeholder="email" disabled></el-input>
            </el-form-item>
            <el-form-item label="Account">
              <el-input v-model="formEditUserInfo.account" placeholder="account" disabled></el-input>
            </el-form-item>
            <el-form-item label="Name">
              <el-input v-model="formEditUserInfo.name" placeholder="name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="saveInfo">保存</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane label="访问控制">
          <el-card class="sshInfo" shadow="never">
            <div slot="header" class="clearfix">
              <span>SSH Key</span>
              <el-button style="float: right; padding: 3px 0" type="text">添加SSHKey</el-button>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
              {{'列表内容 ' + o }}
            </div>
          </el-card>
        </el-tab-pane>

        <el-tab-pane label="账户注销">
          <el-button type="danger" @click= "confirmDelete">注销帐号</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { userInfo,updateUser,deleteUser,login } from '../../util/api.js'
import cookie from '../../util/cookie.js'

export default {
  name: 'INDEX',
  data() {
    return {
      tabPosition: 'left',
      labelPosition: 'right',
      formEditUserInfo: {
        email:'',
        account:'',
        name:'',
      }
    }
  },
  methods: {
    saveInfo(){
      let param = { id: cookie.getCookie('userid'), name: this.formEditUserInfo.name };
      updateUser(param).then(res => {
        if(res.data['code'] == null){
          this.$message.success("更新成功")
        }else{
          this.$message.error(res.data['msg'])
        }
      }).catch(err => {
        this.$message.error(err)
      })
    },
    confirmDelete(){
      this.$prompt('请输入密码', '确认', { confirmButtonText: '确定', cancelButtonText: '取消',}).then(({ value }) => {
        let param = { email: this.formEditUserInfo.email, password: value }
        console.log(param)
        login(param).then(res => {
          if(res.data['code'] == null){
              this.deleteAccout()
              cookie.clearAllCookie()
              this.$router.push('/login')
              location.reload();
            }else{
              this.$message.error(res.data['msg'])
            }
        }).catch(err => {
          this.$message.error(err)
        })
      });
    },
    deleteAccout(){
      let param = { id: cookie.getCookie('userid') }
      deleteUser(param).then(res => {
        if(res.data['code'] == null){
          this.$message.success("注销成功")
        }else{
          this.$message.error(res.data['msg'])
        }
      }).catch(err => {
        this.$message.error(err)
      })
    }
  },
  mounted(){
    let userParam = { id: cookie.getCookie('userid') };
    userInfo(userParam).then(res => {
      // 验证是否返回CodeError
      if(res.data['code']==null) {
        this.formEditUserInfo.email = res.data['email']
        this.formEditUserInfo.account = res.data['account'];
        this.formEditUserInfo.name = res.data['name'];
      }else{
        this.$message.error(res.data['msg'])
      }
    }).catch(err => {
      this.$message.error(err);
    })
  }
}
</script>

<style>
.line{
  border: 3px solid #aaa;
  width: 150vh;
  height: 150px;
  border-radius: 70%;
  border-top: none;
  border-left: none;
  border-right: none;
  margin-top: -250px;
  margin-bottom: 100px;
}
.infoCard{
  border-radius: 100px;
  margin: 20px auto;
  padding-bottom: 50px;
  height: 75vh;
  width: 150vh;
  overflow-y: scroll;
}
.sshInfo{
  margin: 30px 200px;
}
.image{
  width: 200px;
  height: 200px;
  border-radius: 50%;
  display: block;
  margin: 20px auto;
}
.editUserForm{
  padding:30px 200px;
}
</style>
