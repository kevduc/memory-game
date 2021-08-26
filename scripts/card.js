class Card {
  constructor(cardElement) {
    this.cardElement = cardElement
    this.backElement = cardElement.querySelector('[class*=back]')

    this.flipped = false
    this.selected = false
    this.disabled = false

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

  render() {
    ;['selected', 'disabled', 'flipped'].forEach((stateName) => this.updateClass(stateName))
  }

  setState(stateName, value) {
    this[stateName] = value
    this.render()
  }

  flip() {
    this.setState('flipped', !this.flipped)
    this.setState('disabled', this.flipped)
  }

  static zIndex = 0

  select() {
    this.setState('selected', true)
    this.cardElement.style.setProperty('z-index', ++Card.zIndex)
  }

  deselect() {
    this.setState('selected', false)
    this.cardElement.style.removeProperty('z-index')
  }

  enable() {
    this.setState('disabled', false)
  }

  disable() {
    this.setState('disabled', true)
  }

  click() {
    if (this.disabled) return false
    this.select()
    this.flip()
    return true
  }

  // For debug
  show() {
    this.cardElement.style.outline = '4px solid red'
    setTimeout(() => {
      this.cardElement.style.outline = ''
    }, 1500)
  }
}

export default Card
