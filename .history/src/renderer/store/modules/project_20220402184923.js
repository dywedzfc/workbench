import _ from 'lodash'
// import { ipcRenderer } from 'electron'
// import { setProjectFolder } from 'assets/script/folder' // getProjectFolder,
import { msgSuccess, msgWarning } from 'util'
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
  options: state => {
    const list = _.filter(state.data, item => !item.removeState)
    return _.map(list, item => {
      const data = { value: item.id, label: item.title }
      // let label = item.title
      // if (item.abbreviation && item.abbreviation.length) label += `（简称：${item.abbreviation}）`
      if (item.abbreviation && item.abbreviation.length) data.title = item.abbreviation
      return { value: item.id, label: item.title, title: item.abbreviation || '' }
    })
  },
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
  // SET_PROJECT_SELECT(state, item) {
  //   state.select = item
  // },
  SET_PROJECT_LIST(state, data) {
    state.data = data
    // state.count = count
  },
  SET_PROJECT_TABLE_COUNT(state) {
    const selectId = state.selectId
    const index = _.indexOf(_.map(state.data, 'id'), selectId)
    const tableCount = state.data[index].tableCount
    state.data[index].tableCount = tableCount ? tableCount + 1 : 1
  },
  ADD_PROJECT(state, { data, cb }) {
    // const count = ++state.count
    // state.data.push({ ...data, id: count })
    // setProjectFolder({ data: state.data, count: state.count }, cb)
    ipcRenderer.invoke('add-project-folder', data).then(data => {
      thenProjectFolder(data, cb)
    })
  },
  UPD_PROJECT(state, { data = {}, cb }) {
    if (!data.id) return
    // const index = _.indexOf(_.map(state.data, 'id'), data.id)
    // state.data[index] = data
    // setProjectFolder({ data: state.data, count: state.count }, cb)
    ipcRenderer.invoke('upd-project-folder', data).then(data => {
      thenProjectFolder(data, cb)
    })
  },
  REMOVE_PROJECT_MARK(state, { id, cb }) {
    // const { data } = state
    // const index = _.indexOf(_.map(data, 'id'), id)
    const data = state.data[_.indexOf(_.map(state.data, 'id'), id)]
    data.removeState = true
    ipcRenderer.invoke('upd-project-folder', data).then(data => {
      thenProjectFolder(data, cb)
    })
    // setProjectFolder({ data: state.data, count: state.count }, cb)
  }
}

const actions = {
  INIT_FOLDER() {
    ipcRenderer.invoke('init-folder').then(data => {
      console.info('data:', data)
    })
  },
  FIND_PROJECT_LIST({ commit }) {
    ipcRenderer.invoke('get-project-list').then(({ data }) => {
      commit('SET_PROJECT_LIST', data)
    })
  }
}
// TODO 监听添加项目配置文件
// function setProjectFolder(content, cb) {
//   ipcRenderer.invoke('set-project-folder', content).then(({ code, msg }) => {
//     if (typeof cb == 'function') cb({ code, msg })
//     else {
//       if (code == 200) msgSuccess(msg)
//       else msgWarning(msg)
//     }
//   })
// }
function thenProjectFolder({ code, msg }, cb) {
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
