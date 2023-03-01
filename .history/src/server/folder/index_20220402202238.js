import fs from 'fs'
import _ from 'lodash'
import Path from 'path'
import { CONFIG_PATH, baseURL } from '../util'

// TODO 初始化-创建文件夹
export function initFolder(path) {
  const configFile = Path.join(baseURL, path)
  try {
    if (!fs.existsSync(configFile)) fs.mkdirSync(configFile, { recursive: true })
  } catch (error) {
    console.error(error)
  }
}
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
