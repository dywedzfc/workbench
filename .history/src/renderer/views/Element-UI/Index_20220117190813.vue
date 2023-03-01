<template>
  <el-container class="container-wrapper">
    <el-container class="container-wrapper">
      <el-main class="container-body">Main</el-main>
      <el-footer class="container-footer" height="250px">Footer</el-footer>
    </el-container>
    <el-aside class="container-right" width="300px">
      <div class="panel-header">
        <el-input @focus="handleQueryPropFocus"></el-input>
      </div>
      <div class="panel-body">
        <el-collapse v-model="collapse.active">
          <el-collapse-item title="基础属性" name="baseProps">
            <el-form class="container-form" label-width="60px">
              <el-form-item label="id">
                <el-input class="input-block"></el-input>
              </el-form-item>
              <el-form-item label="class">
                <el-input class="input-block"></el-input>
              </el-form-item>
              <el-form-item label="title">
                <el-input class="input-block"></el-input>
              </el-form-item>
              <el-form-item label="style">
                <el-input class="input-block"></el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="专有属性" name="2">
            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>
          <el-collapse-item title="专有事件" name="3">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
            <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
          </el-collapse-item>
          <el-collapse-item title="专有事件" name="4">
            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </el-aside>
    <transition name="fade" appear>
      <div class="panel-drawer" v-if="drawer.display">
        <div class="panel-drawer-close el-icon-close"></div>
        <div class="panel-drawer-header">
          <el-input class="drawer-input" prefix-icon="el-icon-search"></el-input>
        </div>
        <div class="panel-drawer-wrapper">
          <div class="panel-drawer-item" v-for="item in menu" :key="item.title">
            <div class="header">{{ item.title }}</div>
            <div class="wrapper">
              <el-button
                :type="drawerButtonType(it)"
                size="small"
                v-for="it in item.data"
                :key="it.id"
                @mouseenter.native="handleDrawerButtonMouseenter(it)"
                @mouseleave.native="handleDrawerButtonMouseleave(it)"
                >{{ it.title }}</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </transition>
  </el-container>
</template>

<script>
// import _ from 'lodash'
import menuOptions from './menu'

export default {
  name: 'ElementUI',
  data() {
    return { drawer: { display: false }, collapse: { active: '' }, menu: [] }
  },
  computed: {},
  mounted() {
    this.menu = menuOptions.data
  },
  methods: {
    handleQueryPropFocus() {
      this.drawer.display = true
    },
    handleDrawerButtonMouseenter(item) {
      item.hover == true
      console.info('button:')
    },
    handleDrawerButtonMouseleave(item) {
      item.hover == false
      console.info('button-end:')
    },

    drawerButtonType(item) {
      if (item.type == 'hover') return 'primary'
      return 'default'
    }
  }
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
    border-left: 1px solid #eeeeee;
  }
  &-footer {
    padding: 0;
    border-top: 1px solid #eeeeee;
  }
}
.panel {
  &-header {
    box-sizing: border-box;
    height: 80px;
    padding: 20px;
    border-bottom: 1px solid #eeeeee;
    // padding-bottom: 20px;
  }
  &-body {
    overflow: auto;
    height: calc(100% - 80px);
  }
  &-drawer {
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    background-color: #ffffff;
    width: 100%;
    height: 100%;
    padding: 70px 40px 40px;

    &-close {
      position: absolute;
      top: 30px;
      right: 30px;
      cursor: pointer;
      background-color: #ffffff;
      transition: background-color 0.28s, color 0.28s;

      padding: 10px;
      border-radius: 10px;
      font-size: 28px;
      font-weight: bold;

      &:hover {
        background-color: #e81123;
        color: #ffffff;
      }
    }
    &-header {
      display: flex;
      width: 50%;
      margin: 0 auto 10px;

      .el-input__icon {
        font-size: 30px;
        width: 40px;
        line-height: 60px;
      }
      .el-input__inner {
        height: 60px;
        padding-left: 48px;
        border-radius: 15px;
        font-size: 26px;
      }
    }
    &-wrapper {
      overflow: auto;
      height: calc(100% - 70px);
    }

    &-item {
      .header {
        padding: 10px 0;
        font-weight: bold;
      }
      .wrapper {
        // margin-bottom: 10px;

        &::v-deep .el-button {
          margin-bottom: 10px;
        }
      }
    }
  }
}
.container-form {
  .input-block {
    width: 220px;
  }
}
.fade {
  &-enter-active,
  &-leave-active {
    transition: opacity 0.3s, top 0.5s;
  }
}
.fade {
  &-enter, &-leave-to /* .fade-leave-active below version 2.1.8 */ {
    top: -100%;
    opacity: 0;
  }
}
</style>
