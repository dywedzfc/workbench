<!-- 日期框-年份 -->
<template>
  <el-date-picker
    class="query-input_mini"
    v-model="data"
    type="year"
    value-format="yyyy"
    :placeholder="placeholder"
  />
</template>

<script>
export default {
  name: 'PickerYear',
  props: {
    value: { type: String, required: true },
    placeholder: { type: String, default: '年份' }
  },
  data() {
    return {
      loading: false,
      data: ''
    }
  },
  watch: {
    value: {
      handler(value) {
        this.data = value || ''
      },
      immediate: true
    },
    data: {
      handler(value) {
        if (this.$listeners['update:value']) this.$emit('update:value', value || '')
        if (this.$listeners['input']) this.$emit('input', value || '')
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.query-input_mini {
  width: 192px !important;
}
</style>
