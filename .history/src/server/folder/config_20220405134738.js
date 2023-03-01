import fs from 'fs'
import { initFolder } from './index'
import { CONFIG_PATH, CONFIG_BASE, createFile } from '../util'

// TODO 获取项目信息
export function getProjectFolder() {
  initFolder(CONFIG_PATH)
  const { path } = createFile(CONFIG_BASE, null, { data: [], count: 0 })
  try {
    let fileInfo = fs.readFileSync(path, 'utf8')
    return JSON.parse(fileInfo.toString())
  } catch (error) {
    return { data: [], count: 0, error }
  }
}
