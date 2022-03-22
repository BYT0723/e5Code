<template>
  <el-menu default-active="1-4-1" 
    class="el-menu-vertical-demo" 
    @open="handleOpen" 
    @close="handleClose" 
    :collapse="isCollapse" 
    background-color="#545c64"
    text-color="#fff" 
    active-text-color="#ffd04b"
  >
    <h2><i class="el-icon-cloudy"></i>{{isCollapse ? '' : 'e5Code'}}</h2>

    <el-menu-item @click="handleSelect(item)" v-for="item in noChildren" :index="item.path" :key="item.path">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>

    <el-submenu v-for="item in hasChildren" :index="item.path" :key="item.path">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
        <el-menu-item @click="handleSelect(subItem)" :index="subItem.path">{{subItem.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

  </el-menu>
</template>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
    height: 100%;
    border: none;
    h2 {
      color: #fff;
      text-align: center;
      line-height: 48px;
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        menu: [
          {
            path: '/',
            name: 'home',
            label: '首页',
            icon: 's-home',
            url: 'Home/Home',
          },
          {
            path: '/project',
            label: '项目',
            icon: 'menu',
            children: [
              {
                path: '/project/list',
                name: 'project',
                label: '我的项目',
                icon: 'menu',
                url: "Project/Project" 
              },
              {
                path: '/project/build',
                name: 'build',
                label: '项目构建',
                icon: 'menu',
                url: "Build/Build" 
              }
            ]
          },
          {
            path: '/info',
            name: 'info',
            label: '关于我们',
            icon: 'setting',
            url: 'Info/Info',
          }
        ]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log("Open :",key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log("Close :",key, keyPath);
      },
      handleSelect(item) {
        if ( item.path != this.$router.currentRoute.fullPath){
          this.$router.push(item.path)
        }
      }
    },
    computed: {
      noChildren() {
        return this.menu.filter(item => !item.children)
      },
      hasChildren() {
        return this.menu.filter(item => item.children)
      },
      isCollapse() {
        return this.$store.state.tab.isCollapse
      }
    }
  }
</script>
