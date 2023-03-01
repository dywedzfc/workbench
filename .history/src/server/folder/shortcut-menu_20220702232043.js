import fs from 'fs'
import _ from 'lodash'
import Path from 'path'
import { CONFIG_PATH, SHORTCUT_MENU_FILE_NAME, baseURL, createFile } from '../util'
import { initFolder } from './index'
import { initMenuFile } from '../../renderer/assets/config/menu.config.json'

// TODO 获取快捷菜单
export function getShortcutMenu() {
  initFolder(CONFIG_PATH)
  const { path } = createFile(SHORTCUT_MENU_FILE_NAME, null, {
    // operate{0:不可操作, 1:可操作}; hrefType{0:站内链接, 1:超链接}
    initMenuFile,
    // data: [
    //   { id: 1656736457356, title: '日报', icon: 'el-icon-tickets', operate: 0, href: '/daily' },
    //   { id: 1656736460023, title: '月报', icon: 'el-icon-date', operate: 0, href: '/monthly' },
    //   { id: 1656736461314, title: '项目', icon: 'el-icon-folder', operate: 0, href: '/jkzsl/list' },
    // ],
  })
  try {
    let fileInfo = fs.readFileSync(path, 'utf8')
    return JSON.parse(fileInfo.toString())
  } catch (error) {
    return { data: [], error }
  }
}

// TODO 添加快捷菜单
export function setShortcutMenu(data) {
  const path = Path.join(baseURL, `${CONFIG_PATH}${SHORTCUT_MENU_FILE_NAME}`)
  try {
    fs.writeFileSync(path, JSON.stringify({ data }), 'utf8')
    return { code: 200, msg: '录入成功' }
  } catch (error) {
    return { code: 400, msg: '录入失败', error }
  }
}
// TODO 删除快捷菜单
export function removeShortcutMenu(id) {
  let { data } = getShortcutMenu()
  _.remove(data, (item) => item.id == id)
  const path = Path.join(baseURL, `${CONFIG_PATH}${SHORTCUT_MENU_FILE_NAME}`)
  try {
    const content = JSON.stringify({ data })
    fs.writeFileSync(path, content, 'utf8')
    return { code: 200, msg: '删除成功！' }
  } catch (error) {
    return { code: 400, msg: '删除失败！' }
  }
}
