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
import _ from 'lodash'
import Page from 'components/basic/Page'

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
  computed: {},
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
  padding: 30px;
}
.textarea-box {
  margin-bottom: 20px;
}
.form-item {
  margin-bottom: 20px;
}
.button-query {
  display: block;
  margin-top: 10px;
  width: 100%;
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
