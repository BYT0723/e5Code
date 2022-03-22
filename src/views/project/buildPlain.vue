<template>
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
</template>

<script>
export default {
  name: "BUILDPLAIN",
}
</script>

<style>

</style>
