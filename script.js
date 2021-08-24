document.addEventListener('DOMContentLoaded', () => {
  let seed = 1

  document.querySelectorAll('.card').forEach((card) => {
    card.querySelector('.card__face--back').style.backgroundImage = `url('https://picsum.photos/seed/${seed++}/500')`

    card.addEventListener('click', () => {
      document.querySelector('.card--selected')?.classList.remove('card--selected')
      card.classList.add('card--selected')
      card.classList.toggle('card--flipped')
    })
  })
})
