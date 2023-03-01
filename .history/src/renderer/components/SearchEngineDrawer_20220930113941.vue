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
import SearchBar from '../views/home//SearchBar.vue'

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
  mounted() {},
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
