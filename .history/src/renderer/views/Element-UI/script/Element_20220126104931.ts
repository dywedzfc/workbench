export function resetElementTagData(data) {
  const td: any = { options: {}, defaultProps: {}, rawData: {} }
  td.options.class = []
  td.options.props = {}
  td.options.domProps = {}
  td.options.attrs = {}
  td.options.on = {}

  if (data) {
    td.tag = data.tag
    td.rawData.base = data.base
    td.rawData.attributes = data.attributes
    _.each(data.base, item => {
      if (item.name == 'text') td[item.name] = item.value
      else if (item.name == 'class') td.options.class = _.filter(item.value.split(' '))
      else if (item.value != '') td.options.attrs[item.name] = item.value
    })
    _.each(data.attributes, item => {
      if (item.name == 'icon' && item.value) td[item.name] = item.value
      if (item.value !== '') td.options.props[item.name] = item.value
      if (item.type == 'function')
        td.options.props[item.name] = this.writeFunction(item.value, item.name)
      td.defaultProps[item.name] = item.default
    })
    _.each(data.event, item => {
      if (item.value) td.options.on[item.name] = this.writeEvent(item.value, item.name) //() => eval(item.value)
    })
  }
  return td
}
