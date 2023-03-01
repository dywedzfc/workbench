export function getDateTime(date = new Date()) {
  let Y = date.getFullYear()
  let M = date.getMonth() + 1
  let D = date.getDate()
  let h = date.getHours()
  let m = date.getMinutes()
  let s = date.getSeconds()
  if ((M + '').length == 1) M = '0' + M
  if ((D + '').length == 1) D = '0' + D
  if ((h + '').length == 1) h = '0' + h
  if ((m + '').length == 1) m = '0' + m
  if ((s + '').length == 1) s = '0' + s
  return `${Y}-${M}-${D} ${h}:${m}:${s}`
}
