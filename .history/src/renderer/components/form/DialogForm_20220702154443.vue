<template>
  <div class="dialog-form"><slot></slot></div>
</template>

<script>
export default {
  name: 'DialogForm',
  mounted() {
    console.info('data-slot:', this.$slots)
  },
}
</script>

<style lang="scss" scoped></style>
