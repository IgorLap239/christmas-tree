import ToysCards from './toysCards';

class ToysPage {
  static render() {
    const fragment = document.createDocumentFragment();
    const footer = document.querySelector('.footer') as HTMLElement;
    const mainPageContainer = document.createElement('div') as HTMLElement;
    mainPageContainer.classList.add('page', 'main-page');
    mainPageContainer.innerHTML = `
      <div class="blur">
        <div class="controls">
          <div class="filters">
              <div class="controls-title">Фильтры по значению</div>
              <div class="shape">Форма:
                <button class="filter-btn" data-filter="шар"></button>
                <button class="filter-btn" data-filter="колокольчик"></button>
                <button class="filter-btn" data-filter="шишка"></button>
                <button class="filter-btn" data-filter="снежинка"></button>
                <button class="filter-btn" data-filter="фигурка"></button>
              </div>
              <div class="color">Цвет:
                <button class="filter-btn" data-filter="белый"></button>
                <button class="filter-btn" data-filter="желтый"></button>
                <button class="filter-btn" data-filter="красный"></button>
                <button class="filter-btn" data-filter="синий"></button>
                <button class="filter-btn" data-filter="зелёный"></button>
              </div>
              <div class="size">Размер:
                <button class="filter-btn" data-filter="большой"></button>
                <button class="filter-btn" data-filter="средний"></button>
                <button class="filter-btn" data-filter="малый"></button>
              </div>
              <div class="favorite-container">Только любимые:
                <div class="form-group">
                  <input type="checkbox" class="favorite-input" id="checkbox" />
                  <label for="checkbox" class="favorite-input-label"></label>
                </div>
              </div>
            </div>
            <div class="range">
              <div class="controls-title">Фильтры по диапазону</div>
              <div class="count">
                <span class="control-span">Количество экземпляров:</span> 
                <div class="count-slider-container">
                  <output class="slider-output">1</output>
                  <div class="count-slider"></div>
                  <output class="slider-output">12</output>
                </div>
              </div>
              <div class="year">
                <span class="control-span">Год приобретения:</span> 
                <div class="year-slider-container">
                  <output class="slider-output">1940</output>
                  <div class="year-slider"></div>
                  <output class="slider-output">2020</output>
                </div>
              </div>
            </div>
            <div class="sort">
              <div class="controls-title">Сортировка</div>
              <select class="sort-select">
                <option selected value="sort-name-max">По названию от «А» до «Я»</option>
                <option value="sort-name-min">По названию от «Я» до «А»</option>
                <option value="sort-count-max">По количеству по возрастанию</option>
                <option value="sort-count-min">По количеству по убыванию</option>
              </select>
              <button class="reset">Сброс фильтров</button>
            </div>
          </div>
        <div class="card-container"></div>
      </div>`;
    fragment.append(mainPageContainer);
    footer.before(fragment);
    ToysCards.render();
    ToysCards.filter();
  }

  static remove() {
    const mainPageContainer = document.querySelector('.main-page') as HTMLElement;
    mainPageContainer.remove();
  }
}

export default ToysPage;
