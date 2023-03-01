<!-- 月报任务框 -->
<template>
  <div class="task-box">
    <div class="task-title">
      <el-button
        :class="['button-icon', { 'not-button': !hasJianName }]"
        type="primary"
        size="mini"
        @click="handleTitleNameClick"
      >
        {{ projectButtonText }}
      </el-button>
      <span :class="{ 'title-name': hasJianName }" @click="handleTitleNameClick">
        <!-- {{ projectTitleName }} -->
        <template v-for="({ title, type }, index) in titleHighlight(projectTitleName)">
          <template v-if="type == 'text'">{{ title }}</template>
          <span class="highlight" v-if="type == 'mark'" :key="index">{{ title }}</span>
        </template>
      </span>
      <!-- {{ projectName }}
      <div class="abbreviation">
        <span>{{ projectJianName }}</span>
      </div> -->
    </div>
    <div class="task-content">
      <p
        class="task-word"
        :class="{ hover: index === task.hover, edit: index === task.index }"
        v-for="(item, index) in data.task"
        :key="index"
        @mouseenter="handleTaskItemMouseenter(index)"
        @mouseleave="handleTaskItemMouseleave"
      >
        <!-- <el-checkbox v-model="item.check">{{ item.value }}</el-checkbox> -->
        <!-- {{ item.value }} -->
        <template v-for="({ title, type }, index) in titleHighlight(item.value)">
          <template v-if="type == 'text'">{{ title }}</template>
          <span class="highlight" v-if="type == 'mark'" :key="index">{{ title }}</span>
        </template>
      </p>
    </div>
    <span class="task-count">{{ data.task.length }}</span>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { PROJECT_OPTIONS, requestProjectList } from 'assets/script/request'
import { wordHighlight } from 'util'

export default {
  name: 'TaskBox',
  props: {
    data: { type: Object, required: true },
    date: { type: String },
    query: { type: String, default: '' },
    loading: Boolean
  },
  data() {
    return {
      title: { hover: false, value: '', edit: false, remove: false, type: false },
      task: { hover: '', index: '', value: '', edit: false, remove: false }
    }
  },
  computed: {
    ...mapGetters({ projectList: PROJECT_OPTIONS }),
    projectName() {
      const list = _.filter(this.projectList, item => item.value == this.data.projectId)
      return list.length > 0 ? list[0].label : ''
    },
    projectInfo() {
      const list = _.filter(this.projectList, item => item.value == this.data.projectId)
      return list.length ? list[0] : undefined
    },
    projectButtonText() {
      return this.title.type ? '简' : '全'
    },
    projectTitleName() {
      const data = this.projectInfo
      return data ? (this.title.type ? data.title : data.label) : ''
    },
    projectJianName() {
      const data = this.projectInfo
      return data && data.title ? `简：${data.title}` : ''
    },
    projectOptions() {
      return this.projectList
    },
    hasJianName() {
      const data = this.projectInfo
      return !!(data && data.title && data.title.trim())
    }
  },
  watch: {
    loading(value) {
      if (value) return
      if (this.title.edit) this.handleTitleEditCloseClick()
      if (this.task.edit) this.handleTaskEditCloseClick()
    },
    'title.remove'(value) {
      if (!value) this.title.hover = false
    },
    'task.remove'(value) {
      if (!value) this.task.hover = ''
    }
  },
  mounted() {
    requestProjectList()
    this.title.type = this.hasJianName ? true : false
  },
  methods: {
    // 标题操作
    handleTaskTitleMouseenter() {
      if (this.title.remove) return
      this.title.hover = true
    },
    handleTaskTitleMouseleave() {
      if (this.title.remove) return
      this.title.hover = false
    },
    handleTitleNameClick() {
      if (!this.hasJianName) return
      this.title.type = !this.title.type
    },
    handleTitleEditClick() {
      this.title.edit = true
      this.title.value = this.data.projectId
      if (this.task.edit) this.handleTaskEditCloseClick()
    },
    handleTitleEditSubmitClick() {
      const data = { data: _.cloneDeep(this.data) }
      data.query = { date: this.date, projectId: this.data.projectId }
      data.data.projectId = this.title.value
      if (this.$listeners['task-change'])
        this.$emit('task-change', data, code => code == 200 && this.handleTitleEditCloseClick())
    },
    handleTitleEditCloseClick() {
      this.title.value = ''
      this.title.edit = false
    },
    handleTitleDCloseClick() {
      this.title.remove = false
    },
    handleTitleDSubmitClick() {
      const data = { date: this.date, projectId: this.data.projectId }
      if (this.$listeners['title-remove']) this.$emit('title-remove', data)
      this.title.remove = false
    },
    // 任务项操作
    handleTaskItemMouseenter(index) {
      if (this.task.remove) return
      this.task.hover = index
    },
    handleTaskItemMouseleave() {
      if (this.task.remove) return
      this.task.hover = ''
    },
    handleTaskEditClick(value, index) {
      this.task.index = index
      this.task.value = value
      this.task.edit = true
      if (this.title.edit) this.handleTitleEditCloseClick()
      this.$nextTick(() => this.$refs[`input_${index}`][0].focus())
    },
    handleTaskEditSubmitClick(item) {
      const split = '|:|'
      const { value } = this.task
      const taskList = this.data.task.split(split)
      const data = { data: _.cloneDeep(this.data) }
      data.data.task = _.map(taskList, v => (v == item ? value : v)).join(split)
      data.query = { date: this.date, projectId: this.data.projectId }
      if (this.$listeners['task-change']) this.$emit('task-change', data)
      this.handleTaskEditCloseClick()
    },
    handleTaskEditCloseClick() {
      this.task.index = ''
      this.task.value = ''
      this.task.edit = false
    },
    handleTaskDCloseClick() {
      this.task.remove = false
    },
    handleTaskDSubmitClick(item) {
      const split = '|:|'
      this.data.task = _.filter(this.data.task.split(split), value => value != item).join(split)
      const data = { data: this.data, query: { date: this.date, projectId: this.data.projectId } }
      if (this.$listeners['task-change']) this.$emit('task-change', data)
      this.task.remove = false
    },

    titleHighlight(title) {
      const query = this.query.trim() || ''
      return wordHighlight(title, query)
    }
  }
}
</script>

<style lang="scss" scoped>
.task-box {
  flex: 1;

  min-width: calc(50% - 30px);

  position: relative;
  width: calc(50% - 15px);
  margin-right: 30px;
  margin-bottom: 30px;

  &::after {
    position: absolute;
    left: 5%;
    bottom: -15px;

    width: 90%;
    border-top: 1px solid #eeeeee;
    content: '';
  }

  &:nth-child(2n) {
    margin-right: 0;

    &::before {
      position: absolute;
      top: 10%;
      left: -15px;

      height: 80%;
      border-left: 1px solid #eeeeee;
      content: '';
    }
  }
  &:last-child {
    margin-right: 0;
  }
  &:nth-child(2n + 1):nth-last-child(-n + 2),
  &:nth-child(2n + 1):nth-last-child(-n + 2) ~ & {
    margin-bottom: 0;

    &::after {
      display: none;
    }
  }
}
.task-title {
  position: relative;
  overflow: hidden;
  padding: 10px;
  border-bottom: 1px solid #eeeeee;

  font-size: 18px;
  white-space: nowrap;

  &.edit {
    padding: 5px;
  }

  .abbreviation {
    position: absolute;
    top: 50%;
    right: 0;
    background-color: #ffffff;
    transform: translateY(-50%);

    max-width: 80%;

    &:empty {
      display: none;
    }

    &.edit {
      padding: 5px;
    }
    > span {
      display: block;
      overflow: hidden;
      background-color: #ffffff;

      padding: 5px;
      border-radius: 4px;

      &:empty {
        display: none;
      }
    }
  }
  .title-name {
    cursor: pointer;
  }
  .task-input {
    width: calc(100% - 50px);
    // .el-input__inner {
    //   padding-left: 5px;
    //   padding-right: 52px;
    // }
  }
}
.task-toolbar {
  position: absolute;
  top: 0;
  right: 5px;
  display: flex;
  align-items: center;

  height: 100%;
}
.task-content {
  padding: 10px;
  line-height: 1.4;
}
.task-count {
  position: absolute;
  top: 5px;
  right: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e81123;

  width: 15px;
  height: 15px;
  border-radius: 50%;
  font-size: 12px;
  color: #ffffff;
}
.task-word {
  position: relative;
  margin-bottom: 2px;
  padding: 2px 7px;
  border-radius: 4px;

  &:last-child {
    margin-bottom: 0;
  }
  &.hover {
    background-color: #eeeeee;
    // .task-toolbar {
    //   display: flex;
    // }
  }
  &.edit {
    padding: 0;
  }
}
.not-button {
  cursor: text;
}
::v-deep.task-input {
  .el-input__inner {
    padding-left: 5px;
    padding-right: 52px;
  }
}
</style>
