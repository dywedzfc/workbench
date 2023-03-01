<template>
  <page :title="`${tableFileItem.title}表文件`" @back="handlePageBack">
    <div class="template-wrapper">
      <div class="textarea-box">
        <el-input class="input-textarea" v-model="dataList" type="textarea" :rows="8"></el-input>
        <el-button class="button-query" type="primary" @click="handleGenerateClick"
          >生成字段</el-button
        >
        <el-button class="button-query" type="primary" @click="handleSubmitClick">保存</el-button>
      </div>
      <table class="table">
        <colgroup>
          <col width="200" />
          <col width="200" />
          <col width="200" />
          <col width="80" />
        </colgroup>
        <tr>
          <!-- sql name -->
          <th class="table-header">数据库名称</th>
          <!-- name -->
          <th class="table-header">字段</th>
          <!-- default value -->
          <th class="table-header">默认值</th>
          <!-- need -->
          <th class="table-header">需要</th>
          <!-- comment -->
          <th class="table-header">备注</th>
        </tr>
        <tr class="table-row" v-for="item in props.data" :key="item.id">
          <td class="table-data"><el-input v-model="item.sqlName"></el-input></td>
          <td class="table-data"><el-input v-model="item.name"></el-input></td>
          <td class="table-data"><el-input v-model="item.defaultValue"></el-input></td>
          <td class="table-data table-data__need">
            <el-switch
              v-model="item.need"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </td>
          <td class="table-data"><el-input v-model="item.comment"></el-input></td>
        </tr>
      </table>
    </div>
  </page>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import Page from 'components/basic/Page'
import { PROJECT_SELECT, TABLE_FILE_SELECT, requestUpdTableFile } from 'assets/script/request' // , requestSetProjectSelect

export default {
  name: 'ProjectFileEdit',
  components: { Page },
  data() {
    return {
      dataList: '',
      props: { data: [], count: 0 }
    }
  },
  computed: {
    ...mapGetters({
      projectItem: PROJECT_SELECT,
      tableFileItem: TABLE_FILE_SELECT
    })
  },
  mounted() {
    this.dataList = ''
    this.props.count = 0
    this.props.data = []
    // this.props.data.push(this.initFieldItem())
  },
  watch: {
    tableFileItem: {
      handler(item) {
        console.info('table-file:', 'id' in item)
        if (!('id' in item)) this.$router.push({ name: '项目文件' })
        console.info('data:', item.data, item.data && Array.isArray(item.data))
        if (item.data && Array.isArray(item.data)) this.props.data = item.data
        else this.props.data = []
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handlePageBack() {
      this.$router.push({ name: '项目文件' })
    },
    handleGenerateClick() {
      try {
        const value = JSON.parse(this.dataList)
        if (Array.isArray(value)) {
          _.each(value, item => {
            _.each(item, (v, key) => {
              if (this.props.data.length) {
                const exists = _.map(this.props.data, 'sqlName').includes(key)
                if (exists) return
              }
              this.props.data.push(this.initFieldItem({ sqlName: key }))
            })
          })
        } else if (Object.prototype.toString.call(value) === '[object Object]') {
          _.each(value, (v, key) => {
            if (this.props.data.length) {
              const exists = _.map(this.props.data, 'sqlName').includes(key)
              if (exists) return
            }
            this.props.data.push(this.initFieldItem({ sqlName: key }))
          })
        }
      } catch (error) {
        console.error(error)
      }
    },
    handleSubmitClick() {
      const form = { ...this.tableFileItem, data: this.props.data }
      requestUpdTableFile(form, { fileName: this.projectItem.fileName }, data => {
        if (data.code == 1) {
          console.info('type:', data.code, this.projectItem)
        }
      })
    },

    initFieldItem({ sqlName, name, defaultValue, need, comment } = {}) {
      return {
        id: ++this.props.count,
        sqlName: sqlName || '',
        name: name || sqlName || '',
        defaultValue: defaultValue || '',
        need: need != false ? true : false,
        comment: comment || ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.template-wrapper {
  padding: 30px;
}
.textarea-box {
  margin-bottom: 20px;
}
.form-item {
  margin-bottom: 20px;
}
.button-query {
  // display: block;
  margin-top: 10px;
  // width: 100%;
}
.table {
  width: 100%;

  &-header {
    padding-top: 5px;
    padding-bottom: 5px;
  }
  &-row {
    .table-data {
      padding-bottom: 5px;
    }
    &:last-child .table-data {
      padding-bottom: 0;
    }
  }
  &-data {
    padding-left: 10px;
    &:first-child {
      padding-left: 0;
    }
  }
  &-data__need {
    text-align: center;
  }
}
</style>
