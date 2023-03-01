import fs from 'fs'
import _ from 'lodash'
// import _ from 'lodash'
import Path from 'path'
// import { createFile } from './index'
import { CONFIG_PATH, DAILY_PATH, DAILY_FILE_NAME, baseURL, createFile } from '../util'

/* ******************** 日报 ******************** */
// TODO 获取'*.daily.ini'文件
export function getDailyFolder(month) {
  initDailyFolder()
  initCurrentMonthFile()
  try {
    const fileName = DAILY_FILE_NAME.replace('{fileName}', month || currentMonth())
    const configFile = Path.join(baseURL, CONFIG_PATH + DAILY_PATH + fileName)
    let fileInfo = fs.readFileSync(configFile, 'utf8')
    return JSON.parse(fileInfo.toString())
  } catch (error) {
    console.error(error)
    return []
  }
}
// TODO 获取'daily.config'
export function getDailyFolderName(year) {
  initDailyFolder()

  const dailyFile = Path.join(baseURL, `${CONFIG_PATH}${DAILY_PATH}`)
  if (!fs.existsSync(dailyFile)) fs.mkdirSync(dailyFile)
  const fileNames = fs.readdirSync(dailyFile)
  const currentYearFN = _.filter(fileNames, item => item.indexOf(year || currentYear()) == 0)
  return _.map(currentYearFN, item => item.replace('.daily.ini', ''))
}
// TODO 更新'*.daily.ini'文件
export function setDailyInfo(data, date) {
  const fileName = DAILY_FILE_NAME.replace('{fileName}', date) //`{fileName}.daily.ini`
  const dailyFile = Path.join(baseURL, `${CONFIG_PATH}${DAILY_PATH}${fileName}`)

  try {
    fs.writeFileSync(dailyFile, JSON.stringify(data), 'utf8')
    return { code: 200, msg: '录入成功' }
  } catch (error) {
    return { code: 400, msg: '录入失败' }
  }
}

// 初始化文件夹
function initDailyFolder() {
  let configFile = Path.join(baseURL, CONFIG_PATH + DAILY_PATH)
  try {
    if (!fs.existsSync(configFile)) fs.mkdirSync(configFile, { recursive: true })
  } catch (error) {
    console.error(error)
  }
}
// 初始化当月文件
function initCurrentMonthFile() {
  const month = currentMonth()
  const fileName = DAILY_FILE_NAME.replace('{fileName}', month)
  const path = Path.join(baseURL, CONFIG_PATH + DAILY_PATH)
  const fileList = fs.readdirSync(path)
  const length = _.filter(fileList, item => item.indexOf(month) == 0)
  if (length.length) return
  createFile(fileName, DAILY_PATH + fileName, [])
}
// 当月，格式：YYYY-MM
function currentMonth() {
  const date = new Date()
  const month = date.getMonth() + 1
  return `${date.getFullYear()}-${month < 10 ? '0' + month : month}`
}
// 当月，格式：YYYY
function currentYear() {
  return new Date().getFullYear()
}
