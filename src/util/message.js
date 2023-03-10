import { Message, MessageBox } from 'element-ui'

export function message(message, type) {
  return Message({ message, type })
}

export function msgSuccess(msg, type) {
  if (['A', 'add', 'append'].includes(type)) return message('添加成功', 'success')
  if (['U', 'upd', 'update'].includes(type)) return message('修改成功', 'success')
  if (['D', 'del', 'delete'].includes(type)) return message('修改成功', 'success')
  return message(msg, 'success')
}
export function msgWarning(msg, type) {
  const flag = msg == '录入失败'
  if (flag && ['A', 'add', 'append'].includes(type)) return message('添加失败', 'warning')
  if (flag && ['U', 'upd', 'update'].includes(type)) return message('修改失败', 'warning')
  if (flag && ['D', 'del', 'delete'].includes(type)) return message('删除失败', 'warning')
  return message(msg, 'warning')
}
export function msgError(msg) {
  // , async = true
  // if (async) return setTimeout(() => message(msg, 'error'))
  return message(msg, 'error')
}

export function messageBox(msg = '此操作将永久删除该数据, 是否继续?') {
  return MessageBox.confirm(msg, '提示', { type: 'warning' })
}

export function requestResult(code, msg) {
  return new Promise((resolve, reject) => {
    if (code == 200) msgSuccess(msg), resolve()
    if (code == 400) msgWarning(msg)
    reject()
  })
}
