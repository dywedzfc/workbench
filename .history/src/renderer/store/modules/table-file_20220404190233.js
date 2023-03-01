import _ from 'lodash'
// import { getProjectFiles, setProjectFiles } from 'assets/script/folder'
import { msgSuccess, msgWarning } from 'util'
// import { getLineOptions } from 'api/shift-info-api'
const { ipcRenderer } = window.require('electron')

const state = {
  data: [],
  count: 0,
  selectId: '',
}

const getters = {
  list: (state) => state.data,
  count: (state) => state.count,
  select: (state) => {
    const newList = _.filter(state.data, (item) => item.id == null)
    if (newList.length) return newList[0]
    const list = _.filter(state.data, (item) => item.id == state.selectId)
    if (list.length) return list[0]
    return {}
  },
}

const mutations = {
  SET_TABLE_FILE_CURRENT_PAGE(state, value) {
    state.table.currentPage = value
  },
  SET_TABLE_FILE_PAGE_SIZE(state, value) {
    state.table.pageSize = value
  },
  SET_TABLE_FILE_SELECT_ID(state, id) {
    state.selectId = id
  },
  SET_TABLE_FILE_SELECT(state, item) {
    state.select = item
  },
  SET_TABLE_FILE_LIST(state, data) {
    state.data = data
    // state.count = count
  },
  ADD_TABLE_ITEM(state, data) {
    state.data.push(data)
  },
  ADD_TABLE_FILE(state, { data, cb }) {
    // setProjectFolder(state.data, state.count)
    ipcRenderer.invoke('add-table-folder', data).then((data) => {
      thenProjectTableFolder(data, cb)
    })
  },
  UPD_TABLE_FILE(state, { data, cb } = {}) {
    if (!data.id) return
    // const index = _.indexOf(_.map(state.data, 'id'), data.id)
    // state.data[index] = data
    // setTableFolder(data, options, cb)
    // const info = setProjectFiles(data, options)
    // if (typeof cb == 'function') cb(info)
    ipcRenderer.invoke('upd-table-folder', data).then((data) => {
      thenProjectTableFolder(data, cb)
    })
  },
  REMOVE_TABLE_FILE_MARK(state, { id, cb }) {
    // const { data } = state
    // const index = _.indexOf(_.map(data, 'id'), id)
    // state.data[index].removeState = true
    // setTableFolder(state.data[index], options, cb)
    // setProjectFolder(state.data, state.count)
    const data = state.data[_.indexOf(_.map(state.data, 'id'), id)]
    data.removeState = true
    ipcRenderer.invoke('upd-table-folder', data).then((data) => {
      thenProjectTableFolder(data, cb)
    })
  },
}

const actions = {
  FIND_TABLE_FILE_LIST({ commit }, fileName) {
    ipcRenderer.invoke('get-table-folder', fileName).then(({ data }) => {
      commit('SET_TABLE_FILE_LIST', data)
    })
  },
}
// TODO 监听添加项目表文件配置文件
// function setTableFolder(content, options, cb) {
//   ipcRenderer.invoke('set-table-folder', { content, options }).then(({ code, msg }) => {
//     if (typeof cb == 'function') cb({ code, msg })
//     else {
//       if (code == 200) msgSuccess(msg)
//       else msgWarning(msg)
//     }
//   })
// }
function thenProjectTableFolder({ code, msg }, cb) {
  if (typeof cb == 'function') cb({ code, msg })
  else {
    if (code == 200) msgSuccess(msg)
    else msgWarning(msg)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
