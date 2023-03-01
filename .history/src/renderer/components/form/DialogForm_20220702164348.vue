<template>
  <div class="dialog-form"><slot></slot></div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'DialogForm',
  props: { labelWidth: String },
  provide() {
    return {
      dialogForm: this,
    }
  },
  mounted() {
    console.info('data-slot:', this.$slots.default)
    if (this.labelWidth) {
      _.each(this.$slots.default, (item) => {
        console.info('data-slot-item:', item.child, item.child.$options.propsData, this.$props)
        const { labelWidth } = item.child.$props
        // if (!('labelWidth' in propsData)) item.labelWidth = this.labelWidth
        if (labelWidth == undefined) {
          // item.componentOptions.propsData.labelWidth = this.labelWidth
          item.child.labelWidth = this.labelWidth
        }
        console.info('data-slot-item-2:', item.componentOptions.propsData)
      })
    }
  },
}
</script>

<style lang="scss" scoped></style>
