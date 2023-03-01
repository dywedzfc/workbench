<template>
  <div class="card-item" :style="cardItemStyle"><slot></slot></div>
</template>

<script>
export default {
  name: 'CardItem',
  props: { width: String },
  computed: {
    cardItemStyle() {
      const style = {}
      if (this.width) style.width = this.width
      return style
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.card-item {
  border: 1px solid #eeeeee;
}
</style>
