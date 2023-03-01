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

    console.info('data-t:', this.guide)
  }
  setDataOptions(data) {
    this.data = data
  }
  setStructureOptions(data) {
    this.structure = data
  }
}

export default Element
