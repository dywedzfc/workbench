import Path from 'path'
// // import { Low } from 'lowdb'
import { baseURL, TASK_FILE_NAME } from '../util'

export function getPostTaskInfo() {
  const configFile = Path.join(baseURL, TASK_FILE_NAME)
  // const db = Low(configFile)
  console.info('db:', configFile)
}
