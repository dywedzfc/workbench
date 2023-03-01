import fs from 'fs'
import _ from 'lodash'
import Path from 'path'
// const fs = require('fs')

const baseURL = process.env.NODE_ENV === 'production' ? `${__dirname}/../../../../` : 'src/'
// console.info('p-path:', process.env.NODE_ENV)

const CONFIG_PATH = `workbench.config/`
const PROJECT_FILE_NAME = 'project-config.ini'

// TODO 获取项目信息
export async function getProjectFolder() {
  const configFile = Path.join(baseURL, CONFIG_PATH)
  const path = Path.join(baseURL, `${CONFIG_PATH}${PROJECT_FILE_NAME}`)
  console.info('data:', path)
  try {
    if (!fs.existsSync(configFile)) fs.mkdirSync(configFile)
    fs.accessSync(path)
  } catch (error) {
    try {
      fs.writeFileSync(path, '{}', 'utf8')
      console.log('写入成功')
    } catch (error) {
      console.error(error)
    }
  }
  try {
    let fileInfo = fs.readFileSync(path, 'utf8')
    return JSON.parse(fileInfo.toString())
  } catch (error) {
    return { error }
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
    return { code: 404, msg: '录入失败', error }
  }
}

// TODO 获取表文件信息
export function getProjectTableFiles(fileName) {
  const projectFile = Path.join(baseURL, `${CONFIG_PATH}${fileName}`)
  // const path = `${baseURL}config/`
  // const filePath = `${path}${fileName}`
  const fileList = []
  if (!fs.existsSync(projectFile)) fs.mkdirSync(projectFile)
  const fileNameList = fs.readdirSync(projectFile)
  console.info('project-list:', fileNameList)
  for (let i = 0; i < fileNameList.length; i++) {
    const fileName = fileNameList[i]
    const path = Path.join(baseURL, `${CONFIG_PATH}${fileName}/${fileName}`)
    // const path = `${filePath}/${fileName}`
    try {
      fs.accessSync(path)
    } catch (error) {
      try {
        fs.writeFileSync(path, '{}', 'utf8')
        console.log('写入成功')
      } catch (error) {
        console.error(error)
      }
      // fs.writeFile(path, '{}', 'utf8', function(error) {
      //   if (error) return false
      //   console.log('写入成功')
      // })
    }
    try {
      const fileInfo = fs.readFileSync(path, 'utf8')
      const data = JSON.parse(fileInfo.toString())
      // data.fileName = fileName
      fileList.push(data)
      console.info('get-pt-table:', data)
      return { data: fileList }
    } catch (error) {
      return { error }
    }
  }
  return { data: [] }
}
// TODO 添加表文件信息
export function setProjectFiles(data, options) {
  if (!data || !data.fileName) return { code: 404, msg: '文件名丢失' }, undefined
  const path = `${baseURL}config/`
  const fileName = `table-${data.fileName}-config.json`
  const filePath = `${path}${options.fileName}/${fileName}`
  try {
    fs.writeFileSync(filePath, JSON.stringify(data), 'utf8')
    msgSuccess('录入成功')
    return { code: 1, msg: '录入成功' }
  } catch (error) {
    msgWarning('录入失败')
    return { code: 0, msg: '录入失败' }
  }
}
