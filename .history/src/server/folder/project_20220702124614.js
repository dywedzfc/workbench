import fs from 'fs'
import _ from 'lodash'
import Path from 'path'
// import { createFile } from './index'
import { CONFIG_PATH, PROJECT_FILE_NAME, baseURL, createFile } from '../util'
import { initFolder } from './index'

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
// TODO 添加项目信息
export function setProjectFolder(data, count) {
  const path = Path.join(baseURL, `${CONFIG_PATH}${PROJECT_FILE_NAME}`)
  const maxNumber = _.max(_.map(data, 'id')) || 0
  const fileInfo = { data, count: count || maxNumber }
  try {
    fs.writeFileSync(path, JSON.stringify(fileInfo), 'utf8')
    return { code: 200, msg: '录入成功' }
  } catch (error) {
    return { code: 400, msg: '录入失败', error }
  }
}
// TODO 删除项目信息
export function delProjectFolder(id) {
  let { data, count } = getProjectFolder()
  const idList = _.map(data, 'id')
  const index = _.indexOf(idList, id)
  if (index >= 0) data.splice(index, 1)
  const fileInfo = { data, count }
  const path = Path.join(baseURL, `${CONFIG_PATH}${PROJECT_FILE_NAME}`)
  try {
    fs.writeFileSync(path, JSON.stringify(fileInfo), 'utf8')
    return { code: 200, msg: '录入成功' }
  } catch (error) {
    return { code: 400, msg: '录入失败', error }
  }
}
