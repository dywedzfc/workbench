import store from '../../store'

// 热键
export const HOTKEYS = 'hotkey/hotkeys'
// 初始化文件夹
export const INIT_DAILY = 'init/daily'
export const DAILY_IS_HISTORY = 'init/dailyIsHistory'
export const DAILY_HISTORY_TOTAL = 'init/dailyHistoryTotal'
export const DAILY_HISTORY_SHOW_NUMBER = 'init/dailyHistoryShowNumber'
export const INIT_MONTHLY = 'init/monthly'
export const MONTHLY_IS_NUM_RECORD = 'init/monthlyIsNumRecord'
export const PROJECT_TYPE = 'init/projectType'
export const TABLE_PAGE_SIZE = 'init/tablePageSize'
export function requestInitFolder() {
  store.dispatch('init/INIT_FOLDER')
}
export function requestSetDailyIsHistory(value) {
  store.commit('init/SET_DAILY_IS_HISTORY', value)
}
export function requestSetDailyHistoryTotal(value) {
  store.commit('init/SET_DAILY_HISTORY_TOTAL', value)
}
export function requestSetDailyHistoryShowNumber(value) {
  store.commit('init/SET_DAILY_HISTORY_SHOW_NUMBER', value)
}
export function requestSetMonthlyIsNumRecord(value) {
  store.commit('init/SET_MONTHLY_IS_NUMBER_RECORD', value)
}
export function requestSetProjectType(value) {
  store.commit('init/SET_PROJECT_TYPE', value)
}
export function requestSetTablePageSize(value) {
  store.commit('init/SET_TABLE_PAGE_SIZE', value)
}
// 快捷菜单
export const SHORTCUT_MENU_LIST = 'shortcut_menu/list'
export function requestShortcutMenuList() {
  store.dispatch('shortcut_menu/FIND_SHORTCUT_MENU_LIST')
}
export function requestAddShortcutMenu(data, cb) {
  store.commit('shortcut_menu/ADD_SHORTCUT_MENU', { data, cb })
}
export function requestUpdShortcutMenu(data, cb) {
  store.commit('shortcut_menu/UPD_SHORTCUT_MENU', { data, cb })
}
export function requestDelShortcutMenu(id, cb) {
  store.commit('shortcut_menu/DEL_SHORTCUT_MENU', { id, cb })
}
// 项目信息
export const PROJECT_LIST = 'project/list'
export const PROJECT_COUNT = 'project/count'
export const PROJECT_TABLE = 'project/table'
export const PROJECT_OPTIONS = 'project/options'
export const PROJECT_SELECT = 'project/select'
export const PROJECT_TABLE_COUNT = 'project/tableCount'
export function requestProjectList() {
  store.dispatch('project/FIND_PROJECT_LIST')
}
export function requestAddProject(data, cb) {
  store.commit('project/ADD_PROJECT', { data, cb })
}
export function requestUpdProject(data, cb) {
  store.commit('project/UPD_PROJECT', { data, cb })
}
export function requestRemoveProjectMark(id, cb) {
  store.commit('project/REMOVE_PROJECT_MARK', { id, cb })
}
export function requestSetProjectSelectId(id) {
  store.commit('project/SET_PROJECT_SELECT_ID', id)
}
export function requestSetProjectTableCurrentPage(value) {
  store.commit('project/SET_TABLE_CURRENT_PAGE', value)
}
// export function requestSetProjectSelect(item) {
//   store.commit('project/SET_PROJECT_SELECT', item)
// }
export function requestSetProjectTableCount() {
  store.commit('project/SET_PROJECT_TABLE_COUNT')
}

// 项目表文件
export const TABLE_FILE_LIST = 'table_file/list'
export const TABLE_FILE_COUNT = 'table_file/count'
export const TABLE_FILE_TABLE = 'table_file/table'
export const TABLE_FILE_SELECT = 'table_file/select'
export function requestTableFileList(fileName) {
  store.dispatch('table_file/FIND_TABLE_FILE_LIST', fileName)
}
export function requestAddTableItem(data) {
  store.commit('table_file/ADD_TABLE_ITEM', data)
}
export function requestAddTableFile(data, cb) {
  store.commit('table_file/ADD_TABLE_FILE', { data, cb })
}
export function requestUpdTableFile(data, options, cb) {
  store.commit('table_file/UPD_TABLE_FILE', { data, options, cb })
}
export function requestRemoveTableFileMark(id, options, cb) {
  store.commit('table_file/REMOVE_TABLE_FILE_MARK', { id, options, cb })
}

export function requestSetTableFileSelectId(id) {
  store.commit('table_file/SET_TABLE_FILE_SELECT_ID', id)
}
export function requestSetTableFileSelect(item) {
  store.commit('table_file/SET_TABLE_FILE_SELECT', item)
}
export function requestSetTableFileCurrentPage(value) {
  store.commit('table_file/SET_TABLE_FILE_CURRENT_PAGE', value)
}

// 回收站信息
export const RECYCLE_LIST = 'recycle_bin/list'
export const RECYCLE_COUNT = 'recycle_bin/count'
export const RECYCLE_TABLE = 'recycle_bin/table'
export const RECYCLE_SELECT = 'recycle_bin/select'
export function requestRecycleList() {
  store.dispatch('recycle_bin/FIND_RECYCLE_LIST')
}

export function requestRestoreRecycle(id, cb) {
  store.commit('recycle_bin/RESTORE_RECYCLE_ID', { id, cb })
}
export function requestRemoveRecycle(id, cb) {
  store.commit('recycle_bin/REMOVE_RECYCLE_ID', { id, cb })
}
export function requestSetRecycleSelectId(id) {
  store.commit('recycle_bin/SET_RECYCLE_SELECT_ID', id)
}
export function requestSetRecycleTableCurrentPage(value) {
  store.commit('recycle_bin/SET_TABLE_CURRENT_PAGE', value)
}

// 日报信息
export const DAILY_LIST = 'daily/list'
// export const RECYCLE_COUNT = 'recycle_bin/count'
// export const RECYCLE_SELECT = 'recycle_bin/select'
export function requestDailyList(data, cb) {
  store.dispatch('daily/FIND_DAILY_LIST', { data, cb })
}

export function requestAddDailyInfo(data, cb) {
  store.commit('daily/ADD_DAILY_INFO', { data, cb })
}
export function requestUpdDailyInfo(data, cb) {
  store.commit('daily/UPD_DAILY_INFO', { data, cb })
}
export function requestDelDailyInfo(data, cb) {
  store.commit('daily/DEL_DAILY_INFO', { data, cb })
}

// 月报信息
export const MONTHLY_INFO = 'daily/monthly'
export function requestMonthlyInfo(data, cb) {
  store.dispatch('daily/FIND_MONTHLY_LIST', { data, cb })
}

// 发布任务
export const POST_TASK_OPTIONS = 'daily/priority'
export function requestPostTaskInfo(data, cb) {
  store.dispatch('post_task/FIND_POST_TASK_LIST', { data, cb })
}
