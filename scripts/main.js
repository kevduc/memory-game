import { randUniq } from './utils.js'
import { fetchImages } from './images.js'

import Card from './Card.js'
import NumberDisplay from './NumberDisplay.js'
// import Game from "./game.js"

let cards = []
let score = null
let tries = null

document.addEventListener('DOMContentLoaded', async () => {
  const numCards = 24
  const numImages = numCards / 2
  const imageSize = 500 //px

  const images = await fetchImages(numImages, imageSize)

  const cardTemplate = document.querySelector('.card')
  cards = createCards(numCards, cardTemplate)

  score = new NumberDisplay(document.querySelector('.score'))

  tries = new NumberDisplay(document.querySelector('.tries'), 'try', 'tries')
  tries.setLabel(null)

  gameInit(cards, images)
})

function gameInit(cards, images) {
  score.setValue(0)

  const randomIndexes = randUniq(cards.length)

  for (let i = 0; i < randomIndexes.length; i++) {
    const card = cards[randomIndexes[i]]
    const imageIndex = Math.floor(i / 2)
    const url = images[imageIndex].download_url

    card.setBackImageURL(url)
    card.setId(imageIndex)
  }
}

function createCards(n, cardTemplateElement) {
  const cards = new Array(n)
  const cardsContainer = cardTemplateElement.parentElement

  let cardElement = cardTemplateElement
  let i = 0

  while (true) {
    let card = (cards[i] = new Card(cardElement))
    cardElement.addEventListener('click', () => cardClick(card))
    card.enable()

    if (++i === n) break

    cardElement = cardElement.cloneNode(true)
    cardsContainer.append(cardElement)
  }

  return cards
}

const cardsClicked = []
let numCardsClicked = 0
let processing = false

function cardClick(card) {
  if (processing) return

  if (!card.click()) return

  numCardsClicked++
  cardsClicked[numCardsClicked - 1] = card

  if (numCardsClicked >= 2) {
    processing = true

    const remainingCards = cards.filter((card) => card.enabled)
    remainingCards.forEach((card) => card.disable())

    const cleanUp = () => {
      cardsClicked.forEach((card) => card.deselect())
      remainingCards.forEach((card) => card.enable())
      processing = false
    }

    numCardsClicked = 0

    if (cardsClicked[0].id === cardsClicked[1].id) {
      score.add(1)

      setTimeout(cleanUp, 1000)
    } else {
      tries.add(1)

      setTimeout(() => {
        cardsClicked.forEach((card) => card.flip())
        setTimeout(cleanUp, 1000)
      }, 1500)
    }
  }
}
