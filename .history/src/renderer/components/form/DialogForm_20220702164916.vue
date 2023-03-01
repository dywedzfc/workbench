<template>
  <div class="dialog-form"><slot></slot></div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'DialogForm',
  props: { labelWidth: String },
  provide() {
    return { dialogForm: this }
  },
}
</script>

<style lang="scss" scoped></style>
