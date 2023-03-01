class Element {
  constructor(guide) {
    this.guide = guide

    console.info('data-t:', guide)
  }

  set guideActive(value) {
    this.guide.active = value

    console.info('data-t:', this.guide)
  }
}

export default Element
