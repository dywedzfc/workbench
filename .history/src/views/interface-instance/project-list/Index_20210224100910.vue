<template>
  <page title="项目列表" icon="el-icon-s-home" @back="handlePageBack">
    <div class="template-wrapper">
      <!-- <panel title="项目列表" font-size="32px" full-screen> -->
      <todo-list
        class="project-list"
        search-icon="el-icon-plus"
        width="600px"
        @search="handleProjectSearch"
        @click="handleProjectClick"
      >
        <todo-item
          v-for="item in filterProjectList"
          :key="item.id"
          @click="handleTodoItemClick"
          @edit="handleTodoListEdit"
          @remove="handleTodoListRemove"
        >
          <div class="title">{{ item.title }}</div>
        </todo-item>
      </todo-list>
      <!-- </panel> -->
    </div>
  </page>
</template>

<script>
import _ from 'lodash'
import Page from 'components/basic/Page'
// import Panel from 'components/basic/Panel'
import TodoList from 'components/basic/TodoList'
import TodoItem from 'components/basic/TodoItem'
import { getProjectFolder, setProjectFolder } from '../../../assets/script/folder'

export default {
  name: 'ProjectList',
  components: { Page, TodoList, TodoItem }, // , Panel
  data() {
    return { query: '', projectList: { data: [] } }
  },
  computed: {
    filterProjectList() {
      const query = this.query
      return _.filter(this.projectList.data, item => query == '' || item.title.includes(query))
    }
  },
  mounted() {
    this.projectList.data = [
      { id: 1, title: '浙大校园班车' },
      { id: 2, title: '在线预约小程序' },
      { id: 3, title: '出租车大数据综合服务平台' },
      { id: 4, title: '95128热线业务评测系统' },
      { id: 5, title: '客运车辆管理系统' }
    ]
    getProjectFolder()
  },
  methods: {
    handlePageBack() {
      this.$router.push('/')
    },
    handleProjectSearch(query) {
      this.query = query
    },
    handleProjectClick() {
      setProjectFolder(this.projectList.data)
    },
    handleTodoItemClick(data) {
      console.info('click:', data)
      this.$router.push({ name: '项目文件' })
    },
    handleTodoListEdit(data) {
      console.info('edit:', data)
      this.$router.push({ name: '编辑项目' })
    },
    handleTodoListRemove(data) {
      console.info('remove:', data)
    }
  }
}
</script>

<style lang="scss" scoped>
.template-wrapper {
  box-sizing: border-box;
  padding-top: 40px;
}
</style>
