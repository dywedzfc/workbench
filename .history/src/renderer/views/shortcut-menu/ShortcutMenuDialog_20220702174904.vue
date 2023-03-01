<template>
  <dialog-form label-width="5em">
    <dialog-form-item label="标签名称">
      <el-input v-model="formData.title"></el-input>
    </dialog-form-item>
    <dialog-form-item label="图标">
      <el-input v-model="formData.icon"></el-input>
    </dialog-form-item>
    <dialog-form-item label="连接">
      <el-select v-model="formData.href">
        <el-option v-for="item in options.menu" :key="item.id"></el-option>
      </el-select>
      <el-input v-model="formData.href"></el-input>
      <template #tool>
        <el-radio-group v-model="formData.hrefType">
          <el-radio :label="0">站内链接</el-radio>
          <el-radio :label="1">超链接</el-radio>
        </el-radio-group>
      </template>
    </dialog-form-item>
  </dialog-form>
</template>

<script>
import DialogForm from 'components/form/DialogForm.vue'
import DialogFormItem from 'components/form/DialogFormItem.vue'
import { menu } from 'assets/config/menu.config'

export default {
  name: 'Home',
  components: { DialogForm, DialogFormItem },
  props: { formData: { type: Object, required: true } },
  data() {
    return { options: { menu: [] } }
  },
  created() {
    this.options.menu = menu
  },
  mounted() {
    console.info('data-mounted:', this.menu)
  },
  methods: {},
}
</script>

<style lang="scss" scoped></style>
