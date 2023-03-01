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
        <div class="panel-drawer-close el-icon-close"></div>
        <div class="panel-drawer-header">
          <el-input class="drawer-input" prefix-icon="el-icon-search"></el-input>
        </div>
        <div class="panel-drawer-wrapper">
          <div class="panel-drawer-item" v-for="item in menu" :key="item.title">
            <div class="header">{{ item.title }}</div>
            <div class="wrapper">
              <el-button
                :type="drawerButtonClick(it)"
                size="small"
                v-for="it in item.data"
                :key="it.id"
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

export default {
  name: 'Element UI',
  data() {
    return { drawer: { display: false }, menu: [] }
  },
  computed: {},
  mounted() {
    this.menu = [
      {
        title: 'Basic',
        data: [
          { id: 'Layout', title: 'Layout 布局' },
          { id: 'Container', title: 'Container 布局容器' },
          { id: 'Color', title: 'Color 色彩' },
          { id: 'Typography', title: 'Typography 字体' },
          { id: 'Border', title: 'Border 边框' },
          { id: 'Icon', title: 'Icon 图标' },
          { id: 'Button', title: 'Button 按钮' },
          { id: 'Link', title: 'Link 文字链接' }
        ]
      },
      {
        title: 'Form',
        data: [
          { id: 'Radio', title: 'Radio 单选框' },
          { id: 'Checkbox', title: 'Checkbox 多选框' },
          { id: 'Input', title: 'Input 输入框' },
          { id: 'InputNumber', title: 'InputNumber 计数器' },
          { id: 'Select', title: 'Select 选择器' },
          { id: 'Cascader', title: 'Cascader 级联选择器' },
          { id: 'Switch', title: 'Switch 开关' },
          { id: 'Slider', title: 'Slider 滑块' },
          { id: 'TimePicker', title: 'TimePicker 时间选择器' },
          { id: 'DatePicker', title: 'DatePicker 日期选择器' },
          { id: 'DateTimePicker', title: 'DateTimePicker 日期时间选择器' },
          { id: 'Upload', title: 'Upload 上传' },
          { id: 'Rate', title: 'Rate 评分' },
          { id: 'ColorPicker', title: 'ColorPicker 颜色选择器' },
          { id: 'Transfer', title: 'Transfer 穿梭框' },
          { id: 'Form', title: 'Form 表单' }
        ]
      },
      {
        title: 'Data',
        data: [
          { id: 'Table', title: 'Table 表格' },
          { id: 'Tag', title: 'Tag 标签' },
          { id: 'Progress', title: 'Progress 进度条' },
          { id: 'Tree', title: 'Tree 树形控件' },
          { id: 'Pagination', title: 'Pagination 分页' },
          { id: 'Badge', title: 'Badge 标记' },
          { id: 'Avatar', title: 'Avatar 头像' },
          { id: 'Skeleton', title: 'Skeleton 骨架屏' },
          { id: 'Empty', title: 'Empty 空状态' },
          { id: 'Descriptions', title: 'Descriptions 描述列表' },
          { id: 'Result', title: 'Result 结果' }
        ]
      },
      {
        title: 'Notice',
        data: [
          { id: 'Alert', title: 'Alert 警告' },
          { id: 'Loading', title: 'Loading 加载' },
          { id: 'Message', title: 'Message 消息提示' },
          { id: 'MessageBox', title: 'MessageBox 弹框' },
          { id: 'Notification', title: 'Notification 通知' }
        ]
      },
      {
        title: 'Navigation',
        data: [
          { id: 'NavMenu', title: 'NavMenu 导航菜单' },
          { id: 'Tabs', title: 'Tabs 标签页' },
          { id: 'Breadcrumb', title: 'Breadcrumb 面包屑' },
          { id: 'PageHeader', title: 'PageHeader 页头' },
          { id: 'Dropdown', title: 'Dropdown 下拉菜单' },
          { id: 'Steps', title: 'Steps 步骤条' }
        ]
      },
      {
        title: 'Others',
        data: [
          { id: 'Dialog', title: 'Dialog 对话框' },
          { id: 'Tooltip', title: 'Tooltip 文字提示' },
          { id: 'Popover', title: 'Popover 弹出框' },
          { id: 'Popconfirm', title: 'Popconfirm 气泡确认框' },
          { id: 'Card', title: 'Card 卡片' },
          { id: 'Carousel', title: 'Carousel 走马灯' },
          { id: 'Collapse', title: 'Collapse 折叠面板' },
          { id: 'Timeline', title: 'Timeline 时间线' },
          { id: 'Divider', title: 'Divider 分割线' },
          { id: 'Calendar', title: 'Calendar 日历' },
          { id: 'Image', title: 'Image 图片' },
          { id: 'Backtop', title: 'Backtop 回到顶部' },
          { id: 'InfiniteScroll', title: 'InfiniteScroll 无限滚动' },
          { id: 'Drawer', title: 'Drawer 抽屉' }
        ]
      }
    ]
  },
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
