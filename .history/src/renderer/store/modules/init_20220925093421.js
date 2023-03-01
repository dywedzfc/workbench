// import _ from 'lodash'
// import { ipcRenderer } from 'electron'
// import { setProjectFolder } from 'assets/script/folder' // getProjectFolder,
// import { msgSuccess, msgWarning } from 'util'
// import { getLineOptions } from 'api/shift-info-api'
const { ipcRenderer } = window.require('electron')

const state = {
  daily: { isHistory: false },
  monthly: { isNumberRecord: false },
  project: { type: '' },
  table: { pageSize: 20 },
}

const getters = {
  monthly: (state) => state.monthly,
  monthlyIsNumRecord: (state) => state.monthly.isNumberRecord,
  project: (state) => state.project,
  projectType: (state) => state.project.type,
  table: (state) => state.table,
  tablePageSize: (state) => state.table.pageSize,
}

const mutations = {
  SET_CONFIG(state, data) {
    for (let key in data) {
      if (key == 'error') continue
      state[key] = data[key]
    }
  },
  SET_DAILY_IS_HISTORY(state, value) {
    state.daily.isHistory = value ? true : false
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
