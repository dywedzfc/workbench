<template>
  <div class="panel-query">
    <div class="query-bar">
      <el-form class="query-form" inline>
        <el-form-item>
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="query-body">
      <el-table border>
        <el-table-column label="名称"></el-table-column>
        <el-table-column label="类型"></el-table-column>
      </el-table>
    </div>
    <div class="query-footer"></div>
  </div>
</template>

<script>
export default {
  name: 'PanelQuery'
}
</script>

<style lang="scss" scoped></style>
