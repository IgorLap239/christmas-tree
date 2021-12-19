import ToysPage from './toysPage';

class StartPage {
  static render() {
    const fragment = document.createDocumentFragment();
    const footer = document.querySelector('.footer') as HTMLElement;
    const startPageContainer = document.createElement('div') as HTMLElement;
    startPageContainer.classList.add('page', 'start-page');
    startPageContainer.innerHTML = `
      <div class="ball ball1"></div>
      <div class="ball ball2"></div>
      <h1 class="start-page-title">Новогодняя игра<span>«Наряди ёлку»</span></h1>
      <button class="switch-start-page" data-page="mainPage">Начать</button>`;
    fragment.append(startPageContainer);
    footer.before(fragment);
    const startButton = startPageContainer.querySelector('.switch-start-page') as HTMLElement;
    startButton.addEventListener('click', () => {
      this.remove();
      ToysPage.render();
    });
  }

  static remove() {
    const startPageContainer = document.querySelector('.start-page') as HTMLElement;
    startPageContainer.remove();
  }

  /* static pageControl() {
    const startPageContainer = document.querySelector('.start-page') as HTMLElement;
    const startButton = startPageContainer.querySelector('.switch-start-page') as HTMLElement;
    const mainPageLink = document.querySelector('.switch-main-page') as HTMLElement;
    startButton.addEventListener('click', () => {
      console.log('trget = ', event?.target);
      startPageContainer.remove();
      ToysPage.render();
    });
    mainPageLink.addEventListener('click', () => {
      startPageContainer.remove();
      ToysPage.render();
    });
  } */
}

export default StartPage;
