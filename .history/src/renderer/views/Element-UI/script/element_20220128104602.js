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
      const options = this.resetElementTagName(structure)
      this.result.tagData = options.tagData
      const td = this.resetElementTagData(options.tagData[item.state])

      td.path = 'root/' + index
      return td
    })
  }

  resetElementTagName(options) {
    const rightData = _.map(options.data, item => {
      item.tag = `el-${item.state}`
      item.data = this.resetElementTagAttrs(options[item.name])
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
}

export default Element
