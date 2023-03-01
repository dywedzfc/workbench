const NUMBER_255 = '[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]'
const protocol = 'http(s)?://'
const hostname = `((${number}).){3}(${number})`
const port = `:([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]{1}|6553[0-5])`

export function verificationUrl(path = '') {
  const number = '[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]'
  const protocol = 'http(s)?://'
  const hostname = `((${number}).){3}(${number})`
  const port = `:([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]{1}|6553[0-5])`
  const _path = '([a-zA-Z0-9]+/?)*'
  const fileName = '(([a-zA-Z0-9]+)?.[a-z]*)?'
  const regExp = `^(${protocol})?(${hostname})((${port})?|((${port})/(${_path})(${fileName})))$`
  const regUrl = RegExp(regExp)
  return regUrl.test(path)
},