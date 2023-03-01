<template>
  <el-container>
    <el-main>Main</el-main>
    <el-aside width="200px">Aside</el-aside>
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
.layout {
  &-body {
    margin-left: 0;
    // margin-right: 250px;
  }
  &-right {
    width: 250px;
  }
}
</style>
