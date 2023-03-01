<template>
  <div class="panel-query">
    <div class="query-bar" ref="query-bar">
      <slot name="query-bar"></slot>
    </div>
    <div class="query-body" :style="bodyStyle()">
      <slot></slot>
    </div>
    <div class="query-footer" ref="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PanelQuery',
  computed: {},
  methods: {
    bodyStyle() {
      const style = {}
      const { 'query-bar': queryBar, footer } = this.$slots
      let height = 0
      if (queryBar) height += this.$refs['query-bar']?.offsetHeight || 0
      console.info('style-height-1:', height)
      if (footer) height += this.$refs['footer']?.offsetHeight || 0
      console.info('style-height-2:', this.$refs['footer'].offsetHeight)
      console.info('body-style:', this.$slots, queryBar, footer)
      style.width = `calc(100% - ${height}px)`
      return style
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-query {
  height: 100%;
}
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
