import { Low } from 'lowdb'
import { baseURL, TASK_FILE_NAME } from '../util'
import { Path } from 'path'

export function getTaskInfo() {
  const configFile = Path.join(baseURL, TASK_FILE_NAME)
  Low()
}
