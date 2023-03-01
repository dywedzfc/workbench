<template>
  <page title="设置" icon="el-icon-s-home" @back="handlePageBack">
    <div class="template-wrapper">
      <div class="panel">
        <div class="panel-header">通用</div>
        <div class="panel-body">
          <el-form class="config-form" label-width="9em">
            <el-form-item label="外观">
              <!-- _generalTheme -->

              <el-radio class="radio-theme radio-light" v-model="_generalTheme" label="light" />
              <el-radio class="radio-theme radio-dark" v-model="_generalTheme" label="dark" />
              <el-radio class="radio-theme radio-auto" v-model="_generalTheme" label="auto" />
            </el-form-item>
            <el-form-item label="强调色">
              <el-radio class="radio-size radio-blue" v-model="_generalAccentColor" label="blue" />
              <el-radio
                class="radio-size radio-purple"
                v-model="_generalAccentColor"
                label="purple"
              />
              <el-radio class="radio-size radio-pink" v-model="_generalAccentColor" label="pink" />
              <el-radio class="radio-size radio-red" v-model="_generalAccentColor" label="red" />
              <el-radio
                class="radio-size radio-orange"
                v-model="_generalAccentColor"
                label="orange"
              />
              <el-radio
                class="radio-size radio-yellow"
                v-model="_generalAccentColor"
                label="yellow"
              />
              <el-radio
                class="radio-size radio-green"
                v-model="_generalAccentColor"
                label="green"
              />
              <el-radio class="radio-size radio-gray" v-model="_generalAccentColor" label="gray" />
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="panel">
        <div class="panel-header">日报</div>
        <div class="panel-body">
          <el-form class="config-form" label-width="9em">
            <el-form-item label="是否开启历史记录">
              <el-switch v-model="_dailyIsHistory" />
            </el-form-item>
            <el-form-item label="历史记录总条数">
              <el-input
                class="show-number"
                :value="_dailyHistoryTotal"
                readonly
                :disabled="!_dailyIsHistory"
              />
              <el-slider
                v-model="_dailyHistoryTotal"
                :min="10"
                :max="100"
                :step="5"
                :disabled="!_dailyIsHistory"
              />
            </el-form-item>
            <el-form-item label="历史记录显示条数">
              <el-input
                class="show-number"
                :value="_dailyHistoryShowNumber"
                readonly
                :disabled="!_dailyIsHistory"
              />
              <el-slider
                v-model="_dailyHistoryShowNumber"
                :min="1"
                :max="5"
                :disabled="!_dailyIsHistory"
              />
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
              <el-input class="show-number" :value="_tablePageSize" readonly />
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
  DAILY_HISTORY_SHOW_NUMBER,
  MONTHLY_IS_NUM_RECORD,
  GENERAL_THEME,
  GENERAL_ACCENT_COLOR,
  requestSetGeneralTheme,
  requestSetGeneralAccentColor,
  requestSetTablePageSize,
  requestSetDailyIsHistory,
  requestSetDailyHistoryTotal,
  requestSetDailyHistoryShowNumber,
  requestSetMonthlyIsNumRecord,
} from 'assets/script/request'
import { getDailyHistory, setDailyHistory } from 'assets/script/local-storage'
// import { msgSuccess, msgWarning, messageBox } from 'util'
// const { ipcRenderer } = window.require('electron')

export default {
  name: 'Config',
  components: { Page },
  data() {
    return {
      accentColor: 'blue',
    }
  },
  computed: {
    ...mapGetters({
      generalTheme: GENERAL_THEME,
      generalAccentColor: GENERAL_ACCENT_COLOR,
      tablePageSize: TABLE_PAGE_SIZE,
      dailyIsHistory: DAILY_IS_HISTORY,
      dailyHistoryTotal: DAILY_HISTORY_TOTAL,
      dailyHistoryShowNumber: DAILY_HISTORY_SHOW_NUMBER,
      monthlyIsNumRecord: MONTHLY_IS_NUM_RECORD,
    }),
    _generalTheme: {
      get() {
        return this.generalTheme
      },
      set(value) {
        requestSetGeneralTheme(value)
      },
    },
    _generalAccentColor: {
      get() {
        return this.generalAccentColor
      },
      set(value) {
        requestSetGeneralAccentColor(value)
      },
    },
    _dailyIsHistory: {
      get() {
        return this.dailyIsHistory
      },
      set(value) {
        setDailyHistory([])
        requestSetDailyIsHistory(value)
      },
    },
    _dailyHistoryTotal: {
      get() {
        return this.dailyHistoryTotal
      },
      set(value) {
        const historyList = getDailyHistory()
        const startSlice = historyList.length - value
        if (startSlice >= 0) setDailyHistory(historyList.slice(startSlice))
        requestSetDailyHistoryTotal(value)
      },
    },
    _dailyHistoryShowNumber: {
      get() {
        return this.dailyHistoryShowNumber
      },
      set(value) {
        requestSetDailyHistoryShowNumber(value)
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
@import '~assets/scss/mixin';

.template-wrapper {
  width: 700px;
  height: calc(100% - 80px);
  margin: 40px auto;
  padding: 0;
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
    // border-bottom: 1px solid #eeeeee;
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
@mixin radio-inner-color($color) {
  .el-radio__inner {
    background: $color;

    &::after {
      display: none;
    }
  }
  .el-radio__input.is-checked {
    .el-radio__inner {
      background: $color;
    }
  }
}
.radio {
  &-theme::v-deep {
    .el-radio__inner {
      width: 80px;
      height: 50px;
      border-radius: 8px;
    }
    .el-radio__input.is-checked {
      position: relative;

      &::before {
        position: absolute;
        right: 0;
        bottom: 4px;
        display: inline-block;
        z-index: 1;

        width: 0;
        height: 0;
        border-style: solid;
        border-top-color: transparent;
        border-left-color: transparent;
        border-width: 14px 16px;
        border-bottom-right-radius: 8px;

        content: '\e6da';
        font-weight: bold;
        font-family: element-icons !important;
        text-indent: -0.2em;
        line-height: 0.9;
        text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
        color: #ffffff;
      }
      .el-radio__inner {
        background-color: transparent;
      }
    }
    .el-radio__label {
      display: none;
    }
  }
  &-light::v-deep {
    @include radio-inner-color(#ffffff);
  }
  &-dark::v-deep {
    @include radio-inner-color(#151515);
  }
  &-auto::v-deep {
    @include radio-inner-color(linear-gradient(90deg, #ffffff 50%, #151515 50%));
  }
  &-size::v-deep.el-radio {
    margin-right: 20px;
  }
  &-size ::v-deep .el-radio__inner {
    width: 20px;
    height: 20px;

    &::after {
      width: 6px;
      height: 6px;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
    }
  }
  &-size ::v-deep .el-radio__label {
    display: none;
  }
  &-blue ::v-deep .el-radio__inner {
    @include radio-color(#307cf7);
  }
  &-purple ::v-deep .el-radio__inner {
    @include radio-color(#894591);
  }
  &-pink ::v-deep .el-radio__inner {
    @include radio-color(#e45d9c);
  }
  &-red ::v-deep .el-radio__inner {
    @include radio-color(#cf4745);
  }
  &-orange ::v-deep .el-radio__inner {
    @include radio-color(#e9873b);
  }
  &-yellow ::v-deep .el-radio__inner {
    @include radio-color(#f7c84e);
  }
  &-green ::v-deep .el-radio__inner {
    @include radio-color(#79b756);
  }
  // &-gray ::v-deep .el-radio__inner {
  //   // @include radio-color(#888989);
  //   @include radio-color(#222222);
  // }
}
.show-number {
  position: absolute;
  width: 60px;
  left: 60px;
}
</style>
