<template>
  <div class="panel" :class="{ 'full-screen': fullScreen, border: border }">
    <div class="panel-header" :style="panelHeaderStyle">
      <slot name="header">{{ title }}</slot>
    </div>
    <div class="panel-body">
      <div class="flex-wrapper" v-if="fullScreen">
        <slot></slot>
      </div>
      <slot v-else></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Panel',
  props: { title: String, fullScreen: Boolean, border: Boolean, fontSize: String },
  computed: {
    panelHeaderStyle() {
      const fontSize = this.fontSize
      return { fontSize }
    },
  },
}
</script>

<style lang="scss" scoped>
.panel {
  &.border {
    border: 1px solid #eeeeee;

    .panel-header {
      border-bottom: 1px solid #eeeeee;
    }
  }
  &.full-screen {
    display: flex;
    flex-direction: column;
    height: 100%;

    .panel-body {
      flex: 1;
      position: relative;
    }
  }
  &-header {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    height: 80px;
    padding: 10px 20px;

    font-size: 24px;
  }
  &-body {
    height: calc(100% - 80px);
  }
}
</style>
