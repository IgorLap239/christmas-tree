import { Data } from '../interfaces';
import data from '../data';
import LocalStorage from './localStorage';

class FavoritesBlock {
  static render() {
    const favoriteContainer = document.querySelector('.favorites-container') as HTMLElement;
    const defaultData: number[] = new Array(20);

    for (let i: number = 1; i <= defaultData.length; i += 1) {
      defaultData[i - 1] = i;
    }

    let favoritesData: number[] = [];

    if (LocalStorage.loadFavoritesCards() && LocalStorage.loadFavoritesCards().length !== 0) {
      favoritesData = LocalStorage.loadFavoritesCards();

      const favoriteCounter = document.querySelector('.select span') as HTMLElement;

      favoriteCounter.textContent = LocalStorage.loadFavoritesCards().length;
    } else {
      favoritesData = defaultData;
    }
    let cardsCounter = 1;

    data.forEach((el: Data) => {
      if (favoritesData.indexOf(Number(el.num)) !== -1) {
        const card = document.createElement('div') as HTMLElement;
        card.classList.add('favorites-card');
        card.dataset.num = cardsCounter.toString();

        const cardCounter = document.createElement('p') as HTMLElement;
        cardCounter.classList.add('favorites-count');

        card.append(cardCounter);
        cardCounter.textContent = el.count;

        for (let i: number = 0; i < Number(el.count); i += 1) {
          const cardImg = document.createElement('img') as HTMLImageElement;
          cardImg.classList.add('favorites-card-img');
          cardImg.src = `./assets/toys/${el.num}.png`;
          cardImg.alt = 'toy';
          cardImg.id = `${cardsCounter}-${i}`;
          cardImg.draggable = true;
          cardImg.dataset.imgnum = cardsCounter.toString();
          card.append(cardImg);
        }

        cardsCounter += 1;
        favoriteContainer.append(card);
      }
    });
  }
}

export default FavoritesBlock;
