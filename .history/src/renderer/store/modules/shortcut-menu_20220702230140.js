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

  ADD_SHORTCUT_MENU(state, { data, cb }) {
    ipcRenderer.invoke('add-shortcut-menu', data).then((data) => {
      thenShortcutMenu(data, cb)
    })
  },
  UPD_SHORTCUT_MENU(state, { data, cb }) {
    ipcRenderer.invoke('upd-shortcut-menu', data).then((data) => {
      thenShortcutMenu(data, cb)
    })
  },
  DEL_SHORTCUT_MENU(state, { id, cb }) {
    ipcRenderer.invoke('del-shortcut-menu', id).then((data) => {
      thenShortcutMenu(data, cb)
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
function thenShortcutMenu({ code, msg }, cb) {
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
