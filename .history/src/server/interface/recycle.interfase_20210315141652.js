import _ from 'lodash'
import { getRecycleBin, setRecycleBin, removeRecycleBin } from '../folder'
import { getProjectById, updProjectItem } from './project.interface'

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
  console.info('recycle-bin:', data)
  let state = {}
  if (data.type == '项目文件') state = restoreProjectItem(data)
  else if (data.type == '项目表文件') state = restoreProjectTableItem()
  if (state.code == 200) removeRecycleBin(id)
}

function restoreProjectItem(data) {
  const [, fileName] = data.mark.split(':')
  if (fileName) console.info('删除文件')
  const project = getProjectById(data.fileId)
  console.info('project:', project)
  delete project.removeState
  console.info('project:', project, data)
  updProjectItem(project)
}
function restoreProjectTableItem() {}
