// import { getLineOptions } from 'api/shift-info-api'
import { getProjectFolder, setProjectFolder } from 'assets/script/folder'

const state = {
  data: [],
  count: 0
}

const getters = {
  projectList: state => state.data
}

const mutations = {
  SET_PROJECT_LIST(state, { data, count }) {
    state.data = data
    state.count = count
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
