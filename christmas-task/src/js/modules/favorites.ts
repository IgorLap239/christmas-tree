import LocalStorage from './localStorage';

class Favorites {
  static setFavoriteItem() {
    const favoriteCounter = document.querySelector('.select span') as HTMLElement;
    let counter: number = Number(favoriteCounter.textContent);
    const cardsContainer = document.querySelector('.card-container') as HTMLElement;
    // eslint-disable-next-line consistent-return
    cardsContainer.addEventListener('click', (e: Event) => {
      const favoritesCards: Array<number> = LocalStorage.loadFavoritesCards() || [];
      counter = favoritesCards.length;
      const target = e.target as HTMLElement;
      if (target.classList.contains('ribbon')) {
        const card = (target.closest('.card') as HTMLTemplateElement);
        if (!card.classList.contains('active')) {
          if (counter === 20) {
            // eslint-disable-next-line no-alert
            return alert('Больше 20 игрушек в избранное добавить нельзя');
          }
          favoritesCards.push(Number(card.dataset.number));
          LocalStorage.saveFavoritesCards(favoritesCards);
          counter += 1;
          favoriteCounter.textContent = counter.toString();
        } else {
          counter -= 1;
          favoritesCards.splice(favoritesCards.indexOf(Number(card.dataset.number)), 1);
          LocalStorage.saveFavoritesCards(favoritesCards);
          favoriteCounter.textContent = counter.toString();
        }
        (target.closest('.card') as HTMLTemplateElement).classList.toggle('active');
      }
    });
  }
}

export default Favorites;
