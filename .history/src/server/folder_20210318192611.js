import fs from 'fs'
import _ from 'lodash'
import Path from 'path'
import { CONFIG_PATH, PROJECT_FILE_NAME, TABLE_FILE_NAME, RECYCLE_FILE_NAME } from '../util/folder'
// const { CONFIG_PATH, PROJECT_FILE_NAME, TABLE_FILE_NAME } = require('../util/folder')
// const fs = require('fs')

const baseURL = process.env.NODE_ENV === 'production' ? `${__dirname}/../../../../` : 'src/'

// const CONFIG_PATH = `workbench.config/`
// const PROJECT_FILE_NAME = 'project-config.ini'
// const TABLE_FILE_NAME = 'table-{fileName}-config.ini'

// TODO 判断重复文件夹
export function hasRepeatFolder(fileName, path = '') {
  if (!fileName) return { code: 400, msg: '文件名为空' }
  const projectNameList = fs.readdirSync(Path.join(baseURL, `${CONFIG_PATH + path}`))
  const count = _.filter(projectNameList, item => item == fileName)
  if (count.length) return { code: 301, msg: '文件已存在' }
  return { code: 300, msg: '文件不存在' }
}
// TODO 替换文件名
export function rename(oldPath, newPath) {
  if (!oldPath) return { code: 400, mag: '旧路径为空' }
  if (!newPath) return { code: 400, mag: '新路径为空' }
  try {
    const opath = Path.join(baseURL, `${CONFIG_PATH + oldPath}`)
    const npath = Path.join(baseURL, `${CONFIG_PATH + newPath}`)
    if (!fs.existsSync(opath)) return { code: 404, msg: '文件未创建' }
    fs.renameSync(opath, npath)
    return { code: 200, msg: '替换成功' }
  } catch (error) {
    return { code: 400, msg: '替换失败' }
  }
}
// TODO 删除文件
export function removeFile(pathName) {
  if (!pathName) return { code: 400, msg: '文件名为空' }
  const path = Path.join(baseURL, `${CONFIG_PATH + pathName}`)
  try {
    fs.accessSync(path)
  } catch (error) {
    return { code: 300, msg: '文件不存在' }
  }
  try {
    fs.unlinkSync(path)
    return { code: 200, msg: '删除成功' }
  } catch (error) {
    return { code: 400, msg: '删除失败', error }
  }
}
// TODO 删除文件夹
export function removeFolder(pathName) {
  if (!pathName) return { code: 400, msg: '文件名为空' }
  const path = Path.join(baseURL, `${CONFIG_PATH + pathName}`)
  console.info('remove:', path)
  try {
    fs.accessSync(path)
  } catch (error) {
    return { code: 300, msg: '文件不存在' }
  }
  try {
    fs.rmdirSync(path)
    return { code: 200, msg: '删除成功' }
  } catch (error) {
    return { code: 400, msg: '删除失败', error }
  }
}

// TODO 获取项目信息
export function getProjectFolder() {
  const configFile = Path.join(baseURL, CONFIG_PATH)
  // const path = Path.join(baseURL, `${CONFIG_PATH}${PROJECT_FILE_NAME}`)
  try {
    if (!fs.existsSync(configFile)) fs.mkdirSync(configFile)
  } catch (error) {
    console.error(error)
  }
  const { path } = createFile(PROJECT_FILE_NAME, null, { data: [], count: 0 })
  try {
    let fileInfo = fs.readFileSync(path, 'utf8')
    return JSON.parse(fileInfo.toString())
  } catch (error) {
    return { data: [], count: 0, error }
  }
}
export function hasProjectNameFolder(folderName) {
  if (!folderName) return { code: 400, msg: '文件名为空' }
  const projectFile = Path.join(baseURL, `${CONFIG_PATH}${folderName}`)
  try {
    if (fs.existsSync(projectFile)) return { code: 301, data: '文件已存在' }
    return { code: 300, data: '文件不存在' }
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
// TODO 删除项目信息
export function delProjectFolder(id) {
  let { data, count } = getProjectFolder()
  const idList = _.map(data, 'id')
  const index = _.indexOf(idList, id)
  if (index >= 0) data.splice(index, 1)
  console.info('index:', id, index, data, idList)
  const fileInfo = { data, count }
  const path = Path.join(baseURL, `${CONFIG_PATH}${PROJECT_FILE_NAME}`)
  try {
    fs.writeFileSync(path, JSON.stringify(fileInfo), 'utf8')
    return { code: 200, msg: '录入成功' }
  } catch (error) {
    return { code: 400, msg: '录入失败', error }
  }
}

// TODO 获取项目表文件名称
export function getProjectTableFilesName(folderName) {
  if (!folderName) return { code: 400, msg: '文件名为空' }
  const projectFile = Path.join(baseURL, `${CONFIG_PATH}${folderName}`)
  try {
    const tableName = fs.readdirSync(projectFile)
    return { code: 200, data: tableName }
  } catch (error) {
    return { code: 400, msg: '无数据' }
  }
}

// TODO 获取项目表文件信息
export function getProjectTableFiles(folderName) {
  if (!folderName) return {}
  const projectFile = Path.join(baseURL, `${CONFIG_PATH}${folderName}`)
  const fileList = []
  if (!fs.existsSync(projectFile)) fs.mkdirSync(projectFile)
  const fileNameList = fs.readdirSync(projectFile)
  for (let i = 0; i < fileNameList.length; i++) {
    const fileName = fileNameList[i]
    // const path = Path.join(baseURL, `${CONFIG_PATH}${folderName}/${fileName}`)
    const { path } = createFile(fileName, `${folderName}/${fileName}`)
    try {
      const fileInfo = fs.readFileSync(path, 'utf8')
      const data = JSON.parse(fileInfo.toString())
      fileList.push(data)
    } catch (error) {
      console.error(error)
    }
  }
  return { data: fileList, count: fileList.length }
  // return { data: [] }
}
// 获取指定项目表文件
export function getProjectTableFilesItem(pathName) {
  const [folderName, fileName] = pathName.split('/')
  // const [fileName] = fileAllName.split('.')
  // const path = Path.join(baseURL, `${CONFIG_PATH}${folderName}/${fileName}`)
  const { path } = createFile(fileName, `${folderName}/${fileName}`)
  try {
    const fileInfo = fs.readFileSync(path, 'utf8')
    return JSON.parse(fileInfo.toString())
  } catch (error) {
    console.error(error)
  }
}
// TODO 添加项目表文件信息
export function setProjectTableFiles(data, options) {
  if (!data || !data.fileName) return { code: 400, msg: '文件名丢失' }
  const fileName = TABLE_FILE_NAME.replace('{fileName}', data.fileName) //`table-${data.fileName}-config.ini`
  const tableFile = Path.join(baseURL, `${CONFIG_PATH}${options.fileName}/${fileName}`)
  try {
    fs.writeFileSync(tableFile, JSON.stringify(data), 'utf8')
    return { code: 200, msg: '录入成功' }
  } catch (error) {
    return { code: 400, msg: '录入失败' }
  }
}

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

/**
 TODO 创建文件
 *
 * @param {String} fileName 文件名称
 * @param {String|null} pathFileName 路径
 * @param {Object} [defaultContent={}] 创建文件默认内容
 * @param {true} create
 * @return {*} 完整路径
 */
function createFile(fileName, pathFileName, defaultContent = {}) {
  const path = Path.join(baseURL, `${CONFIG_PATH}${pathFileName || fileName}`)
  const state = {}
  try {
    fs.accessSync(path)
  } catch (error) {
    try {
      const content = JSON.stringify(defaultContent)
      fs.writeFileSync(path, content, 'utf8')
      console.log(`"${fileName}"文件，写入成功！`)
    } catch (error) {
      console.error(`"${fileName}"文件，写入失败！\n\t错误信息：(${error})`)
    }
  }
  return { path, state }
}