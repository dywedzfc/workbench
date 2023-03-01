function Element(guide) {
  // constructor(guide) {
  this.guide = guide

  console.info('data-t:', guide, getGuide())
  // }
  function getGuide() {
    return this.guide
  }
  function setGuideActive(value) {
    this.guide.active = value

    console.info('data-t:', this.guide)
  }
  return {
    getGuide,
    setGuideActive
  }
}

export default Element
