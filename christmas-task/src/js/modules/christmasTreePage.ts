import TreeOptions from './treeOptions';
import Garland from './garland';
import FavoritesBlock from './favoritesBlock';
import DragAndDrop from './dragAndDropToys';

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
            <area coords="243,2,251,32,257,35,256,58,273,52,280,59,258,71,278,71,287,79,271,96,285,93,291,112,310,125,300,133,299,142,323,145,295,154,312,156,298,164,339,173,303,175,298,185,319,182,310,194,324,195,340,203,323,208,316,216,335,217,348,222,366,231,331,232,324,243,367,265,340,263,335,270,354,271,347,294,362,290,364,301,394,316,373,318,366,326,386,332,405,350,351,343,354,358,359,370,373,356,418,402,403,413,418,420,391,418,400,427,413,443,443,459,443,466,403,467,384,476,399,476,399,491,423,491,422,500,450,526,405,523,401,539,417,540,422,549,457,575,453,586,499,622,464,618,432,610,449,622,436,627,468,645,415,642,421,665,439,676,425,683,446,703,412,688,411,697,366,666,362,693,345,679,333,661,325,665,337,679,321,675,307,673,332,697,324,700,295,677,294,693,264,692,270,710,254,713,244,691,222,689,200,687,196,669,180,670,178,683,167,689,163,671,147,667,137,673,123,680,120,698,108,698,106,687,88,706,78,711,85,669,77,660,66,669,66,652,54,651,15,662,32,641,10,638,4,632,33,619,21,609,35,601,6,602,45,564,44,539,81,491,79,481,34,489,83,436,110,414,104,402,95,398,64,410,82,393,106,326,106,316,85,319,107,296,126,265,148,242,146,229,160,217,129,212,161,181,164,166,149,155,174,136,180,105,196,99,193,88,190,78,212,71,201,51,226,48,216,33,225,27,236,33" shape="poly">
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
    DragAndDrop.selectDragToy();
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
