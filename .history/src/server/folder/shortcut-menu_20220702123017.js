import fs from 'fs'
import _ from 'lodash'
import Path from 'path'
// import { createFile } from './index'
import { CONFIG_PATH, SHORTCUT_MENU_FILE_NAME, baseURL, createFile } from '../util'
import { initFolder } from './index'

// TODO 获取项目信息
export function getProjectFolder() {
  initFolder(CONFIG_PATH)
  const { path } = createFile(SHORTCUT_MENU_FILE_NAME, null, { data: [], count: 0 })
  try {
    let fileInfo = fs.readFileSync(path, 'utf8')
    return JSON.parse(fileInfo.toString())
  } catch (error) {
    return { data: [], count: 0, error }
  }
}
