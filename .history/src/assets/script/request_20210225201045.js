import store from '../../store'

// 项目信息
export const PROJECT_LIST = 'project/list'
export const PROJECT_COUNT = 'project/count'
export const PROJECT_SELECT = 'project/select'
export const PROJECT_TABLE_COUNT = 'project/tableCount'
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
export function requestSetProjectTableCount() {
  store.commit('project/SET_PROJECT_TABLE_COUNT')
}

// 项目表文件
export const TABLE_FILE_LIST = 'table_file/list'
export const TABLE_FILE_COUNT = 'table_file/count'
export const TABLE_FILE_SELECT = 'table_file/select'
export function requestTableFileList(fileName) {
  store.dispatch('table_file/FIND_TABLE_FILE_LIST', fileName)
}
export function requestAddTableFile(data) {
  store.commit('table_file/ADD_TABLE_FILE', data)
}
export function requestUpdTableFile(data, fileName) {
  store.commit('table_file/UPD_TABLE_FILE', { data, fileName })
}

export function requestSetTableFileSelectId(id) {
  store.commit('table_file/SET_TABLE_FILE_SELECT_ID', id)
}
export function requestSetTableFileSelect(item) {
  store.commit('table_file/SET_TABLE_FILE_SELECT', item)
}
