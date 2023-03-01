<template>
  <div class="layout">
    <div class="layout-body">
      <router-view />
    </div>
    <div class="layout-right"></div>
  </div>
</template>

<script>
// import _ from 'lodash'

export default {
  name: 'App',
  data() {
    return { menu: [] }
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss"></style>
