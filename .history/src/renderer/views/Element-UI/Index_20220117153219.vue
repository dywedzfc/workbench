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
  mounted() {
    this.menu = [
      { id: 'home', title: 'Home', href: '/', hotKey: '⌘ + 1' },
      { id: 'daily', title: '日报', href: '/daily', hotKey: '⌘ + 2' },
      { id: 'monthly', title: '月报', href: '/monthly', hotKey: '⌘ + 3' },
      { id: 'jkzsl', title: '项目列表', href: '/jkzsl/list', hotKey: '⌘ + 4' },
      { id: 'elementUI', title: 'Element UI', href: '/element-UI', hotKey: '⌘ + 4' },
      { id: 'hsz', title: '回收站', href: '/hsz', hotKey: '⌘ + 5' },
      { id: 'about', title: '关于', href: '/about', hotKey: '⌘ + 6' }
    ]
  },
  methods: {
    menuActive(item) {
      const { path } = this.$route
      return { active: path == item.href }
    }
  }
}
</script>

<style lang="scss"></style>
