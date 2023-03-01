<template>
  <div id="app" class="layout">
    <div class="layout-left">
      <div id="nav">
        <router-link v-for="item in menu" :key="item.id" :class="menuActive(item)" :to="item.href">
          {{ item.title }} <span class="hot-key">{{ item.hotKey }}</span>
        </router-link>
      </div>
    </div>
    <div class="layout-body">
      <router-view />
    </div>
    <div class="layout-keys-box">
      <div class="keys-item" v-for="icon in hotkeyIconList" :key="icon">{{ icon }}</div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  data() {
    return { menu: [] }
  },
  computed: {
    ...mapGetters({ hotkeysIcon: 'hotkey/hotkeysIcon' }),
    hotkeyIconList() {
      const keys = this.hotkeysIcon.split(':')
      return _.filter(keys)
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss"></style>
