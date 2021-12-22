import { target, API } from 'nouislider';
import data from '../data';
import Sorted from './sort';

class LocalStorage {
  static saveData(filteredData) {
    localStorage.setItem('data', JSON.stringify(filteredData));
  }

  static saveFilters(activeFilters) {
    localStorage.setItem('filters', JSON.stringify(activeFilters));
  }

  static saveFavoriteFilterStatus(favoriteFilterStatus) {
    localStorage.setItem('favoriteFilter', JSON.stringify(favoriteFilterStatus));
  }

  static saveSortValue(sortValue) {
    localStorage.setItem('sort', JSON.stringify(sortValue));
  }

  static saveFavoritesCards(favoriteCards) {
    localStorage.setItem('favoriteCards', JSON.stringify(favoriteCards));
  }

  static loadFavoritesCards() {
    const loadedFavoriteCards = localStorage.getItem('favoriteCards');
    if (loadedFavoriteCards !== null) {
      return JSON.parse(loadedFavoriteCards);
    }
    return false;
  }

  static loadData() {
    const loadedData = localStorage.getItem('data');
    if (loadedData !== null) {
      return JSON.parse(loadedData);
    }
    return data;
  }

  static loadFilters() {
    const loadedFilters = localStorage.getItem('filters');
    if (loadedFilters !== null) {
      return JSON.parse(loadedFilters);
    }
    return false;
  }

  static loadFavoriteFilterStatus() {
    const favoriteStatus = localStorage.getItem('favoriteFilter');
    if (favoriteStatus !== null) {
      return JSON.parse(favoriteStatus);
    }
    return false;
  }

  static loadSortValue() {
    const sortOrder = localStorage.getItem('sort');
    if (sortOrder !== null) {
      return JSON.parse(sortOrder);
    }
    return false;
  }

  static loadSavedSettings() {
    const filtersBlock = document.querySelector('.filters') as HTMLElement;
    const rangeFiltersBlock = document.querySelector('.range') as HTMLElement;
    const countSlider = <target>rangeFiltersBlock.querySelector('.count-slider');
    const yearSlider = <target>rangeFiltersBlock.querySelector('.year-slider');
    const countOutputs = document.querySelectorAll<HTMLInputElement>('.count .slider-output');
    const yearsOutputs = document.querySelectorAll<HTMLInputElement>('.year .slider-output');
    const loadedFilters = this.loadFilters();
    Object.keys(loadedFilters).forEach((el) => {
      if (el === 'color' || el === 'shape' || el === 'size') {
        filtersBlock.querySelectorAll<HTMLElement>(`.${el} button`).forEach((elem) => {
          if (loadedFilters[el]
            .indexOf(elem.dataset.filter) !== -1 && loadedFilters[el].length !== 0) {
            elem.classList.add('active');
          }
        });
      } else if (el === 'count') {
        (<API>countSlider.noUiSlider).set(loadedFilters[el]);
        for (let i: number = 0; i < 2; i += 1) {
          countOutputs[i].value = Math.round(loadedFilters[el]).toString();
        }
      } else if (el === 'year') {
        (<API>yearSlider.noUiSlider).set(loadedFilters[el]);
        for (let i: number = 0; i < 2; i += 1) {
          yearsOutputs[i].value = Math.round(loadedFilters[el]).toString();
        }
      } else if (el === 'favorite') {
        (filtersBlock.querySelector('.favorite-input') as HTMLInputElement).checked = this.loadFavoriteFilterStatus();
      }
    });
  }

  static loadFavoriteCardsStyles() {
    const favoriteCounter = document.querySelector('.select span') as HTMLElement;
    if (this.loadFavoritesCards()) {
      const savedCardsNums = this.loadFavoritesCards();
      favoriteCounter.textContent = savedCardsNums.length;
      const cards = document.querySelectorAll<HTMLElement>('.card');
      for (let i: number = 0; i < cards.length; i += 1) {
        if (savedCardsNums.indexOf(Number(cards[i].dataset.number)) !== -1) {
          cards[i].classList.add('active');
        }
      }
    }
  }

  static loadSortedOrder() {
    if (this.loadSortValue()) {
      const sortOptions: Array<string> = ['sort-name-max', 'sort-name-min', 'sort-count-max', 'sort-count-min'];
      const sortTypesList = document.querySelector('.sort-select') as HTMLSelectElement;
      sortTypesList.selectedIndex = Number(this.loadSortValue());
      Sorted.sortCards(sortOptions[Number(this.loadSortValue())]);
    }
  }
}

export default LocalStorage;
