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
        detail: ['添加:快捷菜单,日报添加跳转当月功能;', '修改:UI调整;'],
      },
      {
        version: '0.4.71',
        detail: [
          '添加:绘制logo,设置模块,生成初始化文件,日报添加重复过滤,月报添加任务数,项目列表(添加表格,项目列表搜索高亮),回收站表格添加分页;',
          '修改:系统图标,About布局,日报简称展示;',
        ],
      },
      {
        version: '0.4.46',
        detail: [
          '添加:搜索文字高亮,日报添加简称搜索,月报添加简称搜索,年份和月份控件,多单词过滤查询,项目文件列表多单词过滤查询;',
          '修改:热键调整,日报卡片标题调整,月报卡片标题调整,添加日报优化;',
        ],
      },
      {
        version: '0.4.46',
        detail: [
          日报模块项目名称列表排序
日报模块删除-backspace键的操作
日报任务模块添加-修改快捷提交和取消
          '添加:日报项目列表排序,日报快捷提交;',
          '删除:backspace键的操作;',
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
