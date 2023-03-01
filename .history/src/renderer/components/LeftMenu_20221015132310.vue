<template>
  <div :class="['nav-box', { show }]">
    <div class="nav-header">
      <div class="logo-button" @click="handleLogoButtonClick">工作台</div>
    </div>
    <div class="nav-wrapper">
      <template v-for="item in menu">
        <div :class="['link', menuActive(item)]" v-if="item.type == 'open'" :key="item.id">
          <i :class="['icon', iconClassName(item.icon)]"></i>
          {{ item.hotKey }} <span class="hot-key">{{ item.hotKey }}</span>
        </div>
        <router-link :class="['link', menuActive(item)]" v-else :key="item.id" :to="item.href">
          <i :class="['icon', iconClassName(item.icon)]"></i>
          {{ item.title }} <span class="hot-key">{{ item.hotKey }}</span>
        </router-link>
      </template>
    </div>
    <div class="nav-footer">
      <template v-for="item in menu">
        <div :class="['link', menuActive(item)]" v-if="item.type == 'open'" :key="item.id">
          <i :class="['icon', iconClassName(item.icon)]"></i>
          {{ item.hotKey }} <span class="hot-key">{{ item.hotKey }}</span>
        </div>
        <router-link :class="['link', menuActive(item)]" v-else :key="item.id" :to="item.href">
          <i :class="['icon', iconClassName(item.icon)]"></i>
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
import { iconClassName } from 'util'
import { menu, footMenu } from 'assets/config/menu.config'

export default {
  name: 'LeftMenu',
  data() {
    return { show: true, menu: [], footMenu: [] }
  },
  computed: {
    ...mapGetters({ hotkeysIcon: 'hotkey/hotkeysIcon' }),
    hotkeyIconList() {
      return _.filter(this.hotkeysIcon.split(':'))
    },
  },
  created() {
    this.menu = menu
    this.footMenu = footMenu
  },
  mounted() {
    requestInitFolder()
  },
  methods: {
    handleLogoButtonClick() {
      this.show = !this.show
    },
    menuActive(item) {
      const { path } = this.$route
      return { active: path == item.href }
    },
    iconClassName,
  },
}
</script>

<style lang="scss">
@import '~assets/scss/style';
@import '~assets/font/iconfont.css';

.show {
  .hot-key {
    display: block;
    color: rgba(204, 204, 204, 0.8);
  }
  .link.active .hot-key {
    color: rgba(238, 238, 238, 0.8);
  }
}

.hot-key {
  position: absolute;
  right: 15px;
  display: none;
  font-size: 14px;
  color: rgba(238, 238, 238, 0.8);
}
.logo-button {
  display: flex;
  align-items: center;
  cursor: pointer;
  // height: 50px;
  margin-bottom: 20px;
  font-size: 26px;
  font-weight: bold;

  &::before {
    display: inline-block;
    width: 50px;
    height: 50px;
    margin-left: 20px;
    margin-right: 20px;
    background-image: url('~assets/image/logo.png');
    background-size: 40px 40px;
    background-repeat: no-repeat;
    background-position: center;

    content: '';
  }
}
.nav {
  &-box {
    height: 100%;
    padding: 20px;
    padding-right: 40px;
    // border-right: 1px solid #eeeeee;
  }
  &-wrapper {
    .link {
      position: relative;
      display: flex;
      align-items: center;

      height: 50px;
      margin-bottom: 10px;
      padding-left: 20px;
      padding-right: 20px;
      // border-bottom: 1px solid #eeeeee;
      border-radius: 10px;

      font-weight: bold;
      text-decoration: none;
      color: #409eff;

      .icon {
        margin-top: -2px;
        margin-right: 5px;
        font-size: 24px;
      }

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
