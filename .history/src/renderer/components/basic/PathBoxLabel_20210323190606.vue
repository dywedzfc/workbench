<template>
  <div class="path-box__label">
    <span>{{ title }}</span>
    <span class="input-label">说明</span>
    <div class="path-box-item path-box-textarea" v-if="memo && memo.length">{{ memo }}</div>
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
  &__content {
    display: block;
    width: 100%;
  }
  &-item {
    display: block;
    box-sizing: border-box;
    min-height: 42px;
    padding: 0 10px;
    border: 1px solid #eee;
    border-radius: 4px;
  }
  &-url {
    margin-bottom: 10px;
  }
  &-textarea {
    padding: 10px;
    line-height: 1.4;
  }
}
// .input-label {
//   display: block;
//   margin-top: 10px;
// }
// .input-url {
//   margin-bottom: 10px;
// }
// .input-textarea {
//   padding: 10px;
//   line-height: 1.4;
// }
</style>
