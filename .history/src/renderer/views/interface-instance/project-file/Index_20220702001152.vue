<template>
  <page title="项目表文件" @back="handlePageBack">
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
          <el-input v-model="query" placeholder="任务名称"></el-input>
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
        <el-table-column prop="title" label="任务名称" min-width="200" v-bind="tableColProps">
          <template #default="{ row }">
            <template v-for="({ title, type }, index) in titleHighlight(row.title)">
              <template v-if="type == 'text'">{{ title }}</template>
              <span class="highlight" v-if="type == 'mark'" :key="index">{{ title }}</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="fileName" label="文件名" min-width="140" v-bind="tableColProps" />
        <el-table-column prop="apiAddress" label="API地址" min-width="180" v-bind="tableColProps" />
        <el-table-column prop="remark" label="备注" min-width="240" v-bind="tableColProps" />
        <el-table-column label="操作" width="120" v-bind="tableColProps">
          <template #default="{ row }">
            <el-button
              class="table-button"
              icon="el-icon-tickets"
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
          :total="filterProjectTableList.length"
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
        @enter="handleTableEnter"
        @click="handleTableClick"
      >
        <todo-item
          v-for="item in filterProjectTableList"
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
  <!-- <panel title="" font-size="32px" full-screen> -->
  <!-- </panel> -->
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import Page from 'components/basic/Page'
import PanelQuery from 'components/basic/PanelQuery'
// import Panel from 'components/basic/Panel'
import TodoList from 'components/basic/TodoList'
import TodoItem from 'components/basic/TodoItem'
import {
  PROJECT_TYPE,
  PROJECT_SELECT,
  TABLE_FILE_LIST,
  TABLE_FILE_TABLE,
  TABLE_PAGE_SIZE,
  PROJECT_TABLE_COUNT,
  requestTableFileList,
  requestAddTableItem,
  requestRemoveTableFileMark,
  requestSetTableFileSelectId,
  requestSetProjectType,
  requestSetTableFileCurrentPage,
} from 'assets/script/request'
import { msgSuccess, msgWarning, messageBox, multipleQueryFilter, wordHighlight } from 'util'

export default {
  name: 'ProjectFile',
  components: { Page, PanelQuery, TodoList, TodoItem }, // , Panel
  data() {
    return { query: '', tableList: { data: [], count: 0 } }
  },
  computed: {
    ...mapGetters({
      projectType: PROJECT_TYPE,
      projectItem: PROJECT_SELECT,
      tableFileTable: TABLE_FILE_TABLE,
      tablePageSize: TABLE_PAGE_SIZE,
      tableFileList: TABLE_FILE_LIST,
      tableFileCount: PROJECT_TABLE_COUNT,
    }),
    tableColProps() {
      return { align: 'center' }
    },
    tablePage() {
      const { currentPage } = this.tableFileTable
      const pageSize = this.tablePageSize
      return { currentPage, pageSize }
    },
    filterProjectTableList() {
      const query = this.query.trim()
      const tableList = _.filter(this.tableFileList, (item) => !item.removeState)
      // return _.filter(tableList, item => query == '' || item.title.includes(query))
      return multipleQueryFilter(query, tableList)
    },
    filterTableList() {
      const data = this.filterProjectTableList
      const { currentPage, pageSize } = this.tablePage
      const startPage = (currentPage - 1) * pageSize
      const endPage = currentPage * pageSize
      return data.slice(startPage, endPage)
    },
    tableCurrentPage: {
      get() {
        return this.tableFileTable.currentPage
      },
      set(value) {
        requestSetTableFileCurrentPage(value)
      },
    },
  },
  mounted() {
    if (!('id' in this.projectItem)) this.$router.push({ name: '项目列表' })
    requestTableFileList(this.projectItem.fileName)
  },
  methods: {
    handlePageBack() {
      this.$router.push({ name: '项目列表' })
    },
    handleViewTypeClick() {
      requestSetProjectType(this.projectType == 'table' ? 'card' : 'table')
    },
    handleTableEnter() {
      if (this.query.trim() != '') this.handleTableClick()
    },
    handleTableClick() {
      const query = this.query.trim()
      if (!query) return msgWarning('没有填写数据无法添加。'), undefined
      if (query.includes(' ')) return msgWarning('无法添加,你输入的是查询格式。'), undefined
      const repeatData = _.filter(this.tableFileList, (item) => item.title == query)
      if (repeatData.length) {
        messageBox('有重名的表文件，是否继续？')
          .then(this.addTableFile)
          .catch(() => {})
      } else this.addTableFile()
    },
    handleTodoItemClick(data) {
      requestSetTableFileSelectId(data.id)
      this.$router.push({ name: '编辑项目文件内容' })
    },
    handleQueryClick() {
      requestTableFileList()
      this.tableCurrentPage = 1
    },
    handleAddClick() {
      if (this.query.trim() != '') this.handleTableClick()
      else msgWarning('请输入任务名称')
    },
    handleTodoListDetail(data) {
      requestSetTableFileSelectId(data.id)
      this.$router.push({ name: '编辑项目文件内容' })
    },
    handleTodoListEdit(data) {
      requestSetTableFileSelectId(data.id)
      this.$router.push({ name: '编辑项目文件信息' })
    },
    handleTodoListRemove({ id, title }) {
      messageBox(`是否确认移除 "${title}表"？`)
        .then(() => {
          requestRemoveTableFileMark(id, this.projectItem, ({ code }) => {
            if (code == 200) {
              msgSuccess('移除成功')
              requestTableFileList(this.projectItem.fileName)
            } else msgWarning('移除失败')
          })
        })
        .catch(() => {})
    },

    addTableFile() {
      requestAddTableItem({ title: this.query.trim(), projectId: this.projectItem.id })
      this.$router.push({ name: '添加项目文件信息' })
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
