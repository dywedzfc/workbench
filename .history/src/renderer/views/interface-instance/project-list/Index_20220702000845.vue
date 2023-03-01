<template>
  <page title="项目列表" icon="el-icon-s-home" @back="handlePageBack">
    <template #tool>
      <el-button
        class="page-button"
        type="text"
        :icon="projectType == 'card' ? 'el-icon-receiving' : 'el-icon-files'"
        @click="handleViewTypeClick"
      ></el-button>
    </template>
    <panel-query v-if="projectType == 'table'">
      <el-form slot="query-bar" class="query-form" inline>
        <el-form-item>
          <el-input v-model="query" placeholder="项目名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQueryClick">查询</el-button>
          <el-button type="primary" @click="handleAddClick">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table
        class="query-table"
        :data="filterTableList"
        border
        stripe
        size="small"
        height="100%"
      >
        <el-table-column prop="title" label="项目名称" min-width="200" v-bind="tableColProps">
          <template #default="{ row }">
            <template v-for="({ title, type }, index) in titleHighlight(row.title)">
              <template v-if="type == 'text'">{{ title }}</template>
              <span class="highlight" v-if="type == 'mark'" :key="index">{{ title }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="abbreviation" label="简称" min-width="140" v-bind="tableColProps" />
        <el-table-column prop="fileName" label="文件名" min-width="160" v-bind="tableColProps" />
        <el-table-column label="操作" width="120" v-bind="tableColProps">
          <template #default="{ row }">
            <el-button
              class="table-button"
              icon="el-icon-folder-opened"
              type="text"
              v-if="row.fileName"
              @click="handleTodoListDetail(row)"
            ></el-button>
            <el-button
              class="table-button"
              icon="el-icon-edit"
              type="text"
              @click="handleTodoListEdit(row)"
            ></el-button>
            <el-button
              class="table-button"
              icon="el-icon-delete"
              type="text"
              @click="handleTodoListRemove(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <el-pagination
          background
          :current-page.sync="tableCurrentPage"
          :page-size="tablePageSize"
          :total="filterProjectList.length"
        ></el-pagination>
        <!-- :page-size.sync="table.pageSize" -->
      </template>
    </panel-query>
    <div class="template-wrapper" v-else>
      <todo-list
        class="project-list"
        search-icon="el-icon-plus"
        width="600px"
        :query.sync="query"
        @enter="handleProjectEnter"
        @click="handleProjectClick"
      >
        <todo-item
          v-for="item in filterProjectList"
          :key="item.id"
          :data="item"
          @click="handleTodoItemClick"
          @edit="handleTodoListEdit"
          @remove="handleTodoListRemove"
        >
          <div class="title">
            <!-- {{ item.title }} -->
            <template v-for="({ title, type }, index) in titleHighlight(item.title)">
              <template v-if="type == 'text'">{{ title }}</template>
              <span class="highlight" v-if="type == 'mark'" :key="index">{{ title }}</span>
            </template>
          </div>
        </todo-item>
      </todo-list>
    </div>
  </page>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import Page from 'components/basic/Page'
import PanelQuery from 'components/basic/PanelQuery'
import TodoList from 'components/basic/TodoList'
import TodoItem from 'components/basic/TodoItem'
import {
  HOTKEYS,
  PROJECT_LIST,
  PROJECT_TYPE,
  PROJECT_TABLE,
  TABLE_PAGE_SIZE,
  // PROJECT_COUNT,
  requestProjectList,
  requestAddProject,
  requestRemoveProjectMark,
  requestSetProjectSelectId,
  requestSetProjectType,
  requestSetProjectTableCurrentPage,
} from 'assets/script/request'
import { msgSuccess, msgWarning, messageBox, multipleQueryFilter, wordHighlight } from 'util'
const { ipcRenderer } = window.require('electron')

export default {
  name: 'ProjectList',
  components: { Page, PanelQuery, TodoList, TodoItem },
  data() {
    return { query: '', type: '' }
  },
  computed: {
    ...mapGetters({
      hotkeys: HOTKEYS,
      projectList: PROJECT_LIST,
      projectType: PROJECT_TYPE,
      projectTable: PROJECT_TABLE,
      tablePageSize: TABLE_PAGE_SIZE,
    }), //, projectCount: PROJECT_COUNT
    tableColProps() {
      return { align: 'center' }
    },
    tablePage() {
      const { currentPage } = this.projectTable
      const pageSize = this.tablePageSize
      return { currentPage, pageSize }
    },
    filterProjectList() {
      const query = this.query.trim()
      const projectList = _.filter(this.projectList, (item) => !item.removeState)
      // return _.filter(projectList, item => query == '' || item.title.includes(query))
      return multipleQueryFilter(query, projectList)
    },
    filterTableList() {
      const data = this.filterProjectList
      const { currentPage, pageSize } = this.tablePage
      const startPage = (currentPage - 1) * pageSize
      const endPage = currentPage * pageSize
      return data.slice(startPage, endPage)
    },
    tableCurrentPage: {
      get() {
        return this.projectTable.currentPage
      },
      set(value) {
        requestSetProjectTableCurrentPage(value)
      },
    },
  },
  mounted() {
    if (!this.projectType) requestSetProjectType('table')
    this.tableCurrentPage = 1
    requestProjectList()
  },
  methods: {
    handlePageBack() {
      this.$router.push('/')
    },
    handleViewTypeClick() {
      requestSetProjectType(this.projectType == 'table' ? 'card' : 'table')
    },
    handleQueryClick() {
      requestProjectList()
      this.tableCurrentPage = 1
    },
    handleAddClick() {
      if (this.query.trim() != '') this.handleProjectClick()
      else msgWarning('请输入项目名称')
    },
    handleProjectEnter() {
      if (this.query.trim() != '') this.handleProjectClick()
    },
    handleProjectClick() {
      const query = this.query.trim()
      if (!query) return msgWarning('没有填写数据无法添加。'), undefined
      if (query.includes(' ')) return msgWarning('无法添加,你输入的是查询格式。'), undefined
      const repeatData = _.filter(this.projectList, (item) => item.title == query)
      if (repeatData.length) {
        messageBox('有重名的项目，是否继续？')
          .then(this.addProject)
          .catch(() => {})
      } else this.addProject()
    },
    handleTodoItemClick(data) {
      if (!data.fileName) return
      if (this.hotkeys == 'Command') {
        requestSetProjectSelectId(data.id)
        this.$router.push({ name: '查看项目' })
      } else {
        requestSetProjectSelectId(data.id)
        this.$router.push({ name: '项目文件' })
      }
    },
    handleTodoListDetail(data) {
      requestSetProjectSelectId(data.id)
      this.$router.push({ name: '项目文件' })
    },
    handleTodoListEdit(data) {
      requestSetProjectSelectId(data.id)
      this.$router.push({ name: '编辑项目' })
    },
    handleTodoListRemove({ id, title, fileName }) {
      ipcRenderer
        .invoke('get-table-folder-count', fileName)
        .then(({ code, data }) => {
          if (code == 200) this.removePrompt({ id, title }, data)
          else this.removePrompt({ id, title })
        })
        .catch(() => {
          this.removePrompt({ id, title })
        })
    },

    addProject() {
      requestAddProject({ title: this.query.trim() }, ({ code, msg }) => {
        if (code == 200) {
          msgSuccess(msg)
          if (this.projectType == 'card') this.query = ''
        } else msgWarning(msg)
        requestProjectList()
      })
    },
    removePrompt({ id, title }, count) {
      let txt = ''
      if (count) txt = `发现有${count}条，项目表文件，`
      messageBox(`${txt}是否确认移除 "${title}项目"？`)
        .then(() => {
          requestRemoveProjectMark(id, ({ code }) => {
            if (code == 200) {
              msgSuccess('移除成功')
              requestProjectList()
            } else msgWarning('移除失败')
          })
        })
        .catch(() => {})
    },
    titleHighlight(title) {
      const query = this.query.trim()
      return wordHighlight(title, query)
    },
  },
}
</script>

<style lang="scss" scoped>
.template-wrapper {
  box-sizing: border-box;
  padding-top: 40px;
}
</style>
