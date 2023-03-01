<template>
  <page title="添加XX表文件" @back="handlePageBack">
    <div class="template-wrapper">
      <el-form class="panel-form" inline label-width="80px">
        <el-form-item label="名称">
          <el-input class="input-block" v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="文件名称">
          <el-input class="input-inline" v-model="form.fileName"></el-input>
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
// import _ from 'lodash'
import { mapGetters } from 'vuex'
import Page from 'components/basic/Page'
import { TABLE_FILE_SELECT, requestUpdProject } from 'assets/script/request' // , requestSetProjectSelect

export default {
  name: 'ProjectFileDetails',
  components: { Page },
  data() {
    return {
      form: { title: '', fileName: '', apiAddress: '', remark: '' },
      dataList: '',
      props: { data: [], count: 0 }
    }
  },
  computed: {
    ...mapGetters({ tableFileItem: TABLE_FILE_SELECT })
  },
  watch: {
    tableFileItem: {
      handler(item) {
        console.info('table-file:', 'id' in item)
        if (!('id' in item)) this.$router.push({ name: '项目文件' })
        this.form = item
      },
      deep: true,
      immediate: true
    }
    // form: {
    //   handler(item) {
    //     console.info('form-data:', item)
    //     requestSetProjectSelect(item)
    //   },
    //   deep: true
    // }
  },
  mounted() {
    this.dataList = `{ "bid": "", "lid": "", "bvid": "", "bvtid": "", "vehicle_no": "", "bc_name": "", "vehicle_temp": "", "start_time": "", "arrive_time": "", "temp_stime": "", "temp_etime": "" }`
    this.props.count = 0
    this.props.data = []
    // this.props.data.push(this.initFieldItem())
  },
  methods: {
    handlePageBack() {
      this.$router.push({ name: '项目文件' })
    },
    handleSubmitClick() {},

    initFieldItem({ sqlName, name, defaultValue, need, comment } = {}) {
      return {
        id: this.props.count++,
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
