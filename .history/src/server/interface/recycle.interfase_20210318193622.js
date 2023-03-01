import _ from 'lodash'
import {
  getRecycleBin,
  setRecycleBin,
  removeRecycleBin,
  removeFile,
  removeFolder,
  delProjectFolder,
  getProjectTableFilesName,
  hasProjectNameFolder
} from '../folder'
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
    if (state.code == 200 || state.code == 300) return removeRecycleState(id)
  } else if (data.type == '项目表文件') state = removeProjectTableItem(data)
  if (state.code == 200) return removeRecycleState(id)
  else return { code: 400, msg: '恢复失败' }
}

// TODO 恢复项目
function restoreProjectItem(data) {
  const project = getProjectById(data.fileId)
  delete project.removeState
  return updProjectItem(project)
}
// TODO 恢复项目表文件
function restoreProjectTableItem(data) {
  const table = getProjectTableByPath(data.path)
  delete table.removeState
  return updProjectTableItem(table)
}

// 重置删除提示信息
function removeRecycleState(id) {
  const state = removeRecycleBin(id)
  if (state.code == 200) state.msg = '删除成功'
  else if (state.code == 400) state.msg = '删除失败'
  return state
}
function removeProjectItem(data) {
  if (!data.path) return { code: 300, msg: '文件不存在' }
  const tableName = getProjectTableFilesName(data.path)
  if (tableName.code == 200 && tableName.data.length) {
    const removeList = []
    for (let i = 0; i < tableName.data.length; i++) {
      const fileName = tableName.data[i]
      const removeState = removeFile(`${data.path}/${fileName}`)
      removeState.file = fileName
      removeList.push(removeState)
    }
    const codes = _.filter(_.map(removeList, 'code'), item => item == 400)
    if (codes.length) return { code: 400, msg: '项目表文件，无法删除干净。' }
  }
  const hasFolder = hasProjectNameFolder(data.path)
  if (hasFolder.code == 301) {
    const remove = removeFolder(data.path)
    if (remove.code == 200) return removeProjectData(data.fileId)
    else return { code: 400, msg: '文件删除失败' }
  } else return removeProjectData(data.fileId)
}

function removeProjectTableItem(data) {
  return removeFile(data.path)
}
function removeProjectData(id) {
  const remove = delProjectFolder(id)
  if (remove.code == 200) remove.msg = '删除成功'
  else if (remove.code == 400) remove.msg = '删除失败'
  return remove
}
function removeProjectTableList(path, data) {
  const removeList = []
  for (let i = 0; i < data.length; i++) {
    const fileName = data[i]
    const removeState = removeFile(`${data.path}/${fileName}`)
    removeState.file = fileName
    removeList.push(removeState)
  }
  const codes = _.filter(_.map(removeList, 'code'), item => item == 400)
  if (codes.length) return { code: 400, msg: '项目表文件，无法删除干净。' }
}
