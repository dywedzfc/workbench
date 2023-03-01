import _ from 'lodash'
import { getProjectFiles, setProjectFiles } from 'assets/script/folder'
// import { getLineOptions } from 'api/shift-info-api'

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
  }
}

const mutations = {
  SET_TABLE_FILE_SELECT_ID(state, id) {
    state.selectId = id
  },
  SET_TABLE_FILE_SELECT(state, item) {
    state.select = item
  },
  SET_TABLE_FILE_LIST(state, { data, count }) {
    console.info('data-file:', data, count)
    state.data = data
    state.count = count
  },
  ADD_TABLE_FILE(state, data) {
    state.data.push(data)
    // setProjectFolder(state.data, state.count)
  },
  UPD_TABLE_FILE(state, { data, options } = {}) {
    if (!data.id) return
    const index = _.indexOf(_.map(state.data, 'id'), data.id)
    state.data[index] = data
    // console.info('update:', data)
    setProjectFiles(data, options)
  },
  REMOVE_TABLE_FILE_MARK(state, id) {
    const { data } = state
    const index = _.indexOf(_.map(data, 'id'), id)
    state.data[index].removeState = true
    // setProjectFolder(state.data, state.count)
  }
}

const actions = {
  FIND_TABLE_FILE_LIST({ commit }, fileName) {
    // const { data, count } = getProjectFiles(fileName)
    const data = getProjectFiles(fileName)
    commit('SET_TABLE_FILE_LIST', { data, count: 0 })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
