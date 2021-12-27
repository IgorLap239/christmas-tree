class DragAndDrop {
  static selectDragToy() {
    const favoritesContainer = document.querySelector('.favorites-container') as HTMLElement;
    const favoritesToys = favoritesContainer.querySelectorAll<HTMLElement>('.favorites-card-img');
    const dropArea = document.querySelector('area') as HTMLElement;
    favoritesToys.forEach((el) => {
      el.addEventListener('dragstart', this.handleDragStart);
    });
    dropArea.addEventListener('dragover', this.handleOverDrop);
    dropArea.addEventListener('drop', this.handleOverDrop);
  }

  static handleDragStart(e: DragEvent) {
    e.dataTransfer!.setData('text', (e.target! as HTMLElement).id);
    e.dataTransfer!.setData('left', String(e.clientX - (e.target! as HTMLElement).getBoundingClientRect().left));
    e.dataTransfer!.setData('top', String(e.clientY - (e.target! as HTMLElement).getBoundingClientRect().top));
  }

  static handleOverDrop(e: DragEvent) {
    const dropAreaBody = document.querySelector('body') as HTMLElement;
    e.preventDefault();
    if (e.type !== 'drop') {
      return;
    }
    e.preventDefault();
    const draggedId = e.dataTransfer!.getData('text');
    const draggedEl = document.getElementById(draggedId) as HTMLElement;
    const toyCounter = (draggedEl.parentNode as HTMLElement).querySelector('.favorites-count') as HTMLElement;
    (draggedEl.parentNode as HTMLElement).removeChild(draggedEl);
    toyCounter.textContent = ((toyCounter.parentNode as HTMLElement).querySelectorAll<HTMLElement>('img').length).toString();
    draggedEl.style.left = `${e.pageX - Number(e.dataTransfer!.getData('left'))}px`;
    draggedEl.style.top = `${e.pageY - Number(e.dataTransfer!.getData('top'))}px`;
    dropAreaBody.append(draggedEl);
  }
}

export default DragAndDrop;
