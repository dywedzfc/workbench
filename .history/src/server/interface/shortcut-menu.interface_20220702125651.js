import _ from 'lodash'
import { getShortcutMenu, setShortcutMenu } from '../folder/shortcut-menu'
import { addRecycleBinItem } from './recycle.interface'
import { recycleBinItem } from '../../util/folder'

export function getProjectList() {
  return getShortcutMenu()
}
export function getProjectById(id) {
  const { data } = getProjectList()
  const list = _.filter(data, (item) => item.id == id)
  if (list.length) return list[0]
}
export function addProjectItem(data) {
  let { data: d, count } = getProjectList()
  d.push({ id: ++count, ...data, tableCount: 0 })
  return setShortcutMenu(d, count)
}
export function updProjectItem(data) {
  let { data: d, count } = getProjectList()
  for (let i = 0; i < d.length; i++) {
    if (d[i].id == data.id) d[i] = data
    if (d[i].id == data.id) break
  }

  if (data.removeState) addProjectRecycle(data)
  return setShortcutMenu(d, count)
}

function addProjectRecycle(data) {
  const type = '项目文件'
  const mark = `${data.id}:${data.fileName || ''}:${type}`
  return addRecycleBinItem(recycleBinItem(data.title, data.fileName, mark, type, data.id))
}
