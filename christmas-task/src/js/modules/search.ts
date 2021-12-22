class Search {
  static init() {
    const searchField = document.querySelector('.search') as HTMLInputElement;
    searchField.placeholder = 'Поиск';
    searchField.focus();
    searchField.select();
  }

  static useSearch() {
    const cardContainer = document.querySelector('.card-container') as HTMLElement;
    const searchField = document.querySelector('.search') as HTMLInputElement;
    searchField.addEventListener('input', () => {
      searchField.style.background = 'none';
      const cards = document.querySelectorAll<HTMLElement>('.card');
      if (String(searchField.value).length > 0) {
        const searchReg = new RegExp(`${searchField.value}`, 'i');
        cards.forEach((e) => {
          const name = (e.querySelector('.card-title') as HTMLElement).textContent;
          if (!String(name).match(searchReg)) {
            e.classList.add('hide');
          } else if (String(name).match(searchReg)) {
            e.classList.remove('hide');
          }
        });
      } else if (String(searchField.value).length === 0) {
        cards.forEach((e) => {
          if ((document.querySelector('.search-error') as HTMLElement)) {
            (document.querySelector('.search-error') as HTMLElement).remove();
          }
          e.classList.remove('hide');
        });
      }
      if (cards.length === (document.querySelectorAll<HTMLElement>('.hide')).length) {
        if (!(document.querySelector('.search-error') as HTMLElement)) {
          const searchError: HTMLElement = document.createElement('p');
          searchError.textContent = 'По данному запросу игрушек не найдено';
          searchError.classList.add('search-error');
          cardContainer.append(searchError);
        }
      }
    });
    searchField.addEventListener('focus', () => {
      searchField.style.background = 'none';
    });
    searchField.addEventListener('blur', () => {
      searchField.style.backgroundColor = 'rgba(31, 112, 127, .3)';
      searchField.style.backgroundImage = 'url("./assets/svg/search.svg")';
      searchField.style.backgroundSize = '20px';
      searchField.style.backgroundRepeat = 'no-repeat';
      searchField.style.backgroundPosition = '330px center';
    });
  }
}

export default Search;
