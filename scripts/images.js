import { randInt, fetchJSON } from './utils.js'

const numImagesMax = 100

const fetchImages = async (n, size) => {
  const pageNum = randInt(1, Math.floor(numImagesMax / n))
  const images = await fetchJSON(`https://picsum.photos/v2/list?page=${pageNum}&limit=${n}`)

  // Change all image urls to request the right size
  images.forEach((image) => (image.download_url = image.download_url.replace(/\d+\/\d+$/, `${size}`)))

  return images
}

export { fetchImages }
