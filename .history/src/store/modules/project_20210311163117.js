import _ from 'lodash'
// import { ipcRenderer } from 'electron'
import { getProjectFolder, setProjectFolder } from 'assets/script/folder'
// import { getLineOptions } from 'api/shift-info-api'
const { ipcRenderer } = window.require('electron')

const state = {
  data: [],
  count: 0,
  selectId: ''
}

const getters = {
  list: state => state.data,
  count: state => state.count,
  select: state => {
    const list = _.filter(state.data, item => item.id == state.selectId)
    if (list.length) return list[0]
    return {}
  },
  tableCount: state => {
    const list = _.filter(state.data, item => item.id == state.selectId)
    if (list.length && list[0].tableCount) return list[0].tableCount
    return 1
  }
}

const mutations = {
  SET_PROJECT_SELECT_ID(state, id) {
    state.selectId = id
  },
  SET_PROJECT_SELECT(state, item) {
    state.select = item
  },
  SET_PROJECT_LIST(state, { data, count }) {
    state.data = data
    state.count = count
  },
  SET_PROJECT_TABLE_COUNT(state) {
    const selectId = state.selectId
    const index = _.indexOf(_.map(state.data, 'id'), selectId)
    const tableCount = state.data[index].tableCount
    state.data[index].tableCount = tableCount ? tableCount + 1 : 1
  },
  ADD_PROJECT(state, { data, cb }) {
    const count = ++state.count
    state.data.push({ ...data, id: count })
    const info = setProjectFolder(state.data, state.count)
    if (typeof cb == 'function') cb(info)
  },
  UPD_PROJECT(state, { data = {}, cb }) {
    if (!data.id) return
    const index = _.indexOf(_.map(state.data, 'id'), data.id)
    state.data[index] = data
    // state.data.push(data)
    const info = setProjectFolder(state.data, state.count)
    if (typeof cb == 'function') cb(info)
  },
  REMOVE_PROJECT_MARK(state, { id, cb }) {
    const { data } = state
    const index = _.indexOf(_.map(data, 'id'), id)
    state.data[index].removeState = true
    const info = setProjectFolder(state.data, state.count)
    if (typeof cb == 'function') cb(info)
  }
}

const actions = {
  FIND_PROJECT_LIST({ commit }) {
    console.info('list:', ipcRenderer)
    ipcRenderer.send('get-project-list')
    const { data, count } = getProjectFolder()
    commit('SET_PROJECT_LIST', { data, count })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
