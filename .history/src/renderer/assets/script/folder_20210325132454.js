const fs = window.require('fs')
import _ from 'lodash'
import { msgSuccess, msgWarning } from 'util'

const baseURL =
  process.env.NODE_ENV === 'production' ? '~/Library/Application Support/workbench/' : './'

// TODO 获取项目信息
export function getProjectFolder() {
  const path = 'src/config/' // `${baseURL}config/`
  const fileName = 'project-config.json'
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
// TODO 添加项目信息
export function setProjectFolder(data, count) {
  const path = `${baseURL}config/`
  const fileName = 'project-config.json'
  const maxNumber = _.max(_.map(data, 'id')) || 0
  const fileInfo = { data, count: count || maxNumber }
  try {
    fs.writeFileSync(`${path}${fileName}`, JSON.stringify(fileInfo), 'utf8')
    msgSuccess('录入成功')
    return { code: 1, msg: '录入成功' }
  } catch (error) {
    msgWarning('录入失败')
    return { code: 0, msg: '录入失败' }
  }
}

// TODO 获取表文件信息
export function getProjectFiles(fileName) {
  const path = `${baseURL}config/`
  const filePath = `${path}${fileName}`
  const fileList = []
  if (!hasExists(filePath)) fs.mkdirSync(filePath)
  const fileNameList = fs.readdirSync(filePath)
  for (let i = 0; i < fileNameList.length; i++) {
    const fileName = fileNameList[i]
    const path = `${filePath}/${fileName}`
    try {
      fs.accessSync(path)
    } catch (error) {
      fs.writeFile(path, '{}', 'utf8', function(error) {
        if (error) return false
        console.log('写入成功')
      })
    }
    const fileInfo = fs.readFileSync(path, 'utf8')
    const data = JSON.parse(fileInfo.toString())
    // data.fileName = fileName
    fileList.push(data)
  }
  return fileList
}
// TODO 添加表文件信息
export function setProjectFiles(data, options) {
  if (!data || !data.fileName) return msgWarning('文件名丢失'), undefined
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

export function getTemplateFiles(fileName, value) {
  const path = `../../../../template/`
  const tempPath = `${path}${fileName}.entity.js`
  try {
    const fileInfo = JSON.stringify(require(tempPath)) // fs.readFileSync(tempPath, 'utf8')
    console.info('file-info:', fileInfo)
    let configName = ''
    let className = ''
    if (value && value.split('-').length)
      _.forEach(value.split('-'), (value, index) => {
        if (index == 0) configName += value
        else configName += _.capitalize(value)
        className += _.capitalize(value)
      })
    let content = fileInfo
    content = content.replace(/{configName}/g, configName)
    content = content.replace(/{className}/g, className)
    return content
  } catch (error) {
    console.info(error)
  }
}

function hasExists(path) {
  return fs.existsSync(path)
  // return new Promise((resolve, reject) => {
  //   try {
  //     fs.exists(path, exists => resolve(exists))
  //   } catch (error) {
  //     reject(error)
  //   }
  // })
}
// function getFileInfo(path) {
//   return new Promise((resolve, reject) => {
//     fs.stat(path, (error, data) => {
//       if (error) reject({ msg: error })
//       else resolve(data)
//     })
//   })
// }
// function createFolder(fileName) {
//   fs.mkdirSync(fileName)
// }
