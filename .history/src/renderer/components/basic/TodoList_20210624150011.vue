<template>
  <div class="todo-list" :style="todoListStyle">
    <div class="todo-list-search">
      <el-input
        class="search-input"
        v-model="search"
        @input="handleSearchInput"
        @keyup.shift.native="handleSearchEnterKeyup"
        ref="input"
      >
        <el-button
          class="search-button"
          slot="append"
          :icon="searchIcon"
          @click="handleSearchClick"
        ></el-button>
      </el-input>
    </div>
    <div class="todo-list-body" :style="todoListBodyStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    query: String,
    searchIcon: { type: String, default: 'el-icon-search' },
    width: String,
    height: String
  },
  data() {
    return {
      search: ''
    }
  },
  computed: {
    todoListStyle() {
      const width = this.width
      return { width }
    },
    todoListBodyStyle() {
      const height = this.height
      return { height }
    }
  },
  watch: {
    query: {
      handler(value) {
        this.search = value
      },
      immediate: true
    }
  },
  mounted() {
    this.$refs['input'].focus()
  },
  methods: {
    handleSearchInput() {
      if (this.$listeners['update:query']) this.$emit('update:query', this.search)
      if (this.$listeners['search']) this.$emit('search', this.query)
    },
    handleSearchEnterKeyup(v) {
      console.info('enter:', v)
      // if (this.$listeners['click']) this.$emit('click', this.query)
    },
    handleSearchClick() {
      if (this.$listeners['click']) this.$emit('click', this.query)
    }
  }
}
</script>

<style lang="scss" scoped>
.todo-list {
  &-search {
    margin-bottom: 20px;
  }
  &-body {
    overflow-y: auto;
    box-sizing: border-box;
    height: calc(100% - 67px);

    padding: 15px;
    border: 1px solid #eeeeee;
    border-radius: 4px;
  }
}
.search {
  &-input {
    ::v-deep .el-input__inner {
      height: 47px;
      font-size: 20px;
    }
  }
  &-button {
    &.el-button {
      box-sizing: border-box;
      background-color: #409eff;
      height: 47px;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;

      font-size: 24px;
      color: #ffffff;
      &:hover {
        background-color: #8cc5ff;
      }
    }
  }
}
</style>
