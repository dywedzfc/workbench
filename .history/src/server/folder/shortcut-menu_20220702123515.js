import fs from 'fs'
import _ from 'lodash'
import Path from 'path'
// import { createFile } from './index'
import { CONFIG_PATH, SHORTCUT_MENU_FILE_NAME, baseURL, createFile } from '../util'
import { initFolder } from './index'

// TODO 获取项目信息
export function getProjectFolder() {
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
