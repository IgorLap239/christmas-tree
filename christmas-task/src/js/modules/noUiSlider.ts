import noUiSlider, { target } from 'nouislider';

class RangeSlider {
  static createCountSlider() {
    const countSlider = <target>document.querySelector('.count-slider');
    noUiSlider.create(countSlider, {
      start: [1, 12],
      connect: true,
      step: 1,
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
      step: 10,
      range: {
        min: 1940,
        max: 2020,
      },
    });
  }
}

export default RangeSlider;
