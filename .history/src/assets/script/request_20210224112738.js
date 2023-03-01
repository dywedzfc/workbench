import store from '../../store'

// 站点 options
export const PROJECT_LIST = 'project/list'
export const PROJECT_COUNT = 'project/count'
export function requestProjectList() {
  store.dispatch('project/FIND_PROJECT_LIST')
}
