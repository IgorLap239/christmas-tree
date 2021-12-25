import { target, API } from 'nouislider';
import { Filter } from '../interfaces';
import data from '../data';
import Sorted from './sort';
import Filters from './filters';

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

  static saveTree(tree) {
    localStorage.setItem('tree', JSON.stringify(tree));
  }

  static saveTreeBackground(background) {
    localStorage.setItem('treeBackground', JSON.stringify(background));
  }

  static saveSnowfallStatus(snowfall) {
    localStorage.setItem('snowfall', JSON.stringify(snowfall));
  }

  static saveAudioStatus(audioStatus) {
    localStorage.setItem('audio', JSON.stringify(audioStatus));
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

  static loadTree() {
    const loadedTree = localStorage.getItem('tree');
    if (loadedTree !== null) {
      return JSON.parse(loadedTree);
    }
    return false;
  }

  static loadTreeBackground() {
    const loadedBackground = localStorage.getItem('treeBackground');
    if (loadedBackground !== null) {
      return JSON.parse(loadedBackground);
    }
    return false;
  }

  static loadSnowfall() {
    const loadedSnowfall = localStorage.getItem('snowfall');
    if (loadedSnowfall !== null) {
      return JSON.parse(loadedSnowfall);
    }
    return false;
  }

  static loadAudioStatus() {
    const loadedAudio = localStorage.getItem('audio');
    if (loadedAudio !== null) {
      return JSON.parse(loadedAudio);
    }
    return false;
  }

  static clearLocalStorage() {
    const rangeFiltersBlock = document.querySelector('.range') as HTMLElement;
    const countSlider = <target>rangeFiltersBlock.querySelector('.count-slider');
    const yearSlider = <target>rangeFiltersBlock.querySelector('.year-slider');
    const countOutputs = document.querySelectorAll<HTMLInputElement>('.count .slider-output');
    const yearsOutputs = document.querySelectorAll<HTMLInputElement>('.year .slider-output');
    const filtersBlock = document.querySelector('.filters') as HTMLElement;
    const favoriteFilterCheck = filtersBlock.querySelector('.favorite-input') as HTMLInputElement;
    const favoriteFilterLabel = filtersBlock.querySelector('.favorite-input-label') as HTMLElement;
    const filtersButtons = document.querySelectorAll<HTMLElement>('.filter-btn');
    const clearFilters: Filter = {
      shape: [],
      color: [],
      size: [],
      year: [1940, 2020],
      count: [1, 12],
      favorite: false,
    };
    const resetLocalButton = document.querySelector('.reset-local') as HTMLElement;
    resetLocalButton.addEventListener('click', () => {
      if (favoriteFilterCheck.checked) {
        favoriteFilterCheck.checked = false;
        favoriteFilterLabel.classList.remove('check');
      }
      filtersButtons.forEach((e) => {
        if (e.classList.contains('active')) {
          e.classList.remove('active');
        }
      });
      (<API>countSlider.noUiSlider).set([1, 12]);
      countOutputs[0].value = '1';
      countOutputs[1].value = '12';
      (<API>yearSlider.noUiSlider).set([1940, 2020]);
      yearsOutputs[0].value = '1940';
      yearsOutputs[1].value = '2020';
      this.saveSortValue(0);
      this.loadSortedOrder();
      localStorage.clear();
      Filters.useFilters(clearFilters);
    });
  }
}

export default LocalStorage;
