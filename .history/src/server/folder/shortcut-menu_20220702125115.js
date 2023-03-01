import fs from 'fs'
// import _ from 'lodash'
import Path from 'path'
// import { createFile } from './index'
import { CONFIG_PATH, SHORTCUT_MENU_FILE_NAME, baseURL, createFile } from '../util'
import { initFolder } from './index'

// TODO 获取项目信息
export function getShortcutMenu() {
  initFolder(CONFIG_PATH)
  const { path } = createFile(SHORTCUT_MENU_FILE_NAME, null, {
    data: [
      { id: 1656736457356, title: '日报', icon: 'el-icon-tickets', operate: 0, href: '/daily' },
      { id: 1656736460023, title: '月报', icon: 'el-icon-date', operate: 0, href: '/monthly' },
      { id: 1656736461314, title: '项目', icon: 'el-icon-folder', operate: 0, href: '/jkzsl/list' },
    ],
  })
  try {
    let fileInfo = fs.readFileSync(path, 'utf8')
    return JSON.parse(fileInfo.toString())
  } catch (error) {
    return { data: [], count: 0, error }
  }
}

// TODO 添加项目信息
export function setShortcutMenu(data) {
  const path = Path.join(baseURL, `${CONFIG_PATH}${SHORTCUT_MENU_FILE_NAME}`)
  try {
    fs.writeFileSync(path, JSON.stringify({ data }), 'utf8')
    return { code: 200, msg: '录入成功' }
  } catch (error) {
    return { code: 400, msg: '录入失败', error }
  }
}
