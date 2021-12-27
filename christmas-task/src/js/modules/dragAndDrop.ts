class DragAndDrop {
  static selectDragToy() {
    const body = document.querySelector('body') as HTMLElement;
    const favoritesContainer = document.querySelector('.favorites-container') as HTMLElement;
    const favoritesToys = favoritesContainer.querySelectorAll<HTMLElement>('.favorites-card-img');

    favoritesToys.forEach((el) => {
      el.addEventListener('dragstart', this.handleDragStart);
    });

    body.addEventListener('dragover', this.handleOverDrop);
    body.addEventListener('drop', this.handleOverDrop);
  }

  static handleDragStart(e: DragEvent) {
    e.dataTransfer!.setData('text', (e.target! as HTMLElement).id);

    e.dataTransfer!.setData('left', String(e.clientX - (e.target! as HTMLElement).getBoundingClientRect().left));

    e.dataTransfer!.setData('top', String(e.clientY - (e.target! as HTMLElement).getBoundingClientRect().top));
  }

  static handleOverDrop(e: DragEvent) {
    const dropAreaBody = document.querySelector('body') as HTMLElement;
    e.preventDefault();
    const dropArea = document.querySelector('area') as HTMLElement;

    if (e.type !== 'drop') {
      return;
    }

    e.preventDefault();

    const draggedId = e.dataTransfer!.getData('text');
    const draggedEl = document.getElementById(draggedId) as HTMLElement;
    const favoritCards = document.querySelectorAll<HTMLElement>('.favorites-card');
    const cardId = Number(draggedEl.dataset.imgnum);

    if (e.target === dropArea) {
      const toyCounter = (draggedEl.parentNode as HTMLElement).querySelector('.favorites-count') as HTMLElement;

      (draggedEl.parentNode as HTMLElement).removeChild(draggedEl);

      toyCounter.textContent = ((toyCounter.parentNode as HTMLElement).querySelectorAll<HTMLElement>('img').length).toString();

      draggedEl.style.left = `${e.pageX - Number(e.dataTransfer!.getData('left'))}px`;

      draggedEl.style.top = `${e.pageY - Number(e.dataTransfer!.getData('top'))}px`;
      dropAreaBody.append(draggedEl);
    } else if (draggedEl.parentNode === dropAreaBody) {
      favoritCards.forEach((el) => {
        if (Number(el.dataset.num) === cardId) {
          const toyCounter = el.querySelector('.favorites-count') as HTMLElement;

          draggedEl.style.top = '';
          draggedEl.style.left = '';

          el.append(draggedEl);

          toyCounter.textContent = ((toyCounter.parentNode as HTMLElement).querySelectorAll<HTMLElement>('img').length).toString();
        }
      });
    }
  }
}

export default DragAndDrop;
