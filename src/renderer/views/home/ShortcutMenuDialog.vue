<template>
  <dialog-form label-width="5em">
    <dialog-form-item label="标签名称">
      <el-input v-model="formData.title"></el-input>
    </dialog-form-item>
    <dialog-form-item label="图标">
      <el-select class="select-palace" v-model="formData.icon" popper-class="palace-popper">
        <template #prefix><i :class="['input-icon', iconClassName(formData.icon)]"></i></template>
        <el-option-group v-for="group in options.icon" :key="group.name" :label="group.name">
          <el-option
            v-for="(item, index) in group.children"
            :key="index"
            :value="item.icon"
            :label="item.name"
          >
            <i :class="['icon', iconClassName(item.icon)]"></i>
          </el-option>
        </el-option-group>
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
    <dialog-form-item label="协议" v-if="protocol">
      <el-button @click="handleHttpsClick">https</el-button>
      <el-button @click="handleHttpClick">http</el-button>
    </dialog-form-item>
    <dialog-form-item type="button">
      <el-button @click="handleCancelClick">取消</el-button>
      <el-button type="primary" @click="handleSubmitClick">提交</el-button>
    </dialog-form-item>
  </dialog-form>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import DialogForm from 'components/form/DialogForm.vue'
import DialogFormItem from 'components/form/DialogFormItem.vue'
import { SHORTCUT_MENU_LIST } from 'assets/script/request'
import { iconClassName } from 'util'
import { menu } from 'assets/config/menu.config'
import { REG_INTERNET_SITE } from 'assets/script/regular'
import { icon, defaultIcon } from 'assets/config/icon.config.json'

export default {
  name: 'ShortcutMenuDialog',
  components: { DialogForm, DialogFormItem },
  props: { formData: { type: Object, required: true } },
  data() {
    return {
      options: { menu: [], icon: [] },
      station: { inside: '', outside: '' },
      protocol: false,
    }
  },
  computed: {
    ...mapGetters({ shortcutMenuList: SHORTCUT_MENU_LIST }),
  },
  created() {
    this.options.icon = icon
    if (!this.formData.icon) this.formData.icon = defaultIcon
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
    'formData.href': {
      handler(value) {
        if (this.formData.hrefType == 1) {
          if (REG_INTERNET_SITE.test(value)) {
            this.protocol = !/^https?:\/\//.test(value)
          } else if (value.length == 0) {
            this.protocol = false
          }
        }
      },
      immediate: true,
    },
  },
  methods: {
    handleCancelClick() {
      if (this.$listeners.cancel) this.$emit('cancel')
    },
    handleSubmitClick() {
      if (this.$listeners.submit) this.$emit('submit')
    },
    handleHttpsClick() {
      this.formData.href = 'https://' + this.formData.href
    },
    handleHttpClick() {
      this.formData.href = 'http://' + this.formData.href
    },
    resetMenuList() {
      const remove = ['home', 'setting', 'about']
      const redata = _.filter(menu, (item) => !remove.includes(item.id))
      const disabled = _.map(this.shortcutMenuList, (item) => item.href)
      const reset = _.map(redata, (item) => {
        // if (disabled.includes(item.href)) item.disabled = true
        item.disabled = disabled.includes(item.href)
        return item
      })
      this.options.menu = _.orderBy(reset, 'disabled', 'asc')
    },
    iconClassName(icon) {
      return iconClassName(icon)
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
    display: flex;
    align-items: center;
    box-sizing: border-box;

    height: calc(100% - 2px);
    padding-left: 6px;
    border-radius: 4px;
    // background-color: #ffffff;

    // color: #333333;

    i {
      font-size: 30px;
    }
  }
}
</style>
