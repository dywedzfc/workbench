import _ from 'lodash'
import fs from 'fs'
// import { msgSuccess, msgWarning } from 'util'
// const fs = require('fs')

// const baseURL =
//   process.env.NODE_ENV === 'production' ? '~/Library/Application Support/workbench/' : './'
// console.info('p-path:', process.env.NODE_ENV)

// TODO 获取项目信息
export function getProjectFolder() {
  const path = 'src/config/' // `${baseURL}config/`
  const fileName = 'project-config.json'
  console.info('data:', path)
  try {
    if (!hasExists(path)) fs.mkdirSync(path)
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
