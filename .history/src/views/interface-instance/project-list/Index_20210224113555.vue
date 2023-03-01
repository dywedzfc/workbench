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
          :data="item"
          @click="handleTodoItemClick"
          @edit="handleTodoListEdit"
          @remove="handleTodoListRemove"
          >{{ item }}
          <div class="title">{{ item.title }}</div>
        </todo-item>
      </todo-list>
      <!-- </panel> -->
    </div>
  </page>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import Page from 'components/basic/Page'
// import Panel from 'components/basic/Panel'
import TodoList from 'components/basic/TodoList'
import TodoItem from 'components/basic/TodoItem'
import { getProjectFolder, setProjectFolder } from 'assets/script/folder'
import { PROJECT_LIST, PROJECT_COUNT, requestProjectList } from 'assets/script/request'

export default {
  name: 'ProjectList',
  components: { Page, TodoList, TodoItem }, // , Panel
  data() {
    return { query: '' }
  },
  computed: {
    ...mapGetters({ projectList: PROJECT_LIST, projectCount: PROJECT_COUNT }),
    filterProjectList() {
      const query = this.query
      console.info('query:', this.projectList)
      const projectList = _.filter(this.projectList, item => !item.removeState)
      return _.filter(projectList, item => query == '' || item.title.includes(query))
    }
  },
  mounted() {
    // this.projectList.data = [
    //   { id: 1, title: '浙大校园班车' },
    //   { id: 2, title: '在线预约小程序' },
    //   { id: 3, title: '出租车大数据综合服务平台' },
    //   { id: 4, title: '95128热线业务评测系统' },
    //   { id: 5, title: '客运车辆管理系统' }
    // ]
    requestProjectList()
    // this.getProjectInfo()
  },
  methods: {
    getProjectInfo() {
      const { data, count } = getProjectFolder()
      console.info('data:', data, count)
      this.projectList.data = data
      this.projectList.count = count
    },
    addProjectInfo() {
      const { data, count } = this.projectList
      setProjectFolder(data, count)
      this.getProjectFolder()
    },
    removePrjectInfo() {
      const { data, count } = this.projectList
      setProjectFolder(data, count)
      setTimeout(this.getProjectFolder)
    },
    handlePageBack() {
      this.$router.push('/')
    },
    handleProjectSearch(query) {
      this.query = query
    },
    handleProjectClick() {
      if (!this.query)
        return this.$message.warning({ message: '没有填写数据无法添加。' }), undefined
      const count = ++this.projectList.count
      this.addProjectItem({ id: count, title: this.query })
      this.addProjectInfo()
    },
    handleTodoItemClick(data) {
      console.info('click:', data)
      this.$router.push({ name: '项目文件' })
    },
    handleTodoListEdit(data) {
      console.info('edit:', data)
      this.$router.push({ name: '编辑项目' })
    },
    handleTodoListRemove({ id }) {
      const { data } = this.projectList
      const index = _.indexOf(_.map(data, 'id'), id)
      const item = this.projectList.data[index]
      item.removeState = true
      this.$set(this.projectList, index, item)
      this.removePrjectInfo()
      console.info('remove:', id, index)
    },
    addProjectItem(item) {
      this.projectList.data.push(item)
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
