<template>
  <dialog-form label-width="5em">
    <dialog-form-item label="标签名称">
      <el-input v-model="formData.title"></el-input>
    </dialog-form-item>
    <dialog-form-item label="图标">
      <el-input v-model="formData.icon"></el-input>
    </dialog-form-item>
    <dialog-form-item label="连接">
      <el-select v-model="formData.href" v-if="formData.hrefType === 0">
        <el-option
          v-for="item in options.menu"
          :key="item.id"
          :value="item.href"
          :label="item.title"
        ></el-option>
      </el-select>
      <el-input v-model="formData.href" v-else></el-input>
      <template #tool>
        <el-radio-group v-model="formData.hrefType">
          <el-radio :label="0">站内</el-radio>
          <el-radio :label="1">站外</el-radio>
        </el-radio-group>
      </template>
    </dialog-form-item>
  </dialog-form>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import DialogForm from 'components/form/DialogForm.vue'
import DialogFormItem from 'components/form/DialogFormItem.vue'
import { SHORTCUT_MENU_LIST } from 'assets/script/request'
import { menu } from 'assets/config/menu.config'

export default {
  name: 'Home',
  components: { DialogForm, DialogFormItem },
  props: { formData: { type: Object, required: true } },
  data() {
    return { options: { menu: [] } }
  },
  computed: {
    ...mapGetters({ shortcutMenuList: SHORTCUT_MENU_LIST }),
  },
  created() {
    const remove = ['home', 'setting', 'about']
    console.info('data-created:')
    const redata = _.filter(menu, (item) => !remove.includes(item.id))
    const disabled = _.map(this.shortcutMenuList, (item) => item.href)
    this.options.menu = _.map(redata, (item) => {
      return item
    })
  },
  mounted() {
    console.info('data-mounted:', this.menu)
  },
  methods: {},
}
</script>

<style lang="scss" scoped></style>
