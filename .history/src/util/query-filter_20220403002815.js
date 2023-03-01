import _ from 'lodash'

export function multipleQueryFilter(query, list) {
  if (query == '') return list
  const reset = _.map(list, (item) => {
    const q = _.filter(query.split(' '))
    const data = { data: item }
    if (q.length > 1) {
      const title = item.title
      let hitList = _.map(q, (_q, i) => {
        const data = { index: i }
        if (title.includes(_q)) {
          const startIndex = title.indexOf(_q)
          data.si = startIndex
          data.ei = startIndex + _q.length
          data.hit = _q.length
        } else data.hit = 0
        return data
      })
      hitList = _.orderBy(hitList, 'index')
      if (_.sum(_.map(hitList, 'hit'))) {
        data.hit = _.sum(_.map(hitList, 'hit'))
        data.index = _.filter(hitList, 'hit')[0].index
      } else data.hit = 0
    } else {
      if (item.title.includes(query)) data.hit = query.length
      else data.hit = 0
    }
    return data
  })
  return _.map(_.filter(_.orderBy(reset, ['hit', 'index'], ['desc']), 'hit'), 'data')
}

/* 文本高亮 */
export function wordHighlight(title, query) {
  query = query.trim()
  const queryList = _.filter(query.split(' '))
  if (queryList.length) {
    let filterList = locationMarker(title, queryList)
    filterList = _.orderBy(filterList, 'si')

    for (let i = filterList.length - 1; i > 0; i--)
      resetQueryConditions(filterList[i - 1], filterList[i])

    filterList = _.filter(filterList, (item) => !item.del)
    return splitTitleWord(title, filterList)
  } else return [{ title, type: 'text' }]
}

/* 记录查询条件所在文字位置标记 */
function locationMarker(title, query) {
  const filterList = []
  for (let i = 0; i < query.length; i++) {
    const t = query[i]
    if (title.indexOf(t) >= 0) {
      const startIndex = title.indexOf(t)
      filterList.push({ text: t, si: startIndex, ei: startIndex + t.length })
    }
  }
  return filterList
}
/* 整理合并重叠文字-多单词查询条件 */
function resetQueryConditions(prev, current) {
  if (prev.ei >= current.si) {
    const num = prev.ei - current.si
    const text = current.text.substring(num)
    prev.text += text
    prev.ei = current.ei
    current.text = prev.text
    current.si = prev.si
    current.del = true
  }
}
/* 拆分标题文本 */
function splitTitleWord(title, filterList) {
  const list = []
  let tempTitle = title
  for (let i = 0; i < filterList.length; i++) {
    const item = filterList[i]
    if (item.si) {
      if (i > 0) {
        const p = filterList[i - 1]
        list.push({ title: title.substring(p.ei, item.si), type: 'text' })
      } else list.push({ title: title.substring(0, item.si), type: 'text' })
    }
    list.push({ title: title.substring(item.si, item.ei), type: 'mark' })
    tempTitle = title.substring(item.ei)
  }
  if (tempTitle.length) list.push({ title: tempTitle, type: 'text' })
  return _.filter(list, 'title')
}
