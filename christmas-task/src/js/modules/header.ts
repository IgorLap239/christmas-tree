import ToysPage from './toysPage';
import StartPage from './startPage';

class Header {
  static control() {
    const header = document.querySelector('.header') as HTMLTemplateElement;
    const startPageLink = header.querySelector('.logo') as HTMLElement;
    const mainPageLink = header.querySelector('.switch-main-page') as HTMLElement;
    const searchField = document.querySelector('.search') as HTMLInputElement;
    const favoritesField = document.querySelector('.select') as HTMLElement;
    startPageLink.addEventListener('click', () => {
      ToysPage.remove();
      StartPage.render();
      searchField.style.display = 'none';
      favoritesField.style.display = 'none';
    });
    mainPageLink.addEventListener('click', () => {
      StartPage.remove();
      searchField.style.display = 'block';
      favoritesField.style.display = 'block';
      ToysPage.render();
    });
  }
}

export default Header;
