const NUMBER_255 = '[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]'
const PROTOCOL = 'http(s)?://'
const HOSTNAME = `((${number}).){3}(${number})`
const HOSTNAME_WEB = `([a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+)`
const PORT = ':([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]{1}|6553[0-5])'
const PATH = '([a-zA-Z0-9_-]+/?)*'
const FILE_NAME = '(([a-zA-Z0-9_-]+)?.[a-z]*)?'

export function verificationUrl(path = '') {
  const number = '[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]'
  const protocol = 'http(s)?://'
  const hostname = `((${number}).){3}(${number})`
  const port = `:([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]{1}|6553[0-5])`
  const _path = '([a-zA-Z0-9]+/?)*'
  const fileName = '(([a-zA-Z0-9]+)?.[a-z]*)?'
  const regExp = `^(${protocol})?((${hostname})|(${HOSTNAME_WEB}))((${port})?|((${port})/(${_path})(${fileName})))$`
  const regUrl = RegExp(regExp)
  return regUrl.test(path)
},