<template>
  <div class="dialog-form"><slot></slot></div>
</template>

<script>
export default {
  name: 'DialogForm',
  props: { labelWidth: String },
  provide() {
    return { dialogForm: this }
  },
}
</script>

<style lang="scss" scoped></style>
