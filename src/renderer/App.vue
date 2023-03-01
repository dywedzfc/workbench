<template>
  <div id="app" :class="['layout', theme.color, generalAccentColor]">
    <div class="layout-left">
      <left-menu />
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
import { GENERAL_THEME, GENERAL_ACCENT_COLOR, requestInitFolder } from 'assets/script/request'
import LeftMenu from 'components/LeftMenu.vue'
import { menu } from 'assets/config/menu.config'
import { getDateTime } from 'util'
import { resetThemeColor } from 'assets/script/theme'

export default {
  name: 'App',
  components: { LeftMenu },
  provide() {
    return { pro_datetime: () => this.datetime, pro_theme: () => this.theme.color }
  },
  data() {
    return {
      menu: [],
      datetime: '',
      times: { datetime: null },
      theme: { color: '', count: 0 },
    }
  },
  computed: {
    ...mapGetters({ generalTheme: GENERAL_THEME }),
    ...mapGetters({ hotkeysIcon: 'hotkey/hotkeysIcon', generalAccentColor: GENERAL_ACCENT_COLOR }),
    hotkeyIconList() {
      const keys = this.hotkeysIcon.split(':')
      return _.filter(keys)
    },
  },
  watch: {
    generalTheme() {
      this.theme.color = resetThemeColor(this.generalTheme)
    },
    '$route.path'() {
      this.theme.color = resetThemeColor(this.generalTheme)
    },
  },
  created() {
    this.menu = menu
    this.theme.color = resetThemeColor(this.generalTheme)
  },
  mounted() {
    this.getDateTime()
    requestInitFolder()
  },
  destroyed() {
    if (this.times.datetime) clearTimeout(this.times.datetime)
  },
  methods: {
    menuActive(item) {
      const { path } = this.$route
      return { active: path == item.href }
    },

    getDateTime() {
      this.datetime = getDateTime(new Date())
      const type = this.generalTheme
      if (type == 'auto') {
        if (++this.theme.count % (60 * 30) == 0) {
          this.theme.color = resetThemeColor(this.generalTheme)
        }
      } else if (this.theme.count != 0) this.theme.count = 0

      if (this.times.datetime) clearTimeout(this.times.datetime)
      this.times.datetime = setTimeout(this.getDateTime, 1000)
    },
  },
}
</script>

<style lang="scss">
@import './assets/scss/style';
@import './assets/font/iconfont.css';
@import './assets/scss/theme';

.layout {
  $width: 290px;

  position: relative;
  display: flex;
  height: 100%;

  &-left {
    // position: absolute;
    // top: 0;
    // left: 0;
    // width: $width;
    height: 100%;

    background-color: #eeeeee;
  }
  &-body {
    // position: relative;
    flex: 1;
    // width: calc(100% - (#{$width} - 20px));
    height: 100%;
    // margin-left: calc($width - 20px);
    margin-left: -20px;
    border-radius: 20px;
    background-color: #ffffff;
  }
  &-keys-box {
    position: absolute;
    left: 50%;
    bottom: 20px;
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
</style>
