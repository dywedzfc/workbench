import _ from 'lodash'
import { getRecycleBin, setRecycleBin, removeRecycleBin, removeFile } from '../folder'
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

export function restoreRecycleBinItem(id) {
  const data = getRecycleBinById(id)
  let state = {}
  if (data.type == '项目文件') state = restoreProjectItem(data)
  else if (data.type == '项目表文件') state = restoreProjectTableItem(data)
  if (state.code == 200) return removeRecycleBin(id)
  else return { code: 400, msg: '恢复失败' }
}
export function removeRecycleBinItem(id) {
  const data = getRecycleBinById(id)
  let state = {}
  if (data.type == '项目文件') {
    state = removeProjectItem(data)
    if (state.code == 200 || state.code == 300) return removeRecycleBin(id)
  } else if (data.type == '项目表文件') state = removeProjectTableItem(data)
  if (state.code == 200) return removeRecycleBin(id)
  else return { code: 400, msg: '恢复失败' }
}

function restoreProjectItem(data) {
  const project = getProjectById(data.fileId)
  delete project.removeState
  return updProjectItem(project)
}
function restoreProjectTableItem(data) {
  const table = getProjectTableByPath(data.path)
  delete table.removeState
  return updProjectTableItem(table)
}

function removeProjectItem(data) {
  console.info('remove-project:', data)
  if (!data.path) return { code: 300, msg: '文件不存在' }
}
function removeProjectTableItem(data) {
  return removeFile(data.path)
}
