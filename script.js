function randInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min
}

const fetchJSON = async (url) => await (await fetch(url)).json()

const randUniq = (n) => {
  const arr = new Array(n).fill().map((_, i) => i)

  for (let i = 0; i < n - 1; i++) {
    const randIndex = randInt(0, n - i - 1)
    ;[arr[i], arr[randIndex]] = [arr[randIndex], arr[i]]
  }

  return arr
}

const numCards = 24
const imageSize = 500

const numImages = numCards / 2
const numImagesMax = 100
const pageNum = randInt(1, Math.floor(numImagesMax / numImages))

document.addEventListener('DOMContentLoaded', async () => {
  const images = await fetchJSON(`https://picsum.photos/v2/list?page=${pageNum}&limit=${numImages}`)

  // Change all image urls to request the right size (imageSize)
  images.forEach((image) => (image.download_url = image.download_url.replace(/\d+\/\d+$/, `${imageSize}`)))

  let card = document.querySelector('.card')
  const cardContainer = card.parentElement

  let i = 0

  while (true) {
    card.addEventListener('click', cardClick)

    if (++i === numCards) break

    card = card.cloneNode(true)
    cardContainer.append(card)
  }

  const cardBacks = document.querySelectorAll('.card__face--back')
  const randomIndexes = randUniq(numCards)

  for (let i = 0; i < randomIndexes.length; i++) {
    const cardBack = cardBacks[randomIndexes[i]]
    const imageIndex = Math.floor(i / 2)
    cardBack.style.backgroundImage = `url('${images[imageIndex].download_url}')`
  }
})

function cardClick() {
  document.querySelector('.card--selected')?.classList.remove('card--selected')
  this.classList.add('card--selected')
  this.classList.toggle('card--flipped')
}
