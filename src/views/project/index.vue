<template>
  <div class="listProject">
    <el-table
      :data="tableData.filter(
        data => !search || 
        data.name.toLowerCase().includes(search.toLowerCase()) ||
        data.owner.account.toLowerCase().includes(search.toLowerCase()))"
      size="medium">
      <el-table-column
        fixed
        prop="name"
        label="项目名"
        width="150">
      </el-table-column>
      <el-table-column
        prop="owner.account"
        label="属于"
        width="100">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="50">
      </el-table-column>
      <el-table-column
        prop="url"
        label="仓库"
        width="350">
      </el-table-column>
      <el-table-column
        prop="desc"
        label="介绍">
      </el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            :key="scope.$index"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="viewProject(scope.row)">View</el-button>
          <el-button
            size="mini"
            @click="editProject(scope.row)">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { projectList } from '../../util/api.js'
import cookie from '../../util/cookie.js'

export default {
  name: "INDEX",
  methods: {
    viewProject(row){
      this.$router.push({
        path: '/project/'+row.name+'/list',
        query: {
          id: row.id
        }
      })
    },
    editProject(row){
      this.$router.push({
        path :'/project/'+row.name+'/edit',
        query:{
          id: row.id
        }
      })
    }
  },
  data() {
    return {
      search: '',
      tableData: []
    }
  },
  mounted() {
    let projectParam = { filter: "user_id = '" + cookie.getCookie('userid')+ "'"}
    projectList(projectParam).then(res => {
      // 验证是否返回CodeError
      if(res.data['code']==null) {
        this.tableData = res.data['result']
        console.log(this.tableData)
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
.listProject {
  overflow-y: scroll;
  min-height: 80vh;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 20px 90px;
  background-color: white;
}
</style>
