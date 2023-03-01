import { ipcMain, shell } from 'electron'
import { rename, hasRepeatFolder, initFolder } from '../folder'
import { getConfigInfo, setConfigInfo } from '../folder/config'
// 快捷菜单
import {
  getShortcutMenuList,
  addShortcutMenuItem,
  updShortcutMenuItem,
  removeShortcutMenuItem,
} from '../interface/shortcut-menu.interface'
// 日报
import {
  getDailyInfo,
  addDailyInfo,
  updDailyInfo,
  delDailyInfo,
  getMonthlyInfo,
} from '../interface/daily.interface'
// 项目
import { getProjectList, addProjectItem, updProjectItem } from '../interface/project.interface'
import { getProjectTableFilesName } from '../folder/project-table'
// 项目-文件
import {
  getProjectTableList,
  addProjectTableItem,
  updProjectTableItem,
} from '../interface/project-table.interface'
import { getPostTaskInfo } from '../folder/task'
// 回收站
import {
  getRecycleBinList,
  restoreRecycleBinItem,
  removeRecycleBinItem,
} from '../interface/recycle.interface'

// TODO 打开默认浏览器
ipcMain.handle('open-browser', (event, url) => {
  const newWindow = shell.openExternal(url)
  console.log('command-click:', url, newWindow)
})
// TODO 创建搜索页面
// ipcMain.handle('create-search-window', (event, { url }) => {
//   if (!window.childWindows) window.childWindows = {}
//   if (!window.childWindows.searchWindow)
//     window.childWindows.searchWindow = new BrowserWindow({
//       width: 800,
//       height: 600,
//       frame: false,
//       // parent: win, //win是主窗口
//     })
//   window.childWindows.searchWindow.loadURL(url) //new.html是新开窗口的渲染进程
//   window.childWindows.searchWindow.on('closed', () => {
//     window.childWindows.searchWindow = null
//   })
// })
// TODO 判断文件夹是否重复
ipcMain.handle('has-repeat-folder', (event, { fileName, path }) => {
  return hasRepeatFolder(fileName, path)
})
// TODO 重命名
ipcMain.handle('rename', (event, { oldPath, newPath }) => {
  return rename(oldPath, newPath)
})

/* ************* 初始化文件夹 ************* */
ipcMain.handle('init-folder', () => {
  initFolder()
  return getConfigInfo()
})
ipcMain.handle('get-config', () => {
  return getConfigInfo()
})
ipcMain.handle('set-config', (event, data) => {
  return setConfigInfo(data)
})

/* ************* 快捷菜单 ************* */
ipcMain.handle('get-shortcut-menu', () => {
  return getShortcutMenuList()
})
ipcMain.handle('add-shortcut-menu', (event, data) => {
  return addShortcutMenuItem(data)
})
ipcMain.handle('upd-shortcut-menu', (event, data) => {
  return updShortcutMenuItem(data)
})
ipcMain.handle('remove-shortcut-menu', (event, id) => {
  const state = removeShortcutMenuItem(id)
  return state
})

/* ************* 项目文件 ************* */
// TODO 搜索
ipcMain.handle('get-project-list', () => {
  return getProjectList()
})
// TODO 添加
ipcMain.handle('add-project-folder', (event, data) => {
  return addProjectItem(data)
})
// TODO 修改
ipcMain.handle('upd-project-folder', (event, data) => {
  return updProjectItem(data)
})

/* ************* 项目表文件 ************* */
// TODO 搜索
ipcMain.handle('get-table-folder', (event, folderName) => {
  return getProjectTableList(folderName)
})
// TODO 获取项目表文件数量
ipcMain.handle('get-table-folder-count', (event, folderName) => {
  const table = getProjectTableFilesName(folderName)
  if (table.code == 200) table.data = table.data.length
  return table
})
// TODO 添加
ipcMain.handle('add-table-folder', (event, data) => {
  return addProjectTableItem(data)
})
// TODO 修改
ipcMain.handle('upd-table-folder', (event, data) => {
  return updProjectTableItem(data)
})

/* ************* 回收站文件 ************* */
// TODO 获取
ipcMain.handle('get-recycle-bin', () => {
  return getRecycleBinList()
})
// TODO 恢复
ipcMain.handle('restore-recycle-bin', (event, data) => {
  return restoreRecycleBinItem(data)
})
// TODO 删除
ipcMain.handle('remove-recycle-bin', (event, data) => {
  const state = removeRecycleBinItem(data)
  return state
})

/* ************* 日报文件 ************* */
// TODO 按月分获取
ipcMain.handle('get-daily-list', (event, data) => {
  return getDailyInfo(data)
})
ipcMain.handle('add-daily-info', (event, data) => {
  return addDailyInfo(data)
})
ipcMain.handle('upd-daily-info', (event, { data, query }) => {
  return updDailyInfo(data, query)
})
ipcMain.handle('del-daily-info', (event, query) => {
  return delDailyInfo(query)
})

// TODO 按年分获取
ipcMain.handle('get-monthly-list', (event, data) => {
  return getMonthlyInfo(data)
})

/* ************* 发布任务 ************* */
ipcMain.handle('get-post-task-list', (event, data) => {
  console.info('post-task:')
  return getPostTaskInfo(data)
})
