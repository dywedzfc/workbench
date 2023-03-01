<template>
  <div :class="['nav-box', { show }]">
    <div class="nav-header">
      <div class="logo-button" text="工作台" @click="handleLogoButtonClick"></div>
    </div>
    <div class="nav-wrapper">
      <template v-for="item in menu">
        <div :class="['link', menuActive(item)]" v-if="item.type == 'open'" :key="item.id">
          <i :class="['icon', iconClassName(item.icon)]"></i>
          <span class="title">{{ item.title }}</span>
          <span class="hot-key">{{ item.hotKey }}</span>
        </div>
        <router-link :class="['link', menuActive(item)]" v-else :key="item.id" :to="item.href">
          <i :class="['icon', iconClassName(item.icon)]"></i>
          <span class="title">{{ item.title }}</span>
          <span class="hot-key">{{ item.hotKey }}</span>
        </router-link>
      </template>
    </div>
    <div class="nav-footer">
      <router-link class="link" v-for="item in footMenu" :key="item.id" :to="item.href">
        <i :class="['icon', iconClassName(item.icon)]"></i>
      </router-link>
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

.nav {
  &-box {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    width: 110px;
    height: 100%;
    padding: 20px;
    padding-right: 40px;
    // border-right: 1px solid #eeeeee;
  }
  &-wrapper {
    flex: 1;
  }
  &-footer {
    display: flex;

    .link {
      display: flex;
      // justify-content: center;
      // align-items: center;
      // box-sizing: border-box;

      // width: 50px;
      height: 50px;
      // margin-bottom: 10px;
      margin-right: 10px;
      padding-left: 10px;
      padding-right: 10px;
      // border-bottom: 1px solid #eeeeee;
      border-radius: 10px;

      font-weight: bold;
      text-decoration: none;
      color: #409eff;

      &:last-child {
        margin-right: 0;
      }
      &::before {
        display: none;
      }
      .icon {
        margin-right: 0;
      }
    }
  }
  &-wrapper, &-footer /**/ {
    .link {
      position: relative;
      display: flex;
      align-items: center;

      height: 50px;
      margin-bottom: 10px;
      padding-left: 12px;
      padding-right: 12px;
      // border-bottom: 1px solid #eeeeee;
      border-radius: 10px;

      font-weight: bold;
      text-decoration: none;
      color: #409eff;

      &::before {
        position: absolute;
        top: 50%;
        left: -16px;
        transform: translateY(-50%);
        transition: height 0.3s ease-in-out;

        width: 5px;
        height: 5px;
        border-radius: 50%;
        opacity: 0;
        background-color: #409eff;

        content: '';
      }
      &:last-child {
        margin-bottom: 0;
      }

      &.active::before {
        height: 50px;
        border-radius: 10px;
        opacity: 1;
      }
      &:hover, &.active /**/ {
        background-color: #409eff;
        color: #ffffff;

        .hot-key {
          color: rgba(255, 255, 255, 0.2);
        }
      }

      .title {
        display: none;
      }
      .icon {
        margin-top: -2px;
        margin-right: 5px;
        font-size: 24px;
      }
    }
  }
}

.show {
  &.nav-box {
    width: 290px;
  }

  .logo-button {
    &::before {
      margin-left: 20px;
      margin-right: 20px;
    }
    &::after {
      content: attr(text);
    }
  }

  .hot-key {
    display: block;
    color: rgba(204, 204, 204, 0.8);
  }

  .nav-wrapper .link {
    padding-left: 20px;
    padding-right: 20px;

    &.active .hot-key {
      color: rgba(238, 238, 238, 0.8);
    }
    .title {
      display: block;
    }
  }
  .nav-footer .link {
    margin-right: 10px;
    margin-bottom: 0;
    padding-left: 10px;
    padding-right: 10px;

    .icon {
      margin-right: 0;
    }
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
    background-image: url('~assets/image/logo.png');
    background-size: 40px 40px;
    background-repeat: no-repeat;
    background-position: center;

    content: '';
  }
}
</style>
