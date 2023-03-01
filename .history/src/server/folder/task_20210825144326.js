import Path from 'path'
import { Low } from 'lowdb'
import { baseURL, TASK_FILE_NAME } from '../util'

export function getTaskInfo() {
  const configFile = Path.join(baseURL, TASK_FILE_NAME)
  const db = Low(configFile)
}
