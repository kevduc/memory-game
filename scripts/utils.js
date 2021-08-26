function randInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min
}

const randUniq = (n) => {
  const arr = new Array(n).fill().map((_, i) => i)

  for (let i = 0; i < n - 1; i++) {
    const randIndex = randInt(i, n - 1)
    ;[arr[i], arr[randIndex]] = [arr[randIndex], arr[i]]
  }

  return arr
}

const fetchJSON = async (url) => await (await fetch(url)).json()

export { randInt, randUniq, fetchJSON }
