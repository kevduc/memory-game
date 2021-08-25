class Card {
  constructor(cardElement) {
    this.cardElement = cardElement
    this.backElement = cardElement.querySelector('[class*=back]')
    this.flipped = false
    this.selected = false
  }

  setBackImageUrl(url) {
    this.backElement.style.backgroundImage = `url(${url})`
  }

  set flipped(tf) {
    this.cardElement.classList[tf ? 'add' : 'remove']('card--flipped')
  }

  set selected(tf) {
    this.cardElement.classList[tf ? 'add' : 'remove']('card--selected')
  }

  flip() {
    this.flipped = !this.flipped
  }

  select() {
    this.selected = true
  }

  deselect() {
    this.selected = false
  }
}

export default Card
