import { getRecycleBin, setRecycleBin } from '../folder'

export function getRecycleBinList() {
  return getRecycleBin()
}

export function addRecycleBin(data) {
  let { data: d, count } = getRecycleBinList()
  d.push({ id: ++count, ...data })
  return setRecycleBin({ data: d, count })
}
