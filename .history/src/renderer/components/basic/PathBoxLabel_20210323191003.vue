<template>
  <div class="path-box__label">
    <span>{{ title }}</span>
    <span class="path-box-label" v-if="memo && memo.length">说明</span>
  </div>
</template>

<script>
export default {
  name: 'PathBoxLabel',
  props: { title: String, memo: String }
}
</script>

<style lang="scss" scoped>
.path-box {
  &__label {
  }
  &-label {
    display: block;
    margin-top: 10px;
  }
}
</style>
