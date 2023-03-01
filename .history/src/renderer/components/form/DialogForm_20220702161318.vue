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
    if (this.labelWidth) {
      _.each(this.$slots.default, (item) => {
        console.info('data-slot-item:', item.child, this, this.$props)
        const { propsData } = item.componentOptions
        // if (!('labelWidth' in propsData)) item.labelWidth = this.labelWidth
        if (!('labelWidth' in propsData)) {
          item.componentOptions.propsData.labelWidth = this.labelWidth
          // item.$props.labelWidth = this.labelWidth
          console.info('set-data:', this.labelWidth)
        }
        console.info('data-slot-item-2:', item.componentOptions.propsData)
      })
    }
  },
}
</script>

<style lang="scss" scoped></style>
