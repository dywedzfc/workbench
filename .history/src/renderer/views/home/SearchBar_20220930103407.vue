<template>
  <div class="search-bar">
    <el-input
      class="search-input"
      v-model="query"
      prefix-icon="el-icon-search"
      placeholder="请输入内容"
      @keyup.native.enter="handleSearchKeyup"
    />
    <el-button class="search-button" type="primary" @click="handleSearchButtonClick">
      搜 索
    </el-button>
  </div>
</template>

<script>
// import { getDateTime, msgSuccess, msgWarning, messageBox, iconClassName } from 'util'
// import { mapGetters } from 'vuex'
// const { ipcRenderer } = window.require('electron')

export default {
  name: 'Home',
  // components: { Page, Logo, DialogBox, SearchBar, ShortcutMenuDialog },
  props: { value: String },
  data() {
    return { query: '' }
  },
  computed: {},
  watch: {
    value: {
      handler(value) {
        this.query = value
      },
      immediate: true,
    },
  },
  mounted() {},
  methods: {
    handleSearchKeyup() {
      if (!this.query) return
      if (this.$listeners.query) this.$emit('query', this.query)
    },
    handleSearchButtonClick() {
      if (!this.query) return
      if (this.$listeners.query) this.$emit('query', this.query)
    },
  },
}
</script>

<style lang="scss" scoped>
.search {
  &-bar {
    display: flex;
    width: 33vw;
    margin: 0 auto;
  }
  &-button {
    padding-left: 1.5vw;
    padding-right: 2.5vw;
    border-radius: 0 50px 50px 0;
    border-color: #000000;
    background-color: #000000;
    font-size: 1.6vw;

    &:hover {
      border-color: #333333;
      background-color: #333333;
    }
  }
  &-input ::v-deep .el-input__inner {
    // height: 50px;
    height: 4vw;
    padding-left: 3.5vw;
    border-color: #000000;
    border-width: 2px;
    border-right-width: 0;
    border-radius: 50px 0 0 50px;
    font-size: 1.56vw;
    color: #000000;
  }
  &-input ::v-deep .el-icon-search {
    box-sizing: border-box;
    width: 3.4vw;
    padding: 0 10px;
    padding-top: 2px;
    font-size: 1.9vw;
    line-height: 3.8vw;
    color: #000000;
  }
}
</style>
