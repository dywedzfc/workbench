import _ from 'lodash'
import { getRecycleBin, setRecycleBin } from '../folder'
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
  if (data?.type == '项目文件') restoreProjectItem(data)
  else if (data?.type == '项目表文件') restoreProjectTableItem()
}

function restoreProjectItem(data) {
  const project = getProjectById(data.fileId)
  console.info('project:', project)
}
function restoreProjectTableItem() {}
