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
  SET_POST_TASK_LIST(state, data) {
    state.data = data
  },
  SET_POST_TASK_COUNT(state) {
    const selectId = state.selectId
    const index = _.indexOf(_.map(state.data, 'id'), selectId)
    const tableCount = state.data[index].tableCount
    state.data[index].tableCount = tableCount ? tableCount + 1 : 1
  },
  ADD_POST_TASK(state, { data, cb }) {
    ipcRenderer.invoke('add-post-task', data).then(data => {
      thenPostTaskFolder(data, cb)
    })
  },
  UPD_POST_TASK(state, { data = {}, cb }) {
    if (!data.id) return
    ipcRenderer.invoke('upd-post-task', data).then(data => {
      thenPostTaskFolder(data, cb)
    })
  },
  REMOVE_POST_TASK_MARK(state, { id, cb }) {
    const data = state.data[_.indexOf(_.map(state.data, 'id'), id)]
    data.removeState = true
    ipcRenderer.invoke('upd-post_task-folder', data).then(data => {
      thenPostTaskFolder(data, cb)
    })
  }
}

const actions = {
  FIND_POST_TASK_LIST({ commit }) {
    ipcRenderer.invoke('get-post-task-list').then(({ data }) => {
      commit('SET_POST_TASK_LIST', data)
    })
  }
}
function thenPostTaskFolder({ code, msg }, cb) {
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
