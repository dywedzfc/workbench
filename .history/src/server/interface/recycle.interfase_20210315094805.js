import { getRecycleBin, setRecycleBin } from '../folder'

export function getRecycleBinList() {
  return getRecycleBin()
}

export function addRecycleBin(data) {
  let { data: d, count } = getRecycleBinList()
  d.push({ id: ++count, ...data })
  const recycle = setRecycleBin({ id: ++count, ...data }, recycle)
  if (table.code == 200) return table
  else return table
}
