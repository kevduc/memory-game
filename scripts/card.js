class Card {
  constructor(cardElement) {
    this.cardElement = cardElement
    this.backElement = cardElement.querySelector('[class*=back]')

    this.flipped = false
    this.selected = false
    this.enabled = true

    this.id = null
  }

  setId(id) {
    this.id = id
  }

  setBackImageURL(url) {
    this.backElement.style.backgroundImage = `url(${url})`
  }

  updateClass(stateName) {
    this.cardElement.classList[this[stateName] ? 'add' : 'remove'](`card--${stateName}`)
  }

  updateDisplay() {
    ;['selected', 'enabled', 'flipped'].forEach((stateName) => this.updateClass(stateName))
  }

  setState(stateName, value) {
    this[stateName] = value
    this.updateDisplay()
  }

  flip() {
    this.setState('flipped', !this.flipped)
    this.setState('enabled', !this.flipped)
  }

  select() {
    this.setState('selected', true)
  }

  deselect() {
    this.setState('selected', false)
  }

  enable() {
    this.setState('enabled', true)
  }

  disable() {
    this.setState('enabled', false)
  }

  // For debug
  show() {
    this.cardElement.style.outline = '5px solid red'
    setTimeout(() => {
      this.cardElement.style.outline = ''
    }, 1500)
  }

  click() {
    if (!this.enabled) return false
    this.select()
    this.flip()
    return true
  }
}

export default Card
