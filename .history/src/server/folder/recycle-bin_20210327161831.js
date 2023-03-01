import fs from 'fs'
import _ from 'lodash'
import Path from 'path'
import { createFile } from './index'
import { CONFIG_PATH, RECYCLE_FILE_NAME, baseURL } from '../util'

// TODO 获取回收站信息
export function getRecycleBin() {
  const { path } = createFile(RECYCLE_FILE_NAME, null, { data: [], count: 0 })
  try {
    let fileInfo = fs.readFileSync(path, 'utf8')
    return JSON.parse(fileInfo.toString())
  } catch (error) {
    return { error }
  }
}
// TODO 添加回收站信息
export function setRecycleBin(data) {
  const path = Path.join(baseURL, `${CONFIG_PATH}${RECYCLE_FILE_NAME}`)
  try {
    const content = JSON.stringify(data)
    fs.writeFileSync(path, content, 'utf8')
    return { code: 200, msg: '写入成功！' }
  } catch (error) {
    return { code: 400, msg: '写入失败！' }
  }
}
// TODO 删除回收站信息
export function removeRecycleBin(id) {
  let { data, count } = getRecycleBin()
  _.remove(data, item => item.id == id)
  const path = Path.join(baseURL, `${CONFIG_PATH}${RECYCLE_FILE_NAME}`)
  try {
    const content = JSON.stringify({ data, count })
    fs.writeFileSync(path, content, 'utf8')
    return { code: 200, msg: '恢复成功！' }
  } catch (error) {
    return { code: 400, msg: '恢复失败！' }
  }
}
