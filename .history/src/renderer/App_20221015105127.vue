<template>
  <div id="app" class="layout">
    <div class="layout-left">
      <!-- <div id="nav">
        <router-link v-for="item in menu" :key="item.id" :class="menuActive(item)" :to="item.href">
          {{ item.title }} <span class="hot-key">{{ item.hotKey }}</span>
        </router-link>
      </div> -->
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
import { requestInitFolder } from 'assets/script/request'
import { menu } from 'assets/config/menu.config'
import LeftMenu from './components/LeftMenu.vue'

export default {
  name: 'App',
  components: { LeftMenu },
  data() {
    return { menu: [] }
  },
  computed: {
    ...mapGetters({ hotkeysIcon: 'hotkey/hotkeysIcon' }),
    hotkeyIconList() {
      const keys = this.hotkeysIcon.split(':')
      return _.filter(keys)
    },
  },
  created() {
    this.menu = menu
  },
  mounted() {
    requestInitFolder()
  },
  methods: {
    menuActive(item) {
      const { path } = this.$route
      return { active: path == item.href }
    },
  },
}
</script>

<style lang="scss">
@import './assets/scss/style';
@import './assets/font/iconfont.css';

.layout {
  $width: 250px;

  position: relative;
  height: 100%;

  &-left {
    position: absolute;
    top: 0;
    left: 0;
    width: $width;
    height: 100%;
  }
  &-body {
    width: calc(100% - #{$width});
    height: 100%;
    margin-left: $width;
  }
  &-keys-box {
    position: absolute;
    left: 50%;
    bottom: 30px;
    display: flex;
    justify-content: center;
    transform: translateX(-50%);
    user-select: none;

    .keys-item {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #ffffff;

      min-width: 75px;
      height: 75px;
      margin-right: 65px;
      padding: 20px;
      border: 1px solid #eeeeee;
      border-radius: 20px;
      box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);

      font-size: 80px;
      line-height: 0;

      &::after {
        position: absolute;
        right: -60px;
        content: '+';
        color: #666666;
      }
      &:last-child {
        margin-right: 0;

        &::after {
          display: none;
          right: 0;
        }
      }
    }
  }
}
.hot-key {
  position: absolute;
  right: 15px;
  font-size: 14px;
  color: rgba(238, 238, 238, 0.8);
}
#nav {
  height: 100%;
  border-right: 1px solid #eeeeee;

  > a {
    display: flex;
    align-items: center;

    height: 40px;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom: 1px solid #eeeeee;

    font-weight: bold;
    text-decoration: none;
    color: #409eff;

    &:hover, &.active /**/ {
      background-color: #409eff;
      color: #ffffff;

      .hot-key {
        color: rgba(255, 255, 255, 0.2);
      }
    }
  }
}
</style>
