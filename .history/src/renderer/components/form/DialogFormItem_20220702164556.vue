<template>
  <div class="dialog-form-item">
    <div class="label" :style="labelStyle">
      <slot name="label">{{ label }}</slot>
    </div>
    <div class="center"><slot></slot></div>
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
  inject: ['elForm'],
  computed: {
    labelStyle() {
      const style = {}
      if (this.labelWidth) style.width = this.labelWidth
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
    margin-right: 5px;
    box-sizing: border-box;
  }
  .center {
    box-sizing: border-box;
  }
}
</style>
