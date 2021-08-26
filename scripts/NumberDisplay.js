class NumberDisplay {
  constructor(displayElement, labelSingular = null, labelPlural = null) {
    this.displayElement = displayElement
    this.labelElement = document.querySelector(`[for="${this.displayElement.id}"]`)
    
    const value = parseInt(this.displayElement.innerText)
    this.value = isNaN(value) ? null : value
    
    this.label = this.labelElement.innerText || null
    this.labelPlurality = { false: labelSingular, true: labelPlural }
  }

  render() {
    this.displayElement.innerText = this.value
    if (this.labelElement != null) {
      const label = this.label || this.labelPlurality[this.value > 1]
      if (label !== null) this.labelElement.innerText = label
    }
  }

  setValue(value) {
    this.value = value
    this.render()
  }

  setLabel(label) {
    this.label = label
    this.render()
  }

  add(value) {
    this.value += value
    this.render()
  }
}

export default NumberDisplay
