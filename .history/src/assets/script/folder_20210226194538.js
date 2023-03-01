const fs = window.require('fs')
import _ from 'lodash'
import { msgSuccess, msgWarning } from 'util'

// TODO 获取项目信息
export function getProjectFolder() {
  const path = './config/'
  const fileName = 'project-config.json'
  let fileInfo = ''
  if (!hasExists(path)) fs.mkdirSync(path)
  try {
    fs.accessSync(`${path}${fileName}`)
  } catch (error) {
    fs.writeFile(`${path}${fileName}`, '{}', 'utf8', function(error) {
      if (error) return false
      console.log('写入成功')
    })
  }
  fileInfo = fs.readFileSync(`${path}${fileName}`, 'utf8')
  return JSON.parse(fileInfo.toString())
}
// TODO 添加项目信息
export function setProjectFolder(data, count) {
  const path = './config/'
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
  const path = './config/'
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
  const path = './config/'
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
