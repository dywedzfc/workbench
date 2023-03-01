import fs from 'fs'
import _ from 'lodash'
import Path from 'path'
import { initFolder } from './index'
import { CONFIG_PATH, CONFIG_BASE, baseURL, createFile } from '../util'

// TODO 获取配置信息
export function getConfigInfo() {
  initFolder(CONFIG_PATH)
  const { path } = createFile(CONFIG_BASE, null, {})
  try {
    let fileInfo = fs.readFileSync(path, 'utf8')
    return JSON.parse(fileInfo.toString())
  } catch (error) {
    return { error }
  }
}
// TODO 修改配置信息
export function setConfigInfo(data) {
  const path = Path.join(baseURL, `${CONFIG_PATH}${CONFIG_BASE}`)
  try {
    fs.writeFileSync(path, JSON.stringify(data), 'utf8')
    return { code: 200, msg: '录入成功' }
  } catch (error) {
    return { code: 400, msg: '录入失败', error }
  }
}
