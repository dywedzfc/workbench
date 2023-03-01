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
  select: state => _.filter(state.data, item => item.id == state.selectId)
}

const mutations = {
  SET_PROJECT_LIST(state, { data, count }) {
    state.data = data
    state.count = count
  },
  ADD_PRJECT(state, item) {
    const count = ++state.count
    state.data.push({ ...item, id: count })
    setProjectFolder(state.data, state.count)
  },
  UPD_PRJECT(state, item) {
    if (item && !item.id) return
    const index = _.indexOf(_.map(state.data, 'id'), item.id)
    console.info('update:', item)
    // state.data.push(item)
    // setProjectFolder(state.data, state.count)
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
