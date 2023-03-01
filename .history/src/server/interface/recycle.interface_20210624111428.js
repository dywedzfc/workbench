import _ from 'lodash'
import { removeFile, removeFolder } from '../folder'
import { getRecycleBin, setRecycleBin, removeRecycleBin } from '../folder/recycle-bin'
import { hasProjectNameFolder, delProjectFolder } from '../folder/project'
import { getProjectTableFilesName } from '../folder/project-table'
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
// TODO 添加回收站数据
export function addRecycleBinItem(data) {
  let { data: d, count } = getRecycleBinList()
  d.push({ id: ++count, ...data })
  return setRecycleBin({ data: d, count })
}
// TODO 恢复回收站数据
export function restoreRecycleBinItem(id) {
  const data = getRecycleBinById(id)
  let state = {}
  if (data.type == '项目文件') state = restoreProjectItem(data)
  else if (data.type == '项目表文件') state = restoreProjectTableItem(data)
  if (state.code == 200) return removeRecycleBin(id)
  else return { code: 400, msg: '恢复失败' }
}
// TODO 删除回收站数据
export function removeRecycleBinItem(id) {
  const data = getRecycleBinById(id)
  console.info('remove-1:', data)
  let state = {}
  if (data.type == '项目文件') {
    state = removeProjectItem(data)
    console.info('remove-project:', state)
    if (state.code == 200 || state.code == 300) {
      return removeRecycleState(id)
    }
    return state
  } else if (data.type == '项目表文件') state = removeProjectTableItem(data)
  if (state.code == 200) return removeRecycleState(id)
  else return { code: 400, msg: '删除失败' }
}

// 恢复项目
function restoreProjectItem(data) {
  const project = getProjectById(data.fileId)
  delete project.removeState
  return updProjectItem(project)
}
// 恢复项目表文件
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
// 删除项目信息
async function removeProjectItem(data) {
  if (!data.path) return removeProjectData(data.fileId)
  const tableName = getProjectTableFilesName(data.path)
  console.info('project-table-name:', tableName)
  if (tableName.code == 200 && tableName.data.length) {
    const state = removeProjectTableList(data.path, tableName.data)
    if (state.code == 400) return state
  }
  const hasFolder = hasProjectNameFolder(data.path)
  console.info('project-folder:', hasFolder)
  if (hasFolder.code == 301) {
    // try {
    const remove = await removeFolder(data.path)
    console.info('project-remove:', remove)
    if (remove.code == 200) return removeProjectData(data.fileId)
    else return removeProjectItem(data) //{ code: 400, msg: '文件删除失败。可能是内部文件删除堵塞导致，可以再次尝试删除。' }
    // } catch (error) {}
  } else return removeProjectData(data.fileId)
}
// 删除项目表文件
function removeProjectTableItem(data) {
  return removeFile(data.path)
}
// 删除项目状态
function removeProjectData(id) {
  const remove = delProjectFolder(id)
  if (remove.code == 200) remove.msg = '删除成功'
  else if (remove.code == 400) remove.msg = '删除失败'
  return remove
}
// 删除项目表文件
async function removeProjectTableList(path, data) {
  const removeList = []
  for (let i = 0; i < data.length; i++) {
    const fileName = data[i]
    const removeState = await removeFile(`${path}/${fileName}`)
    removeState.file = fileName
    removeList.push(removeState)
  }
  const codes = _.filter(_.map(removeList, 'code'), item => item == 400)
  if (codes.length) return { code: 400, msg: '项目表文件，无法删除干净。' }
}
