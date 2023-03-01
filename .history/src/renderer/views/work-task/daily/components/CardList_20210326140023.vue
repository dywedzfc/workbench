<template>
  <div class="card-list" :style="cardListStyle"><slot></slot></div>
</template>

<script>
export default {
  name: 'CardList',
  props: { width: String },
  computed: {
    cardListStyle() {
      const style = {}
      if (this.width) style.width = this.width
      return style
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.card-list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 20px;
}
</style>
