import _ from 'lodash'
import { getShortcutMenu, setShortcutMenu } from '../folder/shortcut-menu'

export function getShortcutMenuList() {
  return getShortcutMenu()
}
export function getShortcutMenuById(id) {
  const { data } = getShortcutMenuList()
  const list = _.filter(data, (item) => item.id == id)
  if (list.length) return list[0]
}
export function addProjectItem(data) {
  let { data: d, count } = getShortcutMenuList()
  d.push({ id: ++count, ...data, tableCount: 0 })
  return setShortcutMenu(d, count)
}
export function updProjectItem(data) {
  let { data: d, count } = getShortcutMenuList()
  for (let i = 0; i < d.length; i++) {
    if (d[i].id == data.id) d[i] = data
    if (d[i].id == data.id) break
  }

  return setShortcutMenu(d, count)
}
