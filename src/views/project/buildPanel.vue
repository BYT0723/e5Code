<template>
  <div class="buildPanelContent">
    <el-row class="buildRow">
      <el-select v-model="buildPlan" filterable placeholder="请选择构建方案" style="width:100%">
        <el-option
          v-for="plan in buildPlans"
          :key="plan.value"
          :label="plan.label"
          :value="plan.value">
        </el-option>
      </el-select>
      <el-button type="primary" style="margin-left: 10px" @click="editBuildPlan">EditBuildPlan</el-button>
    </el-row>
    <el-row class="buildRow">
      <el-input
        v-model="imageUrl"
        :disabled="true">
      </el-input>
      <el-button type="success" style="margin-left: 10px" @click="buildProject">Build</el-button>
    </el-row>
    <el-input v-model="buildLog" type="textarea" rows="32" resize="none" readonly="true" style="margin-bottom: 5px"></el-input>
    <el-row class="buildRow">
      <el-progress :text-inside="true" :stroke-width="40" :percentage="buildProgress" :status="buildStatus" style="width:95%"></el-progress>
      <el-button type="primary" round disabled style="margin-left:10px">Run</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'BUILDPANEL',
  data() {
    return {
      buildPlans: [],
      buildPlan: '',
      imageUrl: '',
      buildLog: '',
      buildStatus: '',
      buildProgress: 10
    }
  }
}
</script>

<style>
.buildPanelContent {
  width: 120vh;
  margin: 0 auto;
}
.buildRow{
  display: flex;
  justify-content: space-between;
  padding-right:10px;
  margin-bottom: 10px;
}
</style>
