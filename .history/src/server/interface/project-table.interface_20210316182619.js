// import _ from 'lodash'
import { getProjectTableFiles, getProjectTableFilesItem, setProjectTableFiles } from '../folder'
import { getProjectById, updProjectItem } from './project.interface'
import { addRecycleBinItem } from './recycle.interfase'
import { TABLE_FILE_NAME, recycleBinItem } from '../../util/folder'

export function getProjectTableList(folderName) {
  return getProjectTableFiles(folderName)
}
export function getProjectTableByPath(path) {
  return getProjectTableFilesItem(path)
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
  if (data.removeState) addProjectTableRecycle(data, project)
  return setProjectTableFiles(data, project)
}

function addProjectTableRecycle(data, options) {
  const type = '项目表文件'
  const mark = `${data.id}:${data.fileName || ''}:${type}`
  const fileName = TABLE_FILE_NAME.replace('{fileName}', data.fileName)
  const path = `${options.fileName}/${fileName}`
  return addRecycleBinItem(recycleBinItem(data.title, path, mark, type, data.id))
}
