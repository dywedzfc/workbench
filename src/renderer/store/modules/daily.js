// import _ from 'lodash'
import _ from 'lodash'
import { msgWarning, msgSuccess } from 'util'

const { ipcRenderer } = window.require('electron')

const state = {
  data: [],
  monthly: { year: [], month: [] },
  priority: ['非常紧急', '紧急', '普通', '忽略']
}

const getters = {
  list: state => state.data,
  monthly: state => state.monthly,
  priority: state => _.map(state.priority, (item, index) => ({ value: index + 1, label: item }))
}

const mutations = {
  // 日报
  SET_DAILY_LIST(state, data) {
    state.data = data
  },
  ADD_DAILY_INFO(state, { data, cb }) {
    ipcRenderer.invoke('add-daily-info', data).then(data => {
      thenDailyFolder(data, cb)
    })
  },
  UPD_DAILY_INFO(state, { data, cb }) {
    ipcRenderer.invoke('upd-daily-info', data).then(data => {
      thenDailyFolder(data, cb)
    })
  },
  DEL_DAILY_INFO(state, { data, cb }) {
    ipcRenderer.invoke('del-daily-info', data).then(data => {
      thenDailyFolder(data, cb)
    })
  },
  // 月报
  SET_MONTHLY_LIST(state, data) {
    state.monthly.year = data.year
    state.monthly.month = data.month
  }
}

const actions = {
  FIND_DAILY_LIST({ commit }, { data, cb }) {
    ipcRenderer.invoke('get-daily-list', data).then(data => {
      commit('SET_DAILY_LIST', data)
      if (cb) cb()
    })
  },
  FIND_MONTHLY_LIST({ commit }, { data, cb }) {
    ipcRenderer.invoke('get-monthly-list', data).then(data => {
      commit('SET_MONTHLY_LIST', data)
      if (cb) cb()
    })
  }
}

function thenDailyFolder({ code, msg }, cb) {
  if (typeof cb == 'function') cb({ code, msg })
  else {
    if (code == 200) msgSuccess(msg)
    else msgWarning(msg)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
