/* eslint-disable consistent-return */
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
    const activeFilters: Filter = {
      shape: [],
      color: [],
      size: [],
      year: [],
      count: [],
    };
    filtersBlock.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('filter-btn')) {
        const filterName: string = (target.parentElement as HTMLElement).className;
        if (!target.classList.contains('active')) {
          activeFilters[filterName].push(target.dataset.filter);
        } else {
          activeFilters[filterName].splice(activeFilters[filterName]
            .indexOf(target.dataset.filter), 1);
        }
        target.classList.toggle('active');
        const newData = data.filter((el) => this.colorFilter(el, activeFilters.color)
          && this.shapeFilter(el, activeFilters.shape)
          && this.sizeFilter(el, activeFilters.size));
        this.clearToys();
        ToysCards.render(newData);
        LocalStorage.saveData(newData, activeFilters);
      }
    });
  }

  static clearToys() {
    const allCards = document.querySelectorAll<HTMLElement>('.card');
    allCards.forEach((e) => e.remove());
  }

  static clearFilter() {

  }
}

export default Filters;
