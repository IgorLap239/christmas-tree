import TreeOptions from './treeOptions';
import Garland from './garland';
import FavoritesBlock from './favoritesBlock';

class ChristmasTreePage {
  static render() {
    const fragment = document.createDocumentFragment();
    const footer = document.querySelector('.footer') as HTMLElement;
    const treePageContainer = document.createElement('div') as HTMLElement;
    treePageContainer.classList.add('page', 'favorites-page');
    treePageContainer.innerHTML = `
    <div class="page favorites-page" data-page="favoritesPage">
    <div class="blur">
      <div class="page-container">
        <div class="favorites-menu">
          <div class="snow-audio-container menu-container">
            <div class="audio-control menu-item"></div>
            <div class="snow-control menu-item"></div>
          </div>
          <div class="tree-container menu-container">
            <div class="tree menu-item" data-tree="1"></div>
            <div class="tree menu-item" data-tree="2"></div>
            <div class="tree menu-item" data-tree="3"></div>
            <div class="tree menu-item" data-tree="4"></div>
            <div class="tree menu-item" data-tree="5"></div>
            <div class="tree menu-item" data-tree="6"></div>
          </div>
          <div class="bg-container menu-container">
            <div class="bg menu-item" data-bg="1"></div>
            <div class="bg menu-item" data-bg="2"></div>
            <div class="bg menu-item" data-bg="3"></div>
            <div class="bg menu-item" data-bg="4"></div>
            <div class="bg menu-item" data-bg="5"></div>
            <div class="bg menu-item" data-bg="6"></div>
            <div class="bg menu-item" data-bg="7"></div>
            <div class="bg menu-item" data-bg="8"></div>
            <div class="bg menu-item" data-bg="9"></div>
            <div class="bg menu-item" data-bg="10"></div>
          </div>
          <div class="garland-container menu-container">
            <div class="garland-btns">
              <button class="color-btn multicolor-btn" data-color="multicolor"></button>
              <button class="color-btn red-btn" data-color="red"></button>
              <button class="color-btn blue-btn" data-color="blue"></button>
              <button class="color-btn yellow-btn" data-color="yellow"></button>
              <button class="color-btn green-btn" data-color="green"></button>
            </div>
            <div class="onoffswitch">
              <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch">
              <label class="onoffswitch-label" for="myonoffswitch">
                  <div class="onoffswitch-inner"></div>
                  <div class="onoffswitch-switch"></div>
              </label>
            </div>
          </div>
        </div>
        <div class="main-tree-container">
          <div class="snowflakes hide"></div>
          <map name="tree-map">
            <area coords="365,699,189,706,113,683,31,608,2,555,2,539,18,437,73,351,106,224,161,134,243,-1,306,75,353,144,399,221,424,359,452,459,496,550,444,664" shape="poly">
          </map>
          <img src="assets/tree/1.png" class="main-tree" usemap="#tree-map" alt="tree">
        </div>
        <div class="favorites-aside">
          <div class="favorites-container">
          </div>
          <div class="favorites-decorate">
            <div class="favorites-decorate-container">
              <div class="tree-decorate">
                <img src="assets/tree/1.png" class="tree-decorate-img" alt="decorate-tree">
              </div>
              <div class="tree-decorate">
                <img src="assets/tree/2.png" class="tree-decorate-img" alt="decorate-tree">
              </div>
              <div class="tree-decorate">
                <img src="assets/tree/3.png" class="tree-decorate-img" alt="decorate-tree">
              </div>
              <div class="tree-decorate">
                <img src="assets/tree/4.png" class="tree-decorate-img" alt="decorate-tree">
              </div>
              <div class="tree-decorate">
                <img src="assets/tree/5.png" class="tree-decorate-img" alt="decorate-tree">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
    fragment.append(treePageContainer);
    footer.before(fragment);
    TreeOptions.init();
    Garland.init();
    FavoritesBlock.render();
    /* RangeSlider.createYearSlider();
    ToysCards.render();
    LocalStorage.loadSavedSettings();
    Filters.filter();
    LocalStorage.loadSortedOrder();
    Search.init();
    Search.useSearch();
    LocalStorage.loadFavoriteCardsStyles();
    Favorites.setFavoriteItem();
    Sorted.init();
    ClearFilters.init();
    LocalStorage.clearLocalStorage(); */
  }

  static remove() {
    const treePageContainer = document.querySelector('.favorites-page') as HTMLElement;
    treePageContainer.remove();
  }
}

export default ChristmasTreePage;
