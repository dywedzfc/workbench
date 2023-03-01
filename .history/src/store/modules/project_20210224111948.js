// import { getLineOptions } from 'api/shift-info-api'

const state = {
  data: []
}

const getters = {
  projectList: state => state.data
}

const mutations = {
  SET_PROJECT_LIST(state, data) {
    state.data = data
  }
}

const actions = {
  FIND_PROJECT_LIST({ commit }) {
    // getLineOptions().then(data => {
    //   commit('SET_LINE_OPTIONS', data)
    // })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
