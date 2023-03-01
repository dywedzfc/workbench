<template>
  <div class="dialog-drawer" :class="{ show: display, search: type == 'search', close }">
    <div class="dialog-drawer-header">
      <div class="title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="button-close el-icon-close" @click="handleCloseClick"></div>
    </div>
    <div class="dialog-drawer-body">
      <div class="flex-wrapper" ref="flexWrapper"><slot></slot></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DialogDrawer',
  props: {
    display: { type: Boolean, default: false },
    title: String,
    type: String,
  },
  data() {
    return { close: false }
  },
  computed: {},
  watch: {
    display: {
      handler(value) {
        if (value) {
          this.$refs['flexWrapper'].scrollTo(0, 0)
        }
      },
    },
  },
  mounted() {},
  destroyed() {
    this.close = true
  },
  methods: {
    handleCloseClick() {
      if (this.$listeners['update:display']) this.$emit('update:display', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.dialog-drawer {
  position: absolute;
  top: 0;
  left: 100%;
  display: flex;
  // display: none;
  flex-direction: column;
  // box-shadow: -1px 0 2px #eeeeee;
  // background-color: #ffffff;
  transition: top 0.5s linear, left 0.5s linear, right 0.5s linear, bottom 0.5s linear;
  z-index: 100;

  width: 100%;
  height: 100%;

  &.show {
    left: 0;
  }
  &.search {
    // top: -41px;
    // height: calc(100% + 41px);
    height: 100%;

    .dialog-drawer-header {
      border-bottom: none;
      height: 0;

      .button-close {
        position: relative;
        z-index: 100;
        height: 40px;
      }
    }
  }

  &-header {
    display: flex;
    box-sizing: border-box;
    user-select: none;

    height: 60px;
    // border-bottom: 1px solid #eeeeee;

    > .title {
      display: flex;
      align-items: center;
      flex: 1;
      padding-left: 20px;
      padding-right: 20px;

      font-size: 26px;
      font-weight: bold;
    }
    > .button-close {
      display: flex;
      justify-content: center;
      align-items: center;
      transition: background-color 0.3s linear, color 0.4s linear;
      cursor: pointer;

      width: 40px;
      margin: 10px;
      border-radius: 10px;

      font-size: 28px;

      &:hover {
        background-color: #e81123;
        color: #ffffff;
      }
    }
  }
  &-body {
    position: relative;
    flex: 1;
  }
}
.flex-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  overflow: auto;
  box-sizing: border-box;

  width: 100%;
  height: 100%;
  padding: 20px;
}
</style>
