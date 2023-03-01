<!-- 日期框-月份 -->
<template>
  <el-date-picker
    class="query-input"
    v-model="data"
    type="month"
    value-format="yyyy-MM"
    :placeholder="placeholder"
  />
</template>

<script>
export default {
  name: 'PickerYear',
  props: {
    value: { type: String, required: true },
    placeholder: { type: String, default: '月份' }
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
.query-input {
  width: 140px;
}
</style>
