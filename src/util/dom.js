export function iconClassName(icon) {
  if ((icon || '').indexOf('icon-') == 0) return `iconfont ${icon}`
  return icon
}
