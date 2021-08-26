class Card {
  constructor(cardElement) {
    this.cardElement = cardElement
    this.backElement = cardElement.querySelector('[class*=back]')

    this.id = null

    this.state = {
      flipped: false,
      selected: false,
      disabled: false,
      found: false,
    }
  }

  setId(id) {
    this.id = id
  }

  setBackImageURL(url) {
    this.backElement.style.backgroundImage = `url(${url})`
  }

  updateClass(name) {
    this.cardElement.classList[this.state[name] ? 'add' : 'remove'](`card--${name}`)
  }

  render() {
    Object.keys(this.state).forEach((key) => this.updateClass(key))
  }

  setState(state) {
    this.state = { ...this.state, ...state }
    this.render()
  }

  flip() {
    const { flipped } = this.state
    this.setState({ flipped: !flipped, disabled: flipped })
  }

  static zIndex = 0

  select() {
    this.setState({ selected: true })
    this.cardElement.style.setProperty('z-index', ++Card.zIndex)
  }

  deselect() {
    this.setState({ selected: false })

    this.cardElement.style.removeProperty('z-index')
  }

  enable() {
    this.setState({ disabled: false })
  }

  disable() {
    this.setState({ disabled: true })
  }

  click() {
    const { disabled } = this.state
    if (disabled) return false
    this.select()
    this.flip()
    return true
  }

  found() {
    this.setState({ found: true })
  }

  is(state) {
    return this.state[state]
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
