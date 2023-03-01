<template>
  <div class="dialog-form"><slot></slot></div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'DialogForm',
  props: { labelWidth: String },
  mounted() {
    console.info('data-slot:', this.$slots.default)
    if()
    _.each(this.$slots.default, (item) => {
      console.info('data-slot-item:', item.componentOptions.propsData)
      const { propsData } = item.componentOptions
      if(!propsData.labelWidth)
    })
  },
}
</script>

<style lang="scss" scoped></style>
