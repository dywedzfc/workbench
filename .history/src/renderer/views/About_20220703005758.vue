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
import { versionRecord } from 'assets/config/version.config.json'

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
    this.timeline = versionRecord
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
