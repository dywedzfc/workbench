import { getLineOptions } from 'api/shift-info-api'

const state = {
  options: []
}

const getters = {
  options: state => state.options
  // marital: state => state.marital,
  // militaryTransfer: state => state.militaryTransfer,
  // whether: state => state.whether,
  // education: state => state.education,
  // educationType: state => state.educationType,
  // department: state => state.department
}

const mutations = {
  SET_LINE_OPTIONS(state, data) {
    state.options = data
  }
}

const actions = {
  FIND_LINE_OPTIONS({ commit }) {
    getLineOptions().then(data => {
      commit('SET_LINE_OPTIONS', data)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
