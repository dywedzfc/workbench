import store from '../../store'

// 项目信息
export const PROJECT_LIST = 'project/list'
export const PROJECT_COUNT = 'project/count'
export const PROJECT_SELECT = 'project/select'
export function requestProjectList() {
  store.dispatch('project/FIND_PROJECT_LIST')
}
export function requestAddProject(item) {
  store.commit('project/ADD_PROJECT', item)
}
export function requestUpdProject(item) {
  store.commit('project/UPD_PROJECT', item)
}
export function requestRemoveProjectMark(id) {
  store.commit('project/REMOVE_PROJECT_MARK', id)
}
export function requestSetProjectSelectId(id) {
  store.commit('project/SET_PROJECT_SELECT_ID', id)
}
export function requestSetProjectSelect(item) {
  store.commit('project/SET_PROJECT_SELECT', item)
}

// 项目表文件
export const TABLE_FILE_LIST = 'tableFile/list'
export const TABLE_FILE_COUNT = 'tableFile/count'
export const TABLE_FILE_SELECT = 'tableFile/select'
export function requestTableFileList(fileName) {
  store.dispatch('project/FIND_TABLE_FILE_LIST', fileName)
}
