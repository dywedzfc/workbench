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
            const { oneIframe, twoIframe, theIframe } = this.$refs
            // 开始加载事件监听 // oneIframe.addEventListener('did-start-loading', () => {  console.log('did-start-loading...') })
            //停止加载事件监听
            oneIframe.addEventListener('did-stop-loading', () => {
              console.log('did-stop-loading...')
              // _2z1q32z
              const styleList = [
                'head, body { min-width: 680px !important; }',
                '#wrapper #head { display: none; min-width: 700px; }',
                '#wrapper #s_tab { width: auto; padding-top: 15px; padding-left: 30px; }',
                '#wrapper #container.sam_newgrid { box-sizing: border-box; width: auto; margin: 0; padding-left: 30px; }',
                '#wrapper #container.sam_newgrid #content_right { display: none; }',
                '#wrapper .rs-normal-width_2T91A { width: 100%; }',
                '#wrapper .page-inner_2jZi2 { padding-left: 30px; }',
                '#wrapper #foot { display: none; }',
              ]
              oneIframe.insertCSS(styleList.join(' '))
              oneIframe.executeJavaScript(
                `const sponsored = document.querySelectorAll('[tpl="softdown"],[class*="EC_"]'); for(let i = 0; i < sponsored.length; i++) { const item = sponsored[i]; console.info('data-item:', item); item.style.display = 'none'; }`
              )

              // oneIframe.openDevTools()
            })
            //停止加载事件监听
            twoIframe.addEventListener('did-stop-loading', () => {
              console.log('did-stop-loading...')
              const styleList = [
                'html, body { min-width: 680px !important; }',
                '.b_respl #b_header { min-width: 100%; }',
                '.b_respl #b_header #est_switch { position: absolute; right: 0; margin 0; }',
                '.b_respl #b_header .b_scopebar { margin-left: 30px; }',
                '.b_respl #b_content { padding-left: 30px; }',
                '.b_respl .b_adTop { display: none; }',
                // '.b_respl #b_header, #b_content .ev_talkbox_wrapper, #ev_talkbox_wrapper, aside[aria-label="更多结果"], aside[aria-label="Additional Results"], #b_footer { display: none; }',
                '.b_respl #b_header #sb_form, .b_respl #b_header #id_h, #b_content .ev_talkbox_wrapper, #ev_talkbox_wrapper, aside[aria-label="更多结果"], aside[aria-label="Additional Results"], #b_footer { display: none; }',
                '.b_respl #b_results .b_rc_gb_template .b_widgetContainer { left: calc(100% + 127px); visibility: visible !important; padding-left: 0; padding-right: 8px; border-radius: 0 15px 15px 0; }',
                '.b_respl #b_results .b_rc_gb_w_content { padding: 8px 8px 8px 0; border-radius: 0 10px 10px 0; }',
                '.b_respl #b_results .b_rc_gb_template .b_rc_gb_widget_link:hover { border-radius: 0 6px 6px 0; }',
                '.b_respl #b_results .b_widgetGrad { left: 0; background: linear-gradient(90deg,rgba(0,0,0,.15) -68.75%,rgba(0,0,0,0) 81.25%); }',
              ]
              twoIframe.insertCSS(styleList.join(' '))

              twoIframe.openDevTools()
            })
            //停止加载事件监听
            theIframe.addEventListener('did-stop-loading', () => {
              console.log('did-stop-loading...')
              const styleList = [
                'html, body, #sogou_wrap_id, #sogou_wrap_id .header { min-width: 680px !important; }',
                '.b_respl #b_content { padding-left: 30px; }',
                '#sogou_wrap_id .header .logo, #sogou_wrap_id .header .top-bar, #sogou_wrap_id .header #searchForm, #sogou_wrap_id #right, #sogou_wrap_id #s_footer, #sogou_wrap_id #float_uphint, #sogou_wrap_id .sponsored { display: none; }',
                '#sogou_wrap_id .header .searchnav { display: block; padding-left: 15px; }',
                '#sogou_wrap_id .header.headsearch { min-height: 30px; }',
                '#sogou_wrap_id .header.headsearch .searchnav { padding-top: 15px; }',
                '#sogou_wrap_id #wrapper, #sogou_wrap_id #pagebar_container, #sogou_wrap_id .hintBox { padding-left: 30px; }',
                '#sogou_wrap_id #pagebar_container { width: 640px; }',
                '.b_respl #b_results .b_rc_gb_template .b_widgetContainer { left: calc(100% + 127px); visibility: visible !important; padding-left: 0; padding-right: 8px; border-radius: 0 15px 15px 0; }',
                '.b_respl #b_results .b_rc_gb_w_content { padding: 8px 8px 8px 0; border-radius: 0 10px 10px 0; }',
                '.b_respl #b_results .b_rc_gb_template .b_rc_gb_widget_link:hover { border-radius: 0 6px 6px 0; }',
                '.b_respl #b_results .b_widgetGrad { left: 0; background: linear-gradient(90deg,rgba(0,0,0,.15) -68.75%,rgba(0,0,0,0) 81.25%); }',
              ]
              theIframe.insertCSS(styleList.join(' '))

              // theIframe.openDevTools()
            })
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
