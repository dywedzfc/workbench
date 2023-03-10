<template>
  <page title="添加项目详情" @back="handlePageBack">
    <div class="template-wrapper">
      <el-form class="panel-form" inline label-width="90px">
        <el-form-item label="项目名称">
          <div class="input-box input-inline_medium">{{ form.title }}</div>
        </el-form-item>
        <el-form-item label="项目简称">
          <div class="input-box input-inline_mini">{{ form.abbreviation }}</div>
        </el-form-item>
        <el-form-item label="文件名称">
          <div class="input-box input-inline">{{ form.fileName }}</div>
        </el-form-item>
        <el-form-item label="项目类型">
          <div class="input-box input-inline">{{ form.type }}</div>
        </el-form-item>
        <el-form-item>
          <path-label slot="label" title="服务器地址" :memo="form.serverAddressMemo" />
          <path-box
            class="input-block"
            :url="form.serverAddress"
            :memo="form.serverAddressMemo"
            move-click
            @command-click="handleServerAddressCommandClick"
          />
        </el-form-item>
        <el-form-item>
          <path-label slot="label" title="本地地址" :memo="form.localAddressMemo" />
          <path-box class="input-block" :url="form.localAddress" :memo="form.localAddressMemo" />
        </el-form-item>
        <el-form-item>
          <path-label slot="label" title="SVN地址" :memo="form.svnAddressMemo" />
          <path-box
            class="input-block"
            :url="form.svnAddress"
            :memo="form.svnAddressMemo"
            move-click
            @command-click="handleSvnAddressCommandClick"
          />
        </el-form-item>
        <el-form-item label="API地址">
          <path-label slot="label" title="API地址" :memo="form.apiAddressMemo" />
          <path-box
            class="input-block"
            :url="form.apiAddress"
            :memo="form.apiAddressMemo"
            move-click
            @command-click="handleApiAddressCommandClick"
          />
        </el-form-item>
        <el-form-item label="备注">
          <div class="input-box input-block">{{ form.remark }}</div>
        </el-form-item>
      </el-form>
    </div>
  </page>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import Page from 'components/basic/Page'
import PathLabel from 'components/basic/PathLabel'
import PathBox from 'components/basic/PathBox'
// import Panel from 'components/basic/Panel'
import {
  PROJECT_LIST,
  PROJECT_SELECT,
  requestProjectList,
  requestUpdProject
} from 'assets/script/request' // , requestSetProjectSelect
import { msgSuccess, msgWarning, messageBox, resetWebURL, verifyServerAddress } from 'util'

const { ipcRenderer } = window.require('electron')

export default {
  name: 'ProjectEdit',
  components: { Page, PathLabel, PathBox }, // , Panel
  data() {
    return {
      update: false,
      type: '',
      oldFileName: '',
      form: {
        title: '',
        abbreviation: '',
        fileName: '',
        remotelyAddress: '',
        localAddress: '',
        svnAddress: '',
        apiAddress: '',
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
        } else msgWarning(msg)
      })
    },

    handlePageBack() {
      if (!this.update) requestProjectList()
      this.$router.push({ name: '项目列表' })
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
    handleServerAddressCommandClick(url) {
      if (verifyServerAddress(url)) {
        ipcRenderer.send('open-browser', resetWebURL(url))
      }
    },
    handleSvnAddressCommandClick(url) {
      if (verifyServerAddress(url)) {
        ipcRenderer.send('open-browser', resetWebURL(url))
      }
    },
    handleApiAddressCommandClick(url) {
      if (verifyServerAddress(url)) {
        ipcRenderer.send('open-browser', resetWebURL(url))
      }
    },

    verificationProjectForm() {
      const { title, fileName } = this.form
      if (!title) return msgWarning('请输入项目名称'), true
      if (!fileName) return msgWarning('请输入文件名称'), true
      const count = _.filter(this.projectList, item => item.fileName == fileName).length
      if (count > 1) return msgWarning('文件名已重复，无法添加！'), true
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
  width: 650px;
  margin: 0 auto;
}
.input-block {
  width: 550px;
}
.input-inline {
  width: 225px;
}
.input-inline_medium {
  width: 280px;
}
.input-inline_mini {
  width: 170px;
}
.input-box {
  box-sizing: border-box;
  min-height: 42px;
  padding: 0 10px;
  border: 1px solid #eee;
  border-radius: 4px;
}
.input-label {
  display: block;
  margin-top: 10px;
}
// .input-url {
//   margin-bottom: 10px;
// }
// .input-textarea {
//   padding: 10px;
//   line-height: 1.4;
// }
.block {
  width: 500px;
}
// .input-textarea {
//   width: 205px;
// }
</style>
