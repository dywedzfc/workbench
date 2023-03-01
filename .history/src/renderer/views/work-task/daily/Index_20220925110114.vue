<template>
  <page title="日报" icon="el-icon-s-home" @back="handlePageBack">
    <panel-query>
      <el-form slot="query-bar" class="query-form" inline>
        <el-form-item>
          <el-input v-model="query.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item>
          <picker-month v-model="query.month" />
          <!-- <el-date-picker
            v-model="query.month"
            type="month"
            value-format="yyyy-MM"
            placeholder="月份"
          ></el-date-picker> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQueryClick">查询</el-button>
          <el-button type="primary" @click="handleQueryTodayClick">当月</el-button>
          <el-button type="primary" @click="handleAddDailyClick">添加日报</el-button>
        </el-form-item>
      </el-form>
      <card-list width="600px" ref="card-list">
        <card-item v-if="daily.type == 'add'">
          <el-form class="form-card" label-width="80px">
            <el-form-item label="项目名称">
              <el-select class="input-block" v-model="daily.add.projectId" filterable>
                <el-option
                  v-for="item in projectOptions"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="任务信息">
              <div class="task-list">
                <el-input
                  class="input-block"
                  v-model.trim="item.value"
                  v-for="(item, index) in daily.add.task"
                  :key="index"
                  :ref="`task_${index}`"
                  @keydown.native="handleTaskKeydown"
                  @keyup.native="handleTaskKeyup($event, item.value, index)"
                  @paste.native="handleTaskPaste($event, index)"
                  @blur="handleTaskBlur($event, item.value, index)"
                />
              </div>
            </el-form-item>
            <el-form-item class="form-center" label-width="0">
              <el-button @click="handleAddTaskCancelClick">取消</el-button>
              <el-button type="primary" @click="handleAddTaskSubmitClick">保存</el-button>
            </el-form-item>
          </el-form>
        </card-item>
        <card-item
          v-for="item in filterDailyList"
          :key="item.date"
          :title="`${item.date}（${dateWeek(item.date)}）`"
        >
          <task-box
            v-for="data in item.data"
            :key="data.id"
            :date="item.date"
            :data="data"
            :query="query.name"
            @title-remove="handleTaskTitleRemove"
            @task-change="handleTaskItemRemove"
          >
          </task-box>
        </card-item>
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
import PickerMonth from 'components/date/Month'
import CardList from '../components/CardList'
import CardItem from '../components/CardItem'
import TaskBox from './components/TaskBox'
import { msgSuccess, msgWarning, charLength } from 'util'
import {
  PROJECT_OPTIONS,
  requestProjectList,
  DAILY_LIST,
  requestDailyList,
  requestAddDailyInfo,
  requestUpdDailyInfo,
  requestDelDailyInfo,
} from 'assets/script/request'

export default {
  name: 'Daily',
  components: { Page, PanelQuery, PickerMonth, CardList, CardItem, TaskBox },
  data() {
    return {
      loading: false,
      query: { name: '', month: '' },
      daily: { type: '', add: { projectId: '', task: [] }, data: [] },
    }
  },
  computed: {
    ...mapGetters({ projectList: PROJECT_OPTIONS, dailyList: DAILY_LIST }),
    projectOptions() {
      const options = [
        { label: '历史记录', options: [] },
        {
          options: [],
        },
      ]

      return options
    },
    filterDailyList() {
      const { name } = this.query
      const fProjectName = _.filter(
        this.projectList,
        ({ label, title }) => label.includes(name) || (title && title.includes(name))
      )
      const projectIds = _.map(fProjectName, 'value')
      const dailyList = JSON.parse(JSON.stringify(this.dailyList))
      const filter1 = _.map(dailyList, (item) => {
        item.data = _.filter(item.data, (item) => {
          const project = projectIds.includes(item.projectId)
          let task = name.includes('|:|') ? false : item.task.includes(name)
          return project || task
        })
        return item
      })
      const filter2 = _.filter(filter1, (item) => item.data.length)
      return _.orderBy(filter2, 'date', 'desc')
    },
  },
  watch: {
    'query.month'() {
      this.getDailyInfo()
    },
    'daily.add.projectId'(value, old) {
      if (!value) return
      const split = '|:|'
      const date = moment().format('YYYY-MM-DD')
      let flag = false
      _.each(this.dailyList, (item) => {
        const project = _.filter(item.data, (item) => item.projectId == value)
        if (item.date == date) {
          const oldTask = this.daily.add.task
          if (project[0]) {
            const concatData = [].concat(_.map(oldTask, 'value'), project[0].task.split(split))
            const pototypeTask = _.filter(_.uniq(concatData)).join(split)
            const data = _.map(pototypeTask.split(split), (item) => ({ value: item }))
            if (!old && pototypeTask.length > 0) {
              const reset = _.map(data, (item) => ((item.size = charLength(item.value)), item))
              const task = _.orderBy(reset, 'size')
              this.daily.add.task = task
            } else this.daily.add.task = data
            flag = true
          }
        }
      })
      const { task } = this.daily.add
      if (!old && task.length) flag = true
      if (!flag) this.daily.add.task = [{ value: '' }]
    },
  },
  mounted() {
    console.info('data-local:', localStorage.getItem('dailyHistory'))
    if (!localStorage.getItem('dailyHistory'))
      localStorage.setItem('dailyHistory', JSON.stringify([]))
    this.query.month = moment().format('YYYY-MM')
    this.daily.add.task = []
    this.daily.add.task.push({ value: '' })
    this.getDailyInfo()
    requestProjectList()
  },
  methods: {
    getDailyInfo() {
      this.loading = true
      this.$refs['card-list'].$el.parentNode.scrollTop = 0
      requestDailyList(this.query.month || '', () => {
        this.loading = false
      })
    },
    addDailyInfo() {
      const { projectId, task } = this.daily.add
      let resetTask = this.resetTaskCenter(task)
      const data = { id: Date.now(), projectId, task: resetTask }

      requestAddDailyInfo({ date: moment().format('YYYY-MM-DD'), data }, ({ code, msg }) => {
        if (code == 200) {
          this.getDailyInfo()
          this.handleAddTaskCancelClick()
          msgSuccess(msg)
          this.setLocalStorage(projectId)
        } else msgWarning(msg)
      })
    },
    updDailyInfo(data, cb) {
      const { projectId, task } = data.data
      data.data.task = this.resetTaskCenter(_.map(task.split('|:|'), (item) => ({ value: item })))
      requestUpdDailyInfo(data, ({ code, msg }) => {
        if (code == 200) {
          this.getDailyInfo()
          msgSuccess(msg)
          this.setLocalStorage(projectId)
          if (cb) cb(code)
        } else msgWarning(msg)
      })
    },
    delDailyInfo(query) {
      requestDelDailyInfo(query, ({ code, msg }) => {
        if (code == 200) {
          this.getDailyInfo()
          msgSuccess(msg)
        } else msgWarning(msg)
      })
    },

    handlePageBack() {
      this.$router.push({ name: 'Home' })
    },
    handleQueryClick() {
      this.getDailyInfo()
    },
    handleQueryTodayClick() {
      this.query.month = moment().format('YYYY-MM')
      // this.getDailyInfo()
    },
    handleAddDailyClick() {
      this.daily.type = 'add'
      this.$refs['card-list'].$el.parentNode.scrollTop = 0
    },
    handleTaskKeydown(event) {
      if (event.key == 'ArrowUp' || event.key == 'ArrowDown')
        return event.preventDefault(), undefined
    },
    handleTaskKeyup(event, value, index) {
      // let item = this.daily.add.task[index]
      // if (event.key != 'Backspace' && item.count != null) delete item.count
      if (event.key == 'Enter') this.taskKeyEnter(value, index)
      // else if (event.key == 'Backspace') {
      //   if (value.length && item.count != null) item.count = undefined
      //   if (value == '') {
      //     if (item.count == null) item.count = 1
      //     item.count--
      //   }
      //   if (item.count == -1) this.taskBackspace(index)
      // }
      else if (event.key == 'ArrowUp') this.taskKeyUp(index)
      else if (event.key == 'ArrowDown') this.taskKeyDown(index)
    },
    handleTaskBlur(event, value, index) {
      if (!value && this.daily.add.task.length > 1) this.daily.add.task.splice(index, 1)
    },
    async handleTaskPaste(event, index) {
      const readText = await navigator.clipboard.readText()
      const list = _.filter(readText.split('\n'))
      if (list.length > 1) {
        for (let i = 0; i < list.length; i++) {
          const v = list[i]
          if (i) this.daily.add.task.splice(index + i, 0, { value: '' })
          this.daily.add.task[index + i].value = v
        }
        setTimeout(() => this.$refs[`task_${index + (list.length - 1)}`][0].focus())
      }
    },
    handleAddTaskCancelClick() {
      this.daily.type = ''
      this.daily.add.projectId = ''
      this.daily.add.task = []
      this.daily.add.task.push({ value: '' })
    },
    handleAddTaskSubmitClick() {
      const d = moment().format('YYYY-MM-DD')
      const { projectId, task } = this.daily.add

      if (this.verificationSubmit()) return
      let project = null
      const list = _.filter(this.dailyList, ({ date, data }) => {
        const currentDate = date == d
        if (currentDate) project = _.filter(data, (item) => item.projectId == projectId)
        return date == d && project.length >= 0
      })
      if (list.length && project.length) {
        const data = Object.assign(project[0], { task: _.map(task, 'value').join('|:|') })
        const objData = { data: data, query: { date: d, projectId } }
        this.updDailyInfo(objData, this.handleAddTaskCancelClick)
      } else this.addDailyInfo()
    },
    handleTaskTitleRemove(data) {
      this.delDailyInfo(data)
    },
    handleTaskItemRemove(data, cb) {
      if (!data.data.task) this.delDailyInfo(data.query)
      else this.updDailyInfo(data, cb)
    },

    taskKeyEnter(value, index) {
      if ((value + '').length) {
        if (this.daily.add.task.length - 1 == index) this.daily.add.task.push({ value: '' })
        else this.daily.add.task.splice(index + 1, 0, { value: '' })
        setTimeout(() => this.$refs[`task_${index + 1}`][0].focus(), 30)
      } else if (this.daily.add.task.length - 1 > index) {
        setTimeout(() => {
          this.$refs[`task_${index + 1}`][0].focus()
          setTimeout(() => this.$refs[`task_${index}`][0].focus(), 30)
        }, 30)
      }
    },
    taskBackspace(index) {
      this.$refs[`task_${index - 1}`][0].focus()
    },
    taskKeyUp(index) {
      if (index) setTimeout(() => this.$refs[`task_${index - 1}`][0].focus(), 30)
    },
    taskKeyDown(index) {
      if (this.daily.add.task.length - 1 > index)
        setTimeout(() => this.$refs[`task_${index + 1}`][0].focus(), 30)
    },
    verificationSubmit() {
      const { projectId, task } = this.daily.add
      if (!projectId) return msgWarning('请选着项目名称'), true
      if (task && _.map(task, 'value').join('').length == 0)
        return msgWarning('请输入任务信息'), true
      return false
    },
    dateWeek(date) {
      const week = '日一二三四五六'.split('')
      return `星期${week[moment(date).format('d')]}`
    },
    resetTaskCenter(task) {
      let resetTask = _.map(task, (item) => ((item.size = charLength(item.value)), item))
      resetTask = _.orderBy(resetTask, 'size')
      resetTask = _.filter(_.uniq(_.map(resetTask, (item) => item.value.trim()))).join('|:|')
      return resetTask
    },
    setLocalStorage(projectId) {
      const list = _.filter(this.projectOptions, (item) => item.value == projectId)
      console.info('list:', list)
      const historyList = JSON.parse(localStorage.getItem('dailyHistory'))
      const index = _.indexOf(_.map(historyList, 'value'), projectId)
      if (index >= 0) historyList.splice(index, 1)
      historyList.push(list[0])
      localStorage.setItem('dailyHistory', JSON.stringify(historyList))
      console.info('list:', index, list, historyList)
    },
  },
}
</script>

<style lang="scss" scoped>
.template-wrapper {
  box-sizing: border-box;

  height: 100%;
  margin-left: -10px;
  margin-right: -10px;
  padding: 20px;
}

.form-card {
  flex: 1;

  ::v-deep .el-form-item:last-child {
    margin-bottom: 0;
  }
}
.form-center {
  text-align: center;
}

.input-block {
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
}
</style>
