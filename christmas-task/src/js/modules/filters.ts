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

  static filter() {
    const filtersBlock = document.querySelector('.filters') as HTMLElement;
    const countSlider = <target>document.querySelector('.count-slider');
    const yearSlider = <target>document.querySelector('.year-slider');
    const countOutputs = document.querySelectorAll<HTMLInputElement>('.count .slider-output');
    const yearsOutputs = document.querySelectorAll<HTMLInputElement>('.year .slider-output');
    const activeFilters: Filter = {
      shape: [],
      color: [],
      size: [],
      year: [],
      count: [],
    };
    filtersBlock.addEventListener('click', (e) => {
      const targ = e.target as HTMLElement;
      if (targ.classList.contains('filter-btn')) {
        const filterName: string = (targ.parentElement as HTMLElement).className;
        if (!targ.classList.contains('active')) {
          activeFilters[filterName].push(targ.dataset.filter);
        } else {
          activeFilters[filterName].splice(activeFilters[filterName]
            .indexOf(targ.dataset.filter), 1);
        }
        targ.classList.toggle('active');
        const newData = data.filter((el) => this.colorFilter(el, activeFilters.color)
          && this.shapeFilter(el, activeFilters.shape)
          && this.countFilter(el, activeFilters.count)
          && this.yearFilter(el, activeFilters.year)
          && this.sizeFilter(el, activeFilters.size));
        this.clearToys();
        ToysCards.render(newData);
        LocalStorage.saveData(newData, activeFilters);
      }
    });
    (<API>countSlider.noUiSlider).on('update', (values: unknown) => {
      for (let i: number = 0; i < 2; i += 1) {
        countOutputs[i].value = Math.round((values as Array<number>)[i]).toString();
      }
      activeFilters.count = (values as Array<number>);
      const newData = data.filter((el) => this.colorFilter(el, activeFilters.color)
        && this.shapeFilter(el, activeFilters.shape)
        && this.countFilter(el, activeFilters.count)
        && this.yearFilter(el, activeFilters.year)
        && this.sizeFilter(el, activeFilters.size));
      this.clearToys();
      ToysCards.render(newData);
      LocalStorage.saveData(newData, activeFilters);
    });
    (<API>yearSlider.noUiSlider).on('update', (values: unknown) => {
      for (let i: number = 0; i < 2; i += 1) {
        yearsOutputs[i].value = Math.round((values as Array<number>)[i]).toString();
      }
      activeFilters.year = (values as Array<number>);
      const newData = data.filter((el) => this.colorFilter(el, activeFilters.color)
        && this.shapeFilter(el, activeFilters.shape)
        && this.countFilter(el, activeFilters.count)
        && this.yearFilter(el, activeFilters.year)
        && this.sizeFilter(el, activeFilters.size));
      this.clearToys();
      ToysCards.render(newData);
      LocalStorage.saveData(newData, activeFilters);
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
