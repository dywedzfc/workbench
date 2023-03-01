class Element {
  constructor(guide) {
    this.guide = guide

    return { ...this, setGuideActive: this.setGuideActive }
  }

  getGuide() {
    return this.guide
  }
  setGuideActive(value) {
    this.guide.active = value

    console.info('data-t:', this.guide)
  }
}

export default Element
