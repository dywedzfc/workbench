import Path from 'path'
// import lowdb from 'lowdb'
import { ipcMain } from 'electron'
import { baseURL, TASK_FILE_NAME } from '../util'

export function getPostTaskInfo() {
  const configFile = Path.join(baseURL, TASK_FILE_NAME)
  // const db = lowdb(configFile)
  console.info('db:', configFile, ipcMain)
}