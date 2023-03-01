<template>
  <page title="发布任务" icon="el-icon-s-home" @back="handlePageBack">
    <panel-query>
      <el-form slot="query-bar" class="query-form" inline>
        <el-form-item>
          <el-input v-model="query.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="query.date"
            value-format="yyyy-MM-dd"
            placeholder="日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQueryClick">查询</el-button>
        </el-form-item>
      </el-form>
      <card-list width="600px">
        <card-item class="card-box">
          <el-form class="form-card" label-width="80px">
            <el-form-item label="任务名称">
              <el-input class="input-block" v-model="postTask.add.title"></el-input>
            </el-form-item>
            <el-form-item label="项目名称">
              <el-select class="input-block" v-model="postTask.add.projectId" filterable>
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
                  v-for="(item, index) in postTask.add.task"
                  :key="index"
                  :ref="`task_${index}`"
                  @keydown.native="handleTaskKeydown"
                  @keyup.native="handleTaskKeyup($event, item.value, index)"
                  @paste.native="handleTaskPaste($event, index)"
                  @blur="handleTaskBlur($event, item.value, index)"
                />
              </div>
            </el-form-item>
            <el-form-item label="备注">
              <el-input class="input-block" v-model.trim="postTask.add.remarks" />
            </el-form-item>
            <el-form-item class="form-item__col" label="优先级">
              <el-select class="input-inline" v-model.trim="postTask.add.state">
                <el-option
                  v-for="item in postTaskOptions"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
            </el-form-item>
            <el-form-item class="form-item__col" label="截止日期">
              <el-input class="input-inline" v-model.trim="postTask.add.deadline" />
            </el-form-item>
            <el-form-item class="form-center" label-width="0">
              <el-button @click="handleAddTaskCancelClick">取消</el-button>
              <el-button type="primary" @click="handleAddTaskSubmitClick">保存</el-button>
            </el-form-item>
          </el-form>
        </card-item>
        <card-item
          class="card-box"
          v-for="item in filterPostTaskList"
          :key="item.id"
          :state="item.state"
        >
          <task-box :data="item" :loading="loading"></task-box>
          <!-- @title-remove="handleTaskTitleRemove" @task-change="handleTaskItemRemove" -->
        </card-item>
      </card-list>
    </panel-query>
  </page>
</template>

<script>
// import _ from 'lodash'
import { mapGetters } from 'vuex'
import Page from 'components/basic/Page'
import PanelQuery from 'components/basic/PanelQuery'
import CardList from '../components/CardList'
import CardItem from '../components/CardItem'
import TaskBox from './components/TaskBox'
import { PROJECT_OPTIONS, requestProjectList, POST_TASK_OPTIONS } from 'assets/script/request'

export default {
  name: 'PostTask',
  components: { Page, PanelQuery, CardList, CardItem, TaskBox },
  data() {
    return {
      loading: false,
      query: { name: '', date: '' },
      type: { state: false, year: '' },
      postTask: { type: '', add: { projectId: '', task: [] }, data: [] }
    }
  },
  computed: {
    ...mapGetters({ projectList: PROJECT_OPTIONS, postTaskList: POST_TASK_OPTIONS }),
    projectOptions() {
      return this.projectList
    },
    postTaskOptions() {
      return this.postTaskList
    },
    filterPostTaskList() {
      return [
        {
          id: 1,
          title: '基础任务',
          state: 1,
          projectId: '',
          deadline: '2021-07-01 05:50:00',
          remarks: '在这里备注产品能开发要点。'
        }
      ]
    }
  },
  watch: {},
  mounted() {
    this.postTask.add.task = []
    this.postTask.add.task.push({ value: '' })
    requestProjectList()
  },
  methods: {
    handlePageBack() {
      this.$router.push({ name: 'Home' })
    },
    handleQueryClick() {},
    handleAddTaskCancelClick() {
      this.daily.type = ''
      this.daily.add.projectId = ''
      this.daily.add.task = []
      this.daily.add.task.push({ value: '' })
    },
    handleAddTaskSubmitClick() {
      // const { projectId, task } = this.add
      if (this.verificationSubmit()) return
      this.addDailyInfo()
    }
  }
}
</script>

<style lang="scss" scoped>
.card-box ::v-deep .card-body {
  padding: 5px;
}
.form-card {
  flex: 1;
  padding: 8px;
}
.form-card ::v-deep .el-form-item {
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
}
.form-item__col::v-deep {
  &.el-form-item {
    display: inline-block;
    width: 50%;
  }
}
.input-block {
  &.el-input,
  &.el-select,
  &.el-textarea,
  &.el-date-editor.el-input {
    // width: 464px;
    width: 474px;
  }
}
</style>
