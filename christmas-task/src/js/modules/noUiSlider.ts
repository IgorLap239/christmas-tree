import noUiSlider from 'nouislider';

class RangeSlider {
  static createCountSlider() {
    const countSlider = document.querySelector('.count-slider') as HTMLElement;
    noUiSlider.create(countSlider, {
      start: [1, 12],
      connect: true,
      range: {
        min: 1,
        max: 12,
      },
    });
  }

  static createYearSlider() {
    const yearSlider = document.querySelector('.year-slider') as HTMLElement;
    noUiSlider.create(yearSlider, {
      start: [1940, 2020],
      connect: true,
      range: {
        min: 1940,
        max: 2020,
      },
    });
  }
}

export default RangeSlider;
