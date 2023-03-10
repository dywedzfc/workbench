<template>
  <page class="page-home" title="开心每一天" :back="false">
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
      <search-bar :value="search.query" auto @query="handleSearchQueryClick" />
      <group-card
        :data="shortcutMenuList"
        :type="edit"
        @add="handleAddGroupClick"
        @edit="handleEditGroupClick"
        @remove="handleDeleteGroupClick"
      />
    </div>
    <dialog-box class="home-dialog" :visible.sync="dialog.display">
      <shortcut-menu-dialog
        v-if="dialog.display"
        :form-data="dialog.data"
        @cancel="handleSMCancel"
        @submit="handleSMSubmit"
      />
    </dialog-box>
    <search-engine-drawer :visible.sync="search.display" :query.sync="search.query" />
  </page>
</template>

<script>
import Page from 'components/basic/Page.vue'
import Logo from 'components/Logo.vue'
import DialogBox from 'components/basic/DialogBox.vue'
import SearchEngineDrawer from 'components/SearchEngineDrawer.vue'
// import DialogForm from 'components/form/DialogForm.vue'
// import DialogFormItem from 'components/form/DialogFormItem.vue'
import SearchBar from './home/SearchBar.vue'
import GroupCard from './home/GroupCard.vue'
import ShortcutMenuDialog from './home/ShortcutMenuDialog.vue'
import { getDateTime, msgSuccess, msgWarning, messageBox, iconClassName } from 'util'
import {
  SHORTCUT_MENU_LIST,
  requestShortcutMenuList,
  requestAddShortcutMenu,
  requestUpdShortcutMenu,
  requestDelShortcutMenu,
} from 'assets/script/request'
import { mapGetters } from 'vuex'
// const { ipcRenderer } = window.require('electron')

export default {
  name: 'Home',
  components: {
    Page,
    Logo,
    DialogBox,
    SearchEngineDrawer,
    SearchBar,
    GroupCard,
    ShortcutMenuDialog,
  },
  data() {
    return {
      datetime: '',
      times: { datetime: null },
      edit: false,
      dialog: { display: false, type: '', data: {} },
      search: { display: false, query: '' },
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
    addShortcutMenu() {
      requestAddShortcutMenu(this.dialog.data, ({ code, msg }) => {
        if (code == 200) {
          msgSuccess(msg)
          requestShortcutMenuList()
          this.dialog.display = false
        } else msgWarning(msg)
      })
    },
    updShortcutMenu() {
      const data = this.dialog.data
      if ('show' in data) delete data.show
      requestUpdShortcutMenu(data, ({ code, msg }) => {
        if (code == 200) {
          msgSuccess(msg)
          requestShortcutMenuList()
          this.dialog.display = false
        } else msgWarning(msg)
      })
    },
    delShortcutMenu(id) {
      const data = this.dialog.data
      if ('show' in data) delete data.show
      requestDelShortcutMenu(id, ({ code }) => {
        if (code == 200) {
          msgSuccess('删除成功')
          requestShortcutMenuList()
        } else msgWarning('删除失败')
      })
    },

    handleIconTypeClick() {
      this.edit = !this.edit
    },
    handleSearchQueryClick(query) {
      this.search.display = true
      this.search.query = query
    },
    handleAddGroupClick() {
      this.setDialogData()
      this.dialog.display = true
      this.dialog.type = 'A'
    },
    handleEditGroupClick(item) {
      if (item.operate === 0) return
      if (item.show) item.show = false
      this.setDialogData(item)
      this.dialog.display = true
      this.dialog.type = 'E'
    },
    handleDeleteGroupClick(item) {
      if (item.operate === 0) return
      messageBox(`“${item.title}”是否确认删除？`)
        .then(() => {
          this.delShortcutMenu(item.id)
        })
        .catch(() => {})
    },
    handleSMCancel() {
      this.dialog.display = false
    },
    handleSMSubmit() {
      if (this.verifyShortcutMenuFormData()) return
      if (this.dialog.type == 'A') this.addShortcutMenu()
      else if (this.dialog.type == 'E') this.updShortcutMenu()
    },

    readFile(filePath) {
      // 创建一个新的xhr对象
      let xhr = null,
        okStatus = document.location.protocol === 'file' ? 0 : 200
      xhr = new XMLHttpRequest()
      xhr.open('GET', filePath, false)
      xhr.overrideMimeType('text/html;charset=utf-8')
      xhr.send(null)
      return xhr.status === okStatus ? xhr.responseText : null
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
    verifyShortcutMenuFormData() {
      const { title, href, hrefType } = this.dialog.data
      if (!title) return msgWarning('请输入标签名'), true
      if (!href) {
        if (hrefType) return msgWarning('请输入连接'), true
        else return msgWarning('请选择连接'), true
      }
      if (hrefType && !/^https?:\/\//.test(href)) return msgWarning('请选择对应的协议'), true
      return false
    },
    iconClassName(icon) {
      return iconClassName(icon)
    },
  },
}
</script>

<style lang="scss" scoped>
.page-home::v-deep .page-body {
  position: static;
}
.template {
  &-wrapper {
    padding: 20px;
    padding-top: 2vw;
    text-align: center;

    &::v-deep .logo-box {
      margin: 0 auto;
      margin-bottom: 5vw;
    }
  }
}
.home-dialog ::v-deep .dialog-box {
  width: 488px;
  height: auto;
}
.primary {
  color: #409eff;
}
.danger {
  color: #e81123;

  &:hover {
    background-color: #ffecec;
    color: #e81123;
  }
}
</style>
