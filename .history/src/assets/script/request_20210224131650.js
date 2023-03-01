import store from '../../store'

// 项目信息
export const PROJECT_LIST = 'project/list'
export const PROJECT_COUNT = 'project/count'
export function requestProjectList() {
  store.dispatch('project/FIND_PROJECT_LIST')
}
export function requestAddProject() {
  store.dispatch('project/ADD_PRJECT_ITEM')
}
