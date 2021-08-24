const numCards = 24
const imageSize = 500

const numImages = numCards / 2
const numImagesMax = 100
const pageNum = Math.floor(Math.floor(numImagesMax / numImages) * Math.random()) + 1

const fetchJSON = async (url) => await (await fetch(url)).json()

document.addEventListener('DOMContentLoaded', async () => {
  const images = await fetchJSON(`https://picsum.photos/v2/list?page=${pageNum}&limit=${numImages}`)

  // Change all image urls to request the right size (imageSize)
  images.forEach((image) => (image.download_url = image.download_url.replace(/\d+\/\d+$/, `${imageSize}`)))

  let card = document.querySelector('.card')
  const cardContainer = card.parentElement

  let i = 0
  while (true) {
    card.addEventListener('click', function () {
      document.querySelector('.card--selected')?.classList.remove('card--selected')
      this.classList.add('card--selected')
      this.classList.toggle('card--flipped')
    })

    const cardBack = card.querySelector('.card__face--back')
    cardBack.style.backgroundImage = `url('https://picsum.photos/seed/${i + 1}/500')`

    if (++i === numCards) break

    card = card.cloneNode(true)
    cardContainer.append(card)
  }
})
