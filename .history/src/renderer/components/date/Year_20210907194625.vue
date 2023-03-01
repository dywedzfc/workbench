<!-- 日期框-年份 -->
<template>
  <!-- class="query-input" -->
  <el-date-picker
    class="query-input_mini"
    v-model="data"
    type="year"
    value-format="yyyy"
    :placeholder="placeholder"
  />
</template>

<script>
// import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

// @Component
// export default class PickerYear extends Vue {
//   loading = false
//   data = ''

//   @Prop({ type: String, required: true }) value!: string
//   @Prop({ type: String, default: '年份' }) placeholder!: string

//   @Watch('value', { immediate: true })
//   watchValue(value: string): void {
//     this.data = value || ''
//   }
//   @Watch('data', { immediate: true })
//   watchData(value: string): void {
//     if (this.$listeners['update:value']) this.$emit('update:value', value || '')
//     if (this.$listeners['input']) this.$emit('input', value || '')
//   }
// }
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
.query-input {
  width: 192px !important;
}
</style>
