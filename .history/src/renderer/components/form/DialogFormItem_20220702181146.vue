<template>
  <div class="dialog-form-item">
    <div class="label" :style="labelStyle">
      <slot name="label">{{ label }}</slot>
    </div>
    <div class="center"><slot></slot></div>
    <div class="tool" v-if="$slots.tool">
      <slot name="tool"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DialogFormItem',
  props: { label: String, labelWidth: String },
  provide() {
    return {
      elFormItem: this,
    }
  },
  inject: ['dialogForm'],
  computed: {
    labelStyle() {
      const style = {}
      if (this.labelWidth || this.dialogForm.labelWidth)
        style.width = this.labelWidth || this.dialogForm.labelWidth
      return style
    },
  },
  mounted() {
    // console.info('data-mount:', this.labelWidth)
  },
}
</script>

<style lang="scss" scoped>
.dialog-form-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }

  .label {
    box-sizing: border-box;
    margin-right: 15px;
    // margin-right: 1vw;
    text-align: right;
  }
  .center {
    flex: 1;
    box-sizing: border-box;
    ::v-deep .el-input,
    ::v-deep .el-select {
      width: 100%;
    }
  }
  .tool {
    margin-left: 5px;
  }
}
</style>
