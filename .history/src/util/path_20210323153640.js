const NUMBER_255 = '[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]'
const PROTOCOL = 'http(s)?://'
const HOSTNAME = `((${NUMBER_255}).){3}(${NUMBER_255})`
const HOSTNAME_WEB = `([a-zA-Z0-9]+(.[a-zA-Z0-9]+)+)`
const PORT =
  ':([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]{1}|6553[0-5])'
const PATH = '([a-zA-Z0-9_-]+/?)*'
const FILE_NAME = '(([a-zA-Z0-9_-]+)?.[a-z]*)?'

export function verifyServerAddress(path = '') {
  const regExp = `^(${PROTOCOL})?((${HOSTNAME_WEB}))((${PORT})?|((${PORT})/(${PATH})(${FILE_NAME})))$`
  const regUrl = RegExp(regExp)
  return regUrl.test(path)
  // return regUrl
}
