<template>
  <div class="page">
    <div class="page-header">
      <div class="page-button btn-back" :class="icon" v-if="back" @click="handleBackClick"></div>
      <div class="title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="tool" v-if="$slots.tool">
        <slot name="tool"></slot>
      </div>
    </div>
    <div class="page-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page',
  props: {
    title: String,
    back: { type: Boolean, default: true },
    icon: { type: String, default: 'el-icon-back' },
  },
  methods: {
    handleBackClick() {
      if (this.$listeners['back']) this.$emit('back')
      else this.$router.back()
    },
  },
}
</script>

<style lang="scss" scoped>
.page {
  height: 100%;

  &-header {
    position: relative;
    background-color: rgba(238, 238, 238, 0.4);
    user-select: none;

    height: 50px;
    // border-bottom: 1px solid #eeeeee;

    .btn-back {
      position: absolute;
      cursor: pointer;
      z-index: 1;

      margin-left: 10px;

      font-size: 20px;
    }
    > .title {
      display: flex;
      justify-content: center;
      align-items: center;

      height: 100%;
      font-size: 20px;
      font-weight: bold;
    }
    > .tool {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;

      height: 100%;
      margin-right: 15px;
    }
  }
  &-body {
    position: relative;
    height: calc(100% - 40px);
  }
  &-button {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 40px;
    height: 40px;
    margin: 5px;
    border-radius: 8px;

    &:hover {
      background-color: #dddddd;
    }
  }
}
</style>
