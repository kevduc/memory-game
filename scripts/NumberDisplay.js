class NumberDisplay {
  constructor(displayElement) {
    this.displayElement = displayElement
    this.value = null
  }

  render() {
    this.displayElement.innerText = this.value
  }

  setValue(value) {
    this.value = value
    this.render()
  }

  add(value) {
    this.value += value
    this.render()
  }
}

export default NumberDisplay
