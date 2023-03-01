<template>
  <page :title="`添加${form.title}表文件`" @back="handlePageBack">
    <div class="template-wrapper">
      <el-form class="panel-form" inline label-width="80px">
        <el-form-item label="表名称">
          <el-input class="input-block" v-model.trim="form.title"></el-input>
        </el-form-item>
        <el-form-item label="文件名称">
          <el-input class="input-block" v-model.trim="form.fileName"></el-input>
        </el-form-item>
        <el-form-item label="API地址">
          <el-input class="input-block" v-model="form.apiAddress"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            class="input-block input-textarea"
            v-model="form.remark"
            type="textarea"
            rows="3"
          ></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button class="block" type="primary" @click="handleSubmitClick">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </page>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import Page from 'components/basic/Page'
import {
  PROJECT_SELECT,
  PROJECT_TABLE_COUNT,
  TABLE_FILE_LIST,
  TABLE_FILE_SELECT,
  requestProjectList,
  // requestUpdProject,
  requestTableFileList,
  requestAddTableFile,
  requestUpdTableFile
} from 'assets/script/request' // , requestSetProjectSelect
import { TABLE_FILE_NAME, msgSuccess, msgWarning, messageBox, msgSuccess, msgWarning } from 'util'

const { ipcRenderer } = window.require('electron')

export default {
  name: 'ProjectFileDetails',
  components: { Page },
  data() {
    return {
      update: false,
      type: '',
      oldFileName: '',
      form: { title: '', fileName: '', apiAddress: '', remark: '' }
    }
  },
  computed: {
    ...mapGetters({
      projectItem: PROJECT_SELECT,
      tableFileList: TABLE_FILE_LIST,
      tableFileItem: TABLE_FILE_SELECT,
      tableFileCount: PROJECT_TABLE_COUNT
    })
  },
  watch: {
    tableFileItem: {
      handler(item) {
        if (!('title' in item)) this.$router.push({ name: '项目文件' })
        this.form = item
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    if (this.tableFileItem.fileName) {
      this.type = 'upd'
      this.oldFileName = this.tableFileItem.fileName
    } else this.type = 'add'
    // this.props.count = 0
    // this.props.data = []
    // this.props.data.push(this.initFieldItem())
  },
  destroyed() {
    this.form = { title: '', fileName: '', apiAddress: '', remark: '' }
  },
  methods: {
    requestSubmitTableFile() {
      if (this.tableFileItem.id) {
        requestUpdTableFile(this.form, { fileName: this.projectItem.fileName }, ({ code, msg }) => {
          if (code == 200) {
            // if (this.$route.path.includes('/add')) requestUpdProject(this.projectItem)
            // else
            msgSuccess(msg)
            // requestProjectList()
            // requestTableFileList()
            this.update = true
            this.oldFileName = this.form.fileName
            this.$router.push('/jkzsl/file')
          } else msgWarning('A', msg)
        })
      } else {
        requestAddTableFile(this.form, ({ code, msg }) => {
          if (code == 200) {
            // if (this.$route.path.includes('/add')) requestUpdProject(this.projectItem)
            // else
            msgSuccess(msg)
            // requestProjectList()
            // requestTableFileList()
            this.update = true
            this.oldFileName = this.form.fileName
            this.$router.push('/jkzsl/file')
          } else msgWarning('U', msg)
        })
      }
    },

    handlePageBack() {
      requestProjectList()
      requestTableFileList()
      this.$router.push({ name: '项目文件' })
    },
    handleSubmitClick() {
      if (this.verificationTableForm()) return
      const { title } = this.form
      const count = _.filter(this.tableFileList, item => item.title == title).length
      if (count > 1) {
        messageBox('表名称已重复，是否修改？')
          .then(this.hasRepeatFolder)
          .catch(() => {})
      } else this.hasRepeatFolder()
    },

    initFieldItem({ sqlName, name, defaultValue, need, comment } = {}) {
      return {
        id: this.props.count++,
        sqlName: sqlName || '',
        name: name || sqlName || '',
        defaultValue: defaultValue || '',
        need: need != false ? true : false,
        comment: comment || ''
      }
    },
    verificationTableForm() {
      const { title } = this.form
      const { fileName } = this.form
      if (!title) return msgWarning('请输入表名称'), true
      if (!fileName) return msgWarning('请输入文件名称'), true
      const count = _.filter(this.tableFileList, item => item.fileName == fileName).length
      if (count > 1) return msgWarning('文件名已重复，无法添加！'), true
      return false
    },
    hasRepeatFolder() {
      const { fileName } = this.form
      const tableFileName = 'table-{fileName}-config.ini'.replace('{fileName}', fileName)
      const query = { fileName: tableFileName, path: this.projectItem.fileName }
      ipcRenderer.invoke('has-repeat-folder', query).then(async data => {
        if (this.type == 'add' && data.code == 300) this.requestSubmitTableFile()
        else if (this.type == 'upd') {
          /* 修改文件名称-是 */ if (this.oldFileName != fileName) {
            /* 重复文件-无 */ if (data.code == 300) {
              this.resetFileName() // 替换文件名
            } /* 重复文件-有 */ else if (data.code == 301) msgWarning('表文件已存在，无法修改！')
          } /* 修改文件名称-否 */ else this.requestSubmitTableFile()
        } else if (this.type == 'add') msgWarning('表文件已存在，无法添加！')
        else msgWarning('表文件已存在，无法修改！')
      })
    },
    async resetFileName() {
      try {
        const folderName = this.projectItem.fileName
        const oldFileName = TABLE_FILE_NAME.replace('{fileName}', this.oldFileName)
        const newFileName = TABLE_FILE_NAME.replace('{fileName}', this.form.fileName)
        const value = {
          oldPath: `${folderName}/${oldFileName}`,
          newPath: `${folderName}/${newFileName}`
        }
        const { code } = await ipcRenderer.invoke('rename', value)
        if (code == 400) throw new Error('替换失败')
        this.requestSubmitTableFile()
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.template-wrapper {
  padding: 20px;
}
.panel-form {
  width: 600px;
  margin: 0 auto;
}
.input-block {
  width: 500px;
}
.input-inline {
  width: 205px;
}
.block {
  width: 500px;
}
</style>
