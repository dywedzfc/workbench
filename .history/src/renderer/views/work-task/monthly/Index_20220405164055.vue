<template>
  <page title="月报" icon="el-icon-s-home" @back="handlePageBack">
    <panel-query>
      <el-form slot="query-bar" class="query-form" inline>
        <el-form-item>
          <el-input v-model="query.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item>
          <picker-year v-model="query.year" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQueryClick">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleTypeClick">{{ taskType }}</el-button>
        </el-form-item>
      </el-form>
      <card-list width="600px">
        <template v-if="initMonthly.isMonth">
          <card-item :title="currentYear" v-if="filterYearList.length">
            <task-box
              v-for="(data, index) in filterYearList"
              :key="data.id + index"
              :data="data"
              :query="query.name"
              :loading="loading"
            >
            </task-box>
          </card-item>
        </template>
        <template v-else>
          <card-item v-for="item in filterMonthlyList" :key="item.date" :title="item.date">
            <task-box
              v-for="data in item.data"
              :key="data.id"
              :date="item.date"
              :data="data"
              :query="query.name"
              :loading="loading"
            >
            </task-box>
          </card-item>
        </template>
      </card-list>
    </panel-query>
  </page>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import { mapGetters } from 'vuex'
import Page from 'components/basic/Page'
import PanelQuery from 'components/basic/PanelQuery'
import PickerYear from 'components/date/Year'
import CardList from '../components/CardList'
import CardItem from '../components/CardItem'
import TaskBox from './components/TaskBox'
import {
  PROJECT_OPTIONS,
  MONTHLY_INFO,
  INIT_MONTHLY,
  requestProjectList,
  requestMonthlyInfo,
  requestSetMonthlyIsMonth,
} from 'assets/script/request'

export default {
  name: 'Monthly',
  components: { Page, PanelQuery, PickerYear, CardList, CardItem, TaskBox },
  data() {
    return { loading: false, query: { name: '', year: '' }, type: { year: '' } }
  },
  computed: {
    ...mapGetters({
      projectList: PROJECT_OPTIONS,
      monthly: MONTHLY_INFO,
      initMonthly: INIT_MONTHLY,
    }),
    filterMonthlyList() {
      const { name } = this.query
      const fProjectName = _.filter(
        this.projectList,
        ({ label, title }) => label.includes(name) || (title && title.includes(name))
      )
      const projectIds = _.map(fProjectName, 'value')
      const monthlyList = JSON.parse(JSON.stringify(this.monthly.month))
      const filter1 = _.map(monthlyList, (item) => {
        item.data = _.filter(item.data, (item) => {
          const project = projectIds.includes(parseInt(item.projectId))
          const nTask = _.map(item.task, (item) => item.value).join('|:|')
          let task = name.includes('|:|') ? false : nTask.includes(name)
          return project || task
        })
        return item
      })
      const filter2 = _.filter(filter1, (item) => item.data.length)
      return _.orderBy(filter2, 'date', 'desc')
    },
    filterYearList() {
      const { name } = this.query
      const fProjectName = _.filter(
        this.projectList,
        ({ label, title }) => label.includes(name) || (title && title.includes(name))
      )
      const projectIds = _.map(fProjectName, 'value')
      const yearList = JSON.parse(JSON.stringify(this.monthly.year))
      const filter1 = _.filter(yearList, (item) => {
        const project = projectIds.includes(parseInt(item.projectId))
        const nTask = _.map(item.task, (item) => item.value).join('|:|')
        let task = name.includes('|:|') ? false : nTask.includes(name)
        return project || task
      })
      return _.orderBy(filter1, 'date', 'desc')
    },
    currentYear() {
      return this.type.year || new Date().getFullYear().toString()
    },
    taskType() {
      return this.initMonthly.isMonth ? '月' : '年'
    },
  },
  watch: {
    'query.year'() {
      this.getMonthlyInfo()
    },
  },
  mounted() {
    this.query.year = moment().format('YYYY')
    this.getMonthlyInfo()
    requestProjectList()
  },
  methods: {
    getMonthlyInfo() {
      this.loading = true
      const { year } = this.query
      this.type.year = year || new Date().getFullYear().toString()
      requestMonthlyInfo(year || '', () => {
        this.loading = false
      })
    },

    handlePageBack() {
      this.$router.push({ name: 'Home' })
    },
    handleQueryClick() {
      this.getMonthlyInfo()
    },
    handleTypeClick() {
      requestSetMonthlyIsMonth(!this.initMonthly.isMonth)
    },
  },
}
</script>

<style></style>
