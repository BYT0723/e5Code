<template>
  <header>
    <div class="l-content">
      <el-button plain icon="el-icon-menu" size="mini" @click="handleMenu"></el-button>
    </div>

    <div class="r-content">
      <el-dropdown trigger="click" size="mini" @command="handleDropdown">
          <img class="user" :src="userImg">
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-user-solid" command="info">个人信息</el-dropdown-item>
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import cookie from '../util/cookie'

export default {
  name: 'CommonHeader',
  data() {
    return {
      userImg: require("../assets/images/avatar.jpg")
    }
  },
  methods: {
    handleMenu() {
      this.$store.commit('collapseMenu')
    },
    handleDropdown(command) {
      switch (command) {
        case "exit": this.exit();break;
        case "info": {
          let path = '/user/userInfo';
          if ( path !== this.$router.currentRoute.path )
            this.$router.push('/user/userInfo')
          break
        }
      }
    },
    exit(){
      cookie.rmCookie('token');
      cookie.rmCookie('userid');
      console.log("exit")
      this.$router.replace('/login')
    }
  },
}
</script>

<style lang="less" scoped>
header{
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 30px;
  }
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.el-dropdown {
  display: flex;
  align-items: center;
}
</style>
