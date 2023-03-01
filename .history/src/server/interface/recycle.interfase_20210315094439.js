import { getRecycleBin, setRecycleBin } from '../folder'

export function getRecycleBinList() {
  return getRecycleBin()
}

export function addRecycleBin(data) {
  const recycle = getRecycleBinList()
  const table = setRecycleBin({ id: ++recycle.tableCount, ...data }, recycle)
  if (table.code == 200) {
    updProjectItem(project)
    return table
  } else return table
}
