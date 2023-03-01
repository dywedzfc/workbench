<template>
  <div
    class="card-item"
    :class="[{ multiple: hasMultiple, 'not-odd': !hasOdd }, stateClassName]"
    :style="cardItemStyle"
  >
    <div class="card-header">
      <slot name="title">{{ title }}</slot>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardItem',
  props: { title: String, width: String, state: [String, Number] },
  computed: {
    hasMultiple() {
      return this.$slots.default && this.$slots.default.length > 1
    },
    hasOdd() {
      const length = (this.$slots.default && this.$slots.default.length) || 0
      return length != 0 && length % 2 == 0
    },
    cardItemStyle() {
      const style = {}
      if (this.width) style.width = this.width
      return style
    },
    stateClassName() {
      if (this.state == 1 || this.state == 'error') return 'error'
      if (this.state == 2 || this.state == 'wraning') return 'wraning'
      if (this.state == 3 || this.state == 'info') return 'info'
      return ''
    },
  },
  watch: {
    // '$slots.default'() {}
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
@import 'assets/scss/theme';

.card-item {
  background-color: #f5f8f7;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 10px;
  // box-shadow: 0 0 10px #409eff, 1px 1px 5px #0f5294;

  &:last-child {
    margin-bottom: 0;
  }
  &.error {
    background-color: $danger-color;
  }
  &.wraning {
    background-color: $warning-color;
  }
  &.info {
    background-color: $theme-color;
  }
}
.card-header {
  padding: 15px 20px;
  // border-bottom: 1px solid #eeeeee;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  // color: #111111;
  // color: #ffffff;

  &:empty {
    display: none;
  }
}
.card-body {
  display: flex;
  flex-wrap: wrap;
  // background-color: #ffffff;
  background-color: #fefefe;

  padding: 15px;
  border-radius: 14px;
  // box-shadow: inset 0 0 10px #409eff, inset 0 0 7px #0f5294;
}
</style>
