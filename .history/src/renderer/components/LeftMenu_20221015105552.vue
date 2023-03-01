<template>
  <div class="nav-box">
    <div class="nav-wrapper">
      <template v-for="item in menu">
        <div :class="['link', menuActive(item)]" v-if="item.type == 'open'" :key="item.id">
          {{ item.hotKey }} <span class="hot-key">{{ item.hotKey }}</span>
        </div>
        <router-link :class="menuActive(item)" v-else :key="item.id" :to="item.href">
          {{ item.title }} <span class="hot-key">{{ item.hotKey }}</span>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { requestInitFolder } from 'assets/script/request'
import { menu } from 'assets/config/menu.config'

export default {
  name: 'App',
  data() {
    return { menu: [] }
  },
  computed: {
    ...mapGetters({ hotkeysIcon: 'hotkey/hotkeysIcon' }),
    hotkeyIconList() {
      return _.filter(this.hotkeysIcon.split(':'))
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
@import '~assets/scss/style';
@import '~assets/font/iconfont.css';

.hot-key {
  position: absolute;
  right: 15px;
  font-size: 14px;
  color: rgba(238, 238, 238, 0.8);
}
.nav {
  &-box {
    height: 100%;
    padding: 10px;
    border-right: 1px solid #eeeeee;
  }
  &-wrapper {
    > a,
    .link {
      display: flex;
      align-items: center;

      height: 40px;
      margin-bottom: 10px;
      padding-left: 20px;
      padding-right: 20px;
      // border-bottom: 1px solid #eeeeee;
      border-radius: 10px;

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
}
</style>
