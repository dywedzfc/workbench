import _ from 'lodash'
import { getProjectTableFiles, setProjectTableFiles, getRecycleBin, setRecycleBin } from '../folder'
import { getProjectById, updProjectItem } from './project.interface'
// import { TABLE_FILE_NAME } from '../util/folder'

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
  console.info('project:', project, project.fileName)
  let { data: d, count } = getProjectTableList(project.fileName)
  // d.push({ id: ++count, ...data })
  const table = setProjectTableFiles({ id: ++project.tableCount, ...data }, project)
  console.info('project:', d, count)
  if (table.code == 200) {
    const { code } = updProjectItem(project)
    console.info('project-list:', code, project)
    return table
  } else return table
}
export function updProjectTableItem(data) {
  let { data: d, count } = getProjectTableList()
  for (let i = 0; i < d.length; i++) {
    if (d[i].id == data.id) d[i] = data
    if (d[i].id == data.id) break
  }

  if (data.removeState) addProjectTableRecycle(data)
  return setProjectTableFiles(d, count)
}

function addProjectTableRecycle(data) {
  const recycle = getRecycleBin()
  const recycleData = {}
  const type = '项目表文件'
  const mark = `${data.id}:${data.fileName || ''}:${type}`
  const count = _.filter(recycle.data, item => item.mark == mark)
  if (count == 0) {
    recycleData.id = ++recycle.count
    recycleData.title = data.title
    recycleData.path = data.fileName
    recycleData.mark = mark
    recycleData.type = type
    recycle.data.push(recycleData)
    return setRecycleBin(recycle)
  }
}
