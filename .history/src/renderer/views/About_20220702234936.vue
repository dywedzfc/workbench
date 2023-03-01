<template>
  <page title="关于" :back="false">
    <div class="template-wrapper">
      <logo size="16vw" />
      <h2 class="header">关于</h2>
      <div class="version">版本：{{ version }}</div>
      <el-timeline :reverse="false">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
      <!-- <div class="datetime-box">
        <div class="date">{{ formatterDate }}</div>
        <div class="time">{{ formatterTime }}</div>
      </div>
      <img class="logo" alt="Work Bench logo" src="../assets/image/logo.png" /> -->
    </div>
  </page>
</template>

<script>
import Page from 'components/basic/Page.vue'
import Logo from 'components/Logo.vue'
import { getDateTime } from 'util'

export default {
  name: 'About',
  components: { Page, Logo },
  data() {
    return { datetime: '', times: { datetime: null }, timeline: [] }
  },
  computed: {
    version() {
      return require('../../../package.json').version
    },
  },
  mounted() {
    this.timeline = [
      {
        version: '0.4.71',
        detail: ['添加:快捷菜单,日报添加跳转当月功能;', '修改:page模块头部按钮样式调整'],
      },
      {
        version: '0.4.71',
        detail: [
          '添加:绘制logo,设置模块,生成初始化文件,月报添加任务数,日报添加重复过滤,日报简称展示调整,项目列表添加表格,项目列表搜索高亮,添加全局分页设置,回收站表格添加分页,项目表文件添加表格,项目表文件搜索高亮,回收站表格添加分页记录,添加全局月报是否显示条数,项目列表添加表格分页和状态记录',
          '修改:系统图标,About布局',
        ],
      },
    ]
    this.getDateTime()
  },
  methods: {
    getDateTime() {
      this.datetime = getDateTime(new Date())
      if (this.times.datetime) clearTimeout(this.times.datetime)
      this.times.datetime = setTimeout(this.getDateTime, 1000)
    },
  },
}
</script>

<style lang="scss" scoped>
.template-wrapper {
  padding: 20px;
  text-align: center;

  &::v-deep .logo-box {
    margin: 0 auto;
  }
  .header {
    font-size: 32px;
    line-height: 1.5;
  }
}
</style>
