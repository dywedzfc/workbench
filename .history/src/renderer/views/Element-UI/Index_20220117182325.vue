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
        <el-collapse v-model="activeName">
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
        <div class="panel-drawer-item">
          <el-input class="drawer-input" prefix-icon="el-icon-search"></el-input>
        </div>
        <div class="panel-drawer-item">
          <div class="header">Basic</div>
          <div class="wrapper">
            <el-button>Layout 布局</el-button>
            <el-button>Container 布局容器</el-button>
            <el-button>Color 色彩</el-button>
            <el-button>Typography 字体</el-button>
            <el-button>Border 边框</el-button>
            <el-button>Icon 图标</el-button>
            <el-button>Button 按钮</el-button>
            <el-button>Link 文字链接</el-button>
          </div>
        </div>
        <div class="panel-drawer-item">
          <div class="header">Form</div>
          <div class="wrapper">
            <el-button>Radio 单选框</el-button>
            <el-button>Checkbox 多选框</el-button>
            <el-button>Input 输入框</el-button>
            <el-button>InputNumber 计数器</el-button>
            <el-button>Select 选择器</el-button>
            <el-button>Cascader 级联选择器</el-button>
            <el-button>Switch 开关</el-button>
            <el-button>Slider 滑块</el-button>
            <el-button>TimePicker 时间选择器</el-button>
            <el-button>DatePicker 日期选择器</el-button>
            <el-button>DateTimePicker 日期时间选择器</el-button>
            <el-button>Upload 上传</el-button>
            <el-button>Rate 评分</el-button>
            <el-button>ColorPicker 颜色选择器</el-button>
            <el-button>Transfer 穿梭框</el-button>
            <el-button>Form 表单</el-button>
          </div>
        </div>
        <div class="panel-drawer-item">
          <div class="header">Data</div>
          <div class="wrapper">
            <el-button>Table 表格</el-button>
            <el-button>Tag 标签</el-button>
            <el-button>Progress 进度条</el-button>
            <el-button>Tree 树形控件</el-button>
            <el-button>Pagination 分页</el-button>
            <el-button>Badge 标记</el-button>
            <el-button>Avatar 头像</el-button>
            <el-button>Skeleton 骨架屏</el-button>
            <el-button>Empty 空状态</el-button>
            <el-button>Descriptions 描述列表</el-button>
            <el-button>Result 结果</el-button>
          </div>
        </div>
        <div class="panel-drawer-item">
          <div class="header">Notice</div>
          <div class="wrapper">
            <el-button>Alert 警告</el-button>
            <el-button>Loading 加载</el-button>
            <el-button>Message 消息提示</el-button>
            <el-button>MessageBox 弹框</el-button>
            <el-button>Notification 通知</el-button>
          </div>
        </div>
        <div class="panel-drawer-item">
          <div class="header">Navigation</div>
          <div class="wrapper"></div>
        </div>
        <div class="panel-drawer-item">
          <div class="header">Others</div>
          <div class="wrapper"></div>
        </div>
      </div>
    </transition>
  </el-container>
</template>

<script>
// import _ from 'lodash'

export default {
  name: 'Element UI',
  data() {
    return { drawer: { display: false } }
  },
  computed: {},
  mounted() {},
  methods: {
    handleQueryPropFocus() {
      this.drawer.display = true
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

    &-item {
      &:first-child {
        display: flex;
        width: 50%;
        margin: 0 auto;

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
