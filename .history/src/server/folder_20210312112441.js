import fs from 'fs'
import _ from 'lodash'
// const fs = require('fs')

const baseURL = process.env.NODE_ENV === 'production' ? `app://./` : 'src/'
// console.info('p-path:', process.env.NODE_ENV)

const CONFIG_PATH = `${baseURL}config/`
const PROJECT_FILE_NAME = 'project-config.json'

// TODO 获取项目信息
export function getProjectFolder() {
  const path = `${CONFIG_PATH}${PROJECT_FILE_NAME}`
  console.info('data:', path)
  try {
    fs.existsSync(path)
    // if (!fs.statSync(CONFIG_PATH).isDirectory()) fs.mkdirSync(CONFIG_PATH)
  } catch (error) {
    return { error: error + '::创建' }
  }
  try {
    fs.accessSync(path)
  } catch (error) {
    try {
      fs.writeFileSync(path, '{}', 'utf8')
      console.log('写入成功')
    } catch (error) {
      console.error(error)
      return { error: error + '::写入' }
    }
  }
  try {
    let fileInfo = fs.readFileSync(path, 'utf8')
    return JSON.parse(fileInfo.toString())
  } catch (error) {
    return { error: error + '::读取' }
  }
}
// TODO 添加项目信息
export function setProjectFolder(data, count) {
  const path = `${CONFIG_PATH}${PROJECT_FILE_NAME}`
  const maxNumber = _.max(_.map(data, 'id')) || 0
  const fileInfo = { data, count: count || maxNumber }
  try {
    fs.writeFileSync(path, JSON.stringify(fileInfo), 'utf8')
    return { code: 200, msg: '录入成功' }
  } catch (error) {
    return { code: 404, msg: '录入失败', error }
  }
}
