// import { getLineOptions } from 'api/shift-info-api'
import { getProjectFolder, setProjectFolder } from 'assets/script/folder'

const state = {
  data: [],
  count: 0
}

const getters = {
  list: state => state.data,
  count: state => state.count
}

const mutations = {
  SET_PROJECT_LIST(state, { data, count }) {
    state.data = data
    state.count = count
  },
  ADD_PRJECT_ITEM(state, item) {
    const count = ++state.count
    state.data.push({ ...item, id: count })
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
