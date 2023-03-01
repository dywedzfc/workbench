import fs from 'fs'
import _ from 'lodash'
import Path from 'path'
import { createFile } from './index'
import { CONFIG_PATH, TABLE_FILE_NAME, baseURL } from '../util'

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
