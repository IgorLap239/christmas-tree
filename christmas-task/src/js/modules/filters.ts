/* eslint-disable consistent-return */
import { target, API } from 'nouislider';
import data from '../data';
import { Filter, Data } from '../interfaces';
import ToysCards from './toysCards';
import LocalStorage from './localStorage';

class Filters {
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

  static countFilter(dataElement: Data, countFilters: Array<number>) {
    if (countFilters.length !== 0) {
      if (countFilters[0] <= Number(dataElement.count)
      && countFilters[1] >= Number(dataElement.count)) {
        return dataElement;
      }
    } else {
      return true;
    }
  }

  static yearFilter(dataElement: Data, yearFilters: Array<number>) {
    if (yearFilters.length !== 0) {
      if (yearFilters[0] <= Number(dataElement.year)
      && yearFilters[1] >= Number(dataElement.year)) {
        return dataElement;
      }
    } else {
      return true;
    }
  }

  static favoriteFilter(dataElement: Data, favoriteFilter: boolean) {
    if (favoriteFilter === true) {
      if (dataElement.favorite === favoriteFilter) {
        return dataElement;
      }
    } else {
      return true;
    }
  }

  static useFilters(filters) {
    const newData = data.filter((el) => this.colorFilter(el, filters.color)
        && this.shapeFilter(el, filters.shape)
        && this.countFilter(el, filters.count)
        && this.yearFilter(el, filters.year)
        && this.favoriteFilter(el, filters.favorite)
        && this.sizeFilter(el, filters.size));
    this.clearToys();
    ToysCards.render(newData);
    LocalStorage.loadFavoriteCardsStyles();
    LocalStorage.saveData(newData);
    LocalStorage.saveFilters(filters);
  }

  static addFilters() {
    if (LocalStorage.loadFilters()) {
      return LocalStorage.loadFilters();
    }
    const activeFilters: Filter = {
      shape: [],
      color: [],
      size: [],
      year: [],
      count: [],
      favorite: false,
    };
    return activeFilters;
  }

  static filter() {
    const filtersBlock = document.querySelector('.filters') as HTMLElement;
    const favoriteFilterCheck = filtersBlock.querySelector('.favorite-input') as HTMLInputElement;
    const countSlider = <target>document.querySelector('.count-slider');
    const yearSlider = <target>document.querySelector('.year-slider');
    const countOutputs = document.querySelectorAll<HTMLInputElement>('.count .slider-output');
    const yearsOutputs = document.querySelectorAll<HTMLInputElement>('.year .slider-output');
    const activeFilters = this.addFilters();
    filtersBlock.addEventListener('click', (e: Event) => {
      const targ = e.target as HTMLElement;
      if (targ.classList.contains('filter-btn')) {
        const filterName: string = (targ.parentElement as HTMLElement).className;
        if (!targ.classList.contains('active')) {
          targ.classList.add('active');
          activeFilters[filterName].push(targ.dataset.filter);
        } else {
          activeFilters[filterName].splice(activeFilters[filterName]
            .indexOf(targ.dataset.filter), 1);
          targ.classList.remove('active');
        }
        this.useFilters(activeFilters);
      }
    });
    favoriteFilterCheck.addEventListener('change', () => {
      if (favoriteFilterCheck.checked) {
        activeFilters.favorite = true;
      } else {
        activeFilters.favorite = false;
      }
      LocalStorage.saveFavoriteFilterStatus(favoriteFilterCheck.checked);
      this.useFilters(activeFilters);
    });
    (<API>countSlider.noUiSlider).on('update', (values: unknown) => {
      for (let i: number = 0; i < 2; i += 1) {
        countOutputs[i].value = Math.round((values as Array<number>)[i]).toString();
      }
      activeFilters.count = (values as Array<number>);
      this.useFilters(activeFilters);
    });
    (<API>yearSlider.noUiSlider).on('update', (values: unknown) => {
      for (let i: number = 0; i < 2; i += 1) {
        yearsOutputs[i].value = Math.round((values as Array<number>)[i]).toString();
      }
      activeFilters.year = (values as Array<number>);
      this.useFilters(activeFilters);
    });
  }

  static clearToys() {
    const allCards = document.querySelectorAll<HTMLElement>('.card');
    allCards.forEach((e) => e.remove());
  }
  /* static clearFilter() {

  } */
}

export default Filters;
