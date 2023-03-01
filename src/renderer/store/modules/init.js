// import _ from 'lodash'
// import { ipcRenderer } from 'electron'
// import { setProjectFolder } from 'assets/script/folder' // getProjectFolder,
// import { msgSuccess, msgWarning } from 'util'
// import { getLineOptions } from 'api/shift-info-api'
const { ipcRenderer } = window.require('electron')

const state = {
  // theme: light、dark、auto; accentColor: blue、purple、pink、red、orange、yellow、green、gray;
  menu: { show: true },
  general: { theme: 'light', accentColor: 'blue' },
  daily: { isHistory: false, historyTotal: 20, historyShowNumber: 3 },
  monthly: { isNumberRecord: false },
  project: { type: '' },
  table: { pageSize: 20 },
}

const getters = {
  menu: (state) => state.menu,
  menuShow: (state) => state.menu.show,
  general: (state) => state.general,
  generalTheme: (state) => state.general.theme,
  themeColor: (state) => {
    const { theme } = state.general
    if (theme != 'auto') return state.general.theme
    const hours = new Date().getHours()
    // return hours >= 6 && hours < 18 ? 'light' : 'dark'
    console.info('theme-C:', hours)
    return hours >= 10 && hours < 18 ? 'light' : 'dark'
  },
  generalAccentColor: (state) => state.general.accentColor,
  daily: (state) => state.daily,
  dailyIsHistory: (state) => state.daily.isHistory,
  dailyHistoryTotal: (state) => state.daily.historyTotal,
  dailyHistoryShowNumber: (state) => state.daily.historyShowNumber,
  monthly: (state) => state.monthly,
  monthlyIsNumRecord: (state) => state.monthly.isNumberRecord,
  project: (state) => state.project,
  projectType: (state) => state.project.type,
  table: (state) => state.table,
  tablePageSize: (state) => state.table.pageSize,
}

const mutations = {
  SET_MENU(state, data) {
    state.menu = data
  },
  SET_MENU_SHOW(state, value) {
    state.menu.show = value
  },
  SET_CONFIG(state, data) {
    for (let key in data) {
      if (key == 'error' || key == 'menu') continue
      state[key] = data[key]
    }
  },
  SET_GENERAL_THEME(state, value) {
    state.general.theme = value
    setTimeout(setConfigChange)
  },
  SET_GENERAL_ACCENT_COLOR(state, value) {
    state.general.accentColor = value
    setTimeout(setConfigChange)
  },
  SET_DAILY_IS_HISTORY(state, value) {
    state.daily.isHistory = value ? true : false
    setTimeout(setConfigChange)
  },
  SET_DAILY_HISTORY_TOTAL(state, value) {
    state.daily.historyTotal = value
    setTimeout(setConfigChange)
  },
  SET_DAILY_HISTORY_SHOW_NUMBER(state, value) {
    state.daily.historyShowNumber = value
    setTimeout(setConfigChange)
  },
  SET_MONTHLY_IS_NUMBER_RECORD(state, value) {
    state.monthly.isNumberRecord = value ? true : false
    setTimeout(setConfigChange)
  },
  SET_PROJECT_TYPE(state, value) {
    if (value == 'table') state.project.type = value
    else state.project.type = 'card'
    setTimeout(setConfigChange)
  },
  SET_TABLE_PAGE_SIZE(state, value) {
    state.table.pageSize = value
    setTimeout(setConfigChange)
  },
}

const actions = {
  INIT_FOLDER({ commit }) {
    ipcRenderer.invoke('init-folder').then((config) => {
      commit('SET_CONFIG', config)
    })
  },
}

function thenConfigFolder({ code, msg }, cb) {
  if (typeof cb == 'function') cb({ code, msg })
  else console.info('code:', code, ', msg:', msg)
}
function setConfigChange() {
  ipcRenderer.invoke('set-config', state).then((config) => {
    thenConfigFolder(config)
  })
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
