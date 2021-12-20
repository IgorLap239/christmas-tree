class Favorites {
  static setFavoriteItem() {
    const favoriteCounter = document.querySelector('.select span') as HTMLElement;
    let counter: number = Number(favoriteCounter.textContent);
    const cardsContainer = document.querySelector('.card-container') as HTMLElement;
    // eslint-disable-next-line consistent-return
    cardsContainer.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('ribbon')) {
        if (!(target.closest('.card') as HTMLTemplateElement).classList.contains('active')) {
          if (counter === 20) {
            // eslint-disable-next-line no-alert
            return alert('Больше 20 игрушек в избранное добавить нельзя');
          }
          counter += 1;
          favoriteCounter.textContent = counter.toString();
        } else {
          counter -= 1;
          favoriteCounter.textContent = counter.toString();
        }
        (target.closest('.card') as HTMLTemplateElement).classList.toggle('active');
      }
    });
  }
}

export default Favorites;
