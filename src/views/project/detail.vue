<template>
  <div class="content">
    <p class="lastCommit">{{lastCommit.user + ' : ' + lastCommit.commit}}</p>
    <el-table
      :data="tableData"
      size="medium"
      style="border:1px solid #eee;border-radius:10px">
      <el-table-column
        prop="type"
        label="类型"
        width="50px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="文件名"
        width="200px">
      </el-table-column>
      <el-table-column
        align="center"
        prop="commit"
        label="提交"
        width="400px">
      </el-table-column>
      <el-table-column
        align="right"
        prop="data"
        label="提交时间"
        width="200px">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "DETAIL",
  data() {
    return {
      lastCommit: {
        user: "BYT0723",
        commit: "latest commit"
      },
      tableData: [
        {
          type: "F",
          name: "README.md",
          commit: "latest commit",
          data: "a year ago"
        },
        {
          type: "D",
          name: "README.md",
          commit: "latest commit",
          data: "a year ago"
        }
      ]
    }
  },
  mounted(){
    if(this.$route.params.projectName){
      document.title = this.$route.params.projectName +' - e5Code'
    }
  }
}
</script>

<style>
.content {
  width: 852px;
  margin: 0 auto;
}
</style>
