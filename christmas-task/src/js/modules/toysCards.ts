/* eslint-disable consistent-return */
import data from '../data';
import { Filters } from '../interfaces';
import { Data } from '../interfaces';

class ToysCards {
  static render(toysData = this.loadData()) {
    const cardContainer = document.querySelector('.card-container') as HTMLElement;
    toysData.forEach((e) => {
      const card = document.createElement('div') as HTMLElement;
      let favoriteText: string = '';
      if (e.favorite === false) {
        favoriteText = 'Нет';
      } else {
        favoriteText = 'Да';
      }
      card.classList.add('card');
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

  static colorFilter(dataElement: Data, colorFilters: Array<string>) {
    if (colorFilters.length !== 0) {
      if (colorFilters.indexOf(dataElement.color) !== -1) {
        return dataElement;
      }
    } else {
      return true;
    }
  }

  static shapeFilter(dataElement: Data, shapeFilters: Array<string>) {
    if (shapeFilters.length !== 0) {
      if (shapeFilters.indexOf(dataElement.shape) !== -1) {
        return dataElement;
      }
    } else {
      return true;
    }
  }

  static sizeFilter(dataElement: Data, sizeFilters: Array<string>) {
    if (sizeFilters.length !== 0) {
      if (sizeFilters.indexOf(dataElement.size) !== -1) {
        return dataElement;
      }
    } else {
      return true;
    }
  }

  static countFilter(dataElement: Data, countFilters: Array<string>) {
    if (countFilters.length !== 0) {
      if (countFilters.indexOf(dataElement.count) !== -1) {
        return dataElement;
      }
    } else {
      return true;
    }
  }

  static yearFilter(dataElement: Data, yearFilters: Array<string>) {
    if (yearFilters.length !== 0) {
      if (yearFilters.indexOf(dataElement.year) !== -1) {
        return dataElement;
      }
    } else {
      return true;
    }
  }

  static filter() {
    const filtersBlock = document.querySelector('.filters') as HTMLElement;
    const activeFilters: Filters = {
      shape: [],
      color: [],
      size: [],
      year: [],
      count: [],
    };
    filtersBlock.addEventListener('click', (e) => {
      // const filteredData: Array<object> = this.loadData();
      const target = e.target as HTMLElement;
      if (target.classList.contains('filter-btn')) {
        const filterName: string = (target.parentElement as HTMLElement).className;
        if (!target.classList.contains('active')) {
          activeFilters[filterName].push(target.dataset.filter);
        } else {
          activeFilters[filterName].splice(activeFilters[filterName].indexOf(target.dataset.filter), 1);
        }
        target.classList.toggle('active');
        const newData = data.filter((el) => this.colorFilter(el, activeFilters.color)
           && this.shapeFilter(el, activeFilters.shape)
           && this.sizeFilter(el, activeFilters.size));
        this.clearToys();
        this.render(newData);
        this.saveData(newData, activeFilters);
      }
    });
  }

  static clearToys() {
    const allCards = document.querySelectorAll<HTMLElement>('.card');
    allCards.forEach((e) => e.remove());
  }

  static saveData(filteredData, activeFilters) {
    localStorage.setItem('data', JSON.stringify(filteredData));
    localStorage.setItem('filters', JSON.stringify(activeFilters));
  }

  static loadData() {
    const checkedData = localStorage.getItem('data');
    if (checkedData !== null) {
      return JSON.parse(checkedData);
    }
    return data;
  }

  static clearFilter() {

  }
}

export default ToysCards;
