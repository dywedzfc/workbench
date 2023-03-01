<template>
  <dialog-form label-width="5em">
    <dialog-form-item label="标签名称">
      <el-input v-model="formData.title"></el-input>
    </dialog-form-item>
    <dialog-form-item label="图标">
      <el-select class="select-palace" v-model="formData.icon" popper-class="palace-popper">
        <template #prefix><i :class="['input-icon', formData.icon]"></i></template>
        <el-option v-for="item in options.icon" :key="item" :value="item" :label="item">
          <i :class="['icon', item]"></i>
        </el-option>
      </el-select>
    </dialog-form-item>
    <dialog-form-item label="连接">
      <el-select v-model="formData.href" v-if="formData.hrefType === 0">
        <el-option
          v-for="item in options.menu"
          :key="item.id"
          :value="item.href"
          :label="item.title"
          :disabled="item.disabled"
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
import { icon } from '../Element-UI/json/icon.options.json'

export default {
  name: 'Home',
  components: { DialogForm, DialogFormItem },
  props: { formData: { type: Object, required: true } },
  data() {
    return { options: { menu: [], icon: [] }, station: { inside: '', outside: '' } }
  },
  computed: {
    ...mapGetters({ shortcutMenuList: SHORTCUT_MENU_LIST }),
  },
  created() {
    this.options.icon = icon
    this.resetMenuList()
  },
  watch: {
    'formData.hrefType'(value, old) {
      if (old == 0) {
        this.station.inside = this.formData.href
        this.formData.href = this.station.outside
      } else if (old == 1) {
        this.station.outside = this.formData.href
        this.formData.href = this.station.inside
      }
    },
  },
  mounted() {
    console.info('data-mounted:', this.menu)
  },
  methods: {
    resetMenuList() {
      const remove = ['home', 'setting', 'about']
      const redata = _.filter(menu, (item) => !remove.includes(item.id))
      const disabled = _.map(this.shortcutMenuList, (item) => item.href)
      const reset = _.map(redata, (item) => {
        console.info('menu-item:', disabled.includes(item.href), item)
        if (disabled.includes(item.href)) item.disabled = true
        return item
      })
      this.options.menu = _.orderBy(reset, 'disabled', 'desc')
    },
  },
}
</script>

<style lang="scss" scoped>
.select-palace::v-deep {
  .el-input__prefix {
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    display: block;
    height: calc(100% - 2px);
    border-radius: 4px;
    background-color: #ffffff;

    i {
      font-size: 24px;
    }
  }
}
</style>
