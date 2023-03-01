import _ from 'lodash'

class Element {
  constructor(guide) {
    this.guide = guide

    return {
      ...this,
      setGuideActive: this.setGuideActive,
      setDataOptions: this.setDataOptions,
      setStructureOptions: this.setStructureOptions
    }
  }

  getGuide() {
    return this.guide
  }
  setGuideActive(value) {
    this.guide.active = value

    // console.info('data-t:', this.guide)
  }
  setDataOptions(data) {
    this.data = data
  }
  setStructureOptions(data) {
    this.structure = data
  }
  resetElementStructureData(structure) {
    const { data, active } = this.guide
    return _.map(data[active].structure, (item, index) => {
      const options = this.resetElementOption(structure)
      this.result.tagData = options.tagData
      const td = this.resetElementTagData(options.tagData[item.state])

      td.path = 'root/' + index
      return td
    })
  }

  // resetElementTagName
  resetElementOption(options) {
    const rightData = _.map(options.data, item => {
      item.tag = `el-${item.state}`
      item.data = this.resetElementValue(options[item.name])
      return item
    })

    const tagData = _.cloneDeep(this.result.tagData)
    _.each(options.el, item => {
      if (tagData[item]) return
      const data = _.filter(rightData, it => it.state == item)
      const attrs = {}
      _.each(data, item => (attrs[item.type] = item.data))
      tagData[item] = attrs
      tagData[item].tag = data[0].tag
      tagData[item].state = data[0].state
    })
    // console.info('data-tag-name:', rightData, options, tagData)
    return { data: rightData, tagData }
  }
  // resetElementTagAttrs
  resetElementValue(list) {
    return _.map(list, item => {
      if (item.default != null) item.value = item.default
      return item
    })
  }

  resetElementTagData(data) {
    const td = {}
    td.options = {}
    td.options.class = []
    td.options.props = {}
    td.options.domProps = {}
    td.options.attrs = {}
    td.options.on = {}
    td.defaultProps = {}
    td.rawData = {}

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
  },
}

export default Element
