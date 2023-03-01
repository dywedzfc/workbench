import _ from 'lodash'
import { getProjectFolder, setProjectFolder } from 'assets/script/folder'
// import { getLineOptions } from 'api/shift-info-api'

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
  ADD_PRJECT(state, item) {
    const count = ++state.count
    state.data.push({ ...item, id: count })
  },
  REMOVE_PROJECT_MARK(state, item) {
    // const count = ++state.count
    // state.data.push({ ...item,})

    const { data } = state
    const index = _.indexOf(_.map(data, 'id'), id)
    state.data[index].removeState = true
    this.$set(this.projectList, index, item)
    this.removePrjectInfo()
    console.info('remove:', id, index)
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
