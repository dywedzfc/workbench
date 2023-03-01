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
      thenpost_taskFolder(data, cb)
    })
  },
  UPD_post_task(state, { data = {}, cb }) {
    if (!data.id) return
    // const index = _.indexOf(_.map(state.data, 'id'), data.id)
    // state.data[index] = data
    // setpost_taskFolder({ data: state.data, count: state.count }, cb)
    ipcRenderer.invoke('upd-post_task-folder', data).then(data => {
      thenpost_taskFolder(data, cb)
    })
  },
  REMOVE_post_task_MARK(state, { id, cb }) {
    // const { data } = state
    // const index = _.indexOf(_.map(data, 'id'), id)
    const data = state.data[_.indexOf(_.map(state.data, 'id'), id)]
    data.removeState = true
    ipcRenderer.invoke('upd-post_task-folder', data).then(data => {
      thenpost_taskFolder(data, cb)
    })
    // setpost_taskFolder({ data: state.data, count: state.count }, cb)
  }
}

const actions = {
  FIND_post_task_LIST({ commit }) {
    ipcRenderer.invoke('get-post_task-list').then(({ data }) => {
      commit('SET_post_task_LIST', data)
    })
  }
}
function thenpost_taskFolder({ code, msg }, cb) {
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
