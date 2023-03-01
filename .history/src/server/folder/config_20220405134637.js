import fs from 'fs'
import { initFolder } from './index'
import { CONFIG_PATH, PROJECT_FILE_NAME, createFile } from '../util'

// TODO 获取项目信息
export function getProjectFolder() {
  initFolder(CONFIG_PATH)
  const { path } = createFile(PROJECT_FILE_NAME, null, { data: [], count: 0 })
  try {
    let fileInfo = fs.readFileSync(path, 'utf8')
    return JSON.parse(fileInfo.toString())
  } catch (error) {
    return { data: [], count: 0, error }
  }
}
