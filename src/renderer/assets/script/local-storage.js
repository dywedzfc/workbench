export function getLocalStorage(name) {
  return localStorage.getItem(name)
}
export function setLocalStorage(name, value) {
  if (typeof value == 'string') localStorage.setItem(name, value)
  else localStorage.setItem(name, JSON.stringify(value))
}

//#region 状态
export function getWState() {
  return JSON.parse(getLocalStorage('w-state') || '{"menu":{"show":true}}')
}
export function setWState(data) {
  const oldData = getWState()
  setLocalStorage('w-state', Object.assign(oldData, data))
}
//#endregion

//#region 菜单状态
export function getLeftMenu() {
  return getWState().menu
}
export function setLeftMenu(data) {
  const oldData = getLeftMenu()
  setWState({ menu: Object.assign(oldData, data) })
}
//#endregion

//#region 日报历史记录
export function hasDailyHistory() {
  return JSON.parse(getLocalStorage('dailyHistory'))
}
export function getDailyHistory() {
  return JSON.parse(getLocalStorage('dailyHistory') || '[]')
}
export function setDailyHistory(data) {
  setLocalStorage('dailyHistory', JSON.stringify(data))
}
//#endregion
