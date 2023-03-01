<!-- 日期框-年份 -->
<template>
  <!-- class="query-input" -->
  <el-date-picker
    class="query-input_mini"
    v-model="data"
    type="year"
    value-format="yyyy"
    :placeholder="placeholder"
  />
</template>

<script>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class PickerYear extends Vue {
  loading = false
  data = ''

  @Prop({ type: String, required: true }) value!: string
  @Prop({ type: String, default: '年份' }) placeholder!: string

  @Watch('value', { immediate: true })
  watchValue(value: string): void {
    this.data = value || ''
  }
  @Watch('data', { immediate: true })
  watchData(value: string): void {
    if (this.$listeners['update:value']) this.$emit('update:value', value || '')
    if (this.$listeners['input']) this.$emit('input', value || '')
  }
}
export default {
  name: 'PickerYear',
  components: { Page, PanelQuery, CardList, CardItem, TaskBox },
  data() {
    return {
      loading = false
  data = ''
    }
  },
  computed: {
    ...mapGetters({ projectList: PROJECT_OPTIONS, dailyList: DAILY_LIST }),
    projectOptions() {
      return _.orderBy(this.projectList, 'label', 'asc')
    },
    filterDailyList() {
      const { name } = this.query
      const fProjectName = _.filter(this.projectList, item => item.label.includes(this.query.name))
      const projectIds = _.map(fProjectName, 'value')
      const dailyList = JSON.parse(JSON.stringify(this.dailyList))
      const filter1 = _.map(dailyList, item => {
        item.data = _.filter(item.data, item => {
          const project = projectIds.includes(item.projectId)
          let task = name.includes('|:|') ? false : item.task.includes(name)
          return project || task
        })
        return item
      })
      const filter2 = _.filter(filter1, item => item.data.length)
      return _.orderBy(filter2, 'date', 'desc')
    }
  },
  watch: {
    'query.month'() {
      this.getDailyInfo()
    },
    'daily.add.projectId'(value, old) {
      if (!value) return
      const date = moment().format('YYYY-MM-DD')
      let flag = false
      _.each(this.dailyList, item => {
        const project = _.filter(item.data, item => item.projectId == value)
        if (item.date == date) {
          const oldTask = this.daily.add.task
          const pototypeTask = _.filter(_.map(oldTask, 'value')).join('|:|')
          if (project[0]) {
            const data = _.map(project[0].task.split('|:|'), item => ({ value: item }))
            if (!old && pototypeTask.length > 0) {
              const merge = [].concat(oldTask, data)
              const reset = _.map(merge, item => ((item.size = charLength(item.value)), item))
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
    }
  },
  mounted() {
    this.daily.add.task = []
    this.daily.add.task.push({ value: '' })
    this.getDailyInfo()
    requestProjectList()
  },
  methods: {
    getDailyInfo() {
      this.loading = true
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
        } else msgWarning(msg)
      })
    },
    updDailyInfo(data, cb) {
      const { task } = data.data
      data.data.task = this.resetTaskCenter(_.map(task.split('|:|'), item => ({ value: item })))
      requestUpdDailyInfo(data, ({ code, msg }) => {
        if (code == 200) {
          this.getDailyInfo()
          msgSuccess(msg)
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
        if (currentDate) project = _.filter(data, item => item.projectId == projectId)
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
      let resetTask = _.map(task, item => ((item.size = charLength(item.value)), item))
      resetTask = _.orderBy(resetTask, 'size')
      resetTask = _.map(resetTask, item => item.value.trim()).join('|:|')
      return resetTask
    }
  }
}
</script>

<style lang="scss" scoped>
.query-input {
  width: 192px !important;
}
</style>
