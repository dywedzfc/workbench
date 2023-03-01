<template>
  <page title="添加项目详情" @back="handlePageBack">
    <div class="template-wrapper">
      <el-form class="panel-form" inline label-width="90px">
        <el-form-item label="项目名称">
          <el-input class="input-block" v-model.trim="form.title"></el-input>
        </el-form-item>
        <el-form-item label="项目简称">
          <el-input class="input-block" v-model="form.abbreviation"></el-input>
        </el-form-item>
        <el-form-item label="文件名称">
          <el-input class="input-inline" v-model.trim="form.fileName"></el-input>
        </el-form-item>
        <el-form-item label="项目类型">
          <el-input class="input-inline" v-model="form.type"></el-input>
          <!-- <el-select class="input-inline" v-model="form.type"></el-select> -->
        </el-form-item>
        <el-form-item>
          <template #label>
            <span>服务器地址</span>
            <span class="input-label">说明</span>
          </template>
          <div class="input-block">
            <el-input
              class="input-block input-url"
              :class="{ error: error.serverAddress }"
              v-model="form.serverAddress"
              @change="handleServerAddressChange"
            />
            <el-input
              class="input-block input-textarea"
              v-model="form.serverAddressMemo"
              type="textarea"
              rows="3"
            />
          </div>
        </el-form-item>
        <el-form-item>
          <template #label>
            <span>本地地址</span>
            <span class="input-label">说明</span>
          </template>
          <div class="input-block">
            <el-input class="input-block input-url" v-model="form.localAddress" />
            <el-input
              class="input-block input-textarea"
              v-model="form.localAddressMemo"
              type="textarea"
              rows="2"
            />
          </div>
        </el-form-item>
        <el-form-item>
          <template #label>
            <span>SVN地址</span>
            <span class="input-label">说明</span>
          </template>
          <div class="input-block">
            <el-input
              class="input-block input-url"
              :class="{ error: error.svnAddress }"
              v-model="form.svnAddress"
              @change="handleSvnAddressChange"
            />
            <el-input
              class="input-block input-textarea"
              v-model="form.svnAddressMemo"
              type="textarea"
              rows="2"
            />
          </div>
        </el-form-item>
        <el-form-item>
          <template #label>
            <span>API地址</span>
            <span class="input-label">说明</span>
          </template>
          <div class="input-block">
            <el-input
              class="input-block input-url"
              :class="{ error: error.apiAddress }"
              v-model="form.apiAddress"
              @change="handleApiAddressChange"
            />
            <el-input
              class="input-block input-textarea"
              v-model="form.apiAddressMemo"
              type="textarea"
              rows="2"
            />
          </div>
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
// import Panel from 'components/basic/Panel'
import {
  PROJECT_LIST,
  PROJECT_SELECT,
  requestProjectList,
  requestUpdProject
} from 'assets/script/request' // , requestSetProjectSelect
import { msgSuccess, msgWarning, messageBox, verifyServerAddress } from 'util'

const { ipcRenderer } = window.require('electron')

export default {
  name: 'ProjectEdit',
  components: { Page }, // , Panel
  data() {
    return {
      update: false,
      type: '',
      oldFileName: '',
      message: null,
      error: { serverAddress: false, svnAddress: false, apiAddress: false },
      form: {
        title: '',
        abbreviation: '',
        fileName: '',
        serverAddress: '',
        serverAddressMemo: '',
        localAddress: '',
        localAddressMemo: '',
        svnAddress: '',
        svnAddressMemo: '',
        apiAddress: '',
        apiAddressMemo: '',
        remark: ''
      }
    }
  },
  computed: {
    ...mapGetters({ projectList: PROJECT_LIST, projectItem: PROJECT_SELECT })
  },
  watch: {
    projectItem: {
      handler(item) {
        if (!('id' in item)) this.$router.push({ name: '项目列表' })
        this.form = item
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    if (this.projectItem.fileName) {
      this.type = 'upd'
      this.oldFileName = this.projectItem.fileName
    } else this.type = 'add'
  },
  methods: {
    requestSubmitProject() {
      requestUpdProject(this.form, ({ code, msg }) => {
        if (code == 200) {
          msgSuccess(msg)
          requestProjectList()
          this.update = true
          this.oldFileName = this.form.fileName
          this.$router.push('/jkzsl/list')
        } else msgWarning(msg)
      })
    },

    handlePageBack() {
      if (!this.update) requestProjectList()
      this.$router.push({ name: '项目列表' })
    },
    handleServerAddressChange(value) {
      const verify = verifyServerAddress(value)
      if (!value) return (this.error.serverAddress = false), undefined
      if (!verify) {
        this.message = msgWarning('服务器地址格式不正确！')
        this.error.serverAddress = true
      } else {
        this.error.serverAddress = false
      }
    },
    handleSvnAddressChange(value) {
      const verify = verifyServerAddress(value)
      if (!value) return (this.error.svnAddress = false), undefined
      if (!verify) {
        this.message = msgWarning('SVN地址格式不正确！')
        this.error.svnAddress = true
      } else {
        this.error.svnAddress = false
      }
    },
    handleApiAddressChange(value) {
      const verify = verifyServerAddress(value)
      if (!value) return (this.error.apiAddress = false), undefined
      if (!verify) {
        this.message = msgWarning('API地址格式不正确！')
        this.error.apiAddress = true
      } else {
        this.error.apiAddress = false
      }
    },
    handleSubmitClick() {
      if (this.verificationProjectForm()) return
      const { title } = this.form
      const count = _.filter(this.projectList, item => item.title == title).length
      if (count > 1) {
        messageBox('项目名称已重复，是否修改？')
          .then(this.hasRepeatFolder)
          .catch(() => {})
      } else this.hasRepeatFolder()
    },

    verificationProjectForm() {
      const { title, fileName, serverAddress, svnAddress, apiAddress } = this.form
      if (this.message) this.message.close()
      if (!title) return msgWarning('请输入项目名称'), true
      if (!fileName) return msgWarning('请输入文件名称'), true
      const count = _.filter(this.projectList, item => item.fileName == fileName).length
      if (count > 1) return msgWarning('文件名已重复，无法添加！'), true
      if (serverAddress && !verifyServerAddress(serverAddress)) {
        this.error.serverAddress = true
        return msgWarning('服务器地址格式不正确！'), true
      }
      if (svnAddress && !verifyServerAddress(svnAddress)) {
        this.error.svnAddress = true
        return msgWarning('SVN地址格式不正确！'), true
      }
      if (apiAddress && !verifyServerAddress(apiAddress)) {
        this.error.apiAddress = true
        return msgWarning('API地址格式不正确！'), true
      }
      return false
    },
    hasRepeatFolder() {
      const { fileName } = this.form
      ipcRenderer.invoke('has-repeat-folder', { fileName }).then(async data => {
        if (this.type == 'add' && data.code == 300) this.requestSubmitProject()
        else if (this.type == 'upd') {
          /* 修改文件名称-是 */ if (this.oldFileName != fileName) {
            /* 重复文件-无 */ if (data.code == 300) {
              this.resetFileName() // 替换文件名
            } /* 重复文件-有 */ else if (data.code == 301) msgWarning('文件夹已存在，无法修改！')
          } /* 修改文件名称-否 */ else this.requestSubmitProject()
        } else if (this.type == 'add') msgWarning('文件夹已存在，无法添加！')
        else msgWarning('文件夹已存在，无法修改！')
      })
    },
    async resetFileName() {
      try {
        const value = { oldPath: this.oldFileName, newPath: this.form.fileName }
        const { code } = await ipcRenderer.invoke('rename', value)
        if (code == 400) throw new Error('替换失败')
        // if (code == 404 && msg == '文件未创建') return
        this.requestSubmitProject()
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
  width: 200px;
}
.input-label {
  display: block;
  margin-top: 10px;
}
.input-url {
  margin-bottom: 10px;
}
.error {
  ::v-deep &.el-input .el-input__inner {
    &,
    &:focus {
      border-color: #e81123;
    }
  }
}
.block {
  width: 500px;
}
// .input-textarea {
//   width: 205px;
// }
</style>
