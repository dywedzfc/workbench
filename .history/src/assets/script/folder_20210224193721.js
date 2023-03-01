const fs = window.require('fs')
import _ from 'lodash'
import { msgSuccess, msgWarning } from 'util'

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
export function setProjectFolder(data, count) {
  console.info('set:', data)
  const path = './config/'
  const fileName = 'project-config.json'
  const maxNumber = _.max(_.map(data, 'id')) || 0
  const fileInfo = { data, count: count || maxNumber }
  fs.writeFile(`${path}${fileName}`, JSON.stringify(fileInfo), 'utf8', function(error) {
    if (error) return msgWarning('录入失败')
    msgSuccess('录入成功')
  })
}

export function getProjectFiles(fileName) {
  const path = './config/'
  const filePath = `${path}${fileName}`
  const fileList = []
  if (!hasExists(filePath)) fs.mkdirSync(filePath)
  const fileNameList = fs.readdirSync(filePath)
  for (let i = 0; i < fileNameList.length; i++) {
    const fileName = item[i]
  }
  console.info('file-name:', fileNameList)
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
function getFileInfo(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (error, data) => {
      if (error) reject({ msg: error })
      else resolve(data)
    })
  })
}
function createFolder(fileName) {
  fs.mkdirSync(fileName)
}
// accessSync
