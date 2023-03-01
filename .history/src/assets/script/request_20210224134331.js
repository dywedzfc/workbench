import store from '../../store'

// 项目信息
export const PROJECT_LIST = 'project/list'
export const PROJECT_COUNT = 'project/count'
export function requestProjectList() {
  store.dispatch('project/FIND_PROJECT_LIST')
}
export function requestAddProject(item) {
  store.commit('project/ADD_PRJECT', item)
}
export function requestUpdProject(id, item) {
  store.commit('project/UPD_PRJECT', id, item)
}
export function requestRemoveProjectMark(id) {
  store.commit('project/REMOVE_PROJECT_MARK', id)
}
