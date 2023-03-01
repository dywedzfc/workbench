<template>
  <page :title="`${tableFileItem.title}表文件`" @back="handlePageBack">
    <div class="template-wrapper">
      <div class="textarea-box">
        <el-input class="input-textarea" v-model="dataList" type="textarea" :rows="8"></el-input>
        <el-button v-bind="btnGenerateProps" @click="handleGenerateClick">生成字段</el-button>
        <el-button v-bind="btnSaveProps" @click="handleSubmitClick">保存</el-button>
        <el-button v-bind="btnHasDisableProps" @click="handleGenerateFileClick">生成文件</el-button>
      </div>
      <table class="table" v-if="props.data.length">
        <colgroup>
          <col width="50" />
          <col width="200" />
          <col width="200" />
          <col width="200" />
          <col width="80" />
        </colgroup>
        <tr>
          <th class="table-del"></th>
          <!-- name -->
          <th class="table-header">字段</th>
          <!-- sql name -->
          <th class="table-header">数据库名称</th>
          <!-- default value -->
          <th class="table-header">默认值</th>
          <!-- need -->
          <th class="table-header">需要</th>
          <!-- comment -->
          <th class="table-header">备注</th>
        </tr>
        <tr class="table-row" v-for="item in props.data" :key="item.id">
          <td>
            <el-button class="button-remove" icon="el-icon-remove"></el-button>
          </td>
          <td class="table-data">
            <el-input v-model="item.name"></el-input>
          </td>
          <td class="table-data">
            <el-input v-model="item.sqlName"></el-input>
          </td>
          <td class="table-data">
            <el-input v-model="item.defaultValue"></el-input>
          </td>
          <td class="table-data table-data__need">
            <el-switch
              v-model="item.need"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </td>
          <td class="table-data">
            <el-input v-model="item.comment"></el-input>
          </td>
        </tr>
      </table>
    </div>
    <dialog-drawer :display.sync="dialog.display" :title="dialog.title">
      <el-form class="drawer-form left" :model="form">
        <el-form-item :label="'json文件'">
          <el-input v-model="form.data.jsonFile" type="textarea" rows="19"></el-input>
        </el-form-item>
      </el-form>
      <el-form class="drawer-form right" :model="form">
        <el-form-item :label="'js文件'">
          <el-input v-model="form.data.jsFile" type="textarea" rows="19"></el-input>
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
import { getTemplateFiles } from 'assets/script/folder'
import { msgSuccess, msgWarning } from 'util'

export default {
  name: 'ProjectFileEdit',
  components: { Page, DialogDrawer },
  data() {
    return {
      dataList: '',
      dialog: { display: false, title: '' },
      form: { data: { jsonFile: '', jsFile: '' } },
      props: { data: [], count: 0 },
      oldData: null
    }
  },
  computed: {
    ...mapGetters({
      projectItem: PROJECT_SELECT,
      tableFileItem: TABLE_FILE_SELECT
    }),
    queryButtonProps() {
      return { class: 'button-query', type: 'primary' }
    },
    btnGenerateProps() {
      const buttonProps = Object.assign({}, this.queryButtonProps)
      buttonProps.disabled = this.dataList == ''
      return buttonProps
    },
    btnSaveProps() {
      const { data } = this.props
      const buttonProps = Object.assign({}, this.btnHasDisableProps)
      if (!this.tableFileItem.data) return buttonProps
      const flag = JSON.stringify(data) == JSON.stringify(this.oldData)
      buttonProps.disabled = buttonProps.disabled || flag
      return buttonProps
    },
    btnHasDisableProps() {
      const buttonProps = Object.assign({}, this.queryButtonProps)
      buttonProps.disabled = this.props.data.length == 0
      return buttonProps
    }
  },
  mounted() {
    // this.dataList = ''
    // this.props.count = 0
    // this.props.data = []
    // this.props.data.push(this.initFieldItem())
  },
  watch: {
    tableFileItem: {
      handler(item) {
        if (!('id' in item)) this.$router.push({ name: '项目文件' })
        if (item.data && Array.isArray(item.data)) {
          this.oldData = JSON.parse(JSON.stringify(item.data))
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
        const resetD = this.dataList.replace(/([a-zA-Z0-9\-_]{1,}):/g, '"$1":').replace(/'/g, '"')
        const value = JSON.parse(resetD)
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
            const d = this.initFieldItem({ sqlName: key })
            this.props.data.push(d)
          })
        } else throw new TypeError('无法识别。')
      } catch (error) {
        const error_string = error.toString()
        const json_err = error_string.includes('SyntaxError') && error_string.includes('JSON')
        if (json_err) msgWarning('JSON格式不正确。')
        else if (error == 'TypeError: 无法识别。') msgWarning('无法识别,不是JSON格式。')
        else console.error(error)
      }
    },
    handleGenerateFileClick() {
      this.setJSONFile()
      this.setJSFile()
      this.dialog.display = true
    },
    handleSubmitClick() {
      const { data } = this.props
      if (JSON.stringify(data) == JSON.stringify(this.tableFileItem.data)) return
      const form = { ...this.tableFileItem, data }
      requestUpdTableFile(form, { fileName: this.projectItem.fileName }, ({ code }) => {
        if (code == 200) {
          msgSuccess('添加成功')
          this.oldData = JSON.parse(JSON.stringify(this.props.data))
        } else msgWarning('添加失败')
      })
    },

    initFieldItem({ sqlName, name, defaultValue, need, comment } = {}) {
      const sqlNameReg = /(-|_)([a-zA-Z])/g
      const resetName = (n1, n2, v) => v.toUpperCase()
      return {
        id: ++this.props.count,
        sqlName: sqlName || '',
        name: name || sqlName ? sqlName.replace(sqlNameReg, resetName) : '',
        defaultValue: defaultValue || '',
        need: need != false ? true : false,
        comment: comment || ''
      }
    },
    setJSFile() {
      const { fileName } = this.tableFileItem
      const jsFile = getTemplateFiles('template', fileName)
      if (jsFile.length) this.form.data.jsFile = jsFile
    },
    setJSONFile() {
      const data = { props: {} }
      _.each(this.props.data, item => {
        const d = { name: item.name, sqlName: item.sqlName }
        if (item.defaultValue) d.defaultValue = item.defaultValue
        if (item.need == false) d.need = item.need
        if (item.comment) d.comment = item.comment
        if (!data.props[item.name]) data.props[item.name] = d
      })
      let jsonFile = JSON.stringify(data, null, 2)
      this.form.data.jsonFile = jsonFile
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
.button-remove {
  font-size: 24px;

  ::v-deep .el-icon-remove::before {
    margin: -14px;
  }
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
