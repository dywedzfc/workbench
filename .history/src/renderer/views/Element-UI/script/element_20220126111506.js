function Element(guide) {
  // constructor(guide) {
  this.guide = guide

  console.info('data-t:', guide, this.getGuide())
  // }
  function getGuide() {
    return this.guide
  }
  function setGuideActive(value) {
    this.guide.active = value

    console.info('data-t:', this.guide)
  }
  return {
    getGuide() {
      return this.guide
    },
    setGuideActive(value) {
      this.guide.active = value

      console.info('data-t:', this.guide)
    }
  }
}

export default Element
