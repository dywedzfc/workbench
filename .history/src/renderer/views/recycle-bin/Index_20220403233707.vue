<template>
  <page title="回收站" icon="el-icon-s-home" @back="handlePageBack">
    <panel-query>
      <el-form slot="query-bar" class="query-form" inline>
        <el-form-item>
          <el-input v-model="query.name" placeholder="名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
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
        <el-table-column prop="title" label="名称" width="240" v-bind="tableColProps" />
        <el-table-column prop="type" label="类型" width="140" v-bind="tableColProps" />
        <el-table-column prop="path" label="路径" min-width="240" v-bind="tableColProps" />
        <el-table-column label="操作" width="120" v-bind="tableColProps">
          <template #default="{ row }">
            <el-button
              class="table-button"
              icon="el-icon-refresh-left"
              type="text"
              @click="handleRestoreClick(row)"
            ></el-button>
            <el-button
              class="table-button"
              icon="el-icon-delete"
              type="text"
              @click="handleRemoveClick(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="filterTableList.length"
        ></el-pagination>
      </template>
    </panel-query>
  </page>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import Page from 'components/basic/Page'
import PanelQuery from 'components/basic/PanelQuery'
import {
  RECYCLE_LIST,
  RECYCLE_TABLE,
  requestRecycleList,
  requestRestoreRecycle,
  requestRemoveRecycle,
  requestSetRecycleTableCurrentPage,
  requestSetRecycleTablePageSize,
} from 'assets/script/request'
import { msgSuccess, msgWarning, messageBox } from 'util'
const { ipcRenderer } = window.require('electron')

export default {
  name: 'RecycleBin',
  components: { Page, PanelQuery },
  data() {
    return { query: { name: '' } }
  },
  computed: {
    ...mapGetters({ recycleList: RECYCLE_LIST, recycleTable: RECYCLE_TABLE }),
    tableColProps() {
      return { align: 'center' }
    },
    filterTableList() {
      const { name } = this.query
      const data = _.filter(this.recycleList, (item) => name == '' || item.title.includes(name))
      const { currentPage, pageSize } = this.recycleTable
      const startPage = (currentPage - 1) * pageSize
      const endPage = currentPage * pageSize
      return data.slice(startPage, endPage)
    },
    tableCurrentPage: {
      get() {
        return this.recycleTable.currentPage
      },
      set(value) {
        requestSetRecycleTableCurrentPage(value)
      },
    },
    tablePageSize: {
      get() {
        return this.recycleTable.pageSize
      },
      set(value) {
        requestSetRecycleTablePageSize(value)
      },
    },
  },
  mounted() {
    requestRecycleList()
  },
  methods: {
    removeRecycleItem(id) {
      requestRemoveRecycle(id, ({ code, msg }) => {
        if (code == 200) {
          msgSuccess(msg)
          requestRecycleList()
        } else msgWarning(msg)
      })
    },

    handlePageBack() {
      this.$router.push('/')
    },
    handleRestoreClick(item) {
      requestRestoreRecycle(item.id, ({ code, msg }) => {
        if (code == 200) {
          msgSuccess(msg)
          requestRecycleList()
        } else msgWarning(msg)
      })
    },
    handleRemoveClick(item) {
      if (item.type == '项目文件') this.removeProjectInfo(item)
      else if (item.type == '项目表文件') this.removeProjectTableInfo(item)
    },

    removeProjectInfo(item) {
      if (!item.path) return this.removePrompt(item)
      const [folderName] = item.path.split('/')
      ipcRenderer
        .invoke('get-table-folder-count', folderName)
        .then(({ code, data, msg }) => {
          if (code == 200) this.removePrompt(item, data)
          else if (code == 400 && msg == '无数据') this.removePrompt(item)
        })
        .catch(() => {
          this.removePrompt(item)
        })
    },
    removeProjectTableInfo(item) {
      this.removePrompt(item)
    },
    removePrompt({ id, title, type }, count) {
      let txt = ''
      if (count) txt = `发现有${count}条，项目表文件，`
      messageBox(`${txt}是否确认移除 "${title + type}"？`)
        .then(() => this.removeRecycleItem(id))
        .catch(() => {})
    },
  },
}
</script>

<style lang="scss" scoped></style>
