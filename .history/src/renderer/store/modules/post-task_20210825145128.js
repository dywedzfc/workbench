import _ from 'lodash'
import { msgSuccess, msgWarning } from 'util'

const { ipcRenderer } = window.require('electron')

const state = {
  data: [],
  count: 0,
  selectId: ''
}

const getters = {
  list: state => state.data,
  count: state => state.count
}

const mutations = {
  SET_PROJECT_SELECT_ID(state, id) {
    state.selectId = id
  },
  // SET_PROJECT_SELECT(state, item) {
  //   state.select = item
  // },
  SET_PROJECT_LIST(state, data) {
    state.data = data
    // state.count = count
  },
  SET_PROJECT_TABLE_COUNT(state) {
    const selectId = state.selectId
    const index = _.indexOf(_.map(state.data, 'id'), selectId)
    const tableCount = state.data[index].tableCount
    state.data[index].tableCount = tableCount ? tableCount + 1 : 1
  },
  ADD_PROJECT(state, { data, cb }) {
    // const count = ++state.count
    // state.data.push({ ...data, id: count })
    // setProjectFolder({ data: state.data, count: state.count }, cb)
    ipcRenderer.invoke('add-project-folder', data).then(data => {
      thenProjectFolder(data, cb)
    })
  },
  UPD_PROJECT(state, { data = {}, cb }) {
    if (!data.id) return
    // const index = _.indexOf(_.map(state.data, 'id'), data.id)
    // state.data[index] = data
    // setProjectFolder({ data: state.data, count: state.count }, cb)
    ipcRenderer.invoke('upd-project-folder', data).then(data => {
      thenProjectFolder(data, cb)
    })
  },
  REMOVE_PROJECT_MARK(state, { id, cb }) {
    // const { data } = state
    // const index = _.indexOf(_.map(data, 'id'), id)
    const data = state.data[_.indexOf(_.map(state.data, 'id'), id)]
    data.removeState = true
    ipcRenderer.invoke('upd-project-folder', data).then(data => {
      thenProjectFolder(data, cb)
    })
    // setProjectFolder({ data: state.data, count: state.count }, cb)
  }
}

const actions = {
  FIND_PROJECT_LIST({ commit }) {
    ipcRenderer.invoke('get-project-list').then(({ data }) => {
      commit('SET_PROJECT_LIST', data)
    })
  }
}
function thenProjectFolder({ code, msg }, cb) {
  if (typeof cb == 'function') cb({ code, msg })
  else {
    if (code == 200) msgSuccess(msg)
    else msgWarning(msg)
  }
}
// function addRecycleBin(){}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
