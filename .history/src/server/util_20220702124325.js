import fs from 'fs'
import Path from 'path'
import { CONFIG_PATH, DAILY_PATH } from '../util/folder'
const USER_HOME = process.env.HOME || process.env.USERPROFILE

const URL = `${USER_HOME}/Library/workbench`
export const baseURL = process.env.NODE_ENV === 'production' ? `${URL}/` : `${URL}.develop/`
export * from '../util/folder'

/**
 TODO 创建文件
 *
 * @param {String} fileName 文件名称
 * @param {String|null} pathFileName 路径
 * @param {Object} [defaultContent={}] 创建文件默认内容
 * @param {true} create
 * @return {*} 完整路径
 */
export function createFile(fileName, pathFileName, defaultContent = {}) {
  const path = Path.join(baseURL, `${CONFIG_PATH}${pathFileName || fileName}`)
  const state = _createFile(fileName, path, defaultContent)
  return { path, state }
}
export function createDailyFile(fileName, pathFileName, defaultContent = {}) {
  const path = Path.join(baseURL, `${DAILY_PATH}${pathFileName || fileName}`)
  const state = _createFile(fileName, path, defaultContent)
  return { path, state }
}
function _createFile(fileName, path, defaultContent) {
  const state = {}
  try {
    fs.accessSync(path)
  } catch (error) {
    try {
      const content = JSON.stringify(defaultContent)
      fs.writeFileSync(path, content, 'utf8')
      console.log(`"${fileName}"文件，写入成功！`)
      state.code = 200
    } catch (error) {
      state.code = 400
      console.error(`"${fileName}"文件，写入失败！\n\t错误信息：(${error})`)
    }
  }
  return state
}
