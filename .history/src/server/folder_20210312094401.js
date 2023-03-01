import fs from 'fs'
import _ from 'lodash'
import { msgSuccess, msgWarning } from 'util'
// const fs = require('fs')

// const baseURL =
//   process.env.NODE_ENV === 'production' ? '~/Library/Application Support/workbench/' : './'
// console.info('p-path:', process.env.NODE_ENV)

// TODO 获取项目信息
export function getProjectFolder() {
  const path = 'src/config/'
  const fileName = 'project-config.json'
  console.info('data:', path)
  try {
    if (!fs.statSync(path).isDirectory()) fs.mkdirSync(path)
    fs.accessSync(`${path}${fileName}`)
  } catch (error) {
    try {
      fs.writeFileSync(`${path}${fileName}`, '{}', 'utf8')
      console.log('写入成功')
    } catch (error) {
      console.error(error)
    }
  }
  try {
    let fileInfo = fs.readFileSync(`${path}${fileName}`, 'utf8')
    return JSON.parse(fileInfo.toString())
  } catch (error) {
    return {}
  }
}
// TODO 添加项目信息
export function setProjectFolder1(data, count) {
  const path = `src/config/`
  const fileName = 'project-config.json'
  const maxNumber = _.max(_.map(data, 'id')) || 0
  const fileInfo = { data, count: count || maxNumber }
  try {
    // fs.writeFileSync(`${path}${fileName}`, JSON.stringify(fileInfo), 'utf8')
    msgSuccess('录入成功')
    // return { code: 1, msg: '录入成功' }
  } catch (error) {
    msgWarning('录入失败')
    // return { code: 0, msg: '录入失败' }
  }
}
