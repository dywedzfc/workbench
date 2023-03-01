<template>
  <page title="设置" icon="el-icon-s-home" @back="handlePageBack">
    <div class="template-wrapper">
      <div class="panel">
        <div class="panel-header">日报</div>
        <div class="panel-body">
          <el-form class="config-form" label-width="9em">
            <el-form-item label="是否开启历史记录">
              <el-switch v-model="_dailyIsHistory" />
            </el-form-item>
            <el-form-item label="历史记录总条数">
              <el-input class="show-number" :value="_dailyHistoryTotal" readonly />
              <el-slider v-model="_dailyHistoryTotal" :min="10" :max="100" :step="5" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header">月报</div>
        <div class="panel-body">
          <el-form class="config-form" label-width="9em">
            <el-form-item label="是否记录数量">
              <el-switch v-model="_monthlyIsNumRecord" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header">表格</div>
        <div class="panel-body">
          <el-form class="config-form" label-width="9em">
            <el-form-item label="表格每页数量">
              <el-slider v-model="_tablePageSize" :min="10" :step="10" />
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
// import _ from 'lodash'
import { mapGetters } from 'vuex'
import Page from 'components/basic/Page'
import {
  TABLE_PAGE_SIZE,
  DAILY_IS_HISTORY,
  DAILY_HISTORY_TOTAL,
  MONTHLY_IS_NUM_RECORD,
  requestSetTablePageSize,
  requestSetDailyIsHistory,
  requestSetDailyHistoryTotal,
  requestSetMonthlyIsNumRecord,
} from 'assets/script/request'
// import { msgSuccess, msgWarning, messageBox } from 'util'
// const { ipcRenderer } = window.require('electron')

export default {
  name: 'RecycleBin',
  components: { Page },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      tablePageSize: TABLE_PAGE_SIZE,
      dailyIsHistory: DAILY_IS_HISTORY,
      dailyHistoryTotal: DAILY_HISTORY_TOTAL,
      monthlyIsNumRecord: MONTHLY_IS_NUM_RECORD,
    }),
    _dailyIsHistory: {
      get() {
        return this.dailyIsHistory
      },
      set(value) {
        requestSetDailyIsHistory(value)
      },
    },
    _dailyHistoryTotal: {
      get() {
        return this.dailyHistoryTotal
      },
      set(value) {
        requestSetDailyHistoryTotal(value)
      },
    },
    _monthlyIsNumRecord: {
      get() {
        return this.monthlyIsNumRecord
      },
      set(value) {
        requestSetMonthlyIsNumRecord(value)
      },
    },
    _tablePageSize: {
      get() {
        return this.tablePageSize
      },
      set(value) {
        requestSetTablePageSize(value)
      },
    },
  },
  mounted() {},
  methods: {
    handlePageBack() {
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
.template-wrapper {
  width: 700px;
  margin: 0 auto;
  padding: 40px 0;
}
.panel {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  &-header {
    padding: 0 10px;
    font-size: 24px;
    line-height: 1.8;
    border-bottom: 1px solid #eeeeee;
  }
  &-body {
    padding: 20px;
  }
}
.config-form ::v-deep.el-form-item .el-form-item__content {
  padding-left: 140px;
  padding-right: 20px;
  text-align: right;
}
.show-number {
  position: absolute;
  width: 60px;
}
</style>
