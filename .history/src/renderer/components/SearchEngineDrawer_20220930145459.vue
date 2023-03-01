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
        ref="twoIframe"
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
        ref="theIframe"
      ></webView>
    </div>
  </dialog-drawer>
</template>

<script>
import DialogDrawer from 'components/basic/DialogDrawer.vue'
import SearchBar from 'views/home/SearchBar.vue'

export default {
  name: 'SearchEngineDrawer',
  components: { DialogDrawer, SearchBar },
  props: { visible: { type: Boolean, default: false }, query: { type: String, required: true } },
  data() {
    return {
      search: { display: false, query: '' },
    }
  },
  watch: {
    visible: {
      handler(value) {
        this.search.display = value
        if (value) {
          this.$nextTick(() => {
            const { oneIframe } = this.$refs
            console.info('data-mounted:', oneIframe)
            //开始加载事件监听
            oneIframe.addEventListener('did-start-loading', () => {
              console.log('did-start-loading...')
              // oneIframe.insertCSS('#head { display: none; }')
              // oneIframe.executeJavaScript('console.info("ceshi")')
            })
            //停止加载事件监听
            oneIframe.addEventListener('did-stop-loading', () => {
              console.log('did-stop-loading...')
              const styleList = []
              oneIframe.insertCSS(styleList.join(' '))
              // oneIframe.insertCSS(responseText)

              oneIframe.openDevTools()
            })
            // oneIframe.executeJavaScript('console.info("ceshi")')
          })
          // this.$nextTick(() => {
          //   const { oneIframe } = this.$refs
          //   console.info('data-mounted:', oneIframe)
          //   //开始加载事件监听
          //   oneIframe.addEventListener('did-start-loading', () => {
          //     console.log('did-start-loading...')
          //   })
          //   //停止加载事件监听
          //   oneIframe.addEventListener('did-stop-loading', () => {
          //     console.log('did-stop-loading...')
          //     const xhr = new XMLHttpRequest()
          //     xhr.open('GET', './reset-style/baidu-style.css', true)
          //     xhr.onload = function (res) {
          //       console.info('load:', arguments)
          //       if (this.status === 200) {
          //         oneIframe.insertCSS(this.responseText)
          //         console.info('data-load:', this.status, res.target, this.responseText)
          //       }
          //     }
          //     xhr.send()

          //     //           //注入css
          //     //           oneIframe.insertCSS(`
          //     // .title-blog {
          //     //     background: red !important;
          //     // }
          //     // `)
          //     //           //注入js脚本
          //     //           oneIframe.executeJavaScript(`
          //     //     setTimeout(()=>{
          //     //         alert("粉丝数："+document.querySelector('#fan').innerHTML);
          //     //     }, 2000);
          //     // `)
          //     //打开调试工具
          //     // oneIframe.openDevTools()
          //   })
          // })
        }
      },
      immediate: true,
    },
    'search.display'(value) {
      if (this.$listeners['update:visible']) this.$emit('update:visible', value)
    },
    query: {
      handler(value) {
        this.search.query = value
      },
      immediate: true,
    },
    'search.query'(value) {
      if (this.$listeners['update:query']) this.$emit('update:query', value || '')
    },
  },
  // mounted() {},
  methods: {
    handleDSearchQueryClick(query) {
      this.search.display = false
      this.$nextTick(() => {
        this.search.display = true
        this.search.query = query
      })
    },
  },
}
</script>

<style lang="scss" scoped>
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
</style>
