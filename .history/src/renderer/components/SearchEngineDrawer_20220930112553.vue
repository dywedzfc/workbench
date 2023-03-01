<template>
  <dialog-drawer :display.sync="search.display" type="search">
    <search-bar
      class="dialog-drawer-search"
      :value="search.query"
      @query="handleDSearchQueryClick"
    />
    <div class="search-list" v-if="search.display">
      <webView
        class="search-iframe"
        :src="`https://www.baidu.com/s?wd=${search.query}`"
        allowpopups
        ref="oneIframe"
      ></webView>
      <webView
        class="search-iframe"
        :src="`https://m.cn.bing.com/search?q=${search.query}&ensearch=1`"
        allowpopups
        ref="oneIframe"
      ></webView>
      <!-- sandbox="allow-s÷cripts allow-forms allow-same-origin allow-top-navigation" -->
      <!-- <iframe
          class="search-iframe"
          :src="`https://www.sogou.com/web?query=${search.query}`"
          frameborder="0"
          ref="theIframe"
        ></iframe> -->
      <webView
        class="search-iframe"
        :src="`https://www.sogou.com/web?query=${search.query}`"
        allowpopups
        ref="oneIframe"
      ></webView>
    </div>
  </dialog-drawer>
</template>

<script>
import Page from 'components/basic/Page.vue'
import Logo from 'components/Logo.vue'
import DialogBox from 'components/basic/DialogBox.vue'
import DialogDrawer from 'components/basic/DialogDrawer.vue'
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
  components: { Page, Logo, DialogBox, DialogDrawer, SearchBar, GroupCard, ShortcutMenuDialog },
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

    // handleMessage(event) {
    //   // 根据上面制定的结构来解析iframe内部发回来的数据
    //   const data = event.data
    //   console.info('data-message:', data)
    // },
    handleIconTypeClick() {
      this.edit = !this.edit
    },
    handleSearchQueryClick(query) {
      this.search.display = true
      this.search.query = query
      this.$nextTick(() => {
        const oneIframe = this.$refs.oneIframe
        console.info('one-iframe:', oneIframe.querySelector('#head'))
        // const iframeDocument = oneIframe.contentDocument
        // // oneIframe.window.addEventListener('message', this.handleMessage)
        // const iframeHead = iframeDocument.querySelector('head')
        // const style = document.createElement('style')
        // const styleText = this.readFile(`${location.origin}/reset-style/reset-baidu.css`)
        // const textNode = document.createTextNode(styleText)
        // style.appendChild(textNode)
        // iframeHead.appendChild(style)
        // // oneIframe.appendChild()
      })
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
    handleDSearchQueryClick(query) {
      this.search.display = false
      this.$nextTick(() => {
        this.search.display = true
        this.search.query = query
      })
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
.search {
  &-list {
    display: flex;
    height: calc(100% - 4vw - 22px);
    border: 1px solid #eeeeee;
    border-radius: 8px;
  }
  &-iframe {
    position: relative;
    flex: 1;
    transition: max-width 0.2s ease-in-out;

    width: 50px;
    max-width: 40vw;
    border-right: 1px solid #eeeeee;

    &:last-child {
      border-right: none;
    }
    &:hover {
      flex: 5;
      max-width: 90vw;
    }
  }
}
.dialog-drawer-search {
  margin-bottom: 20px;
  margin-bottom: 1vw;
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
