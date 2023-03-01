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
import DialogDrawer from 'components/basic/DialogDrawer.vue'
import SearchBar from './home/SearchBar.vue'
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
  components: { DialogDrawer, SearchBar },
  data() {
    return {
      dialog: { display: false, type: '', data: {} },
      search: { display: false, query: '' },
    }
  },
  mounted() {
    this.getDateTime()
  },
  methods: {
    getDateTime() {
      this.datetime = getDateTime(new Date())
      if (this.times.datetime) clearTimeout(this.times.datetime)
      this.times.datetime = setTimeout(this.getDateTime, 1000)
    },

    // handleMessage(event) {
    //   // 根据上面制定的结构来解析iframe内部发回来的数据
    //   const data = event.data
    //   console.info('data-message:', data)
    // },
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
.search-iframe {
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

.dialog-drawer-search {
  margin-bottom: 20px;
  margin-bottom: 1vw;
}
</style>
