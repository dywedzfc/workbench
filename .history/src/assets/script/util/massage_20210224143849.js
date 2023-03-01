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
