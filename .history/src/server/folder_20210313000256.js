import fs from 'fs'
import _ from 'lodash'
import Path from 'path'
// const fs = require('fs')

const baseURL = process.env.NODE_ENV === 'production' ? `${__dirname}/../../../../` : 'src/'
// console.info('p-path:', process.env.NODE_ENV)

const CONFIG_PATH = `workbench.config/`
const PROJECT_FILE_NAME = 'project-config.ini'

// TODO 判断重复文件夹
export function hasRepeatFolder(fileName) {
  if (!fileName) return { code: 400, msg: '文件名为空' }
  const projectNameList = fs.readdirSync(Path.join(baseURL, `${CONFIG_PATH}`))
  const count = _.filter(projectNameList, item => item == fileName)
  console.info('data-folder:', projectNameList, count)
  if (count.length) return { code: 301, msg: '文件已存在' }
  return { code: 300, msg: '文件不存在' }
}
export function rename(oldPath, newPath) {
  if (!oldPath) return { code: 400, mag: '旧路径为空' }
  if (!newPath) return { code: 400, mag: '新路径为空' }
  // const projectFile = Path.join(baseURL, `${CONFIG_PATH}`)
  try {
    const opath = Path.join(baseURL, `${CONFIG_PATH + oldPath}`)
    const npath = Path.join(baseURL, `${CONFIG_PATH + newPath}`)
    fs.renameSync(opath, npath)
    return { code: 301, msg: '文件已存在' }
  } catch (error) {}
  console.info('data-folder:', projectFile, count)
  return { code: 300, msg: '文件不存在' }
}

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
    return { code: 400, msg: '录入失败', error }
  }
}

// TODO 获取表文件信息
export function getProjectTableFiles(folderName) {
  if (!folderName) return {}
  const projectFile = Path.join(baseURL, `${CONFIG_PATH}${folderName}`)
  // const path = `${baseURL}config/`
  // const filePath = `${path}${fileName}`
  const fileList = []
  if (!fs.existsSync(projectFile)) fs.mkdirSync(projectFile)
  const fileNameList = fs.readdirSync(projectFile)
  for (let i = 0; i < fileNameList.length; i++) {
    const fileName = fileNameList[i]
    const path = Path.join(baseURL, `${CONFIG_PATH}${folderName}/${fileName}`)
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
    } catch (error) {
      // return { error }
      console.error(error)
    }
  }
  return { data: fileList, count: fileList.length }
  // return { data: [] }
}
// TODO 添加表文件信息
export function setProjectTableFiles(data, options) {
  if (!data || !data.fileName) return { code: 400, msg: '文件名丢失' }
  console.info('set-table:', data.fileName, options.fileName)
  const fileName = `table-${data.fileName}-config.ini`
  const tableFile = Path.join(baseURL, `${CONFIG_PATH}${options.fileName}/${fileName}`)
  // const path = `${baseURL}config/`
  // const filePath = `${path}${options.fileName}/${fileName}`
  try {
    fs.writeFileSync(tableFile, JSON.stringify(data), 'utf8')
    // msgSuccess('录入成功')
    return { code: 200, msg: '录入成功' }
  } catch (error) {
    // msgWarning('录入失败')
    return { code: 400, msg: '录入失败' }
  }
}
