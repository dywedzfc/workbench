import { Message, MessageBox } from 'element-ui'

export function message(message, type) {
  return Message({ message, type })
}

export function msgWarning(msg, async = true) {
  if (async) return setTimeout(() => message(msg, 'warning'))
  return message(msg, 'warning')
}
export function msgSuccess(msg, async = true) {
  if (async) return setTimeout(() => message(msg, 'success'))
  return message(msg, 'success')
}
export function msgError(msg, async = true) {
  if (async) return setTimeout(() => message(msg, 'error'))
  return message(msg, 'error')
}

export function removeData(msg = '此操作将永久删除该数据, 是否继续?') {
  return MessageBox.confirm(msg, '提示', { type: 'warning' })
}

export function requestResult(code, msg) {
  return new Promise((resolve, reject) => {
    if (code == 200) msgSuccess(msg), resolve()
    if (code == 400) msgWarning(msg)
    reject()
  })
}
