import _ from 'lodash'
import { getProjectTableFiles, setProjectTableFiles, getRecycleBin, setRecycleBin } from '../folder'
import { getProjectById, updProjectItem } from './project.interface'
import { TABLE_FILE_NAME } from '../util/folder'

export function getProjectTableList(folderName) {
  return getProjectTableFiles(folderName)
}
export function getProjectTableById(id) {
  const { data } = getProjectTableList()
  const list = _.filter(data, item => item.id == id)
  if (list.length) return list[0]
}
export function addProjectTableItem(data) {
  const project = getProjectById(data.projectId)
  const table = setProjectTableFiles({ id: ++project.tableCount, ...data }, project)
  if (table.code == 200) {
    updProjectItem(project)
    return table
  } else return table
}
export function updProjectTableItem(data) {
  const project = getProjectById(data.projectId)
  if (data.removeState) addProjectTableRecycle(data)
  return setProjectTableFiles(data, project)
}

function addProjectTableRecycle(data) {
  const recycle = getRecycleBin()
  const recycleData = {}
  const type = '项目表文件'
  const mark = `${data.id}:${data.fileName || ''}:${type}`
  const count = _.filter(recycle.data, item => item.mark == mark)
  const fileName = TABLE_FILE_NAME.replace('{fileName}', data.fileName)
  if (count == 0) {
    recycleData.id = ++recycle.count
    recycleData.title = data.title
    recycleData.path = `${data.fileName}`
    recycleData.mark = mark
    recycleData.type = type
    recycle.data.push(recycleData)
    return setRecycleBin(recycle)
  }
}
