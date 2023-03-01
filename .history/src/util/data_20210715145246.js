export function charLength(value) {
  const l = value.length
  let size = 0
  for (let i = 0; i < l; i++) {
    if ((value.charCodeAt(i) & 0xff00) != 0) size++
    size++
  }
  return size
}
