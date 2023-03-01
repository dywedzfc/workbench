<template>
  <div class="dialog-form"><slot></slot></div>
</template>

<script>
export default {
  name: 'DialogForm',
  moment() {
    console.info('data-slot:', this.$slots)
  },
}
</script>

<style lang="scss" scoped></style>
