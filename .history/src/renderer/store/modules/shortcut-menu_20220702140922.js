// import _ from 'lodash'
import { msgSuccess, msgWarning } from 'util'
const { ipcRenderer } = window.require('electron')

const state = { data: [] }

const getters = {
  list: (state) => state.data,
}

const mutations = {
  SET_SHORTCUT_MENU_LIST(state, { data }) {
    state.data = data
  },

  ADD_PROJECT(state, { data, cb }) {
    // const count = ++state.count
    // state.data.push({ ...data, id: count })
    // setProjectFolder({ data: state.data, count: state.count }, cb)
    ipcRenderer.invoke('add-project-folder', data).then((data) => {
      thenProjectFolder(data, cb)
    })
  },
}

const actions = {
  FIND_SHORTCUT_MENU_LIST({ commit }) {
    ipcRenderer.invoke('get-shortcut-menu').then(({ data }) => {
      commit('SET_SHORTCUT_MENU_LIST', { data })
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
function thenProjectFolder({ code, msg }, cb) {
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
