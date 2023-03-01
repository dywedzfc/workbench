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
          :data="item"
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
// import { getProjectFiles } from 'assets/script/folder'
import {
  PROJECT_SELECT,
  TABLE_FILE_LIST,
  PROJECT_TABLE_COUNT,
  requestTableFileList,
  requestAddTableFile,
  requestSetTableFileSelectId,
  requestSetProjectTableCount
} from 'assets/script/request' // , requestSetProjectSelect
import { msgWarning } from 'util'

export default {
  name: 'ProjectFile',
  components: { Page, TodoList, TodoItem }, // , Panel
  data() {
    return { query: '', tableList: { data: [], count: 0 } }
  },
  computed: {
    ...mapGetters({
      projectItem: PROJECT_SELECT,
      tableFileList: TABLE_FILE_LIST,
      tableFileCount: PROJECT_TABLE_COUNT
    }),
    filterTableList() {
      const query = this.query
      return _.filter(this.tableFileList, item => query == '' || item.title.includes(query))
    }
  },
  mounted() {
    // this.tableList.data = [
    //   { id: 1, title: '用户表' },
    //   { id: 2, title: '车辆表' }
    // ]
    if (!('id' in this.projectItem)) this.$router.push({ name: '项目列表' })
    const { fileName } = this.projectItem
    requestTableFileList(fileName)
  },
  methods: {
    handlePageBack() {
      this.$router.push({ name: '项目列表' })
    },
    handleTableSearch(query) {
      this.query = query
    },
    handleTableClick() {
      if (!this.query) return msgWarning('没有填写数据无法添加。'), undefined
      requestSetProjectTableCount()
      requestAddTableFile({ id: this.tableFileCount, title: this.query })
      requestSetTableFileSelectId(this.tableFileCount)
      this.$router.push({ name: '添加项目文件信息' })
    },
    handleTodoItemClick(data) {
      requestSetTableFileSelectId(data.id)
      this.$router.push({ name: '编辑项目文件内容' })
      // this.$router.push({ name: '编辑项目文件' })
    },
    handleTodoListEdit(data) {
      requestSetTableFileSelectId(data.id)
      this.$router.push({ name: '编辑项目文件信息' })
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
