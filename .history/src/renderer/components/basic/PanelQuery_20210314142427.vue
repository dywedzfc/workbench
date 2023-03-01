<template>
  <div class="panel-query">
    <div class="query-bar">
      <slot name="queryBar"></slot>
    </div>
    <div class="query-body">
      <slot></slot>
    </div>
    <div class="query-footer">
      <slot name="footer"></slot>
    </div>
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
    height: 100%;
    padding: 10px;
    padding-top: 0;
  }
}
</style>
