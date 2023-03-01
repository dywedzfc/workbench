export function resetThemeColor(theme) {
  if (theme != 'auto') return theme
  const hours = new Date().getHours()
  return hours >= 6 && hours < 18 ? 'light' : 'dark'
}
