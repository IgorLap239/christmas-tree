import ToysPage from './toysPage';
import StartPage from './startPage';
import ChristmasTreePage from './christmasTreePage';

class Header {
  static control() {
    const header = document.querySelector('.header') as HTMLTemplateElement;
    const startPageLink = header.querySelector('.logo') as HTMLElement;
    const mainPageLink = header.querySelector('.switch-main-page') as HTMLElement;
    const treePageLink = header.querySelector('.switch-favorites-page') as HTMLElement;
    const searchField = document.querySelector('.search') as HTMLInputElement;
    const favoritesField = document.querySelector('.select') as HTMLElement;
    const startButton = document.querySelector('.switch-start-page') as HTMLElement;
    let currentPage = 'StartPage';
    startPageLink.addEventListener('click', () => {
      if (currentPage === 'ToysPage') {
        ToysPage.remove();
      } else if (currentPage === 'ChristmasTreePage') {
        ChristmasTreePage.remove();
      }
      currentPage = 'StartPage';
      StartPage.render();
      searchField.style.display = 'none';
      favoritesField.style.display = 'none';
    });
    mainPageLink.addEventListener('click', () => {
      if (currentPage === 'StartPage') {
        StartPage.remove();
      } else if (currentPage === 'ChristmasTreePage') {
        ChristmasTreePage.remove();
      }
      currentPage = 'ToysPage';
      ToysPage.render();
      searchField.style.display = 'block';
      favoritesField.style.display = 'block';
      currentPage = 'ToysPage';
    });
    treePageLink.addEventListener('click', () => {
      if (currentPage === 'StartPage') {
        StartPage.remove();
      } else if (currentPage === 'ToysPage') {
        ToysPage.remove();
      }
      currentPage = 'ChristmasTreePage';
      ChristmasTreePage.render();
      searchField.style.display = 'none';
      favoritesField.style.display = 'block';
    });
    startButton.addEventListener('click', () => {
      currentPage = 'ToysPage';
    });
  }
}

export default Header;
