<template>
  <div class="dialog-form"><slot></slot></div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'DialogForm',
  mounted() {
    console.info('data-slot:', this.$slots.default)
    _.each(this.$slots.default, (item) => {
      console.info('data-slot-item:', item.componentOptions.propsData)
      const { propsData } = item.componentOptions
    })
  },
}
</script>

<style lang="scss" scoped></style>
