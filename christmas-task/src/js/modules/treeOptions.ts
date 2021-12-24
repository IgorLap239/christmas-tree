class TreeOptions {
  static setTree() {
    const treeSelectContainer = document.querySelector('.tree-container') as HTMLElement;
    const mainTree = document.querySelector('.main-tree') as HTMLImageElement;
    treeSelectContainer.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('tree')) {
        console.log('target.dataset.tree = ', target.dataset.tree);
        mainTree.src = `../assets/tree/${target.dataset.tree}.png`;
      }
    });
  }

  static backGround() {
    const backgroundSelectContainer = document.querySelector('.bg-container') as HTMLElement;
    const mainTreeContainer = document.querySelector('.main-tree-container') as HTMLElement;
    backgroundSelectContainer.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('bg')) {
        mainTreeContainer.style.backgroundImage = `url("../assets/bg/${target.dataset.bg}.jpg")`;
        console.log('mainTreeContainer.style.backgroundImage = ', mainTreeContainer.style.backgroundImage);
      }
    });
  }

  static init() {
    this.setTree();
    this.backGround();
  }
}

export default TreeOptions;
