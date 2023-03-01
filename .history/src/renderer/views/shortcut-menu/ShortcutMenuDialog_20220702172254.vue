<template>
  <page title="Home" :back="false">
    <template #tool>
      <el-button
        class="page-button"
        type="text"
        :icon="edit ? 'el-icon-monitor' : 'el-icon-edit'"
        @click="handleIconTypeClick"
      ></el-button>
    </template>
    <div class="template-wrapper">
      <logo size="16vw" />
      <div class="group-card">
        <div
          class="group-item"
          v-for="item in shortcutMenuList"
          :key="item.id"
          @click="handleGroupItemClick(item)"
        >
          <i :class="item.icon"></i>
          <span class="title">{{ item.title }}</span>
        </div>
        <div class="group-item button-add" v-if="edit" @click="handleAddGroupClick">
          <i class="el-icon-plus"></i>
        </div>
      </div>
    </div>
    <dialog-box :visible.sync="dialog.display">
      <dialog-form label-width="5em">
        <dialog-form-item label="标签名称">
          <el-input v-model="dialog.data.title"></el-input>
        </dialog-form-item>
        <dialog-form-item label="图标">
          <el-input v-model="dialog.data.icon"></el-input>
        </dialog-form-item>
        <dialog-form-item label="连接">
          <el-input v-model="dialog.data.href"></el-input>
          <template #tool>
            <el-radio-group v-model="dialog.data.hrefType">
              <el-radio :label="0">站内链接</el-radio>
              <el-radio :label="1">超链接</el-radio>
            </el-radio-group>
          </template>
        </dialog-form-item>
      </dialog-form>
    </dialog-box>
  </page>
</template>

<script>
import Page from 'components/basic/Page.vue'
import Logo from 'components/Logo.vue'
import DialogBox from 'components/basic/DialogBox.vue'
import DialogForm from 'components/form/DialogForm.vue'
import DialogFormItem from 'components/form/DialogFormItem.vue'
import { getDateTime } from 'util'
import { SHORTCUT_MENU_LIST, requestShortcutMenuList } from 'assets/script/request'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: { Page, Logo, DialogBox, DialogForm, DialogFormItem },
  data() {
    return {
      datetime: '',
      times: { datetime: null },
      edit: false,
      dialog: { display: false, data: {} },
    }
  },
  computed: {
    ...mapGetters({ shortcutMenuList: SHORTCUT_MENU_LIST }),
  },
  mounted() {
    this.getDateTime()
    requestShortcutMenuList()
  },
  methods: {
    getDateTime() {
      this.datetime = getDateTime(new Date())
      if (this.times.datetime) clearTimeout(this.times.datetime)
      this.times.datetime = setTimeout(this.getDateTime, 1000)
    },

    handleIconTypeClick() {
      this.edit = !this.edit
    },
    handleGroupItemClick(item) {
      if (item.href) this.$router.push(item.href)
    },
    handleAddGroupClick() {
      this.setDialogData()
      console.info('add-group:', this.dialog.data)
      this.dialog.display = true
    },

    setDialogData(item = {}) {
      const data = {}
      if (item.id) data.id = item.id
      data.title = item.title || ''
      data.icon = item.icon || ''
      data.operate = item.operate === 0 || item.operate === 1 ? item.operate : 1
      data.href = item.href || ''
      data.hrefType = item.hrefType === 0 || item.hrefType === 1 ? item.hrefType : 0
      this.dialog.data = data
    },
  },
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
