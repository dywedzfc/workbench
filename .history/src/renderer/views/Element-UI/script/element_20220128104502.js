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
}

export default Element
