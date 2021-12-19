import ToysPage from './toysPage';
import StartPage from './startPage';

class Header {
  static control() {
    const header = document.querySelector('.header') as HTMLTemplateElement;
    const startPageLink = header.querySelector('.logo') as HTMLElement;
    const mainPageLink = header.querySelector('.switch-main-page') as HTMLElement;
    startPageLink.addEventListener('click', () => {
      ToysPage.remove();
      StartPage.render();
    });
    mainPageLink.addEventListener('click', () => {
      StartPage.remove();
      ToysPage.render();
    });
  }
}

export default Header;
