<template>
  <div :class="['dialog-model', { show }]" v-if="visible">
    <div class="dialog-box" ref="flexWrapper"><slot></slot></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { MENU_SHOW } from 'assets/script/request'
import { getLeftMenu } from 'assets/script/local-storage'

export default {
  name: 'DialogBox',
  props: { visible: { type: Boolean, default: false } },
  data() {
    return { show: true }
  },
  computed: { ...mapGetters({ menuShow: MENU_SHOW }) },
  watch: {
    display: {
      handler(value) {
        if (value) {
          this.$refs['flexWrapper'].scrollTo(0, 0)
          this.show = getLeftMenu().show
        }
      },
    },
    menuShow(value) {
      this.show = value
    },
  },
  created() {
    this.show = getLeftMenu().show
  },
  destroyed() {},
  methods: {
    handleCloseClick() {
      if (this.$listeners['update:display']) this.$emit('update:display', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.dialog {
  &-model {
    position: fixed;
    top: 0;
    left: 90px;
    right: 0;
    bottom: 0;

    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;

    // background-color: rgba(0, 0, 0, 0.1);

    &.show {
      left: 270px;
    }
  }
  &-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 35vw;
    height: 25vw;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.05), 0 3px 6px rgba(0, 0, 0, 0.05),
      0 5px 14px 4px rgba(0, 0, 0, 0.05);
    // background-color: #ffffff;
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
