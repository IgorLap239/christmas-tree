import { target, API } from 'nouislider';
import { Filter } from '../interfaces';
import Filters from './filters';

class ClearFilters {
  static clearFilter() {
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
    Filters.useFilters(clearFilters);
  }

  static init() {
    const resetFilterButton = document.querySelector('.reset-filters') as HTMLElement;
    resetFilterButton.addEventListener('click', this.clearFilter);
  }
}

export default ClearFilters;
