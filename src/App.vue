<template>
  <div id="app">
    <router-view v-if="!$route.meta.showCommon"></router-view>
    <div v-if="$route.meta.showCommon">
      <el-container style="height: 100%;">
        <el-aside width="auto">
          <common-aside></common-aside>
        </el-aside>

        <el-container>
          <el-header>
            <common-header></common-header>
          </el-header>

          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
/* import HelloWorld from './components/HelloWorld.vue' */
import CommonAside from './components/CommonAside.vue'
import CommonHeader from './components/CommonHeader.vue'

export default {
  name: 'App',
  components: {
    CommonHeader,
    CommonAside,
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  background-color: #DCDFE6;
  scrollbar-width: none;
}
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
/* #app { */
/*     height: 100vh; */
/* } */
.el-header {
  background-color: #24292f;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
  height: 100vh;
}
</style>
