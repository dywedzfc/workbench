<template>
  <div class="panel-query">
    <div class="query-bar">
      <slot name="queryBar"></slot>
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

<style lang="scss" scoped>
.query {
  &-form {
    padding-top: 10px;
    padding-left: 10px;

    ::v-deep &.el-form--inline {
      .el-form-item {
        margin-bottom: 10px;
      }
    }
  }
  &-body {
    padding: 10px;
    padding-top: 0;
  }
}
</style>
