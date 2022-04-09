<template>
  <div class="frame">
    <p class="lastCommit">{{lastCommit.user + ' : ' + lastCommit.commit}}</p>
    <div class="contentDetail">
      <el-table
        :data="tableData"
        size="medium"
        style="border:1px solid #eee;border-radius:10px">
        <el-table-column
          width="40px">
          <template slot-scope="scope">
            <i :class="getIcon(scope.row)"></i>
          </template>
        </el-table-column>
        <el-table-column
          label="文件名"
          width="200px">
          <template slot-scope="scope">
            <el-button type="text" @click="handleTabItemClick(scope.row)">{{ scope.row.name }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="大小"
          width="80px">
          <template slot-scope="scope">
            {{ getSize(scope.row.size) }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="commitInfo.message"
          label="提交">
        </el-table-column>
      </el-table>
      <div class="opearte">
        <el-row><el-button type="primary" class="button" @click="editFiles" round>Edit</el-button></el-row>
        <el-row><el-button type="success" class="button" @click="buildProject" round>Build</el-button></el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { listProjectAllFiles } from '../../util/api.js'

export default {
  name: "DETAIL",
  data() {
    return {
      lastCommit: {
        user: "BYT0723",
        commit: "latest commit"
      },
      files: [],
      tableData: [],
      nowPath: "",
      sizeUnit: ["B","KB","M","G"]
    }
  },
  mounted(){
    if(this.$route.params.projectName){
      document.title = this.$route.params.projectName +' - e5Code'
    }
    let param = { id: this.$route.query.id, isWork: false }
    listProjectAllFiles(param).then(res => {
      if(res.data['code']==null) {
        this.files = res.data['result']
        this.files.sort((a,b) => {
          return a.isFile - b.isFile
        })
        this.tableData = this.files
      }else{
        this.$message.error(res.data['msg'])
      }
    }).catch(err => {
      this.$message.error(err)
    })
  },
  watch: {
  },
  methods: {
    getIcon(file) {
      let prefix = "el-icon-"
      if(!file.isFile){
        return prefix+"folder"
      }
      return prefix+"document"
    },
    getSize(size) {
      let index = 0
      while(size >= 1024){
        size /= 1024
        size = size.toFixed(2)
        index++
      }
      return size + " " + this.sizeUnit[index]
    },
    handleTabItemClick(file) {
      if(file.isFile){
        this.$router.push({
          path: "/project/"+this.$route.params.projectName+'/coding',
          query: {
            id: this.$route.query.id,
            filePath: file.path
          }
        })
      }else{
        this.tableData = this.tableData.filter(t => {
          return t.path === file.path
        })[0].children
      }
    },
    editFiles(){
      this.$router.push({
        path: '/project/'+this.$route.params.projectName+'/coding',
        query: {
          id: this.$route.query.id
        }
      })
    },
    buildProject(){
      this.$router.push({
        path: "/project/"+this.$route.params.projectName+"/build"
      })
    },
  }
}
</script>

<style>
.frame{
  width: 900px;
  margin: 0 auto;
}
.contentDetail {
  display: flex;
  justify-content: space-between;
}
.table{
  width: 800px;
}
.opearte{
  width: 100px;
}
.button {
  width: 80px;
  margin-left: 20px;
  margin-bottom: 10px;
}
</style>
