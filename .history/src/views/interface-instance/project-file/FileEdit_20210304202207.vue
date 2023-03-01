<template>
  <page :title="`${tableFileItem.title}表文件`" @back="handlePageBack">
    <div class="template-wrapper">
      <div class="textarea-box">
        <el-input class="input-textarea" v-model="dataList" type="textarea" :rows="8"></el-input>
        <el-button class="button-query" type="primary" @click="handleGenerateClick"
          >生成字段</el-button
        >
        <el-button class="button-query" type="primary" @click="handleSubmitClick">保存</el-button>
        <el-button class="button-query" type="primary" @click="handleGenerateFileClick"
          >生成文件</el-button
        >
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
    <dialog-drawer :display.sync="dialog.display" :title="dialog.title">
      <el-form class="drawer-form left" :model="form">
        <el-form-item :label="'json文件'">
          <el-input v-model="form.jsonFile" type="textarea" rows="19"></el-input>
        </el-form-item>
      </el-form>
      <el-form class="drawer-form right" :model="form">
        <el-form-item :label="'js文件'">
          <el-input v-model="form.jsFile" type="textarea" rows="19"></el-input>
        </el-form-item>
      </el-form>
      <div class="drawer-form">
        <el-button>取消</el-button>
        <el-button type="primary">立即创建</el-button>
      </div>
    </dialog-drawer>
  </page>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import Page from 'components/basic/Page'
import DialogDrawer from 'components/basic/DialogDrawer'
import { PROJECT_SELECT, TABLE_FILE_SELECT, requestUpdTableFile } from 'assets/script/request' // , requestSetProjectSelect

export default {
  name: 'ProjectFileEdit',
  components: { Page, DialogDrawer },
  data() {
    return {
      dataList: '',
      dialog: { display: false, title: '' },
      form: { data: { jsonFile: '', jsFile: '' } },
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
    // this.props.data = []
    // this.props.data.push(this.initFieldItem())
  },
  watch: {
    tableFileItem: {
      handler(item) {
        if (!('id' in item)) this.$router.push({ name: '项目文件' })
        if (item.data && Array.isArray(item.data)) {
          this.props.data = JSON.parse(JSON.stringify(item.data))
          this.props.count = item.data.length
        } else {
          this.props.data = []
          this.props.count = 0
        }
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
    handleGenerateFileClick() {
      const data = {}
      _.forEach(this.props.data, item => {
        console.info('item:', item)
        if (!data[item.name]) data[item.name] = item
      })
      let jsonFile = JSON.stringify(data)
      jsonFile.replace(/},{/g, '},\t\r{')
      this.form.jsonFile = jsonFile
      this.dialog.display = true
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
.drawer-form {
  text-align: center;

  &.left,
  &.right {
    display: inline-block;
    width: calc(50% - 10px);
  }
  &.left {
    margin-right: 20px;
  }
}
</style>
