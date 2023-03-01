<template>
  <div class="path-box">
    <div class="path-box-item" :class="{ 'path-box-url': memo }">{{ url }}</div>
    <div class="path-box-item path-box-textarea" v-if="memo">{{ memo }}</div>
  </div>
</template>

<script>
export default {
  name: 'PathBoxItem',
  props: { url: String, memo: String }
}
</script>

<style lang="scss" scoped>
.path-box {
  &-item {
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
