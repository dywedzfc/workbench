<template>
  <div class="layout">
    <div class="layout-body"></div>
    <div class="layout-right"></div>
  </div>
</template>

<script>
// import _ from 'lodash'

export default {
  name: 'Element UI',
  data() {
    return { menu: [] }
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss">
.layout {
  &-body {
    margin-left: 0;
    margin-right: 250px;
  }
  &-right {
    width: 250px;
  }
}
</style>
