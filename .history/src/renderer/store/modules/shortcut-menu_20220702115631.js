import _ from 'lodash'
import { msgSuccess, msgWarning } from 'util'
const { ipcRenderer } = window.require('electron')

const state = {
  data: [],
  count: 0,
}

const getters = {
  list: (state) => state.data,
  count: (state) => state.count,
}

const mutations = {
  SET_TABLE_CURRENT_PAGE(state, value) {
    state.table.currentPage = value
  },
  SET_RECYCLE_SELECT_ID(state, id) {
    state.selectId = id
  },
  SET_SHORTCUT_MENU_LIST(state, { data, count }) {
    state.data = data
    state.count = count
  },
  RESTORE_RECYCLE_ID(state, { id, cb }) {
    ipcRenderer.invoke('restore-recycle-bin', id).then(({ code, msg }) => {
      if (typeof cb == 'function') cb({ code, msg })
      else {
        if (code == 200) msgSuccess(msg)
        else msgWarning(msg)
      }
    })
  },
  REMOVE_RECYCLE_ID(state, { id, cb }) {
    ipcRenderer.invoke('remove-shortcut-menu', id).then(({ code, msg }) => {
      if (typeof cb == 'function') cb({ code, msg })
      else {
        if (code == 200) msgSuccess(msg)
        else msgWarning(msg)
      }
    })
  },
}

const actions = {
  FIND_RECYCLE_LIST({ commit }) {
    ipcRenderer.invoke('get-shortcut-menu').then(({ data, count }) => {
      commit('SET_RECYCLE_LIST', { data, count })
    })
  },
}
// TODO 监听添加项目配置文件
// function setRecycleBin(content, cb) {
//   ipcRenderer.invoke('set-recycle-bin', content).then(({ code, msg }) => {
//     if (typeof cb == 'function') cb({ code, msg })
//     else {
//       if (code == 200) msgSuccess(msg)
//       else msgWarning(msg)
//     }
//   })
// }

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
