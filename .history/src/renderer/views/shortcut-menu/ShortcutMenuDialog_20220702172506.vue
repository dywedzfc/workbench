<template>
  <dialog-form label-width="5em">
    <dialog-form-item label="标签名称">
      <el-input v-model="formData.title"></el-input>
    </dialog-form-item>
    <dialog-form-item label="图标">
      <el-input v-model="formData.icon"></el-input>
    </dialog-form-item>
    <dialog-form-item label="连接">
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

export default {
  name: 'Home',
  components: { DialogForm, DialogFormItem },
  props: { formData: { type: Boolean, default: false } },

  computed: {},
  methods: {},
}
</script>

<style lang="scss" scoped>
.template-wrapper {
  padding: 20px;
  text-align: center;

  &::v-deep .logo-box {
    margin: 0 auto;
  }
}
.group {
  &-card {
    display: flex;
    flex-wrap: wrap;
    max-width: 42vw;
    margin: 0 auto;
    margin-top: 30px;
    padding: 0.5vw;
  }
  &-item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

    width: 5vw;
    height: 5vw;
    margin: 1vw 0.5vw;
    border-radius: 15px;
    background-color: transparentize(#eeeeee, 0.6);
    font-size: 2.5vw;

    &:hover {
      background-color: #409eff;
      color: #ffffff;

      .title {
        transform: translateY(5px);
        color: #409eff;
      }
    }
    .title {
      position: absolute;
      top: 100%;
      transform: translateY(-5px);
      transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;

      font-size: 16px;
      font-weight: bold;
      color: transparent;
    }
  }
}
</style>
