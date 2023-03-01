<template>
  <page title="项目文件" @back="handlePageBack">
    <div class="template-wrapper">
      <todo-list
        class="project-list"
        search-icon="el-icon-plus"
        width="600px"
        @search="handleTableSearch"
        @click="handleTableClick"
      >
        <todo-item
          v-for="item in filterTableList"
          :key="item.id"
          @click="handleTodoItemClick"
          @edit="handleTodoListEdit"
          @remove="handleTodoListRemove"
        >
          <div class="title">{{ item.title }}</div>
        </todo-item>
      </todo-list>
    </div>
  </page>
  <!-- <panel title="" font-size="32px" full-screen> -->
  <!-- </panel> -->
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import Page from 'components/basic/Page'
// import Panel from 'components/basic/Panel'
import TodoList from 'components/basic/TodoList'
import TodoItem from 'components/basic/TodoItem'
import { getProjectFiles } from 'assets/script/folder'
import { PROJECT_SELECT } from 'assets/script/request' // , requestSetProjectSelect

export default {
  name: 'ProjectFile',
  components: { Page, TodoList, TodoItem }, // , Panel
  data() {
    return { query: '', tableList: { data: [], count: 0 } }
  },
  computed: {
    ...mapGetters({ projectItem: PROJECT_SELECT }),
    filterTableList() {
      const query = this.query
      return _.filter(this.tableList.data, item => query == '' || item.title.includes(query))
    }
  },
  mounted() {
    this.tableList.data = [
      { id: 1, title: '用户表' },
      { id: 2, title: '车辆表' }
    ]
    if (!('id' in this.projectItem)) this.$router.push({ name: '项目列表' })
    const { fileName } = this.projectItem
    this.tableList.data = getProjectFiles(fileName)
    console.info('data-moun:', this.projectItem, this.tableList.data)
  },
  methods: {
    handlePageBack() {
      this.$router.push({ name: '项目列表' })
    },
    handleTableSearch(query) {
      this.query = query
    },
    handleTableClick() {
      this.tableList.data.push({ id: ++this.tableList.count, title: this.query })

      this.$router.push({ name: '编辑项目文件信息' })
    },
    handleTodoItemClick(data) {
      console.info('click:', data)
      this.$router.push({ name: '编辑项目文件信息' })
      // this.$router.push({ name: '编辑项目文件' })
    },
    handleTodoListEdit(data) {
      console.info('edit:', data)
      this.$router.push({ name: '编辑项目文件内容' })
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
