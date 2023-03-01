import _ from 'lodash'
import { getProjectFolder, setProjectFolder } from 'assets/script/folder'
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
  ADD_PROJECT(state, item) {
    const count = ++state.count
    state.data.push({ ...item, id: count })
    setProjectFolder(state.data, state.count)
  },
  UPD_PROJECT(state, item = {}) {
    if (!item.id) return
    const index = _.indexOf(_.map(state.data, 'id'), item.id)
    state.data[index] = item
    console.info('update:', item)
    // state.data.push(item)
    setProjectFolder(state.data, state.count)
  },
  REMOVE_PROJECT_MARK(state, id) {
    const { data } = state
    const index = _.indexOf(_.map(data, 'id'), id)
    state.data[index].removeState = true
    setProjectFolder(state.data, state.count)
  }
}

const actions = {
  FIND_PROJECT_LIST({ commit }) {
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
