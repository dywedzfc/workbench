<template>
  <page title="关于" :back="false">
    <div class="template-wrapper">
      <logo size="16vw" />
      <h2 class="header">关于</h2>
      <div class="version">版本：{{ version }}</div>
      <div class="timeline-box">
        <div class="timeline-wrapper">
          <el-timeline :reverse="false">
            <el-timeline-item
              v-for="item in timeline"
              :key="item.version"
              :timestamp="item.version"
              placement="top"
            >
              <div class="detail-item" v-for="(item, index) in item.detail" :key="index">
                {{ item }}
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
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
        version: '0.4.93',
        detail: ['添加：快捷菜单，日报添加跳转当月功能；', '修改：UI调整；'],
      },
      {
        version: '0.4.71',
        detail: [
          '添加：绘制logo，设置模块，生成初始化文件，日报添加重复过滤，月报添加任务数，项目列表（添加表格，项目列表搜索高亮），回收站表格添加分页；',
          '修改：系统图标，About布局，日报简称展示；',
        ],
      },
      {
        version: '0.4.46',
        detail: [
          '添加：搜索文字高亮，日报添加简称搜索，月报添加简称搜索，年份和月份控件，多单词过滤查询，项目文件列表多单词过滤查询；',
          '修改：热键,日报卡片标题,月报卡片标题,添加日报优化；',
        ],
      },
      {
        version: '0.4.40',
        detail: ['添加：日报项目列表排序,日报快捷提交；', '删除：backspace键的操作；'],
      },
      {
        version: '0.4.12',
        detail: ['添加：日报提交任务列表按长度排序；', '修改：日报添加功能,日报任务标题,任务框；'],
      },
      {
        version: '0.3.6',
        detail: [
          '添加：整理每月任务,整理每年任务,自动判断空行清除,回车键快速创建项目；',
          '修改：日报存储数据,回收站已解决删除后存在未完全删除的情况；',
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
.version {
  margin-bottom: 40px;
}
.timeline {
  &-box {
    box-sizing: border-box;

    width: 40vw;
    height: 40vh;
    margin: 0 auto;
    padding: 15px 0;
    padding-right: 10px;
    border-radius: 20px;
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.05), 0 3px 6px rgba(0, 0, 0, 0.05),
      0 5px 14px 4px rgba(0, 0, 0, 0.05);
  }
  &-wrapper {
    overflow: auto;
    height: 100%;
    padding: 0 20px;
    padding-right: 10px;
    border-radius: 20px;

    &::-webkit-scrollbar {
      overflow: hidden;
      width: 8px;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      margin-top: 20px;
      border-radius: 50px;
      background-color: rgba(153, 153, 153, 0.4);
    }

    &::v-deep .el-timeline {
      padding-top: 5px;
    }
    &::v-deep .el-timeline-item__timestamp {
      position: relative;
      top: -5px;
      font-size: 24px;
      text-align: left;
      color: #333333;
    }
    &::v-deep .el-timeline-item__content {
      text-align: left;
    }
  }
}
.detail-item {
  margin-bottom: 5px;
  line-height: 1.4;
}
</style>
