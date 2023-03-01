<template>
  <el-container class="container-wrapper">
    <el-container class="container-wrapper">
      <el-main class="container-body">Main</el-main>
      <el-footer class="container-footer" height="300px">Footer</el-footer>
    </el-container>
    <el-aside class="container-right" width="250px">Aside</el-aside>
  </el-container>
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
.container {
  &-wrapper {
    height: 100%;
  }
  &-body {
    padding: 0;
  }
  &-right {
    padding: 20px;
    border-left: 1px solid #eeeeee;
  }
  &-footer {
    border-top: 1px solid #eeeeee;
  }
}
</style>
