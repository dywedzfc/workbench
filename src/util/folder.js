export const CONFIG_PATH = `workbench.config/` // 配置文件路径
export const CONFIG_BASE = 'config.ini' // 项目文件
export const SHORTCUT_MENU_FILE_NAME = 'shortcut-menu.config.ini' // 项目文件
export const DAILY_PATH = `daily.config/` // 日报文件路径
export const RECYCLE_FILE_NAME = 'recycle-bin.config.ini' // 回收站文件
export const PROJECT_FILE_NAME = 'project.config.ini' // 项目文件
export const TABLE_FILE_NAME = '{fileName}.table.ini' // 项目表文件
export const DAILY_FILE_NAME = '{fileName}.daily.ini' // 日报文件
export const TASK_FILE_NAME = 'task.ini' // 任务文件

export function recycleBinItem(title, path, mark, type, fileId) {
  const recycleData = {}
  recycleData.fileId = fileId
  recycleData.title = title
  recycleData.path = path
  recycleData.mark = mark
  recycleData.type = type
  return recycleData
}
