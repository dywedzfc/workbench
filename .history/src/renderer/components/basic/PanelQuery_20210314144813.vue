<template>
  <div class="panel-query">
    <div class="query-bar" ref="query-bar">
      <slot name="query-bar"></slot>
    </div>
    <div class="query-body" :style="bodyStyle">
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
      // let height = 0
      if (queryBar) console.info('style-height-1:', this.$refs['query-bar'])
      // height += this.$refs['query-bar'].offsetHeight
      if (footer) console.info('style-height-2:', this.$refs['footer'].offsetHeight)
      //  height += this.$refs['footer'].offsetHeight
      console.info('body-style:', this.$slots, queryBar, footer)
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
