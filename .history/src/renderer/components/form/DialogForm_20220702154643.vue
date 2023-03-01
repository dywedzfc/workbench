<template>
  <div class="dialog-form"><slot></slot></div>
</template>

<script>
export default {
  name: 'DialogForm',
  mounted() {
    console.info('data-slot:', this.$slots.default)
    _.each(this.$slots.default, (item) => {
      console.info('data-slot-item:', item.componentOptions.propsData)
    })
  },
}
</script>

<style lang="scss" scoped></style>
