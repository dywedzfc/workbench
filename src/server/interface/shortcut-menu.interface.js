import _ from 'lodash'
import { getShortcutMenu, setShortcutMenu, removeShortcutMenu } from '../folder/shortcut-menu'

export function getShortcutMenuList() {
  return getShortcutMenu()
}
export function getShortcutMenuById(id) {
  const { data } = getShortcutMenuList()
  const list = _.filter(data, (item) => item.id == id)
  if (list.length) return list[0]
}
export function addShortcutMenuItem(item) {
  let { data } = getShortcutMenuList()
  data.push({ id: Date.now(), ...item })
  return setShortcutMenu(data)
}
export function updShortcutMenuItem(item) {
  let { data } = getShortcutMenuList()
  for (let i = 0; i < data.length; i++) {
    if (data[i].id == item.id) {
      data[i] = item
      break
    }
  }
  return setShortcutMenu(data)
}
export function removeShortcutMenuItem(id) {
  return removeShortcutMenu(id)
}
