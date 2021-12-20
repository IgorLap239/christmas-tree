import { Data } from '../interfaces';
import LocalStorage from './localStorage';

class ToysCards {
  static render(toysData = LocalStorage.loadData()) {
    const cardContainer = document.querySelector('.card-container') as HTMLElement;
    toysData.forEach((e: Data) => {
      const card = document.createElement('div') as HTMLElement;
      let favoriteText: string = '';
      if (e.favorite === false) {
        favoriteText = 'Нет';
      } else {
        favoriteText = 'Да';
      }
      card.classList.add('card');
      card.dataset.number = e.num;
      card.innerHTML = `
      <h2 class="card-title">${e.name}</h2>
      <img class="card-img" src="assets/toys/${e.num}.png" alt="toy">
      <div class="card-description">
        <p class="count">Количество:<span>${e.count}</span></p>
        <p class="year">Год покупки:<span>${e.year}</span></p>
        <p class="shape">Форма:<span>${e.shape}</span></p>
        <p class="color">Цвет:<span>${e.color}</span></p>
        <p class="size">Размер:<span>${e.size}</span></p>
        <p class="favorite">Любимая:<span>${favoriteText}</span></p>
      </div>
      <div class="ribbon"></div>`;
      cardContainer.append(card);
    });
  }
}

export default ToysCards;
