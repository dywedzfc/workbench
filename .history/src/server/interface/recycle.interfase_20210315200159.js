import _ from 'lodash'
import { getRecycleBin, setRecycleBin, removeRecycleBin } from '../folder'
import { getProjectById, updProjectItem } from './project.interface'
import { getProjectTableByPath, updProjectTableItem } from './project-table.interface'

export function getRecycleBinList() {
  return getRecycleBin()
}
export function getRecycleBinById(id) {
  const { data } = getRecycleBin()
  const list = _.filter(data, item => item.id == id)
  if (list.length) return list[0]
}

export function addRecycleBinItem(data) {
  let { data: d, count } = getRecycleBinList()
  d.push({ id: ++count, ...data })
  return setRecycleBin({ data: d, count })
}

export function restoreRecycleBin(id) {
  const data = getRecycleBinById(id)
  let state = {}
  console.info('recycle-bin:', data)
  if (data.type == '项目文件') state = restoreProjectItem(data)
  else if (data.type == '项目表文件') state = restoreProjectTableItem(data)
  if (state.code == 200) return removeRecycleBin(id)
  else return { code: 400, msg: '恢复失败' }
}

function restoreProjectItem(data) {
  // const [, fileName] = data.mark.split(':')
  // if (fileName) console.info('删除文件')
  const project = getProjectById(data.fileId)
  delete project.removeState
  return updProjectItem(project)
}
function restoreProjectTableItem(data) {
  console.info('item:', data)
  const table = getProjectTableByPath(data.path)
  console.info('data:', table)
  delete table.removeState
  return updProjectTableItem(table)
}