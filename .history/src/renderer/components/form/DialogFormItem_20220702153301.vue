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
  computed: {
    labelStyle() {
      const style = {}
      if (this.labelWidth) style.width = this.labelWidth
      return style
    },
  },
}
</script>

<style lang="scss" scoped>
.dialog-form-item {
  display: flex;
}
</style>
