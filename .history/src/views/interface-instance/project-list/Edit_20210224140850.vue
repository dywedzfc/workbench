<template>
  <page title="添加项目详情" @back="handlePageBack">
    <div class="template-wrapper">
      <el-form class="panel-form" inline label-width="80px">
        <el-form-item label="项目名称">
          <el-input class="input-block" v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="文件名称">
          <el-input class="input-inline" v-model="form.fileName"></el-input>
        </el-form-item>
        <el-form-item label="项目类型">
          <el-input class="input-inline" v-model="form.type"></el-input>
          <!-- <el-select class="input-inline" v-model="form.type"></el-select> -->
        </el-form-item>
        <el-form-item label="远程地址">
          <el-input
            class="input-block input-textarea"
            v-model="form.remotelyAddress"
            type="textarea"
            rows="3"
          ></el-input>
        </el-form-item>
        <el-form-item label="本地地址">
          <el-input
            class="input-block input-textarea"
            v-model="form.localAddress"
            type="textarea"
            rows="2"
          ></el-input>
        </el-form-item>
        <el-form-item label="API地址">
          <el-input
            class="input-block input-textarea"
            v-model="form.apiAddress"
            type="textarea"
            rows="2"
          ></el-input>
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
          <el-button class="block" type="primary">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </page>
</template>

<script>
import { mapGetters } from 'vuex'
import Page from 'components/basic/Page'
// import Panel from 'components/basic/Panel'
import { PROJECT_SELECT } from 'assets/script/request'

export default {
  name: 'ProjectEdit',
  components: { Page }, // , Panel
  data() {
    return {
      form: {
        projectName: '',
        fileName: '',
        remotelyAddress: '',
        localAddress: '',
        apiAddress: '',
        remark: ''
      }
    }
  },
  computed: {
    ...mapGetters({ projectItem: PROJECT_SELECT })
  },
  watch: {
    projectItem: {
      handler(item) {
        console.info('project:', item)
        if (!itme || !Array.from(item).length) this.$router.push({ name: '项目列表' })
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {},
  methods: {
    handlePageBack() {
      this.$router.push({ name: '项目列表' })
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
// .input-textarea {
//   width: 205px;
// }
</style>
